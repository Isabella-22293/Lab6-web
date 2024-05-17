import bcrypt from 'bcryptjs'

export const rondasSalt = 10;

export function converter(password) {
    const key = bcrypt.genSaltSync(rondasSalt);
    return bcrypt.hashSync(password, key);
}

export function deHashear (password, hash) {
    return bcrypt.compareSync(password, hash);
}