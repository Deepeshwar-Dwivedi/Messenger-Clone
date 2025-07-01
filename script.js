const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const attachBtn = document.getElementById('attach-btn');

// Dummy conversation on load
const dummyMessages = [
  { type: 'bot', text: '👋 <b>Hello!</b> Welcome to <span style="color:#128c7e">Messenger Clone</span>.' },
  { type: 'user', text: 'Hi! Who are you?' },
  { type: 'bot', text: "I'm your friendly <b>Bot</b>.<br>How can I help you today? 😊" }
];

// Typing effect for bot
function typeBotMessage(text, callback) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot';
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  let i = 0;
  let tag = false, html = '';

  function type() {
    if (i < text.length) {
      if (text.charAt(i) === '<') tag = true;
      if (tag) html += text.charAt(i++);
      else {
        html += text.charAt(i++);
        messageDiv.innerHTML = html + '<span class="cursor">|</span>';
        chatBox.scrollTop = chatBox.scrollHeight;
        setTimeout(type, 16);
        return;
      }
      if (text.charAt(i-1) === '>') tag = false;
      messageDiv.innerHTML = html + '<span class="cursor">|</span>';
      chatBox.scrollTop = chatBox.scrollHeight;
      setTimeout(type, 3);
    } else {
      messageDiv.innerHTML = html;
      if (callback) callback();
    }
  }
  type();
}

// Render a message
function renderMessage(type, text) {
  if (type === 'bot') {
    typeBotMessage(text);
  } else {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Load dummy messages with typing effect for bots
(function loadDummyMessages(i = 0) {
  if (i < dummyMessages.length) {
    const { type, text } = dummyMessages[i];
    if (type === 'bot') {
      typeBotMessage(text, () => loadDummyMessages(i + 1));
    } else {
      renderMessage(type, text);
      setTimeout(() => loadDummyMessages(i + 1), 550);
    }
  }
})();

// Send message handler
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  renderMessage('user', text);
  userInput.value = '';
  setTimeout(() => botReply(text), 650);
}

// Dummy bot logic (replace with API call for real bot)
function botReply(userMsg) {
  const responses = [
    "That's interesting! 😃",
    "Tell me more!",
    "I'm here to listen. 🤗",
    "Can you elaborate?",
    "😊",
    "Let me think... 🤔",
    `You said: <b>${userMsg.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</b>`
  ];
  // Simple echo or random reply
  const reply = responses[Math.floor(Math.random() * responses.length)];
  typeBotMessage(reply);
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Optional: Attach button animation (no upload feature)
attachBtn.addEventListener('click', (e) => {
  attachBtn.classList.add('shake');
  setTimeout(() => attachBtn.classList.remove('shake'), 400);
});

// Bonus: subtle shake animation
const style = document.createElement('style');
style.textContent = `
  .shake { animation: shakeBtn .32s; }
  @keyframes shakeBtn {
    0% { transform: rotate(0deg);}
    25% { transform: rotate(-13deg);}
    50% { transform: rotate(8deg);}
    75% { transform: rotate(-5deg);}
    100% { transform: rotate(0deg);}
  }
  .cursor { display:inline-block; width:1ch; color:#25d366; animation: blink 1s steps(2) infinite;}
  @keyframes blink { 0%,50% { opacity:1;} 51%,100% {opacity: 0;} }
`;
document.head.append(style);

// For real bot integration, see the README or comments in the JS!