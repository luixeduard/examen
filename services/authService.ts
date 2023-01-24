import * as bcrypt from "bcryptjs";

export default async function validate (password: string, dbPassword: string) {
    return await bcrypt.compare(password, dbPassword);
}