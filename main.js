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

async function displayQuestion() {
    currentQuestionObject = null;
    await fetchAndStoreQuestion();
    const currentQuestion = currentQuestionObject.question;
    console.log(currentQuestionObject);
    // Display the question in the DOM
    displayedQuestion.textContent = "Q: " + currentQuestion;
    displayedAnswer.textContent = "A: ";
    // Include line that changes the message to "please submit your answer"
    displayedMessage.textContent = "Please submit your answer by clicking either the TRUE or the FALSE button!"
}

// Create an event listener that triggers the fetch function when the "new question" button is clicked
btnNewQuestion.addEventListener("click", displayQuestion);

async function userSelectedTrue() {
    // The user's answer is now TRUE
    if (!currentQuestionObject) {
        await fetchAndStoreQuestion();
    }
    const correctAnswer = currentQuestionObject.correct_answer;
    displayedAnswer.textContent = "A: " + correctAnswer;
    // Check user's answer against correct answer
    if (correctAnswer === "True") {
        displayedMessage.textContent = "You are correct! Well done! Please wait a few seconds before clicking NEW QUESTION."
        roundsPlayed++
        userScore++
    } else {
        displayedMessage.textContent = "I'm sorry, that is incorrect. Better luck next time! Please wait a few seconds before clicking NEW QUESTION."
        roundsPlayed++
    }
    displayedRoundsPlayed.textContent = roundsPlayed.toString();
    displayedUserScore.textContent = userScore.toString();
}

// Create an event listener for when the user clicks the "true" button
btnTrue.addEventListener("click", userSelectedTrue);

async function userSelectedFalse() {
    // The user's answer is now FALSE
    if (!currentQuestionObject) {
        await fetchAndStoreQuestion();
    }
    const correctAnswer = currentQuestionObject.correct_answer;
    displayedAnswer.textContent = "A: " + correctAnswer;
    // Check user's answer against correct answer
    if (correctAnswer === "False") {
        displayedMessage.textContent = "You are correct! Well done! Please wait a few seconds before clicking NEW QUESTION."
        roundsPlayed++
        userScore++
    } else {
        displayedMessage.textContent = "I'm sorry, that is incorrect. Better luck next time! Please wait a few seconds before clicking NEW QUESTION."
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
}
