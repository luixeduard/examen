import mysql from "mysql2/promise";

const DB = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "149215",
    database: "nominas"
})

export default DB