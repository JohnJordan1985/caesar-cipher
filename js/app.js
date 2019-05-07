//let alphabetLowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let alphabetUpperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let userInputMessageFieldset = document.getElementById("user_input_message");
function updateListWithNewUserInput (listToFill) {
	let inputElementsCollection = userInputMessageFieldset.children;
	let length = inputElementsCollection.length;
	for(let i = 1; i < length; i++){ // First child of fieldset is a legend, so skip over it
		listToFill[i] = inputElementsCollection[i].value;
	}
}

function getNewListOfUserInputs() {
	let userInputList = [];
	updateListWithNewUserInput(userInputList);
	userInputList.shift(); // To remove legend value from list, as not valid

	console.log("User input is: ", userInputList);
	return userInputList;
}

function getNumericalValueOfLetterOffsetted(passedInLetterToCheck) {
	var letterToCheck = passedInLetterToCheck.toString().toUpperCase();
	console.log("Letter to check: ", letterToCheck);
	let index = alphabetUpperCase.findIndex(function(eachLetter){
		return eachLetter === letterToCheck;
	});
	index++; // Need to offset numerical index value of 1, to avoid multiplication by 0
	return index;
}

function updateRelevantOutputElement(numericalIndexOffsetted, newValue){
	document.getElementById("output_char_" + numericalIndexOffsetted).value = newValue;
}

function getEncryptedCharacterValue(plainTextCharacterOffsetted) {
	// Since starting at 1 and ending at 26 for user input, but zero-indexed in alphabet array, ending at 25
	let encryptedIndexValueNotOffset = (parseInt(plainTextCharacterOffsetted)*12)%27;
	console.log("encryptedIndexValueNotOffset: ", encryptedIndexValueNotOffset);
	encryptedIndexValueNotOffset--; // To map back to zero-indexed alphabet arrays, except where value is 0
	return alphabetUpperCase[encryptedIndexValueNotOffset];
}

document.getElementById('encrypt_button').addEventListener("click", function(){
	let listOfUserInputs = getNewListOfUserInputs();
	console.log("value is: ", getNumericalValueOfLetterOffsetted(listOfUserInputs[0]));
	updateRelevantOutputElement(1, getEncryptedCharacterValue(getNumericalValueOfLetterOffsetted(listOfUserInputs[0])));
});


