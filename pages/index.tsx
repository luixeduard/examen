import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {Container, Form, Button} from "react-bootstrap"
import { useState } from 'react';
import Router from 'next/router';
import Swal from 'sweetalert2'

export default function Home() {

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const email = event.target.email.value;
      const pass = event.target.pass.value;
      const body = JSON.stringify({ email, pass });
      const destino = "/api/sessions"
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }
      const response = await fetch(destino, options);
      if (response.status == 200) {
        Router.replace("/empleados");
      } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salio mal, vuelve a intentar más tarde!',
        })
      }
    }

    setValidated(true);
  };

  return (
    <>
      <Head>
        <title>Examen</title>
        <meta name="description" content="Zeetech"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Container>
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
