import DB from "@/services/databaseService"
import salt from "./pass"

export const getUser = async (email: string) => {
    const [result] = await DB.query('SELECT * FROM usuarios WHERE email="' + email + '";') as any[]
    if (result.length == 0) {
        return null
    }
    return result[0];
}

export const createFirstUser = async () => {
    try {
        const user = await getUser("lsalashdez@outlook.com") as any[];
        if (user) {
            const email = "lsalashdez@outlook.com";
            const pass = await salt("12345");
            const user = { email, pass };
            await DB.query("INSERT INTO usuarios SET ?", user);
        }
    } catch (err) {
        
    }
}