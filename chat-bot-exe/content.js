const button = document.createElement('button');
button.id = 'chatbot-button';
button.innerText = '💬 Chat';
button.style.position = 'fixed';
button.style.bottom = '20px';
button.style.right = '20px';
button.style.padding = '15px';
button.style.backgroundColor = '#25D366';
button.style.color = '#fff';
button.style.border = 'none';
button.style.borderRadius = '50%';
button.style.cursor = 'pointer';
button.style.fontSize = '20px';
button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
button.style.zIndex = '1000';
document.body.appendChild(button);

button.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'openPopup' });
});