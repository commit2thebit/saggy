const questions = [
    {
        question: "How often do you host guests?",
        options: [
            { text: "Rarely", description: "<em>Netflix and chill doesn’t count as hosting.</em>" },
            { text: "Occasionally", description: "<em>Wine night for two is hosting, right?</em>" },
            { text: "Frequently", description: "<em>People don’t leave your house till 2 AM. Every weekend.</em>" }
        ],
        category: "hosting",
    },
    {
        question: "How often do you cook at home?",
        options: [
            { text: "LOL, what’s a stove?", description: "<em>Takeout life forever.</em>" },
            { text: "Does pasta count as cooking?", description: "<em>Boiling water is a skill.</em>" },
            { text: "I’d sprinkle in some cooking if my GF wanted to", description: "<em>Smooth operator.</em>" },
            { text: "Where’s my Michelin star?", description: "<em>Gordon Ramsay, who?</em>" }
        ],
        category: "cooking",
    },
    {
        question: "How important is music in your life?",
        options: [
            { text: "Background noise is fine.", description: "<em>Silence is awkward, sure.</em>" },
            { text: "I like my tunes.", description: "<em>Casual Spotify playlists for the win.</em>" },
            { text: "Whole-house concert vibes. Give me the good stuff.", description: "<em>Bring the party to every room.</em>" },
            { text: "Girlfriend says record player will get you some serious ROI. ;)", description: "<em>P.S. She's right.</em>" }
        ],
        category: "music",
    },
];

let currentQuestionIndex = 0;
let scores = {
    hosting: 0,
    cooking: 0,
    music: 0,
};

function showIntroPage() {
    document.getElementById("intro-page").classList.remove("hidden");
    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("results-container").classList.add("hidden");
}

function startQuiz() {
    document.getElementById("intro-page").classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.classList.remove("hidden");
    const currentQuestion = questions[currentQuestionIndex];

    questionContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <div>
            ${currentQuestion.options
                .map(
                    (option, index) => `
                    <button class="option-btn" onclick="selectOption(${index}, this)">
                        ${option.text}
                        <small>${option.description}</small>
                    </button>
                `
                )
                .join("")}
        </div>
    `;
}

function selectOption(index, button) {
    button.style.backgroundColor = "#d4edda";
    button.style.color = "#155724";

    const category = questions[currentQuestionIndex].category;
    scores[category] += index + 1;
    currentQuestionIndex++;

    setTimeout(() => {
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 300);
}

function showResults() {
    const resultsContainer = document.getElementById("results-container");
    const questionContainer = document.getElementById("question-container");
    questionContainer.classList.add("hidden");
    resultsContainer.classList.remove("hidden");

    const procureItems = [
        "<li>Bottle Opener: <a href='https://www.lecreuset.com/'>Le Creuset Waiter's Friend</a></li>",
        ...(scores.music > 3
            ? ["<li>Record Player: <a href='https://www.project-audio.com/en/product/debut-carbon-evo/'>Pro-Ject Debut Carbon EVO</a></li>"]
            : []),
    ];

    const wishlistItems = [
        "<li>High-end Chess Set: <a href='https://www.hermes.com/us/en/'>Hermès Chess Set</a></li>",
        ...(scores.cooking > 3
            ? ["<li>Cookware Set: <a href='https://www.carawayhome.com/'>Caraway Cookware</a></li>"]
            : []),
        ...(scores.music > 3
            ? ["<li>Portable Speaker: <a href='https://www.sonos.com/en-us/shop/move.html'>Sonos Move</a></li>"]
            : []),
    ];

    document.getElementById("results").innerHTML = `
        <h3>Procure ASAP:</h3>
        <ul>${procureItems.join("")}</ul>
        <h3>Shop Around/Wishlist:</h3>
        <ul>${wishlistItems.join("")}</ul>
    `;
}

document.getElementById("start-btn").addEventListener("click", startQuiz);

showIntroPage();
