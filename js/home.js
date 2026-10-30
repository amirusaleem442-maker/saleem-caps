/* SALEEM CAPS — homepage */
(function () {
  "use strict";

  function render() {
    var products = SC.products();
    var featured = products.filter(function (p) { return p.featured; }).slice(0, 8);
    if (featured.length < 4) featured = products.slice(0, 8);

    var fresh = products.filter(function (p) { return p.isNew; }).slice(0, 4);
    if (fresh.length < 4) {
      fresh = products.slice().sort(function (a, b) {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }).slice(0, 4);
    }

    var featuredEl = document.getElementById("js-featured");
    if (featuredEl) {
      featuredEl.innerHTML = featured.map(function (p, i) {
        return '<div class="reveal" style="transition-delay:' + (i % 4) * 70 + 'ms">' + UI.card(p) + "</div>";
      }).join("");
    }

    var newEl = document.getElementById("js-new");
    if (newEl) {
      newEl.innerHTML = fresh.map(function (p, i) {
        return '<div class="reveal" style="transition-delay:' + (i % 4) * 70 + 'ms">' + UI.card(p) + "</div>";
      }).join("");
    }

    var allEl = document.getElementById("js-all");
    if (allEl) {
      var list = products.slice();
      var order = window.SALEEM_SIZE_ORDER;
      list.sort(function (a, b) {
        return order.indexOf(a.size) - order.indexOf(b.size) || a.name.localeCompare(b.name);
      });
      allEl.innerHTML = list.map(function (p, i) {
        return '<div class="reveal" style="transition-delay:' + (i % 4) * 60 + 'ms">' + UI.card(p) + "</div>";
      }).join("");
    }

    var sizesEl = document.getElementById("js-sizes");
    if (sizesEl) {
      var counts = SC.sizeCounts();
      sizesEl.innerHTML = SC.sizeList().map(function (size) {
        var n = counts[size] || 0;
        return '<a class="sizecard" href="shop.html?size=' + encodeURIComponent(size) + '">' +
          "<b>" + SC.fmtSize(size) + "</b>" +
          "<span>" + n + " cap" + (n === 1 ? "" : "s") + " available</span></a>";
      }).join("");
    }

    /* re-run reveal observer for injected nodes */
    var nodes = document.querySelectorAll(".reveal:not(.is-in)");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
      nodes.forEach(function (el) { io.observe(el); });
    } else {
      nodes.forEach(function (el) { el.classList.add("is-in"); });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    document.querySelectorAll(".js-wa-hello").forEach(function (a) {
      a.href = SC.whatsappUrl("Hello SALEEM CAPS, I would like to order a traditional embroidered cap. Please assist me.");
    });
    document.addEventListener("sc:data-changed", render);
  });
})();
