import { updateEmpleado } from "@/libs/empleados";
import { NextApiRequest, NextApiResponse } from "next";

export default async function request(req: NextApiRequest, res: NextApiResponse) {
    try {
        const method = req.method?.toLowerCase();
        if (method !== "put") {
            return res.status(405).end(`Method ${req.method} NOT ALLOWED`);
        }
        const data = req.body;
        const empleado = { nombre: data.nombre, apellido: data.apellido, pLaboral: data.pLaboral };
        const id = data.pLaboral
        const idEmpleado = updateEmpleado(empleado, id);
        res.status(200).json({ res: idEmpleado });
    } catch (err) {
        console.log(err);
        res.status(400).json({res: err})
    }
}