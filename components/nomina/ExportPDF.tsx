import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import styles from './buttons.module.css'

export default function ExportPDF({empleados, tableRef}: {empleados: any[], tableRef: any}) {
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
                const finEmp = sql2Excel(empleados);
                generarPDF(finEmp);
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
          return ([
            empleado.empID, empleado.nombre, empleado.apellido,
            empleado.sBase, empleado.gratif, empleado.desp,
            totalP, empleado.isr, empleado.sSocial,
            totalD, totalP + totalD, totalP - totalD
          ])
          
        });
        empleados.push([
            "",
            "TOTAL",
            "",
            "",
            "",
            "",
            totalPerc,
            "",
            "",
            totalDeduc,
            totalDeduc + totalPerc,
            totalPerc - totalDeduc
        ])
        return empleados;
      }

    function generarPDF(empleados: any[]) {
        const col = [["ID", "Nombre", "Apellido", "S. Base", "Gratificación", "Despensa", "Percepciones", "ISR", "S. Social", "Deducciones", "T. Neto", "T. Bruto"]];
        var doc = new jsPDF({orientation: "landscape"});
        autoTable(doc, {
            head: col,
            body: empleados
        });
        doc.save('Test.pdf');
    }
    
    return (
        <>
          <Button className={styles.btnWithImage} variant="dark" onClick={handleShow}>
            <FontAwesomeIcon icon={faFilePdf} className="mx-2"/>
            Exportar PDF
          </Button>
        </>
      );
}