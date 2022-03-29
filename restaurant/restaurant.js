$(document).ready(function () {
  let initialState = { items: [], totalPrice: 0, totalQuantity: 0 };
  const data = JSON.parse(localStorage.getItem("res"));
  let newItems = initialState.items.slice();


  // Display products
  const showProductHandler = () => {
    return data.at(0).products.map((item) =>
      $(".products-left").append(`
          <div class="product">
          <div class="pr-left">
              <img src="${item.img}" alt="" />
          <div class="pr-left-desc">
              <p>${item.name}</p>
              <p>
              ${item.desc}
              </p>
          </div>
          </div>
          <div class="btn-price">
              <p style="margin-right: 20px">${item.price} $</p>
              <button class="add-product" data-id="${item.id}">+</button>
          </div>
          </div>
      `)
    );
  };

  const showProductsDetails = () => {
    $('.cover-photo').attr('src', `${data[0].coverPhoto}`);
    $('.restaurant-name').html(`${data[0].name}`);
    $('.restaurant-address').html(`${data[0].address}`);
    $('.restaurant-desc').html(`${data[0].dess}`);
  }
  showProductsDetails();
  // Update & display basket
  const updateBasket = () => {
    const basket = JSON.parse(localStorage.getItem("basket"));
    if (basket === null) {
      return;
    } else {
      $("#items-count").text(`${basket.totalQuantity} items`);
      $("#totalPrice").text(`$${basket.totalPrice}`);
      $(".product-list").empty();
      basket.items.map((item) => {
        $(".product-list").append(
          `  
          <div class="product-item">
          <div class="product-item-delete" data-id="${item.id}">
            <img src="/public/images/deleteitem.svg" alt="" />
          </div>
          <div class="product-item-count">
            <span id="addItem" data-id="${item.id}">+</span>
            <p>${item.quantity}</p>
            <span id="removeItem" >-</span>
          </div>
          <div class="product-item-desc">
            <img src="${item.img}" alt="" />
            <div>
              <p>${item.name}</p>
              <p>$${item.price}</p>
            </div>
          </div>
        </div>`
        );
      });
    }
  };
  // Add product button
  const addProductHandler = (item) => {
    const basket = JSON.parse(localStorage.getItem("basket"));
    let existingItem;

    if (basket === null) {
      existingItem = initialState.items.find(
        (product) => product.id === item.id
      );
    } else {
      initialState = basket;
      existingItem = initialState.items.find(
        (product) => product.id === item.id
      );
    }

    if (!existingItem) {
      initialState.items.push(item);
      initialState.totalQuantity = initialState.totalQuantity + 1;
      initialState.totalPrice = +(initialState.totalPrice + item.price).toFixed(
        2
      );
      localStorage.setItem("basket", JSON.stringify(initialState));
      updateBasket();
    } else {
      const newItem = existingItem;
      const index = basket.items.findIndex((item) => item.id === newItem.id);
      const newBasket = basket;
      newItem.price = +(newItem.price + item.price).toFixed(2);
      newItem.quantity = newItem.quantity + 1;
      newBasket.items[index] = newItem;
      newBasket.totalQuantity = newBasket.totalQuantity + 1;
      newBasket.totalPrice = +(newBasket.totalPrice + item.price).toFixed(2);
      console.log(newBasket.totalPrice);
      initialState = newBasket;
      localStorage.setItem("basket", JSON.stringify(initialState));
      updateBasket();
    }
  };

  const deleteItemFromBasket = (id) => {
    const basket = JSON.parse(localStorage.getItem("basket"));
    const removedItem = basket.items.filter((item) => item.id !== id);
    const existingItem = basket.items.find((item) => item.id === id);
    basket.items = removedItem;
    basket.totalQuantity = initialState.totalQuantity - existingItem.quantity;
    basket.totalPrice = +(initialState.totalPrice - existingItem.price).toFixed(
      2
    );
    initialState = basket;
    localStorage.setItem("basket", JSON.stringify(initialState));
    updateBasket();
  };

  // Add product button
  $(document).on("click", ".add-product, #addItem", function () {
    var dataId = $(this).attr("data-id");
    console.log(dataId);
    const item = data.at(0).products.filter((item) => item.id === dataId);
    addProductHandler(item.at(0));
  });

  // Delete product button
  $(document).on("click", ".product-item-delete", function () {
    var dataId = $(this).attr("data-id");
    deleteItemFromBasket(dataId);
  });

  updateBasket();
  showProductHandler();
});


