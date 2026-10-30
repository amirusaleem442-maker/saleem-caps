/* =====================================================================
   SALEEM CAPS — client-side store (cart, catalogue, orders, admin session)
   Data persists in the browser (localStorage) so the site is fully
   functional without a server. Swap the storage layer for an API when
   you are ready to move to a hosted backend.
   ===================================================================== */
(function () {
  "use strict";

  var K = {
    products: "sc_products_v1",
    cart: "sc_cart_v1",
    orders: "sc_orders_v1",
    settings: "sc_settings_v1",
    session: "sc_admin_session"
  };

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      var val = JSON.parse(raw);
      return val === null || val === undefined ? fallback : val;
    } catch (e) { return fallback; }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      if (e && (e.name === "QuotaExceededError" || e.code === 22)) {
        console.warn("SALEEM CAPS: browser storage is full. Remove unused photos or run 'Optimise photos' in Admin → Settings.");
        alert("Storage is full. Please use smaller product photos, or delete products you no longer need.");
      }
      return false;
    }
  }

  function emit(name, detail) {
    document.dispatchEvent(new CustomEvent(name, { detail: detail || null }));
  }

  /* ----------------------------- settings --------------------------------- */
  function getSettings() {
    var base = Object.assign({}, window.SALEEM_CONFIG);
    var saved = read(K.settings, {});
    return Object.assign(base, saved || {});
  }

  function saveSettings(patch) {
    var next = Object.assign(getSettings(), patch || {});
    write(K.settings, next);
    emit("sc:data-changed", { type: "settings" });
    return next;
  }

  /* ----------------------------- products --------------------------------- */
  function normalise(p) {
    var s = getSettings();
    var out = Object.assign({}, p);
    out.price = Number(out.price);
    if (!isFinite(out.price) || out.price < 0) out.price = s.defaultPrice;
    out.gallery = Array.isArray(out.gallery) && out.gallery.length ? out.gallery : [out.image];
    out.image = out.image || out.gallery[0];
    out.stockQty = Number(out.stockQty);
    if (!isFinite(out.stockQty)) out.stockQty = out.inStock === false ? 0 : 1;
    out.inStock = out.inStock !== false && out.stockQty > 0;
    out.size = String(out.size || "").replace("½", ".5").trim();
    return out;
  }

  function getProducts() {
    var saved = read(K.products, null);
    var list = (saved && saved.length ? saved : window.SALEEM_SEED_PRODUCTS).map(normalise);
    return list;
  }

  function saveProducts(list) {
    write(K.products, list.map(normalise));
    emit("sc:data-changed", { type: "products" });
  }

  function getProduct(id) {
    return getProducts().filter(function (p) { return p.id === id; })[0] || null;
  }

  function addProduct(p) {
    var list = getProducts();
    var s = getSettings();
    var id = p.id || "cap-" + Date.now().toString(36);
    var item = normalise(Object.assign({
      sku: "SC-" + String(list.length + 1).padStart(3, "0"),
      price: s.defaultPrice, inStock: true, stockQty: 1, featured: false, isNew: true,
      description: "", material: "Premium cotton damask · Metallic gold thread",
      care: "Spot clean only. Store in the dust bag provided.",
      colorway: "Signature", gallery: []
    }, p, { id: id, createdAt: p.createdAt || new Date().toISOString() }));
    list.push(item);
    saveProducts(list);
    return item;
  }

  function updateProduct(id, patch) {
    var list = getProducts().map(function (p) {
      return p.id === id ? normalise(Object.assign({}, p, patch)) : p;
    });
    saveProducts(list);
    return list.filter(function (p) { return p.id === id; })[0] || null;
  }

  function deleteProduct(id) {
    saveProducts(getProducts().filter(function (p) { return p.id !== id; }));
    var cart = getCart().filter(function (l) { return l.id !== id; });
    write(K.cart, cart);
    emit("sc:cart-changed");
  }

  function resetCatalogue() {
    localStorage.removeItem(K.products);
    emit("sc:data-changed", { type: "products" });
  }

  /* ------------------------------- cart ----------------------------------- */
  function getCart() {
    var c = read(K.cart, []);
    return Array.isArray(c) ? c : [];
  }

  function saveCart(cart) {
    write(K.cart, cart);
    emit("sc:cart-changed", { count: cartCount() });
  }

  function addToCart(id, qty) {
    var product = getProduct(id);
    if (!product) return null;
    qty = Math.max(1, parseInt(qty, 10) || 1);
    var cart = getCart();
    var line = cart.filter(function (l) { return l.id === id; })[0];
    if (line) line.qty += qty;
    else cart.push({ id: id, qty: qty });
    saveCart(cart);
    return product;
  }

  function setQty(id, qty) {
    qty = parseInt(qty, 10) || 0;
    var cart = getCart();
    if (qty <= 0) cart = cart.filter(function (l) { return l.id !== id; });
    else cart.forEach(function (l) { if (l.id === id) l.qty = qty; });
    saveCart(cart);
  }

  function removeLine(id) {
    saveCart(getCart().filter(function (l) { return l.id !== id; }));
  }

  function clearCart() { saveCart([]); }

  /* cart lines joined with fresh product data */
  function cartDetails() {
    return getCart().map(function (l) {
      var p = getProduct(l.id);
      if (!p) return null;
      return { product: p, qty: l.qty, lineTotal: p.price * l.qty };
    }).filter(Boolean);
  }

  function cartCount() {
    return getCart().reduce(function (n, l) { return n + (parseInt(l.qty, 10) || 0); }, 0);
  }

  function cartSubtotal() {
    return cartDetails().reduce(function (n, l) { return n + l.lineTotal; }, 0);
  }

  /* ------------------------------ orders ---------------------------------- */
  function getOrders() {
    var o = read(K.orders, []);
    return Array.isArray(o) ? o : [];
  }

  function saveOrders(list) {
    write(K.orders, list);
    emit("sc:data-changed", { type: "orders" });
  }

  function createOrder(payload) {
    var orders = getOrders();
    var seq = orders.length + 1;
    var order = {
      id: "SC-" + String(Date.now()).slice(-6) + "-" + seq,
      createdAt: new Date().toISOString(),
      status: "new",
      channel: payload.channel || "whatsapp",
      customer: payload.customer || {},
      items: payload.items || [],
      subtotal: payload.subtotal || 0,
      deliveryFee: payload.deliveryFee || 0,
      total: payload.total || 0,
      note: payload.note || ""
    };
    orders.unshift(order);
    saveOrders(orders);
    return order;
  }

  function updateOrder(id, patch) {
    saveOrders(getOrders().map(function (o) { return o.id === id ? Object.assign({}, o, patch) : o; }));
  }

  function deleteOrder(id) {
    saveOrders(getOrders().filter(function (o) { return o.id !== id; }));
  }

  /* ------------------------------ helpers --------------------------------- */
  function money(amount) {
    var s = getSettings();
    var n = Number(amount) || 0;
    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency", currency: "NGN", maximumFractionDigits: 0
      }).format(n).replace("NGN", s.currencySymbol).replace(/\s+/g, "");
    } catch (e) {
      return s.currencySymbol + n.toLocaleString("en-NG");
    }
  }

  function fmtSize(size) {
    var s = String(size);
    return s.indexOf(".5") > -1 ? s.replace(".5", "½") : s;
  }

  function waNumber() {
    var s = getSettings();
    return String(s.whatsapp || "2348138096960").replace(/[^0-9]/g, "");
  }

  /* Builds the pre-filled WhatsApp order message:
     customer name · product name · cap size · quantity · total price */
  function whatsappMessage(opts) {
    opts = opts || {};
    var s = getSettings();
    var lines = [];
    lines.push("*NEW ORDER — " + s.businessName + "*");
    lines.push("");
    if (opts.orderNo) lines.push("Order No: " + opts.orderNo);
    lines.push("*Customer name:* " + (opts.name || "—"));
    if (opts.phone) lines.push("*Phone:* " + opts.phone);
    if (opts.address) lines.push("*Delivery address:* " + opts.address);
    lines.push("");
    lines.push("*Products:*");
    (opts.items || []).forEach(function (it, i) {
      lines.push(
        (i + 1) + ". " + it.name +
        "\n   • Cap size: " + fmtSize(it.size) +
        "\n   • Quantity: " + it.qty +
        "\n   • Price: " + money(it.price) +
        "\n   • Line total: " + money(it.price * it.qty)
      );
    });
    lines.push("");
    lines.push("*TOTAL PRICE: " + money(opts.total || 0) + "*");
    if (opts.note) { lines.push(""); lines.push("*Note:* " + opts.note); }
    lines.push("");
    lines.push("Please confirm availability and delivery. Thank you!");
    return lines.join("\n");
  }

  function whatsappUrl(opts) {
    var text = typeof opts === "string" ? opts : whatsappMessage(opts);
    return "https://wa.me/" + waNumber() + "?text=" + encodeURIComponent(text);
  }

  function buyNowWhatsapp(product, qty, name) {
    return whatsappUrl({
      name: name || "",
      items: [{ name: product.name, size: product.size, qty: qty || 1, price: product.price }],
      total: product.price * (qty || 1)
    });
  }

  /* --------------------------- admin session ------------------------------ */
  function sha256(text) {
    if (window.crypto && window.crypto.subtle) {
      return window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)).then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (b) {
          return ("00" + b.toString(16)).slice(-2);
        }).join("");
      });
    }
    /* fallback for file:// on very old browsers */
    var h = 0, i;
    for (i = 0; i < text.length; i++) { h = ((h << 5) - h + text.charCodeAt(i)) | 0; }
    return Promise.resolve("fallback-" + h);
  }

  function isAdmin() {
    return sessionStorage.getItem(K.session) === "granted";
  }

  function login(password) {
    var s = getSettings();
    return sha256(String(password || "")).then(function (hash) {
      var expected = s.adminPasswordHash;
      if (!expected) {
        /* first run — accept the default password and store its hash */
        if (String(password) !== s.adminDefaultPassword) return false;
        saveSettings({ adminPasswordHash: hash });
        sessionStorage.setItem(K.session, "granted");
        return true;
      }
      if (hash === expected) {
        sessionStorage.setItem(K.session, "granted");
        return true;
      }
      return false;
    });
  }

  function logout() { sessionStorage.removeItem(K.session); }

  function changePassword(current, next) {
    return login(current).then(function (ok) {
      if (!ok) return false;
      if (!next || String(next).length < 6) return false;
      return sha256(String(next)).then(function (hash) {
        saveSettings({ adminPasswordHash: hash });
        return true;
      });
    });
  }

  /* --------------------------- image handling ----------------------------- */
  /* Reads a photo, squares it, resizes to <= maxSize and returns a compact
     JPEG data URL so many photos can be stored in the browser. */
  function compressImage(file, maxSize) {
    maxSize = maxSize || 1000;
    return new Promise(function (resolve, reject) {
      if (!file || !/^image\//.test(file.type)) return reject(new Error("Please choose an image file."));
      var reader = new FileReader();
      reader.onerror = function () { reject(new Error("Could not read the file.")); };
      reader.onload = function () {
        var img = new Image();
        img.onerror = function () { reject(new Error("That image could not be loaded.")); };
        img.onload = function () {
          var w = img.width, h = img.height, side = Math.min(w, h);
          var sx = (w - side) / 2, sy = (h - side) / 2;
          var out = Math.min(maxSize, side);
          var canvas = document.createElement("canvas");
          canvas.width = out; canvas.height = out;
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = "#0a0a0a";
          ctx.fillRect(0, 0, out, out);
          ctx.drawImage(img, sx, sy, side, side, 0, 0, out, out);
          var tries = [0.84, 0.72, 0.6];
          var data = canvas.toDataURL("image/jpeg", tries[0]);
          var i = 1;
          while (data.length > 320000 && i < tries.length) {
            data = canvas.toDataURL("image/jpeg", tries[i]); i++;
          }
          resolve(data);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /* ------------------------------- misc ----------------------------------- */
  function queryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function sizeList() {
    var sizes = window.SALEEM_SIZE_ORDER.slice();
    getProducts().forEach(function (p) {
      if (p.size && sizes.indexOf(p.size) === -1) sizes.push(p.size);
    });
    return sizes.sort(function (a, b) { return parseFloat(a) - parseFloat(b); });
  }

  function sizeCounts() {
    var counts = {};
    getProducts().forEach(function (p) { counts[p.size] = (counts[p.size] || 0) + 1; });
    return counts;
  }

  window.SC = {
    settings: getSettings,
    saveSettings: saveSettings,
    products: getProducts,
    product: getProduct,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    resetCatalogue: resetCatalogue,
    cart: getCart,
    cartDetails: cartDetails,
    addToCart: addToCart,
    setQty: setQty,
    removeLine: removeLine,
    clearCart: clearCart,
    cartCount: cartCount,
    cartSubtotal: cartSubtotal,
    orders: getOrders,
    createOrder: createOrder,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    money: money,
    fmtSize: fmtSize,
    whatsappMessage: whatsappMessage,
    whatsappUrl: whatsappUrl,
    buyNowWhatsapp: buyNowWhatsapp,
    login: login,
    logout: logout,
    isAdmin: isAdmin,
    changePassword: changePassword,
    compressImage: compressImage,
    param: queryParam,
    sizeList: sizeList,
    sizeCounts: sizeCounts
  };
})();
