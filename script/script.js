var products = [
  { name: "Cotton Milk Yarn, 100 g", category: "yarn", image: "../images/yarn.jpg", price: 45000 },
  { name: "Mixed Glass Beads", category: "beads", image: "../images/beads.jpg", price: 35000 },
  { name: "Soy Wax, 500 g", category: "candles", image: "../images/candles.jpg", price: 120000 },
  { name: "Sewing Fabric", category: "fabric", image: "../images/fabric.jpg", price: 60000 },
  { name: "Soft Mohair Yarn", category: "yarn", image: "../images/yarn.jpg", price: 55000 },
  { name: "Mini Silver Charm", category: "beads", image: "../images/beads.jpg", price: 25000 },
  { name: "Lavender Fragrance Oil", category: "candles", image: "../images/candles.jpg", price: 85000 },
  { name: "Polyester Sewing Fabric", category: "fabric", image: "../images/fabric.jpg", price: 95000 },
  { name: "Handmade Leather Craft Kit", category: "leather", image: "../images/leather.jpg", price: 110000 },
  { name: "Air-Dry Pottery Clay", category: "pottery", image: "../images/pottery.jpg", price: 75000 },
  { name: "Embroidery Hoop Set", category: "embroidery", image: "../images/embroidery.jpg", price: 50000 },
  { name: "Olive Oil Handmade Soap", category: "soap", image: "../images/soap.jpg", price: 40000 }
];
var defaultCart = [[0, 2], [2, 1], [3, 1]];
var savedCart = localStorage.getItem("hanmade-cart");
var cart = savedCart === null ? defaultCart : JSON.parse(savedCart);
if (!Array.isArray(cart) || cart.some(function (item) {
  return !Array.isArray(item) || !Number.isInteger(item[0]) || !products[item[0]] || !Number.isInteger(item[1]) || item[1] < 1;
})) {
  throw new Error("Saved cart data is invalid. Clear the hanmade-cart browser storage to continue.");
}

function mountSiteShell(pageName) {
  var top = document.querySelector(".top");
  var header = document.querySelector(".hd");
  var footer = document.querySelector("#ft");
  var activePage = {
    home: "index.html",
    shop: "shop-grid.html",
    detail: "shop-details.html",
    cart: "shoping-cart.html",
    checkout: "checkout.html",
    blog: "blog-details.html",
    contact: "contact.html"
  }[pageName] || "index.html";

  top.innerHTML = '<div class="w topbar"><div class="topbar-info"><a href="mailto:hello@hanmade.vn"><span aria-hidden="true">✉</span> hello@hanmade.vn</a><span class="top-divider"></span><span>Free shipping on orders over 500,000 VND</span></div><div class="topbar-actions"><div class="social-links" aria-label="Social media"><a href="#ft" aria-label="Facebook">f</a><a href="#ft" aria-label="Instagram">◎</a><a href="#ft" aria-label="Twitter">♥</a><a href="#ft" aria-label="Pinterest">p</a></div><span class="top-divider"></span><label class="language-choice"><span aria-hidden="true">🇺🇸</span><select aria-label="Language"><option>English</option></select></label><span class="top-divider"></span><a class="login-link" href="contact.html"><span aria-hidden="true">♟</span> Log in</a></div></div>';

  header.innerHTML = '<div class="w header-main"><a class="logo" href="index.html" aria-label="Hanmade home">HANMADE<span class="logo-leaf" aria-hidden="true">◆</span></a>' +
    '<button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="main-nav"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>' +
    '<nav id="main-nav" aria-label="Main navigation"><ul>' +
    '<li><a class="' + (activePage === "index.html" ? "on" : "") + '" href="index.html">Home</a></li>' +
    '<li><a class="' + (activePage === "shop-grid.html" ? "on" : "") + '" href="shop-grid.html">Shop</a></li>' +
    '<li><a class="' + (activePage === "shop-details.html" || activePage === "shoping-cart.html" || activePage === "checkout.html" ? "on" : "") + '" href="shop-details.html">Pages</a><ul class="dd"><li><a href="shop-details.html">Product Details</a></li><li><a href="shoping-cart.html">Shopping Cart</a></li><li><a href="checkout.html">Checkout</a></li><li><a href="blog-details.html">Blog Article</a></li></ul></li>' +
    '<li><a class="' + (activePage === "blog-details.html" ? "on" : "") + '" href="blog-details.html">Blog</a></li>' +
    '<li><a class="' + (activePage === "contact.html" ? "on" : "") + '" href="contact.html">Contact</a></li></ul></nav>' +
    '<div class="cart"><a href="shoping-cart.html" aria-label="Wishlist, 1 item"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg><b>1</b></a><a href="shoping-cart.html" aria-label="Shopping cart"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 8H6"/><circle cx="10" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></svg><b id="cn">4</b></a><a class="cart-total" href="shoping-cart.html"><span>item:</span> <strong id="ct">270,000 VND</strong></a></div></div>' +
    '<div class="w header-tools"><div class="department-picker"><button class="department-toggle" type="button" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>All departments<span aria-hidden="true">⌄</span></button><ul class="department-menu">' +
    '<li><a href="shop-grid.html?category=yarn">Yarn &amp; Thread</a></li><li><a href="shop-grid.html?category=beads">Beads &amp; Charms</a></li><li><a href="shop-grid.html?category=candles">Candle Wax &amp; Fragrance</a></li><li><a href="shop-grid.html?category=fabric">Fabric &amp; Sewing Supplies</a></li><li><a href="shop-grid.html?category=leather">Leather Craft</a></li><li><a href="shop-grid.html?category=pottery">Clay &amp; Pottery</a></li><li><a href="shop-grid.html?category=soap">Handmade Soap</a></li></ul></div>' +
    '<form class="search-form header-search"><label for="header-search">All Categories</label><input id="header-search" name="search" placeholder="What do you need?"><button type="submit">Search</button></form>' +
    '<a class="header-phone" href="tel:+65901188888"><span class="phone-icon" aria-hidden="true">☎</span><span><strong>+65 9011 8888</strong><small>Support 24/7</small></span></a></div>';

  document.body.classList.toggle("home-page", pageName === "home");
  footer.innerHTML = '<div class="w footer-content"><div class="footer-main">' +
    '<section class="footer-brand"><a class="logo" href="index.html">HANMADE<span class="logo-leaf" aria-hidden="true">◆</span></a><ul class="contact-details"><li>Address: 12 Nguyen Hue Street, District 1, Ho Chi Minh City</li><li>Phone: +65 9011 8888</li><li>Email: hello@hanmade.vn</li></ul></section>' +
    '<section class="footer-links"><h6>Useful Links</h6><div class="footer-link-columns"><ul><li><a href="contact.html">About Us</a></li><li><a href="shop-grid.html">About Our Shop</a></li><li><a href="contact.html">Secure Shopping</a></li><li><a href="contact.html">Delivery Information</a></li><li><a href="contact.html">Privacy Policy</a></li><li><a href="contact.html">Our Sitemap</a></li></ul><ul><li><a href="contact.html">Who We Are</a></li><li><a href="contact.html">Our Services</a></li><li><a href="blog-details.html">Projects</a></li><li><a href="contact.html">Contact</a></li><li><a href="blog-details.html">Innovation</a></li><li><a href="blog-details.html">Testimonials</a></li></ul></div></section>' +
    '<section class="footer-newsletter"><h6>Join Our Newsletter</h6><p>Get email updates about our latest products and special offers.</p><form class="nl"><input type="email" placeholder="Enter your email" aria-label="Email address"><button class="btn">Subscribe</button></form><div class="footer-socials" aria-label="Social media"><a href="#ft" aria-label="Facebook">f</a><a href="#ft" aria-label="Instagram">◎</a><a href="#ft" aria-label="Twitter">♥</a><a href="#ft" aria-label="Pinterest">p</a></div></section></div>' +
    '<div class="footer-bottom"><p>Copyright © 2026 Hanmade. All rights reserved.</p><div class="payment-methods" aria-label="Accepted payment methods"><span>VISA</span><span>Mastercard</span><span>PayPal</span><span>AMEX</span></div></div></div>';
}

var formatPrice = function (amount) {
  return new Intl.NumberFormat("en-US").format(amount) + " VND";
};
var getTotal = function () {
  return cart.reduce(function (total, item) {
    return total + products[item[0]].price * item[1];
  }, 0);
};
function syncCart() {
  var count = cart.reduce(function (total, item) {
    return total + item[1];
  }, 0);
  document.querySelectorAll("#cn").forEach(function (element) {
    element.textContent = count;
  });
  document.querySelectorAll("#ct").forEach(function (element) {
    element.textContent = formatPrice(getTotal());
  });
  localStorage.setItem("hanmade-cart", JSON.stringify(cart));
}
function addToCart(index, quantity) {
  var item = cart.find(function (entry) {
    return entry[0] === index;
  });
  if (item) item[1] += quantity;
  else cart.push([index, quantity]);
  syncCart();
}
function icon(name) {
  var paths = {
    favorite: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
    compare: '<path d="M16 3l4 4-4 4M20 7H4m4 14-4-4 4-4m-4 4h16"/>',
    cart: '<path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 8H6"/><circle cx="10" cy="21" r="1"/><circle cx="18" cy="21" r="1"/>'
  };
  return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + paths[name] + "</svg>";
}
function productCard(product, index) {
  return '<article class="pc"><div class="im"><img src="' + product.image + '" alt="' + product.name + '" loading="lazy"><div class="ac">' +
    '<button type="button" title="Add to wishlist" aria-label="Add ' + product.name + ' to wishlist">' + icon("favorite") + '</button>' +
    '<button type="button" title="Compare product" aria-label="Compare ' + product.name + '">' + icon("compare") + '</button>' +
    '<button type="button" title="Add to cart" aria-label="Add ' + product.name + ' to cart" data-cart-add="' + index + '">' + icon("cart") + '</button>' +
    '</div></div><div class="tx"><h6><a href="shop-details.html?id=' + index + '">' + product.name + '</a></h6><h5>' + formatPrice(product.price) + '</h5></div></article>';
}
function drawProducts(container, category, query, maxPrice) {
  var filtered = products.filter(function (product) {
    var matchesCategory = category === "all" || product.category === category;
    var matchesQuery = !query || product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    return matchesCategory && matchesQuery && product.price <= maxPrice * 1000;
  });
  container.innerHTML = filtered.map(function (product) {
    return productCard(product, products.indexOf(product));
  }).join("");
  return filtered.length;
}
function productListsHtml() {
  var lists = [["Newest Arrivals", 0], ["Top Rated", 3], ["Most Viewed", 5]];
  return lists.map(function (list) {
    return '<div><h4>' + list[0] + '</h4>' + [0, 1, 2].map(function (offset) {
      var index = (list[1] + offset) % products.length;
      var product = products[index];
      return '<a class="li" href="shop-details.html?id=' + index + '"><img src="' + product.image + '" alt="" loading="lazy"><div><h6>' + product.name + '</h6><span>' + formatPrice(product.price) + '</span></div></a>';
    }).join("") + "</div>";
  }).join("");
}
function renderHome() {
  var tabs = document.getElementById("tabs");
  var grid = document.getElementById("grid");
  if (!tabs || !grid) return;
  document.getElementById("lists").innerHTML = productListsHtml();
  drawProducts(grid, "all", "", 120);
  tabs.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-f]");
    if (!button) return;
    tabs.querySelectorAll("button").forEach(function (tab) {
      tab.classList.toggle("on", tab === button);
    });
    drawProducts(grid, button.dataset.f, "", 120);
  });
}

function breadcrumb(title) {
  return '<div class="bc"><h2>' + title + '</h2><p><a href="index.html">Home</a> &rsaquo; ' + title + '</p></div>';
}
function cartRows() {
  return cart.map(function (item, index) {
    var product = products[item[0]];
    return '<tr><td><img class="table-photo" src="' + product.image + '" alt="' + product.name + '">' +
      '<a href="shop-details.html?id=' + item[0] + '">' + product.name + '</a></td><td>' + formatPrice(product.price) +
      '</td><td><div class="quantity-control"><button type="button" data-quantity="-1" data-index="' + index + '" aria-label="Decrease quantity">−</button>' +
      '<input type="number" min="1" value="' + item[1] + '" data-q="' + index + '" aria-label="Quantity for ' + product.name + '">' +
      '<button type="button" data-quantity="1" data-index="' + index + '" aria-label="Increase quantity">+</button></div></td><td>' +
      formatPrice(product.price * item[1]) + '</td><td><button class="remove-item" type="button" data-rm="' + index + '" aria-label="Remove ' + product.name + '">Remove</button></td></tr>';
  }).join("");
}
function renderShop() {
  var page = document.getElementById("page-content");
  page.innerHTML = breadcrumb("Shop") +
    '<div class="w sh"><aside><h4>Categories</h4><label class="sr-only" for="shop-category">Filter by category</label>' +
    '<select id="shop-category"><option value="all">All categories</option><option value="yarn">Yarn &amp; Thread</option><option value="beads">Beads &amp; Charms</option><option value="candles">Candle Making</option><option value="fabric">Fabric &amp; Sewing</option><option value="leather">Leather Craft</option><option value="pottery">Clay &amp; Pottery</option><option value="embroidery">Embroidery &amp; Needlework</option><option value="soap">Handmade Soap</option></select>' +
    '<h4 class="filter-heading">Maximum Price</h4><label for="max-price">Up to <span id="price-value">120,000 VND</span></label>' +
    '<input id="max-price" type="range" min="25" max="120" value="120"><form class="shop-search"><input name="q" placeholder="Search products"><button class="btn">Search</button></form></aside>' +
    '<div><div class="bar" id="result-count"></div><div class="grid result-grid" id="shop-grid"></div></div></div>';
  var category = new URLSearchParams(location.search).get("category") || "all";
  var query = new URLSearchParams(location.search).get("q") || "";
  var select = document.getElementById("shop-category");
  if (Array.prototype.some.call(select.options, function (option) { return option.value === category; })) select.value = category;
  var range = document.getElementById("max-price");
  var priceValue = document.getElementById("price-value");
  var grid = document.getElementById("shop-grid");
  function update() {
    priceValue.textContent = formatPrice(Number(range.value) * 1000);
    var count = drawProducts(grid, select.value, query, Number(range.value));
    document.getElementById("result-count").textContent = "Showing " + count + " of " + products.length + " products";
  }
  select.addEventListener("change", update);
  range.addEventListener("input", update);
  update();
}
function renderDetail() {
  var index = Number(new URLSearchParams(location.search).get("id") || 0);
  if (!Number.isInteger(index) || !products[index]) index = 0;
  var product = products[index];
  document.getElementById("page-content").innerHTML = breadcrumb("Product Details") +
    '<section class="w dt"><div class="big"><img src="' + product.image + '" alt="' + product.name + '"></div><div><h2>' + product.name +
    '</h2><p class="st">Rated 4.8 out of 5 (18 reviews)</p><h3 class="pr">' + formatPrice(product.price) +
    '</h3><p>Carefully selected craft supplies for your next creative project.</p><div class="qr"><div class="quantity-control">' +
    '<button type="button" data-detail-quantity="-1" aria-label="Decrease quantity">−</button><input type="number" id="detail-quantity" min="1" value="1" aria-label="Quantity">' +
    '<button type="button" data-detail-quantity="1" aria-label="Increase quantity">+</button></div>' +
    '<button class="btn" type="button" data-detail-add="' + index + '">Add to Cart</button></div><ul class="in">' +
    '<li><b>Availability:</b> In stock</li><li><b>Shipping:</b> 1-3 business days</li><li><b>Product:</b> ' + product.name +
    '</li></ul></div></section><section class="w"><div class="sec"><h2>Related Products</h2></div><div class="grid">' +
    products.map(function (related, relatedIndex) {
      return relatedIndex === index ? "" : productCard(related, relatedIndex);
    }).join("") + '</div></section>';
}
function renderCart() {
  document.getElementById("page-content").innerHTML = breadcrumb("Shopping Cart") +
    '<div class="w"><div class="ov"><table><thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th></th></tr></thead><tbody>' +
    (cart.length ? cartRows() : '<tr><td colspan="5">Your cart is empty. <a href="shop-grid.html">Continue shopping</a>.</td></tr>') +
    '</tbody></table></div><div class="cart-summary-row"><a class="btn" href="shop-grid.html">Continue Shopping</a><div class="box"><h4>Cart Total</h4><p>Total: <b>' +
    formatPrice(getTotal()) + '</b></p><a class="btn" href="checkout.html">Proceed to Checkout</a></div></div></div>';
}
function renderCheckout() {
  var items = cart.map(function (item) {
    var product = products[item[0]];
    return '<li>' + product.name + ' x ' + item[1] + '<span>' + formatPrice(product.price * item[1]) + '</span></li>';
  }).join("");
  document.getElementById("page-content").innerHTML = breadcrumb("Checkout") +
    '<form class="w ck checkout-form"><section><h4>Billing Details</h4><div class="fm">' +
    '<input required name="firstName" placeholder="First name"><input required name="lastName" placeholder="Last name">' +
    '<input class="s2" required name="address" placeholder="Street address"><input required name="city" placeholder="City">' +
    '<input name="state" placeholder="State / Province"><input required type="tel" name="phone" placeholder="Phone number">' +
    '<input required type="email" name="email" placeholder="Email address"><textarea class="s2" name="notes" placeholder="Order notes"></textarea></div></section>' +
    '<section class="box"><h4>Your Order</h4><ul class="os">' + items + '</ul><p class="tt">Total: <b>' + formatPrice(getTotal()) +
    '</b></p><label><input type="radio" name="payment" value="cod" checked> Cash on delivery</label><br>' +
    '<label><input type="radio" name="payment" value="bank"> Bank transfer</label><br><br><button class="btn">Place Order</button>' +
    '<p class="form-message" role="status"></p></section></form>';
}
function renderBlog() {
  document.getElementById("page-content").innerHTML = breadcrumb("Blog Article") +
    '<div class="w bd"><aside><h4>Recent Posts</h4><a class="li" href="blog-details.html"><img src="../images/yarn.jpg" alt=""><h6>How to Start Crocheting</h6></a>' +
    '<a class="li" href="blog-details.html"><img src="../images/candles.jpg" alt=""><h6>6 Steps to Make Scented Candles</h6></a>' +
    '<a class="li" href="blog-details.html"><img src="../images/beads.jpg" alt=""><h6>How to Create a Beaded Bracelet</h6></a></aside>' +
    '<article><img class="article-photo" src="../images/yarn.jpg" alt="Colorful yarn for crochet"><h2>How to Start Crocheting</h2>' +
    '<p class="mu">May 4, 2026 · 5 comments</p><p>Start with medium-weight cotton yarn and a 3-4 mm crochet hook for easier stitch control. Practice chain and single crochet stitches before beginning a full project.</p>' +
    '<p>Choose a light color so you can see each stitch clearly, and keep your tension even. After a little practice, you will be ready to make your first scarf or keychain.</p></article></div>';
}
function renderContact() {
  document.getElementById("page-content").innerHTML = breadcrumb("Contact Us") +
    '<div class="w"><div class="cc"><div><b>Phone</b><br>0901 188 888</div><div><b>Address</b><br>12 Nguyen Hue Street, District 1, Ho Chi Minh City</div>' +
    '<div><b>Opening Hours</b><br>8:00 AM - 8:00 PM</div><div><b>Email</b><br>hello@hanmade.vn</div></div>' +
    '<div class="sec contact-heading"><h2>Send Us a Message</h2></div><form class="fm contact-form"><input required name="name" placeholder="Your name">' +
    '<input required type="email" name="email" placeholder="Your email"><textarea class="s2" required name="message" placeholder="Your message"></textarea>' +
    '<button class="btn s2">Send Message</button><p class="form-message s2" role="status"></p></form></div>';
}
var renderers = {
  shop: renderShop,
  detail: renderDetail,
  cart: renderCart,
  checkout: renderCheckout,
  blog: renderBlog,
  contact: renderContact
};
var pageName = document.body.dataset.page || "home";
mountSiteShell(pageName);
if (pageName && renderers[pageName]) renderers[pageName]();
else if (pageName !== "home") throw new Error("Unknown page type: " + pageName);
renderHome();
syncCart();

document.querySelectorAll(".search-form").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var query = new FormData(form).get("search").trim();
    location.href = "shop-grid.html?q=" + encodeURIComponent(query);
  });
});
document.querySelectorAll(".shop-search").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var query = new FormData(form).get("q").trim();
    location.href = "shop-grid.html?q=" + encodeURIComponent(query);
  });
});
document.querySelectorAll(".nl").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });
});
document.querySelectorAll(".checkout-form,.contact-form").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var message = form.querySelector(".form-message");
    message.textContent = form.classList.contains("checkout-form")
      ? "Thank you! Your order has been received."
      : "Thank you! Your message has been received.";
  });
});
document.addEventListener("click", function (event) {
  var homeDepartmentToggle = event.target.closest(".home-department-toggle");
  if (homeDepartmentToggle) {
    var departmentSidebar = homeDepartmentToggle.closest(".dep");
    var isSidebarOpen = homeDepartmentToggle.getAttribute("aria-expanded") === "true";
    homeDepartmentToggle.setAttribute("aria-expanded", String(!isSidebarOpen));
    homeDepartmentToggle.setAttribute("aria-label", isSidebarOpen ? "Expand departments" : "Collapse departments");
    departmentSidebar.classList.toggle("dep-collapsed", isSidebarOpen);
    return;
  }
  var departmentToggle = event.target.closest(".department-toggle");
  if (departmentToggle) {
    var departmentMenu = departmentToggle.nextElementSibling;
    var isOpen = departmentToggle.getAttribute("aria-expanded") === "true";
    departmentToggle.setAttribute("aria-expanded", String(!isOpen));
    departmentMenu.classList.toggle("department-menu-open", !isOpen);
    return;
  }
  var openDepartmentMenu = document.querySelector(".department-toggle[aria-expanded='true']");
  if (openDepartmentMenu && !event.target.closest(".department-picker")) {
    openDepartmentMenu.setAttribute("aria-expanded", "false");
    openDepartmentMenu.nextElementSibling.classList.remove("department-menu-open");
  }
  var cartButton = event.target.closest("[data-cart-add]");
  if (cartButton) {
    addToCart(Number(cartButton.dataset.cartAdd), 1);
    return;
  }
  var menuButton = event.target.closest(".menu-toggle");
  if (menuButton) {
    var nav = document.getElementById(menuButton.getAttribute("aria-controls"));
    var isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    nav.classList.toggle("nav-open", !isOpen);
    return;
  }
  var navLink = event.target.closest("#main-nav a");
  if (navLink) {
    var menu = document.querySelector(".menu-toggle");
    if (menu) {
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Open navigation menu");
      document.getElementById(menu.getAttribute("aria-controls")).classList.remove("nav-open");
    }
  }
  var quantityButton = event.target.closest("[data-quantity]");
  if (quantityButton) {
    var cartIndex = Number(quantityButton.dataset.index);
    cart[cartIndex][1] = Math.max(1, cart[cartIndex][1] + Number(quantityButton.dataset.quantity));
    syncCart();
    renderCart();
    return;
  }
  var removeButton = event.target.closest("[data-rm]");
  if (removeButton) {
    cart.splice(Number(removeButton.dataset.rm), 1);
    syncCart();
    renderCart();
    return;
  }
  var detailQuantityButton = event.target.closest("[data-detail-quantity]");
  if (detailQuantityButton) {
    var input = document.getElementById("detail-quantity");
    input.value = Math.max(1, Number(input.value) + Number(detailQuantityButton.dataset.detailQuantity));
    return;
  }
  var detailAddButton = event.target.closest("[data-detail-add]");
  if (detailAddButton) {
    var quantity = Math.max(1, Number(document.getElementById("detail-quantity").value) || 1);
    addToCart(Number(detailAddButton.dataset.detailAdd), quantity);
  }
});
document.addEventListener("change", function (event) {
  if (event.target.dataset.q === undefined) return;
  var index = Number(event.target.dataset.q);
  cart[index][1] = Math.max(1, Number(event.target.value) || 1);
  syncCart();
  renderCart();
});

var carousel = document.getElementById("tr");
if (carousel) {
  var viewport = carousel.parentNode;
  var carouselIndex = 0;
  var carouselTimer;
  function slide(direction) {
    var itemWidth = carousel.children[0].getBoundingClientRect().width + 20;
    if (!itemWidth) return;
    var maxIndex = Math.max(0, carousel.children.length - Math.floor(viewport.clientWidth / itemWidth));
    carouselIndex = Math.max(0, Math.min(maxIndex, carouselIndex + direction));
    carousel.style.transform = "translateX(-" + carouselIndex * itemWidth + "px)";
  }
  function startCarousel() {
    window.clearInterval(carouselTimer);
    carouselTimer = window.setInterval(function () {
      var itemWidth = carousel.children[0].getBoundingClientRect().width + 20;
      var maxIndex = Math.max(0, carousel.children.length - Math.floor(viewport.clientWidth / itemWidth));
      carouselIndex = carouselIndex >= maxIndex ? 0 : carouselIndex + 1;
      slide(0);
    }, 3000);
  }
  document.getElementById("nx").addEventListener("click", function () { slide(1); });
  document.getElementById("pv").addEventListener("click", function () { slide(-1); });
  viewport.addEventListener("mouseenter", function () { window.clearInterval(carouselTimer); });
  viewport.addEventListener("mouseleave", startCarousel);
  window.addEventListener("resize", function () { slide(0); });
  startCarousel();
}
