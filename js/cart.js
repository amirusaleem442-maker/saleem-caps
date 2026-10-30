/* SALEEM CAPS — cart page */
(function () {
  "use strict";

  function render() {
    var lines = SC.cartDetails();
    var itemsEl = document.getElementById("js-cart-items");
    var summaryEl = document.getElementById("js-cart-summary");
    var s = SC.settings();

    if (!lines.length) {
      itemsEl.innerHTML =
        '<div class="empty-state" style="border-style:solid;border-color:rgba(212,175,55,.25)">' +
          "<h3>Your cart is empty</h3>" +
          '<p>Browse our 19 hand-embroidered caps — ₦18,000 each, six sizes.</p>' +
          '<a class="btn btn--gold" href="shop.html">Shop All Caps</a>' +
        "</div>";
      summaryEl.innerHTML = "";
      return;
    }

    itemsEl.innerHTML =
      '<h3>Items (' + SC.cartCount() + ")</h3>" +
      lines.map(function (l) {
        var p = l.product;
        return (
          '<div class="cart-row">' +
            '<a href="product.html?id=' + encodeURIComponent(p.id) + '"><img src="' + p.image + '" alt="' + p.name + '"></a>' +
            "<div>" +
              '<a class="cart-row__name" href="product.html?id=' + encodeURIComponent(p.id) + '">' + p.name + "</a>" +
              '<div class="cart-row__sub">Size ' + SC.fmtSize(p.size) + " · " + (p.colorway || "Signature") + "</div>" +
              '<div class="qty">' +
                '<button data-cart-dec="' + p.id + '" aria-label="Decrease quantity of ' + p.name + '">−</button>' +
                "<span>" + l.qty + "</span>" +
                '<button data-cart-inc="' + p.id + '" aria-label="Increase quantity of ' + p.name + '">+</button>' +
              "</div>" +
              '<button class="cart-line__rm" data-cart-rm="' + p.id + '" style="margin-top:8px">Remove</button>' +
            "</div>" +
            '<div class="cart-row__side">' +
              '<div class="cart-row__price">' + SC.money(l.lineTotal) + "</div>" +
              '<div class="note">' + SC.money(p.price) + " × " + l.qty + "</div>" +
            "</div>" +
          "</div>"
        );
      }).join("") +
      '<div class="flex-between" style="margin-top:22px">' +
        '<a class="link-gold" href="shop.html">← Continue shopping</a>' +
        '<button class="mini-btn mini-btn--danger" id="js-clear-cart">Empty cart</button>' +
      "</div>";

    var sub = SC.cartSubtotal();
    var fee = Number(s.deliveryFee || 0);
    summaryEl.innerHTML =
      "<h3>Order Summary</h3>" +
      '<div class="totals">' +
        '<div class="totals__row"><span>Subtotal</span><span>' + SC.money(sub) + "</span></div>" +
        '<div class="totals__row"><span>Delivery</span><span>' + (fee > 0 ? SC.money(fee) : "Free") + "</span></div>" +
        '<div class="totals__row"><span>Items</span><span>' + SC.cartCount() + "</span></div>" +
        '<div class="totals__row totals__row--grand"><span>Total</span><span>' + SC.money(sub + fee) + "</span></div>" +
      "</div>" +
      '<div class="form-group"><label class="lbl" for="js-cart-name">Your name (for WhatsApp order)</label>' +
        '<input type="text" id="js-cart-name" placeholder="e.g. Ibrahim Abdulkarim" autocomplete="name"></div>' +
      '<a class="btn btn--gold btn--block" href="checkout.html" style="margin-bottom:10px">Proceed to Checkout</a>' +
      '<button class="btn btn--wa btn--block" id="js-cart-wa">Order All on WhatsApp</button>' +
      '<p class="note" style="margin:16px 0 0">Secure checkout · Bank transfer or cash on delivery · 7-day exchange on unworn caps.</p>';

    document.getElementById("js-clear-cart").addEventListener("click", function () {
      if (confirm("Remove all items from your cart?")) { SC.clearCart(); UI.toast("Cart emptied"); }
    });

    var nameField = document.getElementById("js-cart-name");
    try {
      var saved = localStorage.getItem("sc_customer_name");
      if (saved && nameField && !nameField.value) nameField.value = saved;
    } catch (e) {}

    var waBtn = document.getElementById("js-cart-wa");
    waBtn.addEventListener("click", function () {
      var name = (document.getElementById("js-cart-name").value || "").trim();
      if (!name) {
        UI.toast("Please enter your name for the WhatsApp order", "error");
        document.getElementById("js-cart-name").focus();
        return;
      }
      var items = lines.map(function (l) {
        return { name: l.product.name, size: l.product.size, qty: l.qty, price: l.product.price };
      });
      window.open(SC.whatsappUrl({ name: name, items: items, total: sub + fee }), "_blank");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    document.addEventListener("sc:cart-changed", render);
  });
})();
