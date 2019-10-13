document.addEventListener('DOMContentLoaded', function (e) { 
  var cart = {};
  checkCart();
  var DATA = (function() {
    var json = null;
    $.ajax({
      async: false,
      global: false,
      url: "ajax/goods.json",
      dataType: "json",
      success: function(data) {
        json = data.filter(function(item) {
          return item.sex === sex;
        });
      }
    });
    return json;
  })();

  outputGoods(DATA);
  function outputGoods(goods) {
    document.getElementById("goods").innerHTML = goods.map(function (n) {
  return ` <div class="single-goods">
        <h3>${n.name}</h3>
        <img src="${n.image}">
        <p>Ціна: ${n.cost} грн.</p>
        <button class="add-to-cart" data-art="${n.name}">Купити</button>
      </div>
    `
      }).join("");
    document.querySelectorAll("button.add-to-cart").forEach(function(but) {
      but.addEventListener("click", addToCart);
    });
  }
    
    
  function addToCart() {
    var articul = this.getAttribute("data-art");
    if (cart[articul] !== undefined) {
      cart[articul]++;
    } else {
      cart[articul] = 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    showMiniCart();
  }

  function checkCart() {
    if (localStorage.getItem("cart") != null) {
      cart = JSON.parse(localStorage.getItem("cart"));
      showMiniCart();
    }
  }

  function showMiniCart() {
    var out = "";
    for (var w in cart) {
      out += w + " --- " + cart[w] + "<br>";
    }
    out += '<br><a href="cart.html">Корзина</a>';
    document.getElementById("mini-cart").innerHTML = out;
  }
  const filters = document.querySelector("#filters");

  filters.addEventListener("input", filterGoods);

  function filterGoods() {
      const country = filters.querySelector("#country").value;
      const sizes = [...filters.querySelectorAll("#size input:checked")].map(function (n) {
      return n.value;
      });
      const priceMin = document.querySelector("#price-min").value;
      const priceMax = document.querySelector("#price-max").value;

    outputGoods(DATA.filter(function (n) {
        return (!country || n.country === country) &&
      (!sizes.length || sizes.includes(n.size)) &&
      (!priceMin || priceMin <= n.cost) &&
      (!priceMax || priceMax >= n.cost);
}));
  }
});
