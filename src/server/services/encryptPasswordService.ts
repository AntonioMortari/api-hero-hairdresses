import bcrypt from 'bcrypt';

const SALT = 10;

const hash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT);
};

const compare = async (
    password: string,
    encryptedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, encryptedPassword);
};

export { compare, hash };
