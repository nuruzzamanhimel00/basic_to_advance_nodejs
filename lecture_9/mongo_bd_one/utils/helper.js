import crypto from "crypto";


// =============================
// Random Salt
// =============================
export const randomSalt = () => {

    return crypto.randomBytes(16).toString("hex");

};


// =============================
// Hash Password
// =============================
export const hashPassword = (password, salt) => {

    const hashedPassword = cryptMakeAHash(password, salt);

    return `${salt}:${hashedPassword}`;

};


// =============================
// Verify Password
// =============================
export const verifyPassword = (password, storedPassword) => {

    const [salt, originalHash] = storedPassword.split(":");

    const hash = cryptMakeAHash(password, salt);

    return hash === originalHash;

};


// =============================
// Create Hash
// =============================
export const cryptMakeAHash = (password, salt) => {

    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

    return hash;

};