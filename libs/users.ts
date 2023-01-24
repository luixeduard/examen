import config from "@/services/databaseService"
import salt from "./pass"

export const getUser = async (email: string) => {
    return config.getConnection(function (err, connection) {
        if (err) {
            return err
        }
        return connection.query('SELECT * FROM usuarios WHERE email="' + email + '";', function (err, rows) {
            if (err) {
                return err
            }
            if (rows.length === 0) {
                return null;
                
            }
            connection.release();
            return rows[0].rowDataPacket;
        })
    })
}

export const createFirstUser = async () => {
    try {
        const user = await getUser("lsalashdez@outlook.com");
        
        if (user == null) {
            const email = "lsalashdez@outlook.com";
            const pass = await salt("12345");
            const user = { email, pass };
            config.getConnection(function (err, connection) {
                if (err) {
                    console.log(err)
                    return;
                }
                connection.query("INSERT INTO usuarios SET ?", user, function (err, rows) {
                    console.log(err)
                })
                connection.release();
            })
        }
    } catch (err) {
        
    }
}