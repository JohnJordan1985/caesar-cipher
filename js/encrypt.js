//let alphabetLowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const alphabetUpperCase = ["--", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function getNumericalValueOfLetter(letter) {
	var letterToCheck = letter.toString().toUpperCase();
	return alphabetUpperCase.findIndex(function(eachLetter){
		return eachLetter === letterToCheck;
	});
}

export default function getEncryptedCharacterValue(plainTextChar, userEncryptionKey) {
	let numericalValuePlainTextChar = getNumericalValueOfLetter(plainTextChar);
	numericalValuePlainTextChar = (numericalValuePlainTextChar >= 0) ? numericalValuePlainTextChar : 0 ; // catch cases where '-1' if not in alphabetUpperCase array
	let encryptedIndexValueNotOffset = (numericalValuePlainTextChar*userEncryptionKey)%27;
	return alphabetUpperCase[encryptedIndexValueNotOffset];
}