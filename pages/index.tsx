import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {Container, Form, Button, Row} from "react-bootstrap"
import { useState } from 'react';
import { getSession, signIn } from "next-auth/react"
import Router from 'next/router';
import Swal from 'sweetalert2'
import { useStore } from '@/context/AuthContext';
import { authConstants } from '@/context/Constants';

export default function Home() {

  const [validated, setValidated] = useState(false);
  const [state, dispatch] = useStore()

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    dispatch({type: authConstants.LOGIN_REQUEST})

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const email = event.target.email.value;
      const pass = event.target.pass.value;
      const result = await signIn("credentials", { email, pass, redirect: false });
      if (result?.error == null) {
        const session = await getSession()
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: session
        })
        Router.replace("/empleados");
      } else {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: result?.error
        })
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Correo y/o contraseña incorrectos',
        })
      }
    }
    setValidated(true);
  }
    

  return (
    <>
      <Head>
        <title>Examen</title>
        <meta name="description" content="Zeetech"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Container fluid="sm">
          <h3>Iniciar sesión</h3>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="emailIn"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
                <label htmlFor="emailIn">Correo</label>
                <Form.Control.Feedback type="invalid">
                  Se requiere de un correo electronico
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
            <Form.Group>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="passIn"
                  name="pass"
                  type="password"
                  placeholder="********"
                  required
                />
                <label htmlFor="emailIn">Contraseña</label>
                <Form.Control.Feedback type="invalid">
                  Se requiere de una contraseña
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
            <Button type="submit">Iniciar sesión</Button>
          </Form>
        </Container>
      </main>
    </>
  )
}
