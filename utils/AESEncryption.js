const crypto = require('crypto');

const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || ""

function ByteArrayToString(ba) {
    return ba.toString('hex');
}

function AES256Encryptor(plainText) {
    if (!plainText) {
        return plainText;
    }

    const key = Buffer.from(encryptionKey, 'utf8');
    const cipher = crypto.createCipheriv('aes-256-ecb', key, Buffer.alloc(0));
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return "\\x" + ByteArrayToString(Buffer.from(encrypted, 'hex'));
}

function SHA256Hash(input = []) {
    const hash = crypto.createHash('sha256');
    hash.update(input.join("|"));
    return hash.digest('hex');
}


function uniqueMsgID() {
    const bytes = crypto.randomBytes(Math.ceil(24 / 2));
    const hexString = bytes.toString('hex').slice(0, 24);
    return hexString;
}



export { AES256Encryptor, SHA256Hash, uniqueMsgID };