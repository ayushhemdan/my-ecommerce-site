import { addTax, subtotal } from "./shared/add-to-cart.js";
import { generateProductHTML, generateProductHTML2, generateProductHTMLShipping } from "./shared/cart.js";
import { formatCurrency } from "./shared/format-currency.js";
// import { products } from "./shared/products.js";

   


 const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const cart = currentUser.cart;
function renderProducts2() {
  
   
  let htmlContent = currentUser.cart.map(generateProductHTML2).join('');
   document.querySelector('.js-order-summary-products').innerHTML = htmlContent;
  console.log(htmlContent)
}
renderProducts2();

if(cart.length > 5){
  document.querySelector('.js-order-summary-products').classList.add('order-summary-products');
}
document.querySelector('.js-summary-section-container').innerHTML = generateProductHTMLShipping();

function updatePrices() {
  const total = subtotal();
  const tax = addTax();
  document.querySelector('.js-subtotal-price').innerHTML = `$${formatCurrency(total)}`;
  document.querySelector('.js-add-tax').innerHTML = `$${formatCurrency(tax)}`;
  document.querySelector('.js-total-price').innerHTML = `$${formatCurrency(total + tax)}`;
}
updatePrices();

// Form validation 


const form = document.querySelector('form');

const showError = (id, message) =>{
   document.getElementById(id).textContent = message;
}

const clearErrors = () =>{
   document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    clearErrors();

      const firstname = document.getElementById('firstname').value.trim();
      const lastname = document.getElementById('lastname').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phonenumber').value.trim();
      const address = document.getElementById('address').value.trim();
      const city = document.getElementById('city').value.trim();
      const state = document.getElementById('state').value.trim();
      const zipcode = document.getElementById('zipcode').value.trim();
      const country = document.getElementById('country').value.trim();

      let valid = true;

      if(firstname.length < 2){
        showError('firstname-error','First name must be at least 2 characters.')
        valid = false;
      }
      
      if(lastname.length < 2){
        showError('lastname-error','Last name must be at least 2 characters.')
        valid = false;
      }

       if (!/^\S+@\S+\.\S+$/.test(email)) {
        showError("email-error", "Enter a valid email address.");
        valid = false;
      }

      if (!/^\d{10}$/.test(phone)) {
        showError("phonenumber-error", "Phone number must be exactly 10 digits.");
        valid = false;
      }

      if (address.length < 5) {
        showError("address-error", "Address must be at least 5 characters.");
        valid = false;
      }

      if (city.length < 2) {
        showError("city-error", "City name must be at least 2 characters.");
        valid = false;
      }

      if (state.length < 2) {
        showError("state-error", "State name must be at least 2 characters.");
        valid = false;
      }

      if (!/^\d{5,6}$/.test(zipcode)) {
        showError("zipcode-error", "Enter a valid ZIP code.");
        valid = false;
      }

      if (country.length < 2) {
        showError("country-error", "Enter a valid country.");
        valid = false;
      }

      if (valid) {
       
         document.getElementById('loader').style.display = 'flex';
        form.reset();
        const user ={
          firstname,
          lastname,
          email,
          phone,
          address,
          city,
          state,
          zipcode,
          country
        }
       
sessionStorage.setItem('user', JSON.stringify(user));
setTimeout(()=>{
window.location.assign('order-confirmed.html');
},3000);


      }
} );


