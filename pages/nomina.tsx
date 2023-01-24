import NavbarComponent from "@/components/navbar";
import ExportExcel from "@/components/nomina/ExportExcel";
import ExportPDF from "@/components/nomina/ExportPDF";
import TablaNomina from "@/components/nomina/Tabla";
import ProtectedRoute from "@/components/ProtectedRoute";
import { readAllEmpleadosNomina } from "@/libs/empleados";
import styles from '@/styles/Home.module.css'
import { Empleado } from "@/types/Empleado";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRef } from "react";
import { ButtonGroup, ButtonToolbar } from "react-bootstrap";

export default function nomina({ empleados }: { empleados: Empleado[] }) {
    const tableRef = useRef(null);
    
    return (
        <ProtectedRoute>
            <Head>
                <title>Examen</title>
                <meta name="description" content="Zeetech"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.mainPL}>
                <NavbarComponent />
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="me-2 shadow">
                        <ExportPDF empleados={empleados} tableRef={tableRef} />
                        <ExportExcel empleados={empleados} />
                    </ButtonGroup>
                </ButtonToolbar>
                <TablaNomina empleados={empleados} tableRef={tableRef} />
            </main>
        </ProtectedRoute>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const empleados = await readAllEmpleadosNomina();
    return {
        props: {
            empleados
        }
    }
}
