// ===============================
// MyAI - Main JavaScript
// ===============================

const input = document.getElementById("messageInput");
const chatContainer = document.getElementById("chatContainer");
const sendButton = document.getElementById("sendButton");
const historyList = document.getElementById("historyList");


// ===============================
// SEND MESSAGE
// ===============================

async function sendMessage() {

    const message = input.value.trim();

    if (!message) {
        return;
    }

    // Remove welcome screen
    const welcome = document.getElementById("welcome");

    if (welcome) {
        welcome.remove();
    }

    // Show user message
    addMessage(message, "user");

    // Save in history
    addHistory(message);

    // Clear input
    input.value = "";
    input.style.height = "auto";

    // Disable button while AI is responding
    sendButton.disabled = true;

    // Show typing message
    const typing = addTypingMessage();

    try {

        /*
        ==========================================
        REAL AI CONNECTION WILL GO HERE
        ==========================================

        Later we'll send the message to our backend:

        const response = await fetch("/api/chat", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        typing.remove();

        addMessage(data.reply, "ai");

        ==========================================
        */

        // Temporary response
        await wait(1000);

        typing.remove();

        addMessage(
            "I'm ready! 🤖\n\nYour AI backend isn't connected yet. The next step is connecting this frontend to a real AI model through a secure backend.",
            "ai"
        );

    } catch (error) {

        console.error("AI Error:", error);

        typing.remove();

        addMessage(
            "Sorry, something went wrong. Please try again.",
            "ai"
        );

    } finally {

        sendButton.disabled = false;

        input.focus();
    }
}


// ===============================
// ADD MESSAGE
// ===============================

function addMessage(text, type) {

    const messageDiv = document.createElement("div");

    messageDiv.className = "message";


    // Avatar
    const avatar = document.createElement("div");

    avatar.className =
        "avatar " +
        (type === "user"
            ? "user-avatar"
            : "ai-avatar");

    avatar.textContent =
        type === "user"
            ? "U"
            : "AI";


    // Message content
    const content = document.createElement("div");

    content.className = "message-content";

    content.textContent = text;


    // Put everything together
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);

    chatContainer.appendChild(messageDiv);


    // Scroll down
    scrollToBottom();

    return messageDiv;
}


// ===============================
// AI TYPING INDICATOR
// ===============================

function addTypingMessage() {

    const messageDiv = document.createElement("div");

    messageDiv.className = "message";


    const avatar = document.createElement("div");

    avatar.className = "avatar ai-avatar";

    avatar.textContent = "AI";


    const content = document.createElement("div");

    content.className = "message-content";

    content.textContent = "MyAI is thinking...";


    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);

    chatContainer.appendChild(messageDiv);

    scrollToBottom();

    return messageDiv;
}


// ===============================
// CHAT HISTORY
// ===============================

function addHistory(message) {

    const item = document.createElement("div");

    item.className = "chat-item";

    item.textContent = message;


    // When clicked, put message back in input
    item.addEventListener("click", function () {

        input.value = message;

        input.focus();

    });


    historyList.prepend(item);
}


// ===============================
// NEW CHAT
// ===============================

function newChat() {

    chatContainer.innerHTML = `
        <div class="welcome" id="welcome">

            <h1>
                How can I help you?
            </h1>

            <p>
                Ask me anything and let's build something awesome.
            </p>

        </div>
    `;

    input.value = "";

    input.style.height = "auto";

    input.focus();
}


// ===============================
// ENTER TO SEND
// ===============================

function handleKey(event) {

    // Enter = send
    // Shift + Enter = new line

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        sendMessage();
    }
}


// ===============================
// TEXTAREA AUTO RESIZE
// ===============================

function autoResize(element) {

    element.style.height = "auto";

    element.style.height =
        Math.min(
            element.scrollHeight,
            150
        ) + "px";
}


// ===============================
// MOBILE SIDEBAR
// ===============================

function toggleSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    sidebar.classList.toggle("active");
}


// ===============================
// SCROLL TO BOTTOM
// ===============================

function scrollToBottom() {

    setTimeout(() => {

        chatContainer.scrollTop =
            chatContainer.scrollHeight;

    }, 50);
}


// ===============================
// WAIT FUNCTION
// ===============================

function wait(milliseconds) {

    return new Promise(resolve => {

        setTimeout(resolve, milliseconds);

    });
}


// ===============================
// STARTUP
// ===============================

window.addEventListener("load", () => {

    input.focus();

    console.log("MyAI frontend loaded successfully!");

});