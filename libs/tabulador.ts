import DB from "@/services/databaseService";
import { Tabulador } from "@/types/Tabulador";


export async function createTabulador(tabulador: any) {
    const [result] = await DB.query("INSERT INTO tabulador SET ?", tabulador) as any;
    return result.insertId;
}