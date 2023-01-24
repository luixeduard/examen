import { Puesto } from "@/types/Puesto";
import { Table } from "react-bootstrap";

export default function TablaPuestos({ puestos }: { puestos: Puesto[] }) {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Descripcion</th>
                    <th>Salario base</th>
                    <th>Gratificación</th>
                    <th>Despensa</th>
                    <th>ISR</th>
                    <th>Seguro social</th>
                </tr>
            </thead>
            <tbody>
                {puestos.map((puesto: any) => (
                    <tr key={puesto.idPuesto.toString()}>
                        <td>{puesto.descr}</td>
                        <td>{puesto.sBase}</td>
                        <td>{puesto.gratif}</td>
                        <td>{puesto.desp}</td>
                        <td>{puesto.isr}</td>
                        <td>{puesto.sSocial}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th>Descripcion</th>
                    <th>Salario base</th>
                    <th>Gratificación</th>
                    <th>Despensa</th>
                    <th>ISR</th>
                    <th>Seguro social</th>
                </tr>
            </tfoot>
        </Table>
    )
}