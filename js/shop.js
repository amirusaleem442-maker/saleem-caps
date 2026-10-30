/* SALEEM CAPS — shop page: size filter, search, sort */
(function () {
  "use strict";

  var state = { size: "all", q: "", sort: "size" };

  function readParams() {
    var p = new URLSearchParams(window.location.search);
    if (p.get("size")) state.size = p.get("size");
    if (p.get("q")) state.q = p.get("q");
    if (p.get("sort")) state.sort = p.get("sort");
  }

  function writeParams() {
    var p = new URLSearchParams();
    if (state.size !== "all") p.set("size", state.size);
    if (state.q) p.set("q", state.q);
    if (state.sort !== "size") p.set("sort", state.sort);
    var qs = p.toString();
    history.replaceState(null, "", qs ? "?" + qs : window.location.pathname);
  }

  function chips() {
    var el = document.getElementById("js-size-chips");
    var counts = SC.sizeCounts();
    var total = SC.products().length;
    var html = '<button class="chip' + (state.size === "all" ? " is-active" : "") + '" data-size="all">All<small>' + total + "</small></button>";
    html += SC.sizeList().map(function (s) {
      return '<button class="chip' + (state.size === s ? " is-active" : "") + '" data-size="' + s + '">Size ' +
        SC.fmtSize(s) + "<small>" + (counts[s] || 0) + "</small></button>";
    }).join("");
    el.innerHTML = html;
  }

  function filtered() {
    var list = SC.products().slice();
    if (state.size !== "all") list = list.filter(function (p) { return p.size === state.size; });
    if (state.q) {
      var q = state.q.toLowerCase().trim();
      list = list.filter(function (p) {
        return (p.name + " " + p.size + " " + (p.colorway || "") + " " + (p.sku || "") + " " + (p.description || ""))
          .toLowerCase().indexOf(q) > -1;
      });
    }
    var order = window.SALEEM_SIZE_ORDER;
    switch (state.sort) {
      case "new":
        list.sort(function (a, b) {
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) ||
            new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
        break;
      case "name":
        list.sort(function (a, b) { return a.name.localeCompare(b.name); });
        break;
      case "price-asc":
        list.sort(function (a, b) { return a.price - b.price; });
        break;
      case "price-desc":
        list.sort(function (a, b) { return b.price - a.price; });
        break;
      default:
        list.sort(function (a, b) {
          return order.indexOf(a.size) - order.indexOf(b.size) || a.name.localeCompare(b.name);
        });
    }
    return list;
  }

  function render() {
    chips();
    var list = filtered();
    var grid = document.getElementById("js-grid");
    var empty = document.getElementById("js-empty");
    grid.innerHTML = list.map(function (p) { return UI.card(p); }).join("");
    empty.classList.toggle("hide", list.length > 0);
    grid.classList.toggle("hide", list.length === 0);

    var label = state.size === "all" ? "All sizes" : "Size " + SC.fmtSize(state.size);
    document.getElementById("js-result-count").innerHTML =
      "<b>" + list.length + "</b> cap" + (list.length === 1 ? "" : "s") + " · " + label +
      (state.q ? ' · search “' + state.q + '”' : "") + " · <b>₦18,000</b> each";

    var search = document.getElementById("js-search");
    if (search.value !== state.q) search.value = state.q;
    var sort = document.getElementById("js-sort");
    if (sort.value !== state.sort) sort.value = state.sort;
  }

  function reset() {
    state = { size: "all", q: "", sort: "size" };
    writeParams();
    render();
  }

  document.addEventListener("DOMContentLoaded", function () {
    readParams();
    render();

    document.getElementById("js-size-chips").addEventListener("click", function (e) {
      var chip = e.target.closest("[data-size]");
      if (!chip) return;
      state.size = chip.dataset.size;
      writeParams();
      render();
    });

    var search = document.getElementById("js-search");
    var timer = null;
    search.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        state.q = search.value;
        writeParams();
        render();
      }, 160);
    });

    document.getElementById("js-sort").addEventListener("change", function (e) {
      state.sort = e.target.value;
      writeParams();
      render();
    });

    document.getElementById("js-clear").addEventListener("click", reset);
    document.getElementById("js-empty-reset").addEventListener("click", reset);

    if (window.location.hash === "#search") {
      setTimeout(function () { search.focus(); }, 250);
    }

    document.querySelectorAll(".js-wa-help").forEach(function (a) {
      a.href = SC.whatsappUrl("Hello SALEEM CAPS, I need help choosing a cap size and design. Please advise me.");
    });

    document.addEventListener("sc:data-changed", render);
  });
})();
