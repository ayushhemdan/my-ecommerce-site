import { calculateCartQuantity, initHeaderEvents } from "./cart.js";

window.addEventListener('DOMContentLoaded', () => {
  fetch('header.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;

      initHeaderEvents();
      calculateCartQuantity();

      document.querySelector('.js-dropdown').addEventListener('click', () => {
        console.log('hlo')
        document.querySelector('.js-expand-bar').classList.toggle('show');
      });


      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      const cart = currentUser?.cart || [];

      if (currentUser) {
        document.querySelector('.show-name').innerHTML = currentUser.username;  
        document.querySelector('.show-name-dropdown').innerHTML = currentUser.username;
      }
      const loginLink = document.querySelector('.js-login-link');
      const signupLink = document.querySelector('.js-signup-link');
      const logoutLink = document.querySelector('.js-logout-link');
      const profileLink = document.querySelector('.js-profile-link');
       const adminLogin = document.querySelector('.js-admin-login');

      const loginLink2 = document.querySelector('.js-login-link2');
      const signupLink2 = document.querySelector('.js-signup-link2');
      const logoutLink2 = document.querySelector('.js-logout-link2');
       const adminLogin2 = document.querySelector('.js-admin-login2');
     


      if (currentUser) {
        if (loginLink) loginLink.style.display = 'none';
        if (signupLink) signupLink.style.display = 'none';
             if (adminLogin) adminLogin.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'inline-block';
        if (profileLink) profileLink.style.display = 'inline-block';

        if (loginLink2) loginLink2.style.display = 'none';
                 if (adminLogin2) adminLogin2.style.display = 'none';
        if (signupLink2) signupLink2.style.display = 'none';
        if (logoutLink2) logoutLink2.style.display = 'inline-block';
      } else {
        if (loginLink) loginLink.style.display = 'inline-block';
        if (signupLink) signupLink.style.display = 'inline-block';
        if (logoutLink) logoutLink.style.display = 'none';
        if (profileLink) profileLink.style.display = 'none';

        if (loginLink2) loginLink2.style.display = 'inline-block';
        if (signupLink2) signupLink2.style.display = 'inline-block';
        if (logoutLink2) logoutLink2.style.display = 'none';

      }


      // Handle logout click
      if (logoutLink2) {
        logoutLink2.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('currentUser');
          window.location.href = 'login.html';
        });
      }
      if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('currentUser');
          window.location.href = 'login.html';
        });
      }

    });


  fetch('footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const toggleBtn = document.querySelector('.js-toggle-color');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
      const isToggle=   document.body.classList.toggle('toggle-it');
         sessionStorage.setItem('theme',isToggle? 'light': 'dark');

      
      });
    }
  }, 100);
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = sessionStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.toggle('toggle-it');
    
  }
})
