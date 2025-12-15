function showPage(pageId) {
    // 1. Hide all pages
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    // 2. Show the selected page
    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        activeSection.style.display = 'block';
        setTimeout(() => activeSection.classList.add('active'), 10); // Small delay for fade-in effect if added later
    }

    // 3. Update the Navbar buttons
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Simple check to match button text to pageId (e.g., "Home" -> "home")
        if (link.innerText.toLowerCase() === pageId) {
            link.classList.add('active');
        }
    });
}

// Initialize: Show Home by default
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});

// Gallery Logic
// USER: Replace these URLs with your own image links.
// Each sub-array represents a collection for one dock icon.
const galleryCollections = [
    // Collection 1 (Grid Icon)
    [
        "./photos/gallery/IMG_0308.jpeg",
        "./photos/gallery/IMG_0751.jpeg",
        "./photos/gallery/IMG_2108.jpeg",
        "./photos/gallery/IMG_2618.jpeg",
        "./photos/gallery/IMG_2637.jpeg",
        "./photos/gallery/IMG_2668.jpeg",
    ],
    // Collection 2 (Map Icon)
    [
        "./photos/travel/IMG_2277.jpeg",
        "./photos/travel/IMG_2325.jpeg",
        "./photos/travel/IMG_2434.jpeg",
        "./photos/travel/IMG_2488.jpeg",
        "./photos/travel/IMG_2494.jpeg",
    ],
    // Collection 3 (Heart Icon) (Hobbies)
    [
        "./photos/hobbies/IMG_0310.jpeg",
        "./photos/hobbies/IMG_1190.jpeg",
        "./photos/hobbies/IMG_1229.jpeg",
        "./photos/hobbies/IMG_1296.jpeg",
    ],
    // Collection 4 (Dog Icon)
    [
        "./photos/dog/66063055837__F9D63696-6FAE-4A72-822A-08E71AAE424E.jpeg",
        "./photos/dog/IMG_0359.jpeg",
        "./photos/dog/IMG_0816.jpeg",
        "./photos/dog/IMG_1844.jpeg"
    ]
];

let currentCollectionIndex = 0;
let currentImageIndex = 0;

function updateGalleryDisplay() {
    const galleryBg = document.getElementById('gallery-bg');
    if (galleryBg) {
        // Get the current URL
        const newUrl = galleryCollections[currentCollectionIndex][currentImageIndex];

        galleryBg.style.opacity = '0'; // Fade out
        setTimeout(() => {
            galleryBg.src = newUrl;
            galleryBg.onload = () => {
                galleryBg.style.opacity = '1'; // Fade in
            };
        }, 200);
    }
}

function changeGalleryImage(collectionIndex) {
    console.log("Switching to collection:", collectionIndex);
    currentCollectionIndex = collectionIndex;
    currentImageIndex = 0; // Reset to first image of new collection

    updateGalleryDisplay();

    // Update active dock item
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach((item, i) => {
        if (i === collectionIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function nextGalleryImage() {
    // Increment image index within current collection
    currentImageIndex++;

    // Loop back if at end of collection
    if (currentImageIndex >= galleryCollections[currentCollectionIndex].length) {
        currentImageIndex = 0;
    }

    console.log(`Showing image ${currentImageIndex} of collection ${currentCollectionIndex}`);
    updateGalleryDisplay();
}

// Add click listener to the gallery background
document.addEventListener('DOMContentLoaded', () => {
    // Set initial image from the first collection
    updateGalleryDisplay();

    const galleryBg = document.getElementById('gallery-bg');
    if (galleryBg) {
        galleryBg.addEventListener('click', nextGalleryImage);
    }
});

// --- CHATBOT LOGIC ---
const chatState = {
    hasStarted: false
};

const chatOptions = [
    { id: 'email', text: '📧 Get Email' },
    { id: 'linkedin', text: '💼 LinkedIn' },
    { id: 'resume', text: '📄 Resume' },
    { id: 'about', text: '🤔 Tell me about Brian' },
    { id: 'funfact', text: '🎲 Fun Fact' }
];

function initChat() {
    console.log("Initializing Chat...");
    if (chatState.hasStarted) {
        console.log("Chat already started.");
        return;
    }

    chatState.hasStarted = true;
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) {
        console.error("Chat messages container not found!");
        return;
    }
    messagesContainer.innerHTML = ''; // Clear

    // Initial Greeting
    showTyping();
    setTimeout(() => {
        removeTyping();
        addBotMessage("Hi there! 👋 I'm Brian's virtual assistant.");

        showTyping();
        setTimeout(() => {
            removeTyping();
            addBotMessage("How can I help you connect with him today?");
            console.log("Showing options...");
            showOptions();
        }, 800); // Reduced delay for faster testing
    }, 600);
}

function addBotMessage(text) {
    const container = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot';
    msgDiv.innerHTML = text; // Allow HTML for links
    container.appendChild(msgDiv);
    scrollToBottom();
}

function addUserMessage(text) {
    const container = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user';
    msgDiv.innerText = text;
    container.appendChild(msgDiv);
    scrollToBottom();
}

function showTyping() {
    const container = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    container.appendChild(typingDiv);
    scrollToBottom();
}

function removeTyping() {
    const typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) typingDiv.remove();
}

function scrollToBottom() {
    const container = document.getElementById('chat-messages');
    if (container) {
        container.scrollTop = container.scrollHeight;
    }
}

function showOptions() {
    const optionsContainer = document.getElementById('chat-options');
    if (!optionsContainer) {
        console.error("Options container not found!");
        return;
    }
    optionsContainer.innerHTML = '';

    console.log("Rendering options:", chatOptions);
    chatOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'chat-option';
        btn.innerText = opt.text;
        btn.onclick = () => handleOptionClick(opt);
        optionsContainer.appendChild(btn);
    });
}

function handleOptionClick(option) {
    // 1. User sends message
    addUserMessage(option.text);

    // 2. Remove options temporarily
    document.getElementById('chat-options').innerHTML = '';

    // 3. Bot responds
    showTyping();
    setTimeout(() => {
        removeTyping();
        let response = "";

        switch (option.id) {
            case 'email':
                response = "You can reach Brian at: <br><strong><a href='mailto:blee6918@gmail.com'>blee6918@gmail.com</a></strong>";
                break;
            case 'linkedin':
                response = "Connect with him on LinkedIn: <br><a href='https://www.linkedin.com/in/minsoolee/' target='_blank'>linkedin.com/in/minsoolee</a>";
                break;
            case 'resume':
                response = "You can view his resume here: <br><a href='./docs/resume/resume.pdf' download='Brian_Lee_Resume.pdf' target='_blank'>Download Resume</a>";
                break;
            case 'about':
                response = "Brian is a Data Science student at SFU. He loves building AI systems, video games, and staying active through sports like golfing in the summer and snowboarding in the winter! 🏌️";
                break;
            case 'funfact':
                response = "Fun fact: Brian is an avid snowboarder and loves hitting the slopes in Grouse Mountain! 🏂";
                break;
        }

        addBotMessage(response);

        // Show options again
        setTimeout(showOptions, 1000);
    }, 1000);
}

// Update showPage to trigger chat init
const originalShowPage = showPage;
showPage = function (pageId) {
    // Call original logic (we need to redefine it or just copy paste the logic here if we can't hook it easily)
    // Actually, let's just modify the existing showPage function in the file or hook into it.
    // Since I'm appending, I can't easily overwrite the previous function reference without being messy.
    // Better to just update the original showPage function in a separate edit or assume I can overwrite it here if I replace the whole file content or use a smarter replace.

    // Let's just do the DOM logic manually here to be safe and simple
    document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        activeSection.style.display = 'block';
        setTimeout(() => activeSection.classList.add('active'), 10);
    }

    // Update Nav
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.innerText.toLowerCase() === pageId) link.classList.add('active');
    });

    // Chatbot Hook
    if (pageId === 'contact') {
        initChat();
    }
};