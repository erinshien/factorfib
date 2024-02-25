// Declare variables for the DOM elements that will be manipulated
const btnNewQuestion = document.getElementById("new-question");
const displayedQuestion = document.getElementById("question");
const displayedAnswer = document.getElementById("answer");
const btnTrue = document.getElementById("true-button");
const btnFalse = document.getElementById("false-button");
const displayedMessage = document.getElementById("message");
const displayedRoundsPlayed = document.getElementById("rounds-played");
const displayedUserScore = document.getElementById("score");

let roundsPlayed = 0;
let userScore = 0;

// Create function that fetches data for 1 true/false question
async function fetchQuestion() {
    // Declare variables for category and difficulty input
    const category = document.getElementById("category-dropdown").value;
    // Declare url variable
    const url = `https://opentdb.com/api.php?amount=1&category=${category}&type=boolean`
    // Declare a variable for the JSON statement that is returned
    const response = await fetch(url);
    // If the promise is unfulfilled return an error message
        if (!response.ok) {
            console.error(response.status);
            console.error(await response.text());
            // Display error message in the DOM
        displayedQuestion.textContent = "Sorry, there has been an error retrieving a question for you!";
        displayedAnswer.textContent = "Please try again later.";
        }
    // Convert JSON statement to object
    const { results: [questionObject] } = await response.json();
    return questionObject;
}

// Initialise variable for current question
let currentQuestionObject = null;

// Store current question in variable
async function fetchAndStoreQuestion() {
    currentQuestionObject = await fetchQuestion();
}

function decodeHTMLEntities(text) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;
    return tempElement.textContent || tempElement.innerText;
}

let isButtonDisabled = false;

async function displayQuestion() {
    enableAnswerButtons();

    if (isButtonDisabled) {
        return;
    }

    isButtonDisabled = true;
    btnNewQuestion.disabled = true;

    currentQuestionObject = null;
    await fetchAndStoreQuestion();
    // Declare current question variable
    const currentQuestion = decodeHTMLEntities(currentQuestionObject.question);
    // console.log(currentQuestionObject);
    // Display the question in the DOM
    displayedQuestion.textContent = "Q: " + currentQuestion;
    displayedAnswer.textContent = "A: ";
    // Include line that changes the message to "please submit your answer"
    displayedMessage.textContent = "Please submit your answer by clicking either the TRUE or the FALSE button!"

    setTimeout(() => {
        isButtonDisabled = false;
        btnNewQuestion.disabled = false;
    }, 5000);
}

// Create an event listener that triggers the fetch function when the "new question" button is clicked
btnNewQuestion.addEventListener("click", displayQuestion);

// Create function to disable true/false buttons
function disableAnswerButtons() {
    btnTrue.disabled = true;
    btnFalse.disabled = true;
}

// Create function to enable true/false buttons
function enableAnswerButtons() {
    btnTrue.disabled = false;
    btnFalse.disabled = false;
}

async function userSelectedTrue() {
    disableAnswerButtons();
    // The user's answer is now TRUE
    if (!currentQuestionObject) {
        await fetchAndStoreQuestion();
    }
    const correctAnswer = currentQuestionObject.correct_answer;
    displayedAnswer.textContent = "A: " + correctAnswer;
    // Check user's answer against correct answer
    if (correctAnswer === "True") {
        displayedMessage.textContent = "You are correct! Well done!"
        roundsPlayed++
        userScore++
    } else {
        displayedMessage.textContent = "I'm sorry, that is incorrect. Better luck next time!"
        roundsPlayed++
    }
    displayedRoundsPlayed.textContent = roundsPlayed.toString();
    displayedUserScore.textContent = userScore.toString();
}

// Create an event listener for when the user clicks the "true" button
btnTrue.addEventListener("click", userSelectedTrue);

async function userSelectedFalse() {
    disableAnswerButtons();
    // The user's answer is now FALSE
    if (!currentQuestionObject) {
        await fetchAndStoreQuestion();
    }
    const correctAnswer = currentQuestionObject.correct_answer;
    displayedAnswer.textContent = "A: " + correctAnswer;
    // Check user's answer against correct answer
    if (correctAnswer === "False") {
        displayedMessage.textContent = "You are correct! Well done!"
        roundsPlayed++
        userScore++
    } else {
        displayedMessage.textContent = "I'm sorry, that is incorrect. Better luck next time!"
        roundsPlayed++
    }
    displayedRoundsPlayed.textContent = roundsPlayed.toString();
    displayedUserScore.textContent = userScore.toString();
}

// Create an event listener for when the user clicks the "false" button
btnFalse.addEventListener("click", userSelectedFalse);

// Create an event listener that changes the message to "please click the "new question" button to receive your first question" when the DOM is loaded
document.addEventListener("DOMContentLoaded", initialDisplayedContent);

function initialDisplayedContent() {
    displayedMessage.textContent = "Please click the NEW QUESTION button to receive your first question!"
    displayedRoundsPlayed.textContent = roundsPlayed.toString();
    displayedUserScore.textContent = userScore.toString();
    disableAnswerButtons();
}

const dropdownMenu = document.getElementById("category-dropdown");
const image = document.getElementById("image");

image.src = "icons/question_7484754.png"

dropdownMenu.addEventListener("change", function() {

    let selectedCategory = dropdownMenu.value;

    if (selectedCategory === "25") {
        image.src = "icons/painting_2071413.png"
    } else if (selectedCategory === "27") {
        image.src = "icons/pawprints_372115.png"
    } else if (selectedCategory === "10") {
        image.src = "icons/book_12532141.png"
    } else if (selectedCategory === "29") {
        image.src = "icons/pow_9824263.png"
    } else if (selectedCategory === "11") {
        image.src = "icons/clapperboard_408426.png"
    } else if (selectedCategory === "22") {
        image.src = "icons/globe_5597126.png"
    } else if (selectedCategory === "23") {
        image.src = "icons/manuscript_9300805.png"
    } else if (selectedCategory === "12") {
        image.src = "icons/music-note_5391441.png"
    } else if (selectedCategory === "20") {
        image.src = "icons/poseidon_2298934.png"
    } else if (selectedCategory === "17") {
        image.src = "icons/science_6747064.png"
    } else if (selectedCategory === "21") {
        image.src = "icons/sport_2682032.png"
    } else if (selectedCategory === "14") {
        image.src = "icons/television_8743311.png"
    } else if (selectedCategory === "15") {
        image.src = "icons/recreational_1655720.png"
    } else {
        image.src = "icons/question_7484754.png"
    }

})
