
import crypto from 'crypto';
export const randomSalt = () => {
    return crypto.randomBytes(16).toString('hex');
}

export const hashPassword = (password, salt) => {
    const hashedPassword =cryptMakeAHash(password, salt);

    return `${salt}:${hashedPassword}`;
};

export const verifyPassword = (password, storedPassword) => {
    const [salt, originalHash] = storedPassword.split(':');
    const hash = cryptMakeAHash(password, salt);
    return hash === originalHash;
};

export const cryptMakeAHash = (password, salt) => {
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');
    return hash;
}

