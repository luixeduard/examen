import DB from "@/services/databaseService";

export async function createPuesto(puesto: any) {
    const [result] = await DB.query("INSERT INTO puesto SET ?", puesto) as any;
    return result.insertId;
}

export async function readAllPuestos() {
    const [result] = await DB.query("SELECT * FROM puesto INNER JOIN tabulador ON puesto.idTab=tabulador.idTab;") as any;
    return result;
}