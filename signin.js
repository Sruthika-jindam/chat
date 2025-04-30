const signInBtn = document.getElementById('signInBtn');
const signinForm = document.getElementById('signinForm');
const welcomeText = document.getElementById('welcomeText');

// Show sign-in form and hide welcome text
signInBtn.addEventListener('click', () => {
  welcomeText.style.display = 'none';
  signinForm.style.display = 'flex';
});

// Handle form submission
signinForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  const username = signinForm.querySelector('input[placeholder="Username"]').value;
  const password = signinForm.querySelector('input[placeholder="Password"]').value;

  // Simple credential check (replace with real logic in production)
  if (username === 'admin' && password === 'password123') {
    // Redirect to index.html
    window.location.href = 'index.html';
  } else {
    alert('Invalid username or password.');
  }
});
