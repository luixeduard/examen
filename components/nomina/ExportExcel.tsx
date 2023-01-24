import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import styles from './buttons.module.css'

export default function ExportExcel({empleados}: {empleados: any[]}) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
      buttonsStyling: false
    });

  const handleShow = () => {
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro de exportar el inventario?',
      text: "Se exportara un archivo pdf con la información",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aplicar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const finalEmp = sql2Excel(empleados);
        const ws = XLSX.utils.json_to_sheet(finalEmp)
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Nomina");
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        FileSaver.saveAs(dataBlob, "nomina.xlsx");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La operacion a sido cancelada',
          'error'
        )
      }
    });
  };
  
  function sql2Excel(tempEmp: any[]) {
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

  return (
    <>
      <Button className={styles.btnWithImage} variant="dark" onClick={handleShow}>
        <FontAwesomeIcon icon={faFileExcel} className="mx-2"/>
        Exportar Excel
      </Button>
    </>
  );
}