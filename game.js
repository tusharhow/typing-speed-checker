// define the time limit
let TIME_LIMIT = 60;

// define quotes to be used
let quotes_array = [
    "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
    "It's going to be hard, but hard does not mean impossible.",
    "Learning never exhausts the mind.",
    "The only way to do great work is to love what you do.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
];

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
    quote_text.textContent = null;
    current_quote = quotes_array[quoteNo];

    // separate each character and make an element
    // out of each of them to individually style them
    current_quote.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.innerText = char;
        quote_text.appendChild(charSpan);
    });

    // roll over to the first quote
    if (quoteNo < quotes_array.length - 1) quoteNo++;
    else quoteNo = 0;
}

function processCurrentText() {
    // get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split("");

    // increment total characters typed
    characterTyped++;

    errors = 0;

    quoteSpanArray = quote_text.querySelectorAll("span");
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index];

        // characters not currently typed
        if (typedChar == null) {
            char.classList.remove("correct_char");
            char.classList.remove("incorrect_char");

            // correct characters
        } else if (typedChar === char.innerText) {
            char.classList.add("correct_char");
            char.classList.remove("incorrect_char");

            // incorrect characters
        } else {
            char.classList.add("incorrect_char");
            char.classList.remove("correct_char");

            // increment number of errors
            errors++;
        }
    });

    // display the number of errors
    error_text.textContent = total_errors + errors;

    // update accuracy text
    let correctCharacters = characterTyped - (total_errors + errors);
    let accuracyVal = (correctCharacters / characterTyped) * 100;
    accuracy_text.textContent = Math.round(accuracyVal);

    if (curr_input.length == current_quote.length) {
        updateQuote();

        // update total errors
        total_errors += errors;

        // clear the input area
        input_area.value = "";
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        // decrease the current time left
        timeLeft--;

        // increase the time elapsed
        timeElapsed++;

        // update the timer text
        timer_text.textContent = timeLeft + "s";
    } else {
        // finish the game
        finishGame();
    }
}

function finishGame() {
    // stop the timer
    clearInterval(timer);

    input_area.disabled = true;

    quote_text.textContent = "Click on restart to start a new test.";

    restart_btn.style.display = "block";

    cpm = Math.round((characterTyped / timeElapsed) * 60);
    wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;

    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}

function startGame() {
    resetValues();
    updateQuote();

   
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = "Click on the area below to start the test.";
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + "s";
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}
