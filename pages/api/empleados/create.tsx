import { createEmpleado } from "@/libs/empleados";
import { NextApiRequest, NextApiResponse } from "next";

export default async function request(req: NextApiRequest, res: NextApiResponse) {
    try {
        const method = req.method?.toLowerCase();
        if (method !== "post") {
            return res.status(405).end(`Method ${req.method} NOT ALLOWED`);
        }
        const empleado = req.body;
        const idEmpleado = createEmpleado(empleado);
        res.status(200).json({ res: idEmpleado });
    } catch (err) {
        console.log(err);
        res.status(400).json({res: err})
    }
}