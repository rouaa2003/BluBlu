document.addEventListener("DOMContentLoaded", function() {
    const addProductButton = document.getElementById("add-product-button");
    const addProductFormContainer = document.getElementById("add-product-form-container");
    const cancelButton = document.getElementById("cancel-button");
    const addProductForm = document.getElementById("add-product-form");
    const chatToggle = document.getElementById("chat-toggle");
    const chatContainer = document.getElementById("chat-container");
    const chatOverlay = document.getElementById("chat-overlay");

    // Add product form functionality
    addProductButton.addEventListener("click", function() {
        addProductFormContainer.style.display = "flex";
        chatOverlay.style.display = "none"; // Hide chat overlay when adding a product
    });

    cancelButton.addEventListener("click", function() {
        addProductFormContainer.style.display = "none";
    });

    addProductForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Retrieve form data
        const productName = document.getElementById("product-name").value;
        const productCondition = document.getElementById("product-condition").value;
        const productImage = document.getElementById("product-image").value;
        const productStatus = document.getElementById("product-status").value;
        const productCity = document.getElementById("product-city").value;

        // Create new product card
        const productGrid = document.getElementById("product-grid");
        const newProductCard = document.createElement("div");
        newProductCard.className = "product-card";
        newProductCard.innerHTML = `
            <img src="${productImage}" alt="${productName}">
            <div class="product-details">
                <h3>${productName}</h3>
                <p>Condition: ${productCondition}</p>
                <p>Status: ${productStatus}</p>
                <p>City: ${productCity}</p>
                <button class="chat-button">Chat with Seller</button>
                <button class="sell-button">Mark as Sold</button>
            </div>
        `;
        
        // Append new product card to the grid
        productGrid.insertBefore(newProductCard, addProductButton);

        // Reset and hide the form
        addProductForm.reset();
        addProductFormContainer.style.display = "none";
    });

    // Toggle chat overlay
    chatToggle.addEventListener("click", function() {
        if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
            chatContainer.style.display = "flex";
            chatOverlay.style.display = "flex"; // Show chat overlay
        } else {
            chatContainer.style.display = "none";
            chatOverlay.style.display = "none"; // Hide chat overlay
        }
    });

    // Sample chat list data
    const chatList = [
        { id: 1, name: "Seller 1", img: "avatar1.jpg" },
        { id: 2, name: "Seller 2", img: "avatar2.jpg" },
        { id: 3, name: "Seller 3", img: "avatar3.jpg" }
    ];

    // Sample chat messages
    const chatMessages = {
        1: [
            { sender: "user", message: "Hello, I am interested in your product." },
            { sender: "seller", message: "Hi! It's available. How can I help you?" }
        ],
        2: [
            { sender: "user", message: "Is the product still available?" },
            { sender: "seller", message: "Yes, it is." }
        ],
        3: [
            { sender: "user", message: "What is the condition of the product?" },
            { sender: "seller", message: "It's in excellent condition." }
        ]
    };

    // Populate chat list
    const chatListElement = document.getElementById("chat-list");
    if (chatListElement) {
        chatList.forEach(chat => {
            const listItem = document.createElement("li");
            listItem.className = "chat-item";
            listItem.innerHTML = `<img src="${chat.img}" alt="Avatar"> Chat with ${chat.name}`;
            listItem.addEventListener("click", function() {
                loadChat(chat.id);
            });
            chatListElement.appendChild(listItem);
        });
    }

    // Load chat messages
    function loadChat(chatId) {
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML = '';
        if (chatMessages[chatId]) {
            chatMessages[chatId].forEach(msg => {
                const messageElement = document.createElement("div");
                messageElement.className = `chat-message ${msg.sender}`;
                messageElement.textContent = msg.message;
                chatBox.appendChild(messageElement);
            });
        }

        // Scroll to bottom of chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Send new message
    const sendButton = document.getElementById("send-button");
    const messageInput = document.getElementById("message-input");
    if (sendButton && messageInput) {
        sendButton.addEventListener("click", function() {
            const newMessage = messageInput.value.trim();
            if (newMessage) {
                const messageElement = document.createElement("div");
                messageElement.className = "chat-message user";
                messageElement.textContent = newMessage;
                document.getElementById("chat-box").appendChild(messageElement);
                messageInput.value = "";
                document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
            }
        });
    }
});
