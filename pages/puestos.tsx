import Head from "next/head";
import styles from '@/styles/Home.module.css'
import NavbarComponent from "@/components/navbar";
import AgregarPuesto from "@/components/puestos/Add";
import TablaPuestos from "@/components/puestos/Tabla";
import { GetServerSideProps } from "next";
import { readAllPuestos } from "@/libs/puesto";
import { Puesto } from "@/types/Puesto";

export default function puesto({puestos}: {puestos: Puesto[]}) {
    return (
        <>
            <Head>
                <title>Examen</title>
                <meta name="description" content="Zeetech"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.mainPL}>
                <NavbarComponent />
                <AgregarPuesto />
                <TablaPuestos puestos={puestos} />
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const puestos = await readAllPuestos();
    return {
        props: {
            puestos
        }
    }
}