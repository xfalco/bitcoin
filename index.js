var bit = require('bitcore-lib');
var prompt = require('prompt');
var bip38 = require('bip38');
var wif = require('wif');

prompt.start();
console.log("enter bip38 encrypted key, password, private key, public key, public key (compressed), address, address (uncompressed)");
var key;

prompt.get(['key','password',"private_key","public_key","public_key_compressed","address","address_compressed"], function (err, result) {
  var decryptedKey = bip38.decrypt(result.key, result.password);
  var pk = new bit.PrivateKey(decryptedKey.privateKey);
  var pkComp = new bit.PrivateKey(pk.toString());
  var pub = pk.toPublicKey();
  var pubComp = pkComp.toPublicKey();
  var addr = pk.toAddress();
  var addrComp = pkComp.toAddress();
  console.log("private key            : " + pk.toString());
  console.log("private key compressed : " + pkComp.toString());
  if (pk.toString().toLowerCase() === result.private_key.toLowerCase()) {
    console.log("private keys match!");
  } else {
    console.log("ERROR - private keys do not match");
  }
  console.log("public key             : " + pub.toString());
  console.log("public key compressed  : " + pubComp.toString());
  if (pub.toString().toLowerCase() === result.public_key.toLowerCase() && pubComp.toString().toLowerCase() === result.public_key_compressed.toLowerCase()) {
    console.log("public keys match");
  } else {
    console.log("ERROR -public keys do not match");
  }
  console.log("address                : " + addr.toString());
  console.log("address compressed     : " + addrComp.toString());
  if (addr.toString().toLowerCase() === result.address.toLowerCase() && addrComp.toString().toLowerCase() === result.address_compressed.toLowerCase()) {
    console.log("addresses match");
  } else {
    console.log("ERROR - addresses do not match");
  }
});
