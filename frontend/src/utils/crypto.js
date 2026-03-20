import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_AES_SECRET_KEY || "PythonLearnSecretKey226Secure414";
const key = CryptoJS.SHA256(SECRET_KEY)
console.log('FRONTEND SECRET:', SECRET_KEY)
console.log('FRONTEND SHA256:', key.toString())
export const decryptPayload = (encryptedData) => {
  // 1. Safety check
  if (!encryptedData || !encryptedData.iv || !encryptedData.ciphertext) {
    return encryptedData;
  }

  try {
    // 2. Hash the string to get a perfect 256-bit key (Matches Python exactly)
    const key = CryptoJS.SHA256(SECRET_KEY);
    const iv = CryptoJS.enc.Base64.parse(encryptedData.iv);

    // 3. Decrypt
    const decrypted = CryptoJS.AES.decrypt(encryptedData.ciphertext, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    // 4. Convert to string
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);

    // 5. Catch empty strings (wrong key) before they break JSON.parse
    if (!decryptedString) {
      throw new Error("Decrypted string is empty. Keys still do not match.");
    }

    return JSON.parse(decryptedString);

  } catch (err) {
    console.error("🛑 AES Decryption Failed!", err.message);
    throw err;
  }
};
