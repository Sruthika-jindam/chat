const closeBtn = document.getElementById('close-btn');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBody = document.getElementById('chat-body');

closeBtn.addEventListener('click', () => {
  window.close();
});

sendBtn.addEventListener('click', handleUserMessage);
userInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleUserMessage();
  }
});

function handleUserMessage() {
  const text = userInput.value.trim();
  if (text !== '') {
    appendMessage('user', text);
    setTimeout(() => {
      askBackend(text);
    }, 500);
    userInput.value = '';
  }
}

function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  messageDiv.innerText = message;
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

async function askBackend(userText) {
  appendMessage('bot', 'Typing...');
  try {
    const prompt = `You are a professional assistant. If the user asks for a greeting, suggest a polite, professional greeting. If the user provides a sentence, correct any grammar mistakes and suggest a polished version. For general questions, provide a clear, concise answer. User input: "${userText}"`;
    
    const response = await fetch('http://localhost:5000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const botMessages = document.querySelectorAll('.bot-message');
    if (botMessages.length > 0) {
      botMessages[botMessages.length - 1].remove();
    }
    appendMessage('bot', data.reply || 'Sorry, no response generated.');
  } catch (error) {
    console.error('Error:', error);
    const botMessages = document.querySelectorAll('.bot-message');
    if (botMessages.length > 0) {
      botMessages[botMessages.length - 1].remove();
    }
    appendMessage('bot', 'Oops, something went wrong. Please try again!');
  }
}