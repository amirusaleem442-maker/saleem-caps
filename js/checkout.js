/* SALEEM CAPS — checkout: validate, record order, hand off to WhatsApp */
(function () {
  "use strict";

  var lastOrder = null;

  function renderSummary() {
    var lines = SC.cartDetails();
    var s = SC.settings();
    var wrap = document.getElementById("js-summary");

    if (!lines.length) {
      document.getElementById("js-checkout-wrap").classList.add("hide");
      document.getElementById("js-checkout-empty").classList.remove("hide");
      return;
    }
    document.getElementById("js-checkout-wrap").classList.remove("hide");
    document.getElementById("js-checkout-empty").classList.add("hide");

    var sub = SC.cartSubtotal();
    var fee = Number(s.deliveryFee || 0);

    wrap.innerHTML =
      "<h3>Your Order</h3>" +
      lines.map(function (l) {
        return '<div class="summary-line">' +
          '<img src="' + l.product.image + '" alt="' + l.product.name + '">' +
          "<div><div class=\"summary-line__name\">" + l.product.name + "</div>" +
            '<div class="summary-line__meta">Size ' + SC.fmtSize(l.product.size) + " · Qty " + l.qty + "</div></div>" +
          '<div class="summary-line__amt">' + SC.money(l.lineTotal) + "</div>" +
        "</div>";
      }).join("") +
      '<div class="totals" style="margin-top:18px">' +
        '<div class="totals__row"><span>Subtotal</span><span>' + SC.money(sub) + "</span></div>" +
        '<div class="totals__row"><span>Delivery</span><span>' + (fee > 0 ? SC.money(fee) : "Free") + "</span></div>" +
        '<div class="totals__row totals__row--grand"><span>Total</span><span>' + SC.money(sub + fee) + "</span></div>" +
      "</div>" +
      '<div style="border:1px solid var(--line);padding:14px;margin-top:14px;display:flex;gap:12px;align-items:flex-start">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.4" style="width:22px;height:22px;flex:none"><path d="M12 2.5 20 6v6c0 5-3.4 8.3-8 9.5-4.6-1.2-8-4.5-8-9.5V6l8-3.5Z"/><path d="m8.6 12 2.4 2.4 4.4-4.4"/></svg>' +
        '<p class="note" style="margin:0">Every cap is inspected before dispatch. 7-day exchange on unworn caps. Questions? WhatsApp ' + s.whatsappDisplay + ".</p>" +
      "</div>" +
      '<a class="link-gold" href="cart.html" style="margin-top:18px">← Edit cart</a>';
  }

  function showError(msg) {
    var el = document.getElementById("js-form-error");
    el.textContent = msg;
    el.classList.remove("hide");
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function collect() {
    return {
      name: document.getElementById("co-name").value.trim(),
      phone: document.getElementById("co-phone").value.trim(),
      email: document.getElementById("co-email").value.trim(),
      address: document.getElementById("co-address").value.trim(),
      city: document.getElementById("co-city").value.trim(),
      state: document.getElementById("co-state").value,
      note: document.getElementById("co-note").value.trim(),
      payment: (document.querySelector('input[name="payment"]:checked') || {}).value || "Bank transfer"
    };
  }

  function validate(c) {
    if (!c.name) return "Please enter your full name.";
    if (!c.phone || c.phone.replace(/[^0-9]/g, "").length < 10) return "Please enter a valid phone / WhatsApp number.";
    if (c.email && !/^\S+@\S+\.\S+$/.test(c.email)) return "That email address does not look right.";
    if (!c.address) return "Please enter your delivery address.";
    if (!c.city) return "Please enter your city or town.";
    if (!c.state) return "Please select your state.";
    return "";
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderSummary();
    try {
      var savedName = localStorage.getItem("sc_customer_name");
      if (savedName) document.getElementById("co-name").value = savedName;
    } catch (e) {}

    document.querySelectorAll(".pay-option").forEach(function (el) {
      el.addEventListener("click", function () {
        document.querySelectorAll(".pay-option").forEach(function (o) { o.classList.remove("is-active"); });
        el.classList.add("is-active");
        var radio = el.querySelector("input");
        if (radio) radio.checked = true;
      });
    });

    document.getElementById("js-checkout-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var lines = SC.cartDetails();
      if (!lines.length) { renderSummary(); return; }

      var c = collect();
      var err = validate(c);
      if (err) { showError(err); return; }
      document.getElementById("js-form-error").classList.add("hide");

      var s = SC.settings();
      var fee = Number(s.deliveryFee || 0);
      var sub = SC.cartSubtotal();
      var items = lines.map(function (l) {
        return { id: l.product.id, name: l.product.name, size: l.product.size, qty: l.qty, price: l.product.price };
      });

      var order = SC.createOrder({
        channel: "checkout",
        customer: c,
        items: items,
        subtotal: sub,
        deliveryFee: fee,
        total: sub + fee,
        note: (c.note ? c.note + " | " : "") + "Payment: " + c.payment
      });
      lastOrder = order;
      try { localStorage.setItem("sc_customer_name", c.name); } catch (e) {}

      var waUrl = SC.whatsappUrl({
        orderNo: order.id,
        name: c.name,
        phone: c.phone,
        address: [c.address, c.city, c.state].filter(Boolean).join(", "),
        items: items,
        total: sub + fee,
        note: (c.note ? c.note + " | " : "") + "Payment: " + c.payment
      });

      document.getElementById("js-success-name").textContent = c.name.split(" ")[0];
      document.getElementById("js-success-no").textContent = order.id;
      document.getElementById("js-success-wa").href = waUrl;
      document.getElementById("js-success").classList.add("is-open");
      document.body.classList.add("no-scroll");

      window.open(waUrl, "_blank");
      SC.clearCart();
    });

    document.getElementById("js-success").addEventListener("click", function (e) {
      if (e.target.id === "js-success") {
        document.getElementById("js-success").classList.remove("is-open");
        document.body.classList.remove("no-scroll");
      }
    });
  });
})();
