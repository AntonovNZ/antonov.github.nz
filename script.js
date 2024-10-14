// Firebase configuration (replace with your own Firebase config)
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');

// Enable input after username is entered
usernameInput.addEventListener('input', () => {
    if (usernameInput.value.trim() !== '') {
        messageInput.disabled = false;
        sendBtn.disabled = false;
    } else {
        messageInput.disabled = true;
        sendBtn.disabled = true;
    }
});

// Send message
sendBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const message = messageInput.value;

    if (message.trim() !== '') {
        const messageData = {
            username: username,
            text: message
        };

        database.ref('messages').push(messageData);
        messageInput.value = ''; // Clear input
    }
});

// Listen for new messages
database.ref('messages').on('child_added', (snapshot) => {
    const messageData = snapshot.val();
    displayMessage(messageData.username, messageData.text);
});

// Display message in chat
function displayMessage(username, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    const usernameSpan = document.createElement('span');
    usernameSpan.classList.add('username');
    usernameSpan.textContent = username + ': ';

    const textSpan = document.createElement('span');
    textSpan.classList.add('text');
    textSpan.textContent = text;

    messageDiv.appendChild(usernameSpan);
    messageDiv.appendChild(textSpan);
    chatMessages.appendChild(messageDiv);

    // Auto-scroll
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
