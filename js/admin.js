/* =====================================================================
   SALEEM CAPS — admin dashboard
   Products · Prices · Sizes · Stock · Photos · Orders · Customers · Settings
   ===================================================================== */
(function () {
  "use strict";

  var pendingImage = null;      // data URL from the upload zone
  var selectedOrder = null;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function toast(msg, type) { UI.toast(msg, type); }
  function date(iso) {
    try {
      return new Date(iso).toLocaleString("en-NG", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch (e) { return iso; }
  }

  /* ------------------------------- login --------------------------------- */
  function initLogin() {
    var form = $("#js-login-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var pass = $("#ad-pass").value;
      SC.login(pass).then(function (ok) {
        if (ok) {
          $("#js-login").classList.add("hide");
          $("#js-dashboard").classList.remove("hide");
          renderAll();
        } else {
          var err = $("#js-login-error");
          err.textContent = "Incorrect password. Please try again.";
          err.classList.remove("hide");
        }
      });
    });
  }

  /* -------------------------------- tabs --------------------------------- */
  function showTab(name) {
    $$("[data-panel]").forEach(function (p) { p.classList.toggle("hide", p.dataset.panel !== name); });
    $$("#js-admin-nav button").forEach(function (b) { b.classList.toggle("is-active", b.dataset.tab === name); });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function initTabs() {
    $("#js-admin-nav").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-tab]");
      if (btn) showTab(btn.dataset.tab);
    });
    $$("[data-goto]").forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); showTab(b.dataset.goto); });
    });
    $("#js-logout").addEventListener("click", function () {
      if (confirm("Log out of the admin dashboard?")) {
        SC.logout();
        location.reload();
      }
    });
  }

  /* ------------------------------ overview -------------------------------- */
  function renderOverview() {
    var products = SC.products();
    var orders = SC.orders();
    var revenue = orders.reduce(function (n, o) { return n + Number(o.total || 0); }, 0);
    var pending = orders.filter(function (o) { return o.status === "new"; }).length;
    var stock = products.reduce(function (n, p) { return n + (p.inStock ? Number(p.stockQty || 0) : 0); }, 0);

    $("#js-kpis").innerHTML = [
      { v: products.length, l: "Products listed" },
      { v: SC.money(products.length ? products[0].price : 18000), l: "Current cap price" },
      { v: orders.length, l: "Total orders" },
      { v: pending, l: "New / unactioned" },
      { v: SC.money(revenue), l: "Order value" },
      { v: stock, l: "Units in stock" }
    ].map(function (k) {
      return '<div class="kpi"><b>' + k.v + "</b><span>" + k.l + "</span></div>";
    }).join("");

    var recent = orders.slice(0, 5);
    $("#js-recent-orders").innerHTML = recent.length
      ? recent.map(function (o) {
          return '<div class="summary-line" style="align-items:center">' +
            "<div><div class=\"summary-line__name\">" + esc((o.customer || {}).name || "Customer") + "</div>" +
            '<div class="summary-line__meta">' + o.id + " · " + date(o.createdAt) + "</div></div>" +
            '<div class="summary-line__amt">' + SC.money(o.total) + "</div>" +
          "</div>";
        }).join("")
      : '<p class="note">No orders yet. Orders placed through checkout will appear here.</p>';

    var counts = SC.sizeCounts();
    var total = SC.products().length || 1;
    $("#js-size-breakdown").innerHTML = SC.sizeList().map(function (s) {
      var n = counts[s] || 0;
      var pct = Math.round((n / total) * 100);
      return '<div style="margin-bottom:10px">' +
        '<div class="flex-between" style="font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)">' +
          "<span>Size " + SC.fmtSize(s) + "</span><span>" + n + " cap" + (n === 1 ? "" : "s") + "</span></div>" +
        '<div style="height:5px;background:rgba(255,255,255,.08);margin-top:5px"><div style="height:5px;width:' + pct + '%;background:var(--gold-grad)"></div></div>' +
      "</div>";
    }).join("");

    var badge = $("#js-nav-orders");
    if (badge) {
      badge.textContent = pending;
      badge.classList.toggle("hide", pending === 0);
    }
  }

  /* ------------------------------- products ------------------------------- */
  function renderProducts() {
    var products = SC.products();
    $("#js-product-rows").innerHTML = products.map(function (p) {
      var sizeOpts = window.SALEEM_SIZE_ORDER.map(function (s) {
        return '<option value="' + s + '"' + (s === p.size ? " selected" : "") + ">" + SC.fmtSize(s) + "</option>";
      }).join("");
      return '<tr data-row="' + p.id + '">' +
        '<td><img class="tbl-thumb" src="' + p.image + '" alt="' + esc(p.name) + '"></td>' +
        '<td><div class="tbl-name">' + esc(p.name) + '</div><div class="tbl-sub">' + esc(p.sku || p.id) + "</div></td>" +
        '<td><select data-field="size">' + sizeOpts + "</select></td>" +
        '<td><input type="number" min="0" step="500" data-field="price" value="' + p.price + '"></td>' +
        '<td><input type="number" min="0" step="1" data-field="stockQty" value="' + (p.stockQty || 0) + '"></td>' +
        '<td><div style="display:flex;flex-direction:column;gap:4px;font-size:.66rem;color:var(--muted)">' +
          '<label style="display:flex;gap:6px;align-items:center"><input type="checkbox" data-field="inStock"' + (p.inStock ? " checked" : "") + ' style="width:auto;accent-color:var(--gold)"> In stock</label>' +
          '<label style="display:flex;gap:6px;align-items:center"><input type="checkbox" data-field="featured"' + (p.featured ? " checked" : "") + ' style="width:auto;accent-color:var(--gold)"> Featured</label>' +
          '<label style="display:flex;gap:6px;align-items:center"><input type="checkbox" data-field="isNew"' + (p.isNew ? " checked" : "") + ' style="width:auto;accent-color:var(--gold)"> New</label>' +
        "</div></td>" +
        '<td><div class="row-actions">' +
          '<button class="mini-btn mini-btn--gold" data-save="' + p.id + '">Save</button>' +
          '<button class="mini-btn" data-photo="' + p.id + '">Photo</button>' +
          '<button class="mini-btn mini-btn--danger" data-del="' + p.id + '">Delete</button>' +
        "</div></td>" +
      "</tr>";
    }).join("");
  }

  function initProductTable() {
    var tbody = $("#js-product-rows");

    tbody.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      var row = btn.closest("tr");
      var id = row.dataset.row;

      if (btn.dataset.save) {
        var patch = {
          size: $('[data-field="size"]', row).value,
          price: Number($('[data-field="price"]', row).value),
          stockQty: Number($('[data-field="stockQty"]', row).value),
          inStock: $('[data-field="inStock"]', row).checked,
          featured: $('[data-field="featured"]', row).checked,
          isNew: $('[data-field="isNew"]', row).checked
        };
        if (!isFinite(patch.price) || patch.price < 0) { toast("Enter a valid price", "error"); return; }
        patch.inStock = patch.inStock && patch.stockQty > 0;
        SC.updateProduct(id, patch);
        toast("Product saved");
        renderProducts();
        renderOverview();
      }

      if (btn.dataset.del) {
        var p = SC.product(id);
        if (confirm("Delete “" + (p ? p.name : id) + "” from the store? This cannot be undone.")) {
          SC.deleteProduct(id);
          toast("Product deleted");
          renderProducts();
          renderOverview();
        }
      }

      if (btn.dataset.photo) {
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.addEventListener("change", function () {
          var file = input.files && input.files[0];
          if (!file) return;
          SC.compressImage(file, 1000).then(function (dataUrl) {
            SC.updateProduct(id, { image: dataUrl, gallery: [dataUrl] });
            toast("Photo updated");
            renderProducts();
          }).catch(function (err) { toast(err.message || "Upload failed", "error"); });
        });
        input.click();
      }
    });
  }

  function initResetProducts() {
    $("#js-reset-products").addEventListener("click", function () {
      if (confirm("Restore the 19 original products at ₦18,000 each? Any product changes will be lost.")) {
        SC.resetCatalogue();
        renderProducts();
        renderOverview();
        toast("Original catalogue restored");
      }
    });
  }

  /* ----------------------------- add product ------------------------------ */
  function initUpload() {
    var zone = $("#js-dropzone");
    var fileInput = $("#js-file");
    var preview = $("#js-preview");

    function handle(file) {
      if (!file) return;
      SC.compressImage(file, 1000).then(function (dataUrl) {
        pendingImage = dataUrl;
        preview.src = dataUrl;
        preview.classList.remove("hide");
        toast("Photo ready — now save the product");
      }).catch(function (err) { toast(err.message || "Upload failed", "error"); });
    }

    zone.addEventListener("click", function () { fileInput.click(); });
    zone.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInput.click(); }
    });
    fileInput.addEventListener("change", function () { handle(fileInput.files[0]); });
    ["dragenter", "dragover"].forEach(function (ev) {
      zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.add("is-drag"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.remove("is-drag"); });
    });
    zone.addEventListener("drop", function (e) {
      var f = e.dataTransfer.files && e.dataTransfer.files[0];
      handle(f);
    });
  }

  function initAddForm() {
    $("#js-add-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#add-name").value.trim();
      var err = $("#js-add-error");
      if (!name) {
        err.textContent = "Please enter a cap name.";
        err.classList.remove("hide");
        return;
      }
      err.classList.add("hide");
      var price = Number($("#add-price").value);
      var stockQty = Number($("#add-stock").value);
      var image = pendingImage || "images/logo-mark.svg";

      SC.addProduct({
        name: name,
        size: $("#add-size").value,
        price: isFinite(price) ? price : SC.settings().defaultPrice,
        stockQty: isFinite(stockQty) ? stockQty : 1,
        inStock: $("#add-instock").checked && stockQty > 0,
        featured: $("#add-featured").checked,
        isNew: $("#add-new").checked,
        colorway: $("#add-colour").value.trim() || "Signature",
        description: $("#add-desc").value.trim(),
        image: image,
        gallery: [image]
      });

      toast("Product added to the store");
      $("#js-add-form").reset();
      $("#add-price").value = SC.settings().defaultPrice;
      $("#add-stock").value = 1;
      pendingImage = null;
      $("#js-preview").classList.add("hide");
      renderProducts();
      renderOverview();
      showTab("products");
    });
  }

  function initBulk() {
    $("#js-bulk").addEventListener("change", function (e) {
      var files = Array.prototype.slice.call(e.target.files || []);
      if (!files.length) return;
      var count = 0;
      var chain = Promise.resolve();
      files.forEach(function (file, i) {
        chain = chain.then(function () {
          return SC.compressImage(file, 1000).then(function (dataUrl) {
            var base = file.name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").trim();
            SC.addProduct({
              name: base ? base.replace(/\b\w/g, function (m) { return m.toUpperCase(); }) : "New Cap " + (i + 1),
              size: "22.5",
              price: SC.settings().defaultPrice,
              stockQty: 1,
              inStock: true,
              isNew: true,
              image: dataUrl,
              gallery: [dataUrl],
              colorway: "Signature"
            });
            count++;
          }).catch(function () { /* skip bad file */ });
        });
      });
      chain.then(function () {
        toast(count + " product" + (count === 1 ? "" : "s") + " uploaded");
        e.target.value = "";
        renderProducts();
        renderOverview();
        showTab("products");
      });
    });
  }

  /* -------------------------------- orders -------------------------------- */
  function statusTag(status) {
    return '<span class="status-tag status-' + esc(status) + '">' + esc(status) + "</span>";
  }

  function itemsSummary(o) {
    return (o.items || []).map(function (i) {
      return esc(i.name) + " (×" + i.qty + ")";
    }).join(", ");
  }

  function renderOrders() {
    var orders = SC.orders();
    $("#js-order-rows").innerHTML = orders.length
      ? orders.map(function (o) {
          var c = o.customer || {};
          var opts = ["new", "confirmed", "shipped", "delivered", "cancelled"].map(function (s) {
            return '<option value="' + s + '"' + (o.status === s ? " selected" : "") + ">" + s + "</option>";
          }).join("");
          return '<tr data-order="' + o.id + '">' +
            '<td><div class="tbl-name">' + esc(o.id) + '</div><div class="tbl-sub">' + esc(o.channel || "checkout") + "</div></td>" +
            "<td>" + date(o.createdAt) + "</td>" +
            '<td><div class="tbl-name">' + esc(c.name || "—") + '</div><div class="tbl-sub">' + esc(c.phone || "") + "</div></td>" +
            "<td>" + esc(itemsSummary(o)) + "</td>" +
            "<td><b style=\"color:var(--gold-2)\">" + SC.money(o.total) + "</b></td>" +
            '<td><select data-status="' + o.id + '">' + opts + "</select></td>" +
            '<td><div class="row-actions">' +
              '<button class="mini-btn" data-view="' + o.id + '">Details</button>' +
              '<button class="mini-btn" data-wa="' + o.id + '">WhatsApp</button>' +
              '<button class="mini-btn mini-btn--danger" data-odel="' + o.id + '">Delete</button>' +
            "</div></td>" +
          "</tr>";
        }).join("")
      : '<tr><td colspan="7"><p class="note" style="margin:0">No orders yet. When a customer checks out, their order appears here with full customer information.</p></td></tr>';

    var pending = orders.filter(function (o) { return o.status === "new"; }).length;
    var badge = $("#js-nav-orders");
    if (badge) { badge.textContent = pending; badge.classList.toggle("hide", pending === 0); }
  }

  function orderDetail(id) {
    var o = SC.orders().filter(function (x) { return x.id === id; })[0];
    var box = $("#js-order-detail");
    if (!o) { box.innerHTML = ""; return; }
    var c = o.customer || {};
    box.innerHTML =
      "<h3>Order " + esc(o.id) + " — " + statusTag(o.status) + "</h3>" +
      '<div class="grid-2">' +
        "<dl class=\"order-detail\">" +
          "<dt>Customer</dt><dd>" + esc(c.name || "—") + "</dd>" +
          "<dt>Phone</dt><dd>" + esc(c.phone || "—") + "</dd>" +
          "<dt>Email</dt><dd>" + esc(c.email || "—") + "</dd>" +
          "<dt>Delivery address</dt><dd>" + esc([c.address, c.city, c.state].filter(Boolean).join(", ") || "—") + "</dd>" +
          "<dt>Note</dt><dd>" + esc(o.note || "—") + "</dd>" +
        "</dl>" +
        "<div>" +
          '<div class="table-wrap" style="border:0"><table style="min-width:0"><thead><tr><th>Cap</th><th>Size</th><th>Qty</th><th>Line</th></tr></thead><tbody>' +
          (o.items || []).map(function (i) {
            return "<tr><td>" + esc(i.name) + "</td><td>" + SC.fmtSize(i.size) + "</td><td>" + i.qty + "</td><td>" + SC.money(i.price * i.qty) + "</td></tr>";
          }).join("") +
          "</tbody></table></div>" +
          '<div class="totals" style="margin-top:14px">' +
            '<div class="totals__row"><span>Subtotal</span><span>' + SC.money(o.subtotal) + "</span></div>" +
            '<div class="totals__row"><span>Delivery</span><span>' + (Number(o.deliveryFee) > 0 ? SC.money(o.deliveryFee) : "Free") + "</span></div>" +
            '<div class="totals__row totals__row--grand"><span>Total</span><span>' + SC.money(o.total) + "</span></div>" +
          "</div>" +
        "</div>" +
      "</div>";
    selectedOrder = id;
  }

  function initOrders() {
    var tbody = $("#js-order-rows");

    tbody.addEventListener("change", function (e) {
      var sel = e.target.closest("[data-status]");
      if (!sel) return;
      SC.updateOrder(sel.dataset.status, { status: sel.value });
      toast("Order marked " + sel.value);
      renderOrders();
      renderOverview();
    });

    tbody.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      var id = btn.dataset.view || btn.dataset.wa || btn.dataset.odel;
      var o = SC.orders().filter(function (x) { return x.id === id; })[0];

      if (btn.dataset.view) orderDetail(id);

      if (btn.dataset.wa && o) {
        var c = o.customer || {};
        var text = "*SALEEM CAPS — Order " + o.id + "*\n\n" +
          "Hello " + (c.name || "customer") + ", thank you for your order.\n\n" +
          (o.items || []).map(function (i) {
            return "• " + i.name + " — size " + SC.fmtSize(i.size) + " × " + i.qty + " = " + SC.money(i.price * i.qty);
          }).join("\n") +
          "\n\n*Total: " + SC.money(o.total) + "*\n\nWe are confirming your order now. Thank you for choosing SALEEM CAPS.";
        var number = String(c.phone || "").replace(/[^0-9]/g, "");
        if (number.length === 11 && number.charAt(0) === "0") number = "234" + number.slice(1);
        var url = number.length >= 10
          ? "https://wa.me/" + number + "?text=" + encodeURIComponent(text)
          : SC.whatsappUrl(text);
        window.open(url, "_blank");
      }

      if (btn.dataset.odel && confirm("Delete order " + id + "?")) {
        SC.deleteOrder(id);
        renderOrders();
        renderOverview();
        renderCustomers();
        $("#js-order-detail").innerHTML = "";
        toast("Order deleted");
      }
    });
  }

  /* ------------------------------- customers ------------------------------ */
  function customerList() {
    var map = {};
    SC.orders().forEach(function (o) {
      var c = o.customer || {};
      var key = (c.phone || c.email || c.name || "unknown").toLowerCase();
      if (!map[key]) {
        map[key] = { name: c.name || "—", phone: c.phone || "", email: c.email || "", location: [c.city, c.state].filter(Boolean).join(", "), orders: 0, spend: 0 };
      }
      map[key].orders += 1;
      map[key].spend += Number(o.total || 0);
      if (!map[key].location && (c.city || c.state)) map[key].location = [c.city, c.state].filter(Boolean).join(", ");
    });
    return Object.keys(map).map(function (k) { return map[k]; });
  }

  function renderCustomers() {
    var list = customerList();
    $("#js-customer-rows").innerHTML = list.length
      ? list.map(function (c) {
          var number = String(c.phone || "").replace(/[^0-9]/g, "");
          if (number.length === 11 && number.charAt(0) === "0") number = "234" + number.slice(1);
          return "<tr>" +
            '<td class="tbl-name">' + esc(c.name) + "</td>" +
            "<td>" + esc(c.phone || "—") + "</td>" +
            "<td>" + esc(c.email || "—") + "</td>" +
            "<td>" + esc(c.location || "—") + "</td>" +
            "<td>" + c.orders + "</td>" +
            '<td><b style="color:var(--gold-2)">' + SC.money(c.spend) + "</b></td>" +
            '<td><div class="row-actions">' +
              (number.length >= 10
                ? '<a class="mini-btn" href="https://wa.me/' + number + '" target="_blank" rel="noopener">WhatsApp</a>'
                : '<span class="tbl-sub">no number</span>') +
              (c.phone ? '<a class="mini-btn" href="tel:' + esc(c.phone) + '">Call</a>' : "") +
            "</div></td>" +
          "</tr>";
        }).join("")
      : '<tr><td colspan="7"><p class="note" style="margin:0">Customer information is captured at checkout and listed here.</p></td></tr>';
  }

  /* -------------------------------- settings ------------------------------ */
  function fillSettings() {
    var s = SC.settings();
    $("#set-default-price").value = s.defaultPrice;
    $("#set-wa").value = s.whatsapp;
    $("#set-phone").value = s.phone;
    $("#set-email").value = s.email;
    $("#set-address").value = s.address;
    $("#set-delivery").value = s.deliveryFee;
    var prices = SC.products().map(function (p) { return Number(p.price); });
    var uniq = prices.filter(function (v, i) { return prices.indexOf(v) === i; });
    $("#js-price-summary").textContent = uniq.length === 1
      ? SC.money(uniq[0]) + " (all caps)"
      : uniq.length + " different prices in use";
  }

  function initSettings() {
    $("#js-save-settings").addEventListener("click", function () {
      var wa = $("#set-wa").value.replace(/[^0-9]/g, "");
      SC.saveSettings({
        defaultPrice: Number($("#set-default-price").value) || 18000,
        whatsapp: wa || "2348138096960",
        phone: $("#set-phone").value.trim() || "08138096960",
        email: $("#set-email").value.trim() || "amirusaleem442@gmail.com",
        address: $("#set-address").value.trim() || SC.settings().address,
        deliveryFee: Number($("#set-delivery").value) || 0
      });
      toast("Settings saved");
      fillSettings();
      renderOverview();
    });

    $("#js-apply-price").addEventListener("click", function () {
      var price = Number($("#set-all-price").value);
      if (!isFinite(price) || price <= 0) { toast("Enter a valid price", "error"); return; }
      if (!confirm("Set every cap in the store to " + SC.money(price) + "?")) return;
      SC.products().forEach(function (p) { SC.updateProduct(p.id, { price: price }); });
      SC.saveSettings({ defaultPrice: price });
      toast("All prices updated to " + SC.money(price));
      renderProducts();
      fillSettings();
      renderOverview();
    });

    $("#js-change-pass").addEventListener("click", function () {
      var current = $("#set-current").value;
      var next = $("#set-new").value;
      if (next.length < 6) { toast("New password must be at least 6 characters", "error"); return; }
      SC.changePassword(current, next).then(function (ok) {
        if (ok) {
          toast("Password changed");
          $("#set-current").value = "";
          $("#set-new").value = "";
        } else {
          toast("Current password is incorrect", "error");
        }
      });
    });

    $("#js-export").addEventListener("click", function () {
      var data = {
        exportedAt: new Date().toISOString(),
        settings: SC.settings(),
        products: SC.products(),
        orders: SC.orders()
      };
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "saleem-caps-backup-" + new Date().toISOString().slice(0, 10) + ".json";
      a.click();
      URL.revokeObjectURL(a.href);
      toast("Backup downloaded");
    });

    $("#js-import-btn").addEventListener("click", function () { $("#js-import").click(); });
    $("#js-import").addEventListener("change", function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var data = JSON.parse(reader.result);
          if (data.products) localStorage.setItem("sc_products_v1", JSON.stringify(data.products));
          if (data.orders) localStorage.setItem("sc_orders_v1", JSON.stringify(data.orders));
          if (data.settings) {
            var merged = Object.assign(SC.settings(), data.settings);
            localStorage.setItem("sc_settings_v1", JSON.stringify(merged));
          }
          toast("Backup restored");
          renderAll();
          fillSettings();
        } catch (err) {
          toast("That file could not be read", "error");
        }
      };
      reader.readAsText(file);
    });

    $("#js-clear-orders").addEventListener("click", function () {
      if (!confirm("Delete all orders? This cannot be undone.")) return;
      localStorage.removeItem("sc_orders_v1");
      renderOrders();
      renderCustomers();
      renderOverview();
      toast("All orders deleted");
    });
  }

  /* -------------------------------- boot ---------------------------------- */
  function renderAll() {
    renderOverview();
    renderProducts();
    renderOrders();
    renderCustomers();
    fillSettings();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLogin();
    initTabs();
    initProductTable();
    initResetProducts();
    initUpload();
    initAddForm();
    initBulk();
    initOrders();
    initSettings();

    if (SC.isAdmin()) {
      $("#js-login").classList.add("hide");
      $("#js-dashboard").classList.remove("hide");
      renderAll();
    }
    document.addEventListener("sc:data-changed", function () {
      if (SC.isAdmin()) renderOverview();
    });
  });
})();
