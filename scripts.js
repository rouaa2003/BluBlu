w3.includeHTML(init);

  function init() {
    document.addEventListener("DOMContentLoaded", function () {
      // استدعاء العناصر من DOM
      const addProductButton = document.getElementById("add-product-button");
      const addProductFormContainer = document.getElementById("add-product-form-container");
      const cancelButton = document.getElementById("cancel-button");
      const chatToggle = document.getElementById("chat-toggle");
      const chatContainer = document.getElementById("chat-container");
      const chatOverlay = document.getElementById("chat-overlay");
      const addProductForm = document.getElementById("add-product-form");

      // تأكد من وجود العناصر قبل التفاعل معها
      if (addProductButton && addProductFormContainer && cancelButton && addProductForm) {
        // إضافة حدث لزر إضافة المنتج
        addProductButton.addEventListener("click", function () {
          addProductFormContainer.style.display = "flex";
          chatContainer.style.display = "none"; // إخفاء صندوق المحادثة عند إضافة منتج
          chatOverlay.style.display = "none"; // إخفاء الطبقة الشفافة إن وجدت
        });

        // إضافة حدث لزر الإلغاء
        cancelButton.addEventListener("click", function () {
          addProductFormContainer.style.display = "none";
        });

        // معالجة إرسال النموذج
        addProductForm.addEventListener("submit", function (event) {
          event.preventDefault();

          // الحصول على بيانات النموذج
          const productName = document.getElementById("product-name").value;
          const productCondition = document.getElementById("product-condition").value;
          const productImage = document.getElementById("product-image").value;
          const productStatus = document.getElementById("product-status").value;
          const productCity = document.getElementById("product-city").value;

          // إنشاء بطاقة منتج جديدة
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

          // إضافة بطاقة المنتج الجديدة إلى الشبكة
          productGrid.insertBefore(newProductCard, addProductButton);

          // إعادة تعيين وإخفاء النموذج
          addProductForm.reset();
          addProductFormContainer.style.display = "none";
        });
      }

      // بيانات المحادثات النموذجية
      const chatList = [
        { id: 1, name: "Seller 1", img: "avatar1.jpg" },
        { id: 2, name: "Seller 2", img: "avatar2.jpg" },
        { id: 3, name: "Seller 3", img: "avatar3.jpg" },
      ];

      const chatMessages = {
        1: [
          { sender: "user", message: "Hello, I am interested in your product." },
          { sender: "seller", message: "Hi! It's available. How can I help you?" },
        ],
        2: [
          { sender: "user", message: "Is the product still available?" },
          { sender: "seller", message: "Yes, it is." },
        ],
        3: [
          { sender: "user", message: "What is the condition of the product?" },
          { sender: "seller", message: "It's in excellent condition." },
        ],
      };

      // ملء قائمة المحادثات
      const chatListElement = document.querySelector(".chat-list");
      if (chatListElement) {
        chatList.forEach((chat) => {
          const listItem = document.createElement("div");
          listItem.className = "chat-item";
          listItem.innerHTML = `<img src="${chat.img}" alt="Avatar"> Chat with ${chat.name}`;
          listItem.addEventListener("click", function () {
            loadChat(chat.id);
          });
          chatListElement.appendChild(listItem);
        });
      }

      // تحميل رسائل المحادثة
      function loadChat(chatId) {
        const chatBox = document.querySelector(".messages");
        chatBox.innerHTML = "";
        if (chatMessages[chatId]) {
          chatMessages[chatId].forEach((msg) => {
            const messageElement = document.createElement("div");
            messageElement.className = `chat-message ${msg.sender}`;
            messageElement.textContent = msg.message;
            chatBox.appendChild(messageElement);
          });
        }

        // التمرير إلى أسفل صندوق المحادثة
        chatBox.scrollTop = chatBox.scrollHeight;
      }

      // إرسال رسالة جديدة
      const sendButton = document.querySelector(".new-message button");
      const messageInput = document.querySelector(".new-message input");
      if (sendButton && messageInput) {
        sendButton.addEventListener("click", function () {
          const newMessage = messageInput.value.trim();
          if (newMessage) {
            const messageElement = document.createElement("div");
            messageElement.className = "chat-message user";
            messageElement.textContent = newMessage;
            document.querySelector(".messages").appendChild(messageElement);
            messageInput.value = "";
            document.querySelector(".messages").scrollTop =
              document.querySelector(".messages").scrollHeight;
          }
        });
      }
    });
  }