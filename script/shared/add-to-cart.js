import { calculateCartQuantity } from "../shared/cart.js";
import { formatCurrency } from "./format-currency.js";
// import { products } from "./products.js";

const products = JSON.parse(localStorage.getItem('products')) || [];

export function addToCart(dataId, quantity) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log(users)
  if (!currentUser) {

    return {success: false};
  }

  // Use currentUser.cart
  let cart = currentUser.cart || [];

  let matching = cart.find(cartItem => cartItem.id === dataId);

  if (matching) {
    matching.quantity += quantity;
  } else {
    const product = products.find(p => p.id === dataId);
    if (product) {
      cart.push({
        name: product.name,
        priceCents: product.priceCents,
        category: product.category,
        id: product.id,
        quantity: quantity
      });
    }
  }

  // Update currentUser and users[]
  currentUser.cart = cart;
  users = users.map(user => user.email === currentUser.email ? currentUser : user);

updateUserStorage(currentUser, users);

  calculateCartQuantity();
  subtotal();
  console.log("Cart:", cart);
   return { success: true };
}


export function deleteCartItems(dataId) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) return;

  let cart = currentUser.cart || [];

  let matching = cart.find(cartItem => cartItem.id === dataId);

  if (matching && matching.quantity > 1) {
    matching.quantity--;
  }else {
    cart = cart.filter(cartItem => cartItem.id !== dataId);
  }
  currentUser.cart = cart;
  users = users.map(user => user.email === currentUser.email ? currentUser : user);

updateUserStorage(currentUser, users);

  calculateCartQuantity();
}


export function subtotal() {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser || !currentUser.cart) return 0;

  return currentUser.cart
    .map(item => item.priceCents * item.quantity)
    .reduce((sum, val) => sum + val, 0);
}


export function addTax() {
  const total = subtotal();
  return (total * 10) / 100;
}

function updateUserStorage(currentUser, users) {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  localStorage.setItem('users', JSON.stringify(users));
}