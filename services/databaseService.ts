import mysql from "mysql";

const config = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "149215",
    database: "nominas"
})

export default config