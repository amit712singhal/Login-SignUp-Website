const loginBtn = document.querySelector( '.login-btn' );
const signupBtn = document.querySelector( '.signup-btn' );
const popupOverlay = document.querySelector( '.popup-overlay' );
const wrapper = document.querySelector( '.wrapper' );
const loginLink = document.querySelector( '.login-link' );
const registerLink = document.querySelector('.register-link');
const iconClose = document.querySelector( '.icon-close' );

popupOverlay.addEventListener( 'click', function ()
{
  document.querySelector( '.popup-overlay' ).style.display = 'none';
  wrapper.classList.remove( 'active-popup' );
} );

registerLink.addEventListener( 'click', () =>
{
  wrapper.classList.add('active');
} );

loginLink.addEventListener('click', () => {
  wrapper.classList.remove('active');
} );

iconClose.addEventListener('click', () => {
  wrapper.classList.remove( 'active-popup' );
  wrapper.classList.remove('active');
  document.querySelector('.popup-overlay').style.display = 'none';
} );

loginBtn.addEventListener('click', function() {
    document.querySelector('.popup-overlay').style.display = 'block';
    wrapper.classList.add('active-popup');
} );


signupBtn.addEventListener('click', function() {
    document.querySelector('.popup-overlay').style.display = 'block';
    wrapper.classList.add('active-popup');
    wrapper.classList.add('active');
} );
