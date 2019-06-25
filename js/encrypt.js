//let alphabetLowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const alphabetUpperCase = ["--", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const modulus = alphabetUpperCase.length;

function getNumericalValueOfLetter(letter) {
	var letterToCheck = letter.toString().toUpperCase();
	return alphabetUpperCase.findIndex(function(eachLetter){
		return eachLetter === letterToCheck;
	});
}

function getModInverse(num, modulus) {
	for(var i = 1; i < modulus; i++){
		if((num*i)%modulus === 1) {
			return i;
		}
	}
	return "--";
}

export function getEncryptedCharacterValue(plainTextChar, userEncryptionKey) {
	let numericalValuePlainTextChar = getNumericalValueOfLetter(plainTextChar);
	numericalValuePlainTextChar = (numericalValuePlainTextChar >= 0) ? numericalValuePlainTextChar : 0 ; // catch cases where '-1' if not in alphabetUpperCase array
	let encryptedIndexValueNotOffset = (numericalValuePlainTextChar*userEncryptionKey)%modulus;
	return alphabetUpperCase[encryptedIndexValueNotOffset];
}

export function getDecryptedCharacterValue(cipherTextChar, key, modulus) {
	//console.log(cipherTextChar, key, modulus)
	let numericalValueCipherTextChar = getNumericalValueOfLetter(cipherTextChar);	
	//console.log('letter value is ', numericalValueCipherTextChar);
	console.log('modInerse is:', getModInverse(key, modulus));
	return alphabetUpperCase[(getModInverse(key, modulus)*numericalValueCipherTextChar)%modulus];
}