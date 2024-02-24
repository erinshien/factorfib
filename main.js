// Declare variables for the DOM elements that will be manipulated
const btnNewQuestion = document.getElementById("new-question");
const displayedQuestion = document.getElementById("question");
const displayedAnswer = document.getElementById("answer");
const btnTrue = document.getElementById("true-button");
const btnFalse = document.getElementById("false-button");
const displayedMessage = document.getElementById("message");
const roundsPlayed = document.getElementById("rounds-played");
const userScore = document.getElementById("score");

// Declare url variable ✅
const url = "https://opentdb.com/api.php?amount=1&category=27&type=boolean";

// Create function that fetches data for 1 true/false question ✅
async function fetchQuestion() {
    // Declare a variable for the JSON statement that is returned ✅
    const response = await fetch(url);
    // If the promise is unfulfilled return an error message ✅
        if (!response.ok) {
            console.error(response.status);
            console.error(await response.text());
            // Display error message in the DOM ✅
        displayedQuestion.textContent = "Sorry, there has been an error retrieving a question for you!";
        displayedAnswer.textContent = "Please try again later.";
        }
    // Convert JSON statement to object
    const { results: [questionObject] } = await response.json();
    return questionObject;
}

// Extract the information required from fetched data
// Question
// Correct answer

async function displayQuestion() {
    const questionObject = await fetchQuestion();
    
}

// Create an event listener that triggers the fetch function when the "new question" button is clicked
// Display the question in the DOM
// Include line that changes the message to "please submit your answer"

// Declare a variable for the user's answer

// Create an event listener for when the user clicks the "true" button
// The user's answer is now true
// Call the answer check function

// Create an event listener for when the user clicks the "false" button
// The user's answer is now false
// Call the answer check function

// Create a function that checks if the user's answer matches the API listed answer
// Update the "answer" paragraph element to include the answer
// If the answer matches, change the message to "well done", increase score by 1
// If the answer does not match, change the message to "better luck next time"

// Create an event listener that changes the message to "please click the "new question" button to receive your first question" when the DOM is loaded ✅
document.addEventListener("DOMContentLoaded", initiateDisplayedMessage);

function initiateDisplayedMessage() {
    displayedMessage.textContent = "Please click the NEW QUESTION button to receive your first question!"
}
