
import { numberWithCommas } from "@/libs/strings";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function TablaNomina({ empleados, tableRef }: { empleados: any[], tableRef: any }) {

    const [totalPerc, setTotalPerc] = useState(0);
    const [totalDeduc, setTotalDeduc] = useState(0);

    function deployRow(empleado: any) {
        const totalPerc = empleado.sBase + empleado.gratif + empleado.desp;
        const totalDeduc = empleado.isr + empleado.sSocial;

        return (
            <tr key={empleado.empID.toString()}>
                <td>{empleado.apellido} {empleado.nombre}</td>
                <td>{empleado.descr}</td>
                <td>${numberWithCommas(empleado.sBase)}</td>
                <td>${numberWithCommas(empleado.gratif)}</td>
                <td>${numberWithCommas(empleado.desp)}</td>
                <td>${numberWithCommas(totalPerc)}</td>
                <td>${numberWithCommas(empleado.isr)}</td>
                <td>${numberWithCommas(empleado.sSocial)}</td>
                <td>${numberWithCommas(totalDeduc)}</td>
                <td>${numberWithCommas(totalPerc + totalDeduc)}</td>
                <td>${numberWithCommas(totalPerc - totalDeduc)}</td>
            </tr>
        )
    }

    useEffect(() => {
        if (empleados && empleados.length > 0) {
            let totalPerc = 0;
            let totalDeduc = 0;
            empleados.forEach(empleado => {
                totalPerc += empleado.sBase + empleado.gratif + empleado.desp;
                totalDeduc += empleado.isr + empleado.sSocial;
            })
            setTotalPerc(totalPerc);
            setTotalDeduc(totalDeduc);
        }
    }, [empleados])

    return (
        <Table striped bordered hover variant="dark" ref={tableRef} id="tablaNomina">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Salario base</th>
                    <th>Gratificación</th>
                    <th>Despensa</th>
                    <th>Total percepciones</th>
                    <th>ISR</th>
                    <th>Seguro social</th>
                    <th>Total deducciones</th>
                    <th>Total sueldo neto</th>
                    <th>Total sueldo bruto</th>
                </tr>
            </thead>
            <tbody>
                {empleados.map(empleado => deployRow(empleado))}
            </tbody>
            <tfoot>
                <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Salario base</th>
                    <th>Gratificación</th>
                    <th>Despensa</th>
                    <th>Total percepciones: ${numberWithCommas(totalPerc)}</th>
                    <th>ISR</th>
                    <th>Seguro social</th>
                    <th>Total deducciones: ${numberWithCommas(totalDeduc)}</th>
                    <th>Total neto: ${numberWithCommas(totalPerc + totalDeduc)}</th>
                    <th>Total bruto: ${numberWithCommas(totalPerc - totalDeduc)}</th>
                </tr>
            </tfoot>
        </Table>
    )
}