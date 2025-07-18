


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// Voice Typing Logic
const languageSelect = document.getElementById('language-select');
const transcriptOutput = document.getElementById('transcript-output');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const clearButton = document.getElementById('clear-button');
const statusMessage = document.getElementById('status-message');

let recognition;
let isListening = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        transcriptOutput.value = transcript;
    };

    recognition.onerror = (event) => {
        statusMessage.textContent = "Error: " + event.error;
    };

    startButton.addEventListener('click', () => {
        recognition.lang = languageSelect.value;
        recognition.start();
        isListening = true;
        statusMessage.textContent = "Listening...";
        startButton.disabled = true;
        stopButton.disabled = false;
    });

    stopButton.addEventListener('click', () => {
        recognition.stop();
        isListening = false;
        statusMessage.textContent = "Stopped.";
        startButton.disabled = false;
        stopButton.disabled = true;
    });

    clearButton.addEventListener('click', () => {
        transcriptOutput.value = "";
        statusMessage.textContent = "";
    });
}




function createFloatingShape() {
    const shape = document.createElement('div');
    shape.className = 'shape';
    shape.style.width = Math.random() * 60 + 60 + 'px';
    shape.style.height = shape.style.width;
    shape.style.left = Math.random() * 100 + '%';
    shape.style.top = Math.random() * 100 + '%';
    shape.style.animationDuration = (Math.random() * 10 + 5) + 's';
    shape.style.animationDelay = Math.random() * 5 + 's';
    shape.style.background = `radial-gradient(circle,
        hsla(${Math.random() * 360}, 100%, 70%, 0.4),
        hsla(${Math.random() * 360}, 100%, 60%, 0.2))`;

    document.querySelector('.floating-shapes').appendChild(shape);

    setTimeout(() => {
        shape.remove();
    }, 15000);
}

setInterval(createFloatingShape, 1000);



// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Dynamic background animation
function createFloatingShape() {
    const shape = document.createElement('div');
    shape.className = 'shape';
    shape.style.width = Math.random() * 100 + 30 + 'px';
    shape.style.height = shape.style.width;
    shape.style.left = Math.random() * 100 + '%';
    shape.style.top = Math.random() * 100 + '%';
    shape.style.animationDelay = Math.random() * 6 + 's';
    shape.style.background = `linear-gradient(45deg,
        hsl(${Math.random() * 360}, 70%, 60%),
        hsl(${Math.random() * 360}, 70%, 60%))`;

    document.querySelector('.floating-shapes').appendChild(shape);

    setTimeout(() => {
        shape.remove();
    }, 12000);
}





// Add new floating shapes periodically
setInterval(createFloatingShape, 3000);

// Form submission handler
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Add hover effects to skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect on load
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 100);
});

// Add dynamic color changes to brand logos
document.querySelectorAll('.brand-logo').forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        const colors = ['#00ff88', '#00ccff', '#ff0080', '#ffaa00'];
        this.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.color = colors[Math.floor(Math.random() * colors.length)];
    });
});

// Add parallax effect to floating shapes
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * speed}deg)`;
    });
});

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotNotification = document.getElementById('chatbotNotification');

    let isChatOpen = false;
    let hasNewMessage = true;

    // Initial greeting
    setTimeout(() => {
        addBotMessage("Hello! I'm Gayantha Lochana, your portfolio assistant. I specialize in Programming, Web Development, and Design. How can I help you today?");
        showQuickReplies([
            "Tell me about your skills",
            "Show me your portfolio",
            "Contact on WhatsApp",
            "Where are you from?"
        ]);
    }, 2000);

    // Toggle chat window
    chatbotToggle.addEventListener('click', function() {
        isChatOpen = !isChatOpen;

        if (isChatOpen) {
            chatbotWindow.classList.add('active');
            hasNewMessage = false;
            chatbotNotification.style.display = 'none';
        } else {
            chatbotWindow.classList.remove('active');
        }
    });

    // Close chat window
    chatbotClose.addEventListener('click', function() {
        isChatOpen = false;
        chatbotWindow.classList.remove('active');
    });

    // Send message on button click
    chatbotSend.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatbotInput.value = '';
            processUserMessage(message);
        }
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(text) {
        // If chat is closed and this is a new message, show notification
        if (!isChatOpen && !hasNewMessage) {
            hasNewMessage = true;
            chatbotNotification.style.display = 'flex';
        }

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatbotMessages.appendChild(typingDiv);
        scrollToBottom();

        // Remove typing indicator and show message after delay
        setTimeout(() => {
            chatbotMessages.removeChild(typingDiv);

            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            messageDiv.textContent = text;
            chatbotMessages.appendChild(messageDiv);
            scrollToBottom();
        }, 1500);
    }

    function showQuickReplies(replies) {
        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.className = 'quick-replies';

        replies.forEach(reply => {
            const replyButton = document.createElement('div');
            replyButton.className = 'quick-reply';
            replyButton.textContent = reply;
            replyButton.addEventListener('click', function() {
                addUserMessage(reply);
                processUserMessage(reply);
            });
            quickRepliesDiv.appendChild(replyButton);
        });

        chatbotMessages.appendChild(quickRepliesDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function processUserMessage(message) {
        // Convert message to lowercase for easier matching
        const lowerMessage = message.toLowerCase();

        // Simple response logic - you can expand this
        setTimeout(() => {
            if (lowerMessage.includes('skill') || lowerMessage.includes('what can you do') || lowerMessage.includes('work')) {
                addBotMessage("I'm Gayantha Lochana, specializing in Programming, Web Development, and Design. My skills include HTML, CSS, JavaScript, Python, Adobe Photoshop, and Illustrator. Check out my Skills section for details!");
            }
            else if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('project')) {
                addBotMessage("I've worked on various projects including web development, mobile apps, and graphic design. You can see examples in my Portfolio section.");
            }
            else if (lowerMessage.includes('contact') || lowerMessage.includes('how to reach') || lowerMessage.includes('email') || lowerMessage.includes('whatsapp') || lowerMessage.includes('number')) {
                addBotMessage("You can contact me on WhatsApp at +94 751 168 206. I'm also available through the contact form in the Contact section of my portfolio!");
                showQuickReplies([
                    "Send WhatsApp message",
                    "Back to main menu"
                ]);
            }
            else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('name')) {
                addBotMessage("Hello there! I'm Gayantha Lochana, a programmer and designer from Sri Lanka. How can I help you today?");
            }
            else if (lowerMessage.includes('send whatsapp') || lowerMessage.includes('whatsapp')) {
                addBotMessage("Great! You can message me directly on WhatsApp by clicking this link: https://wa.me/94751168206");
            }
            else if (lowerMessage.includes('school') || lowerMessage.includes('education') || lowerMessage.includes('learn')) {
                addBotMessage("I'm currently a student in Kalmunai, Eastern Province, Sri Lanka, focusing on technology, programming, and creative design.");
            }
            else if (lowerMessage.includes('from') || lowerMessage.includes('where') || lowerMessage.includes('location')) {
                addBotMessage("I'm from Kalmunai in the Eastern Province of Sri Lanka, where I work on programming, design, and solar inverter projects.");
            }
            else {
                addBotMessage("I'm not sure I understand. You can ask me about my skills, portfolio, or how to contact me on WhatsApp.");
            }

            // Show quick replies based on context
            if (lowerMessage.includes('skill')) {
                showQuickReplies([
                    "Which programming languages?",
                    "What design tools?",
                    "Contact on WhatsApp",
                    "Back to main menu"
                ]);
            } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('work')) {
                showQuickReplies([
                    "Show web projects",
                    "Show design work",
                    "Contact on WhatsApp",
                    "Back to main menu"
                ]);
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('whatsapp')) {
                // Already shown above
            } else {
                showQuickReplies([
                    "Tell me about your skills",
                    "Show me your portfolio",
                    "Contact on WhatsApp",
                    "Where are you from?"
                ]);
            }
        }, 500);
    }

    // Singlish to Unicode Converter Logic
    const singlishInput = document.getElementById('singlishInput');
    const unicodeOutput = document.getElementById('unicodeOutput');
    const convertButton = document.getElementById('convertButton');

    if (convertButton) {
        convertButton.addEventListener('click', async () => {
            const textToConvert = singlishInput.value.trim();
            if (textToConvert) {
                try {
                    const convertedText = await convertToUnicode(textToConvert);
                    unicodeOutput.value = convertedText;
                } catch (error) {
                    unicodeOutput.value = 'Error converting text. Please try again.';
                    console.error('Conversion Error:', error);
                }
            } else {
                unicodeOutput.value = 'Please enter some text to convert.';
            }
        });
    }

    async function convertToUnicode(text) {
        try {
            const response = await fetch('https://singlish.kdj.lk/api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text,
                    inputType: 'singlish',
                    format: 'unicode'
                })
            });

            const data = await response.json();

            if (data.status === 'success') {
                return data.result;
            } else {
                throw new Error(data.message || 'Conversion failed');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    let isSigningIn = false;

function signInWithGoogle() {
  if (isSigningIn) return; // prevent multiple clicks

  isSigningIn = true;

  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log("Signed in:", result.user);
      isSigningIn = false;
    })
    .catch((error) => {
      console.error("Error signing in:", error);
      alert("Login failed: " + error.message);
      isSigningIn = false;
    });

