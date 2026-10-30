/* SALEEM CAPS — contact page */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".js-wa-link").forEach(function (a) {
      a.href = SC.whatsappUrl("Hello SALEEM CAPS, I would like to make an enquiry about your traditional embroidered caps.");
    });

    var form = document.getElementById("js-contact-form");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("ct-name").value.trim();
      var phone = document.getElementById("ct-phone").value.trim();
      var topic = document.getElementById("ct-topic").value;
      var msg = document.getElementById("ct-msg").value.trim();
      var err = document.getElementById("js-contact-error");

      if (!name || !phone || !msg) {
        err.textContent = "Please complete your name, phone number and message.";
        err.classList.remove("hide");
        return;
      }
      err.classList.add("hide");

      var text = "*NEW ENQUIRY — SALEEM CAPS*\n\n" +
        "*Name:* " + name + "\n" +
        "*Phone:* " + phone + "\n" +
        "*Subject:* " + topic + "\n\n" +
        "*Message:*\n" + msg;
      window.open(SC.whatsappUrl(text), "_blank");
    });

    document.querySelectorAll(".accordion__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentElement;
        var open = item.classList.contains("is-open");
        item.parentElement.querySelectorAll(".accordion__item").forEach(function (i) { i.classList.remove("is-open"); });
        if (!open) item.classList.add("is-open");
      });
    });

    var nodes = document.querySelectorAll(".reveal:not(.is-in)");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
      }, { threshold: 0.05 });
      nodes.forEach(function (n) { io.observe(n); });
    } else { nodes.forEach(function (n) { n.classList.add("is-in"); }); }
  });
})();
