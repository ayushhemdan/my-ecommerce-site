import { calculateCartQuantity } from "./shared/cart.js";
// import { products } from "./shared/products.js";
import { formatCurrency } from "./shared/format-currency.js";
import { addTax, addToCart, deleteCartItems, subtotal } from "./shared/add-to-cart.js";

const products = JSON.parse(localStorage.getItem('products')) || [];

function renderCartItems() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const cart = currentUser?.cart || [];
  let cartItemHtml = '';
  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.id);

    cartItemHtml += `
       <div class="cart-item">
        <div class="item-img">
          <img src="${product.image}" alt="Product Images">
        </div>
        <div class="item-details">
          <h3><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
          <p>${product.category}</p>
          <div>$${formatCurrency(product.priceCents)}</div>
        </div>
        <div class="item-quantity">
          <button class="decrement-btn" data-id="${product.id}">-</button>
          <div class="display-quantity">${cartItem.quantity}</div>
          <button class="increment-btn" data-id="${product.id}">+</button>
          <button class="delete-item-btn" data-id="${product.id}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
  `;
  });

  if (cartItemHtml) {
    document.querySelector('.js-cart-items-list').innerHTML = cartItemHtml;
  }
}
renderCartItems();
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const cart = currentUser?.cart || [];

console.log(cart);

document.querySelector('.js-cart-items-list')
  .addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('.delete-item-btn');
    if (deleteBtn) {
      const id = deleteBtn.getAttribute('data-id');
      const index = cart.findIndex(item => item.id === id);
      if (index !== -1) {
        cart.splice(index, 1);
        updateUserCartInLocalStorage();
        updatePrices();
        zeroCartQuantity();

        console.log(cart);
      }
    }

    const incrementBtn = event.target.closest('.increment-btn');
    if (incrementBtn) {
      const id = incrementBtn.getAttribute('data-id');
      addToCart(id, 1);
      updatePrices();
    }

    const decrementBtn = event.target.closest('.decrement-btn');
    if (decrementBtn) {
      const id = decrementBtn.getAttribute('data-id');
      deleteCartItems(id);
      updatePrices();

    }
    renderCartItems();
    calculateCartQuantity();
  });

function updatePrices() {
  const total = subtotal();
  const tax = addTax();
  document.querySelector('.js-subtotal-price').innerHTML = `$${formatCurrency(total)}`;
  document.querySelector('.js-add-tax').innerHTML = `$${formatCurrency(tax)}`;
  document.querySelector('.js-total-price').innerHTML = `$${formatCurrency(total + tax)}`;
}
updatePrices();

function zeroCartQuantity() {
  if (cart.length === 0) {
    document.querySelector('.js-container').innerHTML = `<div class="zero-item-container">
      <div class="zero-item-msg">
       <h2>Your cart is empty</h2>
       <p>Looks like you haven't added any products to your cart yet.</p>
      <a href="index.html">
       <button class="continue-shopping-btn-two">Continue Shopping</button>
       </a>
      </div>
    </div>
    `;
  }
}
zeroCartQuantity();
console.log(cart);
function updateUserCartInLocalStorage() {
  currentUser.cart = cart;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userIndex = users.findIndex(user => user.email === currentUser.email);
  if (userIndex !== -1) {
    users[userIndex] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
}

