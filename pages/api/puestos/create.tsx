import { createPuesto } from "@/libs/puesto";
import { createTabulador } from "@/libs/tabulador";
import { NextApiRequest, NextApiResponse } from "next";

export default async function request(req: NextApiRequest, res: NextApiResponse) {
    try {
        const method = req.method?.toLowerCase();
        if (method !== "post") {
            return res.status(405).end(`Method ${req.method} NOT ALLOWED`);
        }
        const data = req.body;
        const TempTabulador = { sBase: data.sBase, gratif: data.gratif, desp: data.desp, isr: data.isr, sSocial: data.sSocial };
        const idTab = await createTabulador(TempTabulador);
        const puesto = { descr: data.descr, idTab };
        const idPt = createPuesto(puesto);
        res.status(200).json({ res: idPt });
    } catch (err) {
        console.log(err);
        res.status(400).json({res: err})
    }
}