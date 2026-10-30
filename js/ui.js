/* =====================================================================
   SALEEM CAPS — shared UI: header, footer, cart drawer, toasts, cards
   ===================================================================== */
(function () {
  "use strict";

  var ICON = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 7h12l-1.2 12.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z"/><path d="M9 7V5.5a3 3 0 0 1 6 0V7"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.83c0 1.94.5 3.75 1.5 5.36L2 22l4.94-1.63a9.9 9.9 0 0 0 5.1 1.4h.01c5.43 0 9.84-4.4 9.84-9.83C21.89 6.4 17.48 2 12.04 2Zm0 17.97a8.1 8.1 0 0 1-4.14-1.14l-.3-.18-3.07 1.01 1.03-3-.19-.31a8.12 8.12 0 0 1-1.25-4.35c0-4.5 3.67-8.16 8.19-8.16a8.16 8.16 0 0 1 0 16.33Zm4.5-6.11c-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.25-.63.81-.77.98-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-1.95-1.2 7.3 7.3 0 0 1-1.35-1.68c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.75-1.82-.2-.47-.4-.4-.55-.41h-.47c-.16 0-.42.06-.64.3-.22.25-.85.83-.85 2.02 0 1.19.87 2.34 1 2.5.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.45-.59 1.66-1.17.2-.57.2-1.06.14-1.16-.06-.11-.22-.17-.46-.29Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m4 12.5 5 5L20 6.5"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 7h11v10H2z"/><path d="M13 10h4.6l3.4 3.4V17h-8"/><circle cx="6" cy="18.5" r="1.8"/><circle cx="17" cy="18.5" r="1.8"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 2.5 20 6v6c0 5-3.4 8.3-8 9.5-4.6-1.2-8-4.5-8-9.5V6l8-3.5Z"/><path d="m8.6 12 2.4 2.4 4.4-4.4"/></svg>',
    needle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 20 16 8"/><path d="M14 6.5 17.5 10"/><circle cx="20" cy="4" r="1.6"/><path d="M4 20l1.5-4.5L9 19Z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 3.5h3.2l1.6 4-2 1.4a11 11 0 0 0 5.3 5.3l1.4-2 4 1.6V18c0 1.4-1.2 2.5-2.6 2.4C9.7 19.9 4.1 14.3 3.6 6.1 3.5 4.7 4.6 3.5 6 3.5Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.7c0-.9.3-1.5 1.6-1.5H17V4.5c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.5-4.3 4.3v2.8H7.5v3h2.6V21h3.4Z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.4 2.2 1.8 3.7 4 4v2.7c-1.5.1-2.9-.4-4-1.2v6.1a5.9 5.9 0 1 1-5.2-5.9v2.8a3.1 3.1 0 1 0 2.4 3V3h2.8Z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 5v14M5 12h14"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></svg>',
    dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="11"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="18" width="7" height="3"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 8 12 3.5 20.5 8v8L12 20.5 3.5 16V8Z"/><path d="M3.5 8 12 12.5 20.5 8M12 12.5v8"/></svg>',
    orders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3.5h12v17l-3-2-3 2-3-2-3 2v-17Z"/><path d="M9 8h6M9 12h6"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="8" r="3.4"/><path d="M2.5 20c0-3.4 2.9-5.6 6.5-5.6s6.5 2.2 6.5 5.6"/><path d="M16 5.2a3.4 3.4 0 0 1 0 6.5M18 14.6c2.2.6 3.7 2.3 3.7 4.6"/></svg>',
    cog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 7l2.6 1.5M17.2 15.5l2.6 1.5M4.2 17l2.6-1.5M17.2 8.5l2.6-1.5"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 16v3a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-3"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7h16M9 7V4.5h6V7M6 7l1 13h10l1-13"/></svg>'
  };

  var current = (document.body && document.body.dataset.page) || "";

  var NAV = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "shop.html", label: "Shop All Caps", key: "shop" },
    { href: "about.html", label: "About Us", key: "about" },
    { href: "contact.html", label: "Contact Us", key: "contact" }
  ];

  function headerHTML() {
    var s = SC.settings();
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '" class="' + (current === n.key ? "is-active" : "") + '">' + n.label + "</a>";
    }).join("");
    return (
      '<div class="announce"><div class="announce__track">' +
        "<span>Free delivery nationwide on orders above ₦18,000</span>" +
        "<span>Hand-embroidered in Katsina, Nigeria</span>" +
        "<span>Order instantly on WhatsApp " + s.whatsappDisplay + "</span>" +
        "<span>19 premium caps · Sizes 21½ – 24</span>" +
        "<span>Free delivery nationwide on orders above ₦18,000</span>" +
        "<span>Hand-embroidered in Katsina, Nigeria</span>" +
        "<span>Order instantly on WhatsApp " + s.whatsappDisplay + "</span>" +
        "<span>19 premium caps · Sizes 21½ – 24</span>" +
      "</div></div>" +
      '<div class="shell"><nav class="nav" aria-label="Main navigation">' +
        '<a class="brand" href="index.html" aria-label="SALEEM CAPS home">' +
          '<img class="brand__mark" src="images/logo-mark.svg" alt="SALEEM CAPS emblem" width="46" height="46">' +
          '<span class="brand__text"><span class="brand__name">SALEEM CAPS</span><span class="brand__tag">' + s.tagline + "</span></span>" +
        "</a>" +
        '<div class="nav__links">' + links + "</div>" +
        '<div class="nav__actions">' +
          '<button class="icon-btn" id="js-search-open" aria-label="Search caps" title="Search">' + ICON.search + "</button>" +
          '<a class="icon-btn nav__admin" href="admin.html" aria-label="Admin dashboard" title="Admin">' + ICON.user + "</a>" +
          '<button class="icon-btn" id="js-cart-open" aria-label="Open shopping cart" title="Cart">' + ICON.cart +
            '<span class="badge-count" id="js-cart-count" data-empty="true">0</span></button>' +
          '<button class="icon-btn nav__toggle" id="js-menu-open" aria-label="Open menu">' + ICON.menu + "</button>" +
        "</div>" +
      "</nav></div>"
    );
  }

  function footerHTML() {
    var s = SC.settings();
    return (
      '<div class="shell"><div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<a class="brand" href="index.html">' +
            '<img class="brand__mark" src="images/logo-mark.svg" alt="SALEEM CAPS emblem" width="46" height="46">' +
            '<span class="brand__text"><span class="brand__name">SALEEM CAPS</span><span class="brand__tag">' + s.tagline + "</span></span>" +
          "</a>" +
          "<p>Premium traditional Hausa embroidered caps (Kufi/Topi), hand-finished in Katsina State and delivered across Nigeria and beyond.</p>" +
          '<div class="socials">' +
            '<a href="' + SC.whatsappUrl("Hello SALEEM CAPS, I would like to know more about your caps.") + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + ICON.wa + "</a>" +
            '<a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">' + ICON.ig + "</a>" +
            '<a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">' + ICON.fb + "</a>" +
            '<a href="https://tiktok.com" target="_blank" rel="noopener" aria-label="TikTok">' + ICON.tiktok + "</a>" +
          "</div>" +
        "</div>" +
        "<div><h4>Shop</h4><ul>" +
          '<li><a href="shop.html">All Caps</a></li>' +
          '<li><a href="shop.html?sort=new">New Arrivals</a></li>' +
          '<li><a href="shop.html?size=21.5">Size 21½</a></li>' +
          '<li><a href="shop.html?size=22.5">Size 22½</a></li>' +
          '<li><a href="shop.html?size=24">Size 24</a></li>' +
          '<li><a href="cart.html">Shopping Cart</a></li>' +
        "</ul></div>" +
        "<div><h4>Company</h4><ul>" +
          '<li><a href="about.html">About Us</a></li>' +
          '<li><a href="contact.html">Contact Us</a></li>' +
          '<li><a href="checkout.html">Checkout</a></li>' +
          '<li><a href="admin.html">Admin Dashboard</a></li>' +
          '<li><a href="contact.html#size-guide">Cap Size Guide</a></li>' +
        "</ul></div>" +
        '<div><h4>Visit &amp; Contact</h4><ul class="footer-contact">' +
          "<li>" + ICON.pin + "<span>" + s.address + "</span></li>" +
          "<li>" + ICON.phone + '<a href="tel:+' + s.whatsapp + '">' + s.phone + "</a></li>" +
          "<li>" + ICON.wa + '<a href="' + SC.whatsappUrl("Hello SALEEM CAPS, I would like to place an order.") + '" target="_blank" rel="noopener">' + s.whatsappDisplay + " (WhatsApp)</a></li>" +
          "<li>" + ICON.mail + '<a href="mailto:' + s.email + '">' + s.email + "</a></li>" +
          "<li>" + ICON.check + "<span>" + s.hours + "</span></li>" +
        "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " " + s.businessName + ". All rights reserved.</span>" +
        "<span>Quality · Style · Tradition · Made in Nigeria</span>" +
        '<span><a href="admin.html">Admin</a> · <a href="contact.html">Support</a></span>' +
      "</div></div>"
    );
  }

  function drawerHTML() {
    return (
      '<div class="drawer-scrim" id="js-scrim"></div>' +
      '<aside class="cart-drawer" id="js-cart-drawer" aria-label="Shopping cart" aria-hidden="true">' +
        '<div class="cart-drawer__head"><h3>Your Cart</h3>' +
          '<button class="icon-btn" id="js-cart-close" aria-label="Close cart">' + ICON.close + "</button></div>" +
        '<div class="cart-drawer__body" id="js-cart-body"></div>' +
        '<div class="cart-drawer__foot" id="js-cart-foot"></div>' +
      "</aside>" +
      '<div class="mobile-nav" id="js-mobile-nav">' +
        '<div class="mobile-nav__panel">' +
          '<div class="flex-between" style="margin-bottom:14px">' +
            '<span class="brand__name">SALEEM CAPS</span>' +
            '<button class="icon-btn" id="js-menu-close" aria-label="Close menu">' + ICON.close + "</button>" +
          "</div>" +
          NAV.map(function (n) { return '<a class="m-link" href="' + n.href + '">' + n.label + "</a>"; }).join("") +
          '<a class="m-link" href="cart.html">Shopping Cart</a>' +
          '<a class="m-link" href="checkout.html">Checkout</a>' +
          '<a class="m-link" href="admin.html">Admin Dashboard</a>' +
          '<div class="mobile-nav__foot">' +
            '<a class="btn btn--wa btn--block" href="' + SC.whatsappUrl("Hello SALEEM CAPS, I would like to place an order.") + '" target="_blank" rel="noopener">' + ICON.wa + " Order on WhatsApp</a>" +
          "</div>" +
        "</div>" +
      "</div>" +
      '<a class="wa-fab" href="' + SC.whatsappUrl("Hello SALEEM CAPS, I would like to order a traditional embroidered cap.") + '" target="_blank" rel="noopener" aria-label="Order on WhatsApp">' +
        ICON.wa + '<span class="wa-fab__label">Order on WhatsApp</span></a>' +
      '<div class="toast-wrap" id="js-toasts" aria-live="polite"></div>'
    );
  }

  /* ------------------------------- toasts -------------------------------- */
  function toast(message, type) {
    var wrap = document.getElementById("js-toasts");
    if (!wrap) return;
    var el = document.createElement("div");
    el.className = "toast" + (type === "error" ? " toast--err" : "");
    el.innerHTML = (type === "error" ? ICON.close : ICON.check) + "<span>" + message + "</span>";
    wrap.appendChild(el);
    setTimeout(function () {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      el.style.transition = "all .3s ease";
      setTimeout(function () { el.remove(); }, 320);
    }, 2600);
  }

  /* --------------------------------- cart -------------------------------- */
  function renderCart() {
    var body = document.getElementById("js-cart-body");
    var foot = document.getElementById("js-cart-foot");
    var count = SC.cartCount();
    var badge = document.getElementById("js-cart-count");
    if (badge) {
      badge.textContent = count;
      badge.dataset.empty = count === 0 ? "true" : "false";
    }
    if (!body) return;
    var lines = SC.cartDetails();

    if (!lines.length) {
      body.innerHTML =
        '<div class="empty-state" style="border-style:solid;border-color:rgba(212,175,55,.25)">' +
          "<h3>Your cart is empty</h3>" +
          '<p style="margin-bottom:18px">Discover 19 hand-embroidered caps in sizes 21½ to 24.</p>' +
          '<a class="btn btn--gold btn--block" href="shop.html">Shop All Caps</a>' +
        "</div>";
      foot.innerHTML = "";
      return;
    }

    body.innerHTML = lines.map(function (l) {
      var p = l.product;
      return (
        '<div class="cart-line">' +
          '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
          '<div><div class="cart-line__name">' + p.name + "</div>" +
            '<div class="cart-line__meta">Size ' + SC.fmtSize(p.size) + "</div>" +
            '<div class="qty" style="margin-top:8px">' +
              '<button data-cart-dec="' + p.id + '" aria-label="Decrease quantity">−</button>' +
              "<span>" + l.qty + "</span>" +
              '<button data-cart-inc="' + p.id + '" aria-label="Increase quantity">+</button>' +
            "</div></div>" +
          '<div style="text-align:right;display:flex;flex-direction:column;justify-content:space-between">' +
            '<div class="cart-line__price">' + SC.money(l.lineTotal) + "</div>" +
            '<button class="cart-line__rm" data-cart-rm="' + p.id + '">Remove</button>' +
          "</div>" +
        "</div>"
      );
    }).join("");

    var sub = SC.cartSubtotal();
    foot.innerHTML =
      '<div class="totals">' +
        '<div class="totals__row"><span>Subtotal (' + count + " item" + (count > 1 ? "s" : "") + ")</span><span>" + SC.money(sub) + "</span></div>" +
        '<div class="totals__row"><span>Delivery</span><span>' + (SC.settings().deliveryFee > 0 ? SC.money(SC.settings().deliveryFee) : "Free") + "</span></div>" +
        '<div class="totals__row totals__row--grand"><span>Total</span><span>' + SC.money(sub + Number(SC.settings().deliveryFee || 0)) + "</span></div>" +
      "</div>" +
      '<a class="btn btn--gold btn--block" href="checkout.html" style="margin-bottom:8px">Checkout</a>' +
      '<a class="btn btn--ghost btn--block" href="cart.html">View Cart</a>';
  }

  function openCart() {
    document.getElementById("js-cart-drawer").classList.add("is-open");
    document.getElementById("js-cart-drawer").setAttribute("aria-hidden", "false");
    document.getElementById("js-scrim").classList.add("is-open");
    document.body.classList.add("no-scroll");
  }

  function closeCart() {
    document.getElementById("js-cart-drawer").classList.remove("is-open");
    document.getElementById("js-cart-drawer").setAttribute("aria-hidden", "true");
    document.getElementById("js-scrim").classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  }

  /* ---------------------------- product cards ---------------------------- */
  function cardHTML(p, opts) {
    opts = opts || {};
    var img = p.image || (p.gallery && p.gallery[0]) || "";
    var flags = "";
    if (!p.inStock) flags += '<span class="flag flag--out">Sold out</span>';
    if (p.isNew) flags += '<span class="flag flag--new">New</span>';
    if (p.featured && !p.isNew) flags += '<span class="flag">Featured</span>';
    var wa = SC.whatsappUrl({
      items: [{ name: p.name, size: p.size, qty: 1, price: p.price }],
      total: p.price,
      name: ""
    });
    return (
      '<article class="card">' +
        '<a class="card__media" href="product.html?id=' + encodeURIComponent(p.id) + '" aria-label="View ' + p.name + '">' +
          '<img src="' + img + '" alt="' + p.name + " — size " + SC.fmtSize(p.size) + ' traditional embroidered cap" loading="lazy">' +
          '<span class="card__flags">' + flags + "</span>" +
        "</a>" +
        (p.inStock
          ? '<button class="card__quick" data-add="' + p.id + '" aria-label="Add ' + p.name + ' to cart" title="Quick add">' + ICON.plus + "</button>"
          : "") +
        '<div class="card__body">' +
          '<span class="card__size">Size ' + SC.fmtSize(p.size) + " · " + (p.colorway || "Signature") + "</span>" +
          '<a class="card__name" href="product.html?id=' + encodeURIComponent(p.id) + '">' + p.name + "</a>" +
          '<div class="card__price">' + SC.money(p.price) + "<small>Per cap · Free delivery</small></div>" +
          '<div class="card__actions">' +
            (p.inStock
              ? '<button class="btn btn--gold" data-add="' + p.id + '">Add to Cart</button>'
              : '<a class="btn btn--ghost" href="product.html?id=' + encodeURIComponent(p.id) + '">View Details</a>') +
            '<a class="btn btn--wa card__wa" href="' + wa + '" target="_blank" rel="noopener" aria-label="Order ' + p.name + ' on WhatsApp" title="Order on WhatsApp">' + ICON.wa + "</a>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /* ------------------------------ bootstrap ------------------------------ */
  function mount() {
    var header = document.getElementById("js-header");
    if (header) {
      header.className = "site-header";
      header.innerHTML = headerHTML();
    }
    var footer = document.getElementById("js-footer");
    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML = footerHTML();
    }
    /* shared overlays */
    var holder = document.createElement("div");
    holder.innerHTML = drawerHTML();
    while (holder.firstChild) document.body.appendChild(holder.firstChild);

    renderCart();

    var cartOpen = document.getElementById("js-cart-open");
    if (cartOpen) cartOpen.addEventListener("click", openCart);
    var cartClose = document.getElementById("js-cart-close");
    if (cartClose) cartClose.addEventListener("click", closeCart);
    var scrim = document.getElementById("js-scrim");
    if (scrim) scrim.addEventListener("click", closeCart);

    var menuOpen = document.getElementById("js-menu-open");
    if (menuOpen) menuOpen.addEventListener("click", function () {
      document.getElementById("js-mobile-nav").classList.add("is-open");
      document.body.classList.add("no-scroll");
    });
    var menuClose = document.getElementById("js-menu-close");
    if (menuClose) menuClose.addEventListener("click", function () {
      document.getElementById("js-mobile-nav").classList.remove("is-open");
      document.body.classList.remove("no-scroll");
    });

    var searchOpen = document.getElementById("js-search-open");
    if (searchOpen) searchOpen.addEventListener("click", function () {
      window.location.href = "shop.html#search";
    });

    /* close overlays on Escape */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeCart();
        var mn = document.getElementById("js-mobile-nav");
        if (mn) mn.classList.remove("is-open");
        document.body.classList.remove("no-scroll");
      }
    });

    /* sticky header */
    var headerEl = document.getElementById("js-header");
    function onScroll() {
      if (!headerEl) return;
      headerEl.classList.toggle("is-stuck", window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* cart interactions (delegated) */
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-add],[data-cart-inc],[data-cart-dec],[data-cart-rm]");
      if (!t) return;
      if (t.dataset.add) {
        var p = SC.addToCart(t.dataset.add, 1);
        if (p) { toast(p.name + " added to cart"); openCart(); }
      } else if (t.dataset.cartInc) {
        var line = SC.cart().filter(function (l) { return l.id === t.dataset.cartInc; })[0];
        SC.setQty(t.dataset.cartInc, (line ? line.qty : 0) + 1);
      } else if (t.dataset.cartDec) {
        var line2 = SC.cart().filter(function (l) { return l.id === t.dataset.cartDec; })[0];
        SC.setQty(t.dataset.cartDec, (line2 ? line2.qty : 1) - 1);
      } else if (t.dataset.cartRm) {
        SC.removeLine(t.dataset.cartRm);
        toast("Item removed");
      }
    });

    document.addEventListener("sc:cart-changed", renderCart);
    document.addEventListener("sc:data-changed", function () { renderCart(); });

    /* reveal on scroll */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    }
    /* safety net: never leave visible content hidden */
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-in)").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.2) el.classList.add("is-in");
      });
    }, 1200);
  }

  window.UI = {
    icons: ICON,
    card: cardHTML,
    toast: toast,
    openCart: openCart,
    closeCart: closeCart,
    renderCart: renderCart
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
