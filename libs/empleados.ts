import DB from "@/services/databaseService";
import { Empleado } from "@/types/Empleado";

export async function createEmpleado(empleado: Empleado) {
    const [result] = await DB.query("INSERT INTO empleados SET ?", empleado) as any;
    return result.insertId;
}

export async function updateEmpleado(empleado: any, idEmpleado: string) {
    const [result] = await DB.query("UPDATE empleados SET ? WHERE empID= ?", [empleado, idEmpleado]) as any;
    return result.insertId;
}

export async function readAllEmpleados() {
    const [result] = await DB.query("SELECT * FROM empleados JOIN puesto ON empleados.pLaboral = puesto.idPuesto") as any;
    return result;
}

export async function readAllEmpleadosNomina() {
    const [result] = await DB.query("SELECT * FROM empleados JOIN puesto ON empleados.pLaboral = puesto.idPuesto JOIN tabulador ON puesto.idTab = tabulador.idTab") as any;
    return result;
}

export function sql2Excel(tempEmp: any[]) {
    let totalPerc = 0;
    let totalDeduc = 0;
    const empleados = tempEmp.map(empleado => {
      const totalP = empleado.sBase + empleado.gratif + empleado.desp;
      totalPerc += totalP;
      const totalD = empleado.isr + empleado.sSocial
      totalDeduc += totalD;
      return ({
        id: empleado.empID, nombre: empleado.nombre, apellido: empleado.apellido,
        salarioBase: empleado.sBase, gratificacion: empleado.gratif, despensa: empleado.desp,
        total_percepciones: totalP, ISR: empleado.isr, seguro_social: empleado.sSocial,
        total_deducciones: totalD, total_neto: totalP + totalD, total_bruto: totalP - totalD
      })
      
    });
    empleados.push({
      nombre: "TOTAL",
      total_deducciones: totalDeduc,
      total_percepciones: totalPerc,
      total_neto: totalDeduc + totalPerc,
      total_bruto: totalPerc - totalDeduc,
      id: undefined,
      apellido: undefined,
      salarioBase: undefined,
      gratificacion: undefined,
      despensa: undefined,
      ISR: undefined,
      seguro_social: undefined
    })
    return empleados;
  }