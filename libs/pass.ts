import * as bcrypt from "bcryptjs";

export default async function salt(password: string) {
    return bcrypt.hashSync(password, 8);
}