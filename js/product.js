/* SALEEM CAPS — product details page */
(function () {
  "use strict";

  var qty = 1;
  var activeImage = 0;
  var product = null;

  function notFound() {
    document.getElementById("js-pdp").innerHTML =
      '<div class="empty-state" style="grid-column:1/-1">' +
        "<h3>That cap could not be found</h3>" +
        '<p>It may have been removed from the collection.</p>' +
        '<a class="btn btn--gold" href="shop.html">Shop All Caps</a>' +
      "</div>";
  }

  function pdpHTML(p) {
    var gallery = (p.gallery && p.gallery.length ? p.gallery : [p.image]);
    var thumbs = gallery.length > 1
      ? '<div class="pdp__thumbs">' + gallery.map(function (src, i) {
          return '<button data-thumb="' + i + '" class="' + (i === activeImage ? "is-active" : "") + '" aria-label="View image ' + (i + 1) + '">' +
            '<img src="' + src + '" alt="' + p.name + ' view ' + (i + 1) + '"></button>';
        }).join("") + "</div>"
      : "";

    return (
      '<div class="pdp__gallery">' +
        '<div class="pdp__main"><img id="js-pdp-img" src="' + gallery[activeImage] + '" alt="' + p.name + " — traditional embroidered cap, size " + SC.fmtSize(p.size) + '"></div>' +
        thumbs +
        '<div class="pdp__note">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 2.5 20 6v6c0 5-3.4 8.3-8 9.5-4.6-1.2-8-4.5-8-9.5V6l8-3.5Z"/><path d="m8.6 12 2.4 2.4 4.4-4.4"/></svg>' +
          "<p><b style=\"color:var(--cream)\">Authentic SALEEM CAPS.</b> Hand-finished embroidery on premium cotton damask. Every cap is inspected by hand before dispatch and delivered nationwide within 2–5 working days.</p>" +
        "</div>" +
        '<div class="pdp__meta" style="border:0;padding-top:16px">' +
          '<span>SKU <b>' + (p.sku || p.id.toUpperCase()) + "</b></span>" +
          '<span>Delivery <b>' + (Number(SC.settings().deliveryFee) > 0 ? SC.money(SC.settings().deliveryFee) : "Free") + "</b></span>" +
          '<span>Returns <b>7 days</b></span>' +
        "</div>" +
      "</div>" +
      '<div>' +
        '<span class="eyebrow eyebrow--left">' + (p.colorway || "Signature") + " · Size " + SC.fmtSize(p.size) + "</span>" +
        '<h1 class="pdp__title">' + p.name + "</h1>" +
        '<div class="quote__stars" style="margin-bottom:6px;letter-spacing:.25em">★★★★★ <span style="font-family:var(--sans);font-size:.66rem;letter-spacing:.16em;color:var(--muted);text-transform:uppercase">Hand-finished in Katsina</span></div>' +
        '<div class="pdp__price">' + SC.money(p.price) + "<small>per cap · VAT inclusive</small></div>" +
        '<p style="margin-top:14px">' + (p.description || "A premium hand-embroidered traditional cap, finished with metallic gold thread on dense cotton damask.") + "</p>" +
        '<div class="pdp__meta">' +
          '<span>Cap size <b>' + SC.fmtSize(p.size) + "</b></span>" +
          '<span>Material <b>' + (p.material || "Cotton damask · Gold thread") + "</b></span>" +
          '<span class="stock-pill' + (p.inStock ? "" : " stock-pill--out") + '">' + (p.inStock ? "In stock" + (p.stockQty ? " (" + p.stockQty + ")" : "") : "Sold out") + "</span>" +
        "</div>" +
        '<div class="form-group" style="margin-bottom:4px">' +
          '<label class="lbl" for="js-name">Your name (for your WhatsApp order)</label>' +
          '<input type="text" id="js-name" placeholder="e.g. Ibrahim Abdulkarim" autocomplete="name">' +
        "</div>" +
        '<div class="pdp__buy">' +
          '<div class="row">' +
            '<div class="qty qty--lg">' +
              '<button id="js-dec" aria-label="Decrease quantity">−</button>' +
              '<span id="js-qty">1</span>' +
              '<button id="js-inc" aria-label="Increase quantity">+</button>' +
            "</div>" +
            '<button class="btn btn--gold" id="js-add"' + (p.inStock ? "" : " disabled") + ">Add to Cart</button>" +
          "</div>" +
          '<button class="btn btn--ghost" id="js-buy"' + (p.inStock ? "" : " disabled") + ">Buy Now</button>" +
          '<a class="btn btn--wa" id="js-wa" href="#" target="_blank" rel="noopener">Order on WhatsApp</a>' +
        "</div>" +
        '<div class="accordion">' +
          '<div class="accordion__item is-open"><button class="accordion__btn">Product details <i>+</i></button>' +
            '<div class="accordion__panel"><div>' +
              "<p><b>Design:</b> " + p.name + " — " + (p.colorway || "Signature") + " colourway.</p>" +
              "<p><b>Size:</b> " + SC.fmtSize(p.size) + " (fits head circumference approx. " + sizeGuide(p.size) + ").</p>" +
              "<p><b>Material:</b> " + (p.material || "Premium cotton damask with metallic gold thread") + ".</p>" +
              "<p><b>Finish:</b> Structured crown, hand-rolled band, individually inspected before dispatch.</p>" +
            "</div></div></div>" +
          '<div class="accordion__item"><button class="accordion__btn">Care &amp; keeping <i>+</i></button>' +
            '<div class="accordion__panel"><div><p>' + (p.care || "Spot clean only with a soft damp cloth. Reshape while damp and air-dry away from direct heat. Store in the dust bag provided.") + "</p></div></div></div>" +
          '<div class="accordion__item"><button class="accordion__btn">Delivery &amp; returns <i>+</i></button>' +
            '<div class="accordion__panel"><div>' +
              "<p>We dispatch within 24 hours of confirmed payment. Delivery is typically 1–3 working days within Katsina and 2–5 working days nationwide.</p>" +
              "<p>Not the right fit? Return it unworn within 7 days for an exchange or refund.</p>" +
            "</div></div></div>" +
          '<div class="accordion__item"><button class="accordion__btn">Ordering &amp; payment <i>+</i></button>' +
            '<div class="accordion__panel"><div>' +
              "<p>Add the cap to your cart and check out, or press <b>Order on WhatsApp</b> and we will confirm your order personally. Bank transfer and cash on delivery are both accepted.</p>" +
              "<p>WhatsApp: <b>" + SC.settings().whatsappDisplay + "</b></p>" +
            "</div></div></div>" +
        "</div>" +
      "</div>"
    );
  }

  function sizeGuide(size) {
    var map = {
      "21.5": "54–55 cm", "22": "55–56 cm", "22.5": "56–57 cm",
      "23": "57–58 cm", "23.5": "58–59 cm", "24": "59–60 cm"
    };
    return map[String(size)] || "measure your head";
  }

  function waLink() {
    if (!product) return "#";
    var name = (document.getElementById("js-name") || {}).value || "";
    return SC.whatsappUrl({
      name: name,
      items: [{ name: product.name, size: product.size, qty: qty, price: product.price }],
      total: product.price * qty
    });
  }

  function bind() {
    var p = product;
    if (!p) return;

    var inc = document.getElementById("js-inc");
    var dec = document.getElementById("js-dec");
    if (inc) inc.addEventListener("click", function () { qty = Math.min(20, qty + 1); document.getElementById("js-qty").textContent = qty; });
    if (dec) dec.addEventListener("click", function () { qty = Math.max(1, qty - 1); document.getElementById("js-qty").textContent = qty; });

    var add = document.getElementById("js-add");
    if (add) add.addEventListener("click", function () {
      SC.addToCart(p.id, qty);
      UI.toast(p.name + " × " + qty + " added to cart");
      UI.openCart();
    });

    var buy = document.getElementById("js-buy");
    if (buy) buy.addEventListener("click", function () {
      SC.clearCart();
      SC.addToCart(p.id, qty);
      window.location.href = "checkout.html";
    });

    var wa = document.getElementById("js-wa");
    if (wa) {
      wa.href = waLink();
      var nameInput = document.getElementById("js-name");
      if (nameInput) nameInput.addEventListener("input", function () { wa.href = waLink(); });
    }

    document.querySelectorAll("[data-thumb]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeImage = Number(btn.dataset.thumb);
        var gallery = p.gallery && p.gallery.length ? p.gallery : [p.image];
        document.getElementById("js-pdp-img").src = gallery[activeImage];
        document.querySelectorAll("[data-thumb]").forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
      });
    });

    document.querySelectorAll(".accordion__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentElement;
        var open = item.classList.contains("is-open");
        item.parentElement.querySelectorAll(".accordion__item").forEach(function (i) { i.classList.remove("is-open"); });
        if (!open) item.classList.add("is-open");
      });
    });

    /* sticky mobile bar */
    var sticky = document.getElementById("js-sticky-buy");
    sticky.innerHTML =
      '<div class="sticky-buy__inner">' +
        '<span class="sticky-buy__price">' + SC.money(p.price) + "</span>" +
        '<button class="btn btn--gold" id="js-sticky-add">Add to Cart</button>' +
        '<a class="btn btn--wa" id="js-sticky-wa" href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp</a>' +
      "</div>";
    document.getElementById("js-sticky-add").addEventListener("click", function () {
      SC.addToCart(p.id, qty);
      UI.openCart();
    });
    var nameInput2 = document.getElementById("js-name");
    if (nameInput2) nameInput2.addEventListener("input", function () {
      document.getElementById("js-sticky-wa").href = waLink();
    });

    /* crumb + document title */
    document.body.classList.add("has-sticky");
    document.getElementById("js-crumb").textContent = p.name;
    document.title = p.name + " — Size " + SC.fmtSize(p.size) + " | SALEEM CAPS";
    document.querySelector('meta[name="description"]').setAttribute("content",
      p.name + " — premium traditional embroidered cap by SALEEM CAPS. Size " + SC.fmtSize(p.size) + ", " + SC.money(p.price) + ". Order online or on WhatsApp.");

    /* related */
    var others = SC.products().filter(function (o) { return o.id !== p.id; });
    var sameSize = others.filter(function (o) { return o.size === p.size; });
    var related = sameSize.concat(others.filter(function (o) { return o.size !== p.size; })).slice(0, 4);
    if (related.length) {
      document.getElementById("js-related-wrap").classList.remove("hide");
      document.getElementById("js-related").innerHTML = related.map(function (r) { return UI.card(r); }).join("");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var id = SC.param("id");
    product = id ? SC.product(id) : SC.products()[0];
    if (!product) { notFound(); return; }
    document.getElementById("js-pdp").innerHTML = pdpHTML(product);
    bind();
  });
})();
