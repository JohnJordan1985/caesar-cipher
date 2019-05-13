//let alphabetLowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const alphabetUpperCase = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numberInputs = 3;

function addUserInputOutputToDOM(numElementsToAdd) {
	let $docFragInputs = $(document.createDocumentFragment());
	let $docFragOutputs = $(document.createDocumentFragment());
	for(var i = 1; i <= numElementsToAdd; i++) {
		$docFragInputs.append($("<input id='user_char_" + i + "' type='text' maxlength='1' class='user-input' />"));
		$docFragOutputs.append($("<output name='result' form='input_form' for='user_char_" + i + "' id='output_char_" + i + "' > </output>"));
	}
	$("#user_input_message").append($docFragInputs);
	$("#output_section .output-group").append($docFragOutputs);
}

function getNewListOfUserInputs() {
	let listUserInput =  [];
	$(".user-input").each(function(i,e){
		listUserInput[i] = e.value;
	});
	console.log(listUserInput);
	return listUserInput;
}

function getNumericalValueOfLetter(passedInLetterToCheck) {
	var letterToCheck = passedInLetterToCheck.toString().toUpperCase();
	console.log("Letter to check: ", letterToCheck);
	return alphabetUpperCase.findIndex(function(eachLetter){
		return eachLetter === letterToCheck;
	});
}

function updateRelevantOutputElement(numericalIndexOffsetted, newValue){
	document.getElementById("output_char_" + numericalIndexOffsetted).value = newValue;
}

function getEncryptedCharacterValue(plainTextCharArg, userEncryptionKey) {
	let plainTextChar = plainTextCharArg.toString().toUpperCase();
	console.log('plainTextChar is: ', plainTextChar);
	let plainTextCharValue = alphabetUpperCase.findIndex(function(element){
		return element === plainTextChar;
	});
	console.log('plainTextChar VALUE is: ', plainTextCharValue);
	let numericalValuePlainTextChar = getNumericalValueOfLetter(plainTextChar);
	let encryptedIndexValueNotOffset = (numericalValuePlainTextChar*userEncryptionKey)%27;
	console.log("encryptedIndexValueNotOffset: ", encryptedIndexValueNotOffset);
	return alphabetUpperCase[encryptedIndexValueNotOffset];
}

function runCipher(userEncryptionKey) {
	let listOfUserInputs = getNewListOfUserInputs();
	console.log("value is: ", getNumericalValueOfLetter(listOfUserInputs[0]));
	let encryptedCharValue = getEncryptedCharacterValue(listOfUserInputs[0], userEncryptionKey); // Need to pass in user selected key
	console.log('encryptedCharValue: ', encryptedCharValue);
	$outputChar1.val(encryptedCharValue);
}

function getGCD(a, b) {
	let t;
    while(b != 0){
        t = a;
        a = b;
        b = t%b;
    }
    return a;
}

function getCoPrimes(modulus) {
	let numbers = [];
	for(let i = 1; i < modulus; i++ ) {
		numbers.push(i);
	}
	console.log("Numbers are:", numbers);
	let coPrimes = numbers.filter(number => {
		return getGCD(number, modulus) === 1;
	});
	console.log("coPrimes are: ", coPrimes);
	return coPrimes;
}

function decorateDocFragEncryptionKeys(docFrag, listOfCoPrimes, inputElemID = 'encrypt_key_') {
	let inputElem, labelInputElem;
	$.each(listOfCoPrimes, (i, number) => {
		inputElem = $("<input id='" + inputElemID + number + "' type='radio' value='" + number + "' name='encrypt-key' />"), labelInputElem = $("<label for='" + inputElemID + number + "' >" + number + "</label>");
		docFrag.append(inputElem.get(0),labelInputElem.get(0));
	});
}


function addEncryptionKeysDOM(listOfCoPrimes) {
	let docFrag = document.createDocumentFragment();
	decorateDocFragEncryptionKeys(docFrag, listOfCoPrimes);
	docFrag.firstChild.checked = true;
	$("#encrypt_key_list").append(docFrag);
}

function getUserEncryptionKey(){
	return $("#encrypt_key_list input[name='encrypt-key']:checked").val();
}


addUserInputOutputToDOM(numberInputs);
addEncryptionKeysDOM(getCoPrimes(27));
console.log(getGCD(3,10));
console.log(getGCD(3,9));
console.log(getCoPrimes(27));


let $userInputChar1 = $("#user_char_1");
let $outputChar1 = $("#output_char_1");

$('#encrypt_button').click(() => {
	let userEncryptionKey = getUserEncryptionKey();
	runCipher(userEncryptionKey);

});