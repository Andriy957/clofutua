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
        json = data;
      }
    });
    return json;
  })();

  showCart();
  function showCart() {
    var out = "";
    if (isEmptyObject(cart)) {
      out =
        'Корзина порожня. Добавте товар в корзину <a href="index.html">Головна сторінка</a>';
      document.getElementById("my-cart").innerHTML = out;
    } else {
      out = "";
      for (var key in cart) {
        DATA.forEach(function (item) {
         if (item.title === key) {
            out +='<button class="delete" data-art="' + key + '" > x </button>';
            out += ' <img src="' + item.image + '" width="48">';
            out += item.name;
            out += ' <button class="minus" data-art="' + key + '"> - </button>';
            out += cart[key];
            out += ' <button class="plus" data-art="' + key + '"> + </button>';
            out += cart[key] * item.cost;
            out += "<br>";
          }
        });
      }
      document.getElementById("my-cart").innerHTML = out;
      document.querySelectorAll(".plus").forEach(function(but) {
        but.addEventListener("click", plusGoods);
      });
      document.querySelectorAll(".minus").forEach(function(but) {
        but.addEventListener("click", minusGoods);
      });
      document.querySelectorAll(".delete").forEach(function(but) {
        but.addEventListener("click", deleteGoods);
      });
    }
  }

  function plusGoods() {
    var articul = this.getAttribute("data-art");
    cart[articul]++;
    saveCartToLS();
    showCart();
  }

  function minusGoods() {
    var articul = this.getAttribute("data-art");
    if (cart[articul] > 1) {
      cart[articul]--;
    } else {
      delete cart[articul];
    }
    saveCartToLS();
    showCart();
  }

  function deleteGoods() {
    var articul = this.getAttribute("data-art");
    delete cart[articul];
    saveCartToLS();
    showCart();
  }

  function isEmptyObject(obj) {
    for (var key in cart) {
      return false;
    }
    return true;
  }

  function checkCart() {
    if (localStorage.getItem("cart") != null) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
  }

  function saveCartToLS() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
