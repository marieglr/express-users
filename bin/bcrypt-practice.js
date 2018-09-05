const bcrypt = require("bcrypt");

// ENCRYPT passwords with hash() or hashSync()
//  1. Sign Up
//  2. Seed file for creating users
const encryptedFox = bcrypt.hashSync("fox", 10);
console.log(encryptedFox);

const encryptedEmpty = bcrypt.hashSync("", 10);
console.log(encryptedEmpty);


// COMPARE passwords with compare() or compareSync()
//  1. Log In
console.log( bcrypt.compareSync("fox", encryptedFox) );
console.log( bcrypt.compareSync("asd", encryptedFox) );
