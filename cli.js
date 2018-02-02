//Required conncetions
const inquirer = require('inquirer');
const _ = require('lodash');

//variables
let words = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'indigo', 'violet', 'purple'];
let letter;
var currentWord;
let blank = new Array();

//Constructors
class Letter{
	constructor(input){
		this.letter = input,
		this.blank = '_'
	}
}

class Word{
	constructor(word){
		this.word = word;
		this.length = word.length;
	}
	blankSpaces(){
		for (var i = 0; i < this.word.length; i++) {
			blank.push('_');
		}
	}
	letterCheck(letter){
		let wordArray = this.word.split('');
		// console.log(wordArray);
		// console.log(currentLetter.letter);
		let findLetter = currentLetter.letter.letter;
		// console.log('string ->',findLetter);
		let letterIndex = _.indexOf(wordArray, findLetter);
		// console.log(letterIndex);
		blank[letterIndex] = findLetter;
		let after = letterIndex + 1;
		let letterIndex2 = _.indexOf(wordArray, findLetter, after);
		// console.log('2nd index:', letterIndex2);
		if (letterIndex2 != '-1'){
			blank[letterIndex2] = findLetter;
		}
		// console.log(blank);
	}
}

//------------
// Functions
//-------------

//Get input from user and 
function userInput(){
	
	console.log(blank);
	let stop = _.indexOf(blank, '_');
	if (stop != '-1'){
		inquirer.prompt(
			{type: 'input',
			 name: 'letter',
			 message: 'What is your guess?' //,
			 // validate: function (input) {
				//     // Declare function as asynchronous, and save the done callback
				//     let done = this.async();
				 
				//     // Do async stuff
				//     setTimeout(function() {
				//       if (typeof input !== 'string') {
				//         // Pass the return value in the done callback
				//         done('You need to provide a letter');
				//         return;
				//       }
				//       // Pass the return value in the done callback
				//       done(null, true);
				//     }, 5000);
				  
			}).then((result)=>{
				
					currentLetter = new Letter(result);
					// console.log(currentLetter);
					// console.log('Current Word: ',currentWord);
					currentWord.letterCheck(currentLetter);
					userInput();

			}).catch((err)=>{
				console.log(err);
			});
	}
	else {
		console.log('new word');
		loopFunc();
	}
}

function makeWord(){
	let index = Math.floor(Math.random()*(words.length));
	wordHolder = words[index];
	words.splice(index,1);
	// console.log(words.length);
	currentWord = new Word(wordHolder);
	currentWord.blankSpaces();
	console.log(wordHolder);
	// console.log(currentWord);
	// console.log(blank);

}

//loop through all the words
function loopFunc(){
	blank = new Array();
	console.log(words.length);
	if (words.length >= 0){
		makeWord();
		userInput();
	}
	else {
		console.log('end of game');
	}
}

//run program
makeWord();
// console.log(words.length);
userInput();