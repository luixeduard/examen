import Head from "next/head";
import styles from '@/styles/Home.module.css'
import NavbarComponent from "@/components/navbar";
import AgregarEmpleado from "@/components/empleados/Add";
import TablaEmpleados from "@/components/empleados/Tabla";
import { Puesto } from "@/types/Puesto";
import { readAllPuestos } from "@/libs/puesto";
import { GetServerSideProps } from "next";
import { readAllEmpleados } from "@/libs/empleados";
import { Empleado } from "@/types/Empleado";
import ProtectedRoute from "@/components/ProtectedRoute"

export default function empleados({ puestos, empleados }: { puestos: Puesto[], empleados: Empleado[] }) {

    return (
        <ProtectedRoute>
            <Head>
                <title>Examen</title>
                <meta name="description" content="Zeetech"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.mainPL}>
                <NavbarComponent />
                <AgregarEmpleado puestos={puestos}/>
                <TablaEmpleados empleados={empleados} puestos={puestos} />
            </main>
        </ProtectedRoute>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const puestos = await readAllPuestos();
    const empleados = await readAllEmpleados();
    return {
        props: {
            puestos,
            empleados
        }
    }
}