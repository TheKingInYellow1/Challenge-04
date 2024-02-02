var startBtn = document.querySelector("#startBtn");
var timeEl = document.querySelector("#timer");
var viewHS = document.querySelector("#viewHS");

var quizView = document.querySelector("#quizView");
var welcomeView = document.querySelector("#welcomeView");
var resultView = document.querySelector("#resultView");
var highScoreView = document.querySelector("#highScoreView");

var questionEl = document.querySelector("#question");
var btn1 = document.querySelector("#btn1");
var btn2 = document.querySelector("#btn2");
var btn3 = document.querySelector("#btn3");
var btn4 = document.querySelector("#btn4");

var finalScore = document.querySelector("#finalScore");
var userInitial = document.querySelector("#userInitial");
var submitBtn = document.querySelector("#submitBtn");

var highScore1 = document.querySelector("#highScore1");
var highScore2 = document.querySelector("#highScore2");
var highScore3 = document.querySelector("#highScore3");
var highScore4 = document.querySelector("#highScore4");
var highScore5 = document.querySelector("#highScore5");

var answer = 0;
var questionNum = 0;
var score = 0;

var goBack = document.querySelector("#goBack");
var clearHighScore = document.querySelector("#clearHighScore");

var timeLeft = 0;
var timeInterval;

var questions = [ 
	[3, "Commonly used data types DO NOT include: ", 
	"1. strings", "2. booleans", "3. alerts", "4. numbers"], 
	[3, "The condition in as if / else statement is enclosed within: ", 
	"1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"], 
	[4, "Arrays in JavaScript can be used to store: ", 
	"1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
	[1, "String values must be enclosed within _____ when being assigned to variables.",
	"1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
	[4, "A very useful tool used during development and debugging for printing content to the debugger is: ",
	"1. JavaScript", "2. terminal / bash", "3. for loops", "4. console log"]
]

var highScores = [
	[ "", 0, 0],
	[ "", 0, 0],
	[ "", 0, 0],
	[ "", 0, 0],
	[ "", 0, 0]
]

function clearView() {
	quizView.style.display = "none";
	welcomeView.style.display = "none";
	resultView.style.display = "none";
	highScoreView.style.display = "none";
}

function welcome() {
	clearView();
	welcomeView.style.display = "block";
}

function quiz() {
	clearView();
	quizView.style.display = "block";
	startTimer();
	questionNum = 0;
	score = 0;
	askQuestion(questionNum);
}

function startTimer() {
	timeLeft = 30;
	timeEl.textContent = "Time: " + timeLeft;
	timeInterval = setInterval(function () {
		--timeLeft;
		if (timeLeft >= 10) timeEl.textContent = "Time: " + timeLeft;
		else timeEl.textContent = "Time: 0" + timeLeft;
		if (timeLeft < 1) {
			results();
			clearInterval(timeInterval);
		}
	}, 1000);
}

function askQuestion(qstn) {
	answer = questions[qstn][0];
	questionEl.textContent = questions[qstn][1];
	btn1.textContent = questions[qstn][2];
	btn2.textContent = questions[qstn][3];
	btn3.textContent = questions[qstn][4];
	btn4.textContent = questions[qstn][5];
}

function btn(choice) {
	if (choice === answer) ++score;
	else timeLeft -= 5;
	++questionNum;
	if (questionNum < questions.length) askQuestion(questionNum);
	else {
		clearInterval(timeInterval);
		results();
	}
}

function results() {
	clearView();
	resultView.style.display = "block";
	finalScore.textContent = score;
}

function submitResults(event) {
	event.preventDefault();
	if (userInitial.value === "") return;
	highScores.push([userInitial.value, score, timeLeft]);
	sortScores();
	timeLeft = 0;
	timeEl.textContent = "Time: 0" + timeLeft;
	highScore();
}

function sortScores() {
	var lengthHS = highScores.length-1;
	for (var i = 0; i < lengthHS; i++) {
		if (highScores[lengthHS][1] > highScores[i][1]) highScores.splice(i, 0, highScores[lengthHS]);
		else if (highScores[lengthHS][1] === highScores[i][1] && highScores[lengthHS][2] >= highScores[i][2]) 
			highScores.splice(i, 0, highScores[lengthHS]);
	}
	highScores.pop();
	highScores.pop();
}

function highScore() {
	clearView(); 
	highScoreView.style.display = "block";
	if (highScores[0][0] === "") highScore1.textContent = "";
	else highScore1.textContent = highScores[0][0] + ", Score: " + highScores[0][1] + ", Time: " + highScores[0][2];
	if (highScores[1][0] === "") highScore2.textContent = "";
	else highScore2.textContent = highScores[1][0] + ", Score: " + highScores[1][1] + ", Time: " + highScores[1][2];
	if (highScores[2][0] === "") highScore3.textContent = "";
	else highScore3.textContent = highScores[2][0] + ", Score: " + highScores[2][1] + ", Time: " + highScores[2][2];
	if (highScores[3][0] === "") highScore4.textContent = "";
	else highScore4.textContent = highScores[3][0] + ", Score: " + highScores[3][1] + ", Time: " + highScores[3][2];
	if (highScores[4][0] === "") highScore5.textContent = "";
	else highScore5.textContent = highScores[4][0] + ", Score: " + highScores[4][1] + ", Time: " + highScores[4][2];
} //unsure how to do this in a for loop, without using linebreaks rather than multiple html 
//and if I do that I don't know how style every other line with a purple background

function clearHS() {
	highScores = [
		[ "", 0, 0],
		[ "", 0, 0],
		[ "", 0, 0],
		[ "", 0, 0],
		[ "", 0, 0]
	]
	highScore1.textContent = "";
	highScore2.textContent = "";
	highScore3.textContent = "";
	highScore4.textContent = "";
	highScore5.textContent = "";
}

viewHS.addEventListener("click", highScore);
startBtn.addEventListener("click", quiz);

btn1.addEventListener("click", function() { btn(1) });
btn2.addEventListener("click", function() { btn(2) });
btn3.addEventListener("click", function() { btn(3) });
btn4.addEventListener("click", function() { btn(4) });

submitBtn.addEventListener("click", submitResults);

goBack.addEventListener("click", welcome);
clearHighScore.addEventListener("click", clearHS);