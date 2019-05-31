import getEncryptedCharacterValue from "./encrypt.js";

import {getCoPrimes} from "./math-helpers.js";

const numberInputs = 8;

$("#encrypt_key_list").append(`<label for="user_cipher_key">Cipher Key: </label>`); // avoids HTML validation error regards 'hidden' input element, referenced by 'for' attr

function decorateDocFragEncryptionKeys(docFrag, listOfCoPrimes, inputElemID = 'encrypt_key_') {
	let inputElem, labelInputElem;
	$.each(listOfCoPrimes, (i, number) => {
		inputElem = $("<input id='" + inputElemID + number + "' type='radio' value='" + number + "' name='encrypt-key' />"), labelInputElem = $("<label for='" + inputElemID + number + "' >" + number + "</label>");
		docFrag.append(inputElem.get(0),labelInputElem.get(0));
	});
}

function getUserEncryptionKey(){
	return $("#encrypt_key_list input[name='encrypt-key']:checked").val();
}


function addEncryptionKeysDOM(listOfCoPrimes) {
	let docFrag = document.createDocumentFragment();
	decorateDocFragEncryptionKeys(docFrag, listOfCoPrimes);
	docFrag.firstChild.checked = true;
	$("#encrypt_key_list").append(docFrag);
}


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
	return listUserInput;
}


function updateRelevantOutputElement(outputIndex, encryptedValue){
	document.getElementById("output_char_" + outputIndex).innerHTML = encryptedValue; // rather than value property, as want to include HTML entities
}

// Iterates through output elements, and sets their value with match input element's encrytped value
function setOutputElements($listOfUserInputs, userEncryptionKey) {
	let encryptedCharValue;
	$listOfUserInputs.each((i,e) => {
		encryptedCharValue = getEncryptedCharacterValue($listOfUserInputs[i], userEncryptionKey); // Need to pass in user selected key
		updateRelevantOutputElement(i+1, encryptedCharValue); // elements not zero-indexed
	});
}

addUserInputOutputToDOM(numberInputs);
addEncryptionKeysDOM(getCoPrimes(27));
let $userInputChar1 = $("#user_char_1");
let $outputChar1 = $("#output_char_1");

$('#encrypt_button').click(() => {
	let userEncryptionKey = getUserEncryptionKey();
	let $listOfUserInputs = $(getNewListOfUserInputs());
	setOutputElements($listOfUserInputs, userEncryptionKey);
});