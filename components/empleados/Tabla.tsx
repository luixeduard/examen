import { Empleado } from "@/types/Empleado";
import { Puesto } from "@/types/Puesto";
import { Table } from "react-bootstrap";
import EditarEmpleado from "./Edit";

export default function TablaEmpleados({empleados, puestos}: {empleados: Empleado[], puestos: Puesto[]}) {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Puesto</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {empleados.map((empleado: any) => (
                    <tr key={empleado.empID.toString()}>
                        <td>{empleado.empID}</td>
                        <td>{empleado.nombre}</td>
                        <td>{empleado.apellido}</td>
                        <td>{empleado.descr}</td>
                        <td><EditarEmpleado puestos={puestos} empleado={empleado} /></td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Puesto</th>
                    <th></th>
                </tr>
            </tfoot>
        </Table>
    )
}