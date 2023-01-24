import { Button, ModalBody, Modal, ModalFooter, ModalHeader, ModalTitle, Form, FloatingLabel } from 'react-bootstrap';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Router from 'next/router';
import { deleteWhiteSpaces } from '@/libs/strings';

export default function AgregarPuesto() {
    const [validated, setValidated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onSubmit = async (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();
        setIsSubmitting(true);

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const data = {
                descr: event.target.descr.value,
                sBase: event.target.sBase.value,
                gratif: event.target.gratif.value,
                desp: event.target.desp.value,
                isr: event.target.isr.value,
                sSocial: event.target.sSocial.value
            }
            const JSONdata = JSON.stringify(data);
            const endPoint = '/api/puestos/create';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSONdata
            }
            const response = await fetch(endPoint, options);
            if (response.status == 200) {
                Swal.fire({
                    title: '¡Exito!',
                    text: 'Tu registro a sido guardado exitosamente',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                setShow(false);
                Router.reload()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Algo salio mal, vuelve a intentar más tarde!',
                })
            }
        }
        setValidated(true);
        setIsSubmitting(false);
    };

    return (
        <>
            <Button onClick={handleShow} variant='dark' className='mb-3'>
                Agregar puesto
            </Button>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Agregar puesto</ModalTitle>
                </ModalHeader>
                <Form noValidate validated={validated} onSubmit={onSubmit} method='post'>
                    <ModalBody>
                        <Form.Floating className='mb-3'>
                            <Form.Control type='text' id='descr' name='descr' placeholder='Descripción del puesto' required maxLength={255} onBlur={e => deleteWhiteSpaces(e.currentTarget.value)}/>
                            <Form.Label htmlFor='descr'>Nombre</Form.Label>
                            <Form.Control.Feedback type='invalid'>
                                Ingresar una nombre valido no mayor a 255 caracteres
                            </Form.Control.Feedback>
                        </Form.Floating>
                        <h6>Tabulador</h6>
                        <Form.Floating className='mb-3'>
                            <Form.Control type='number' id='sBase' name='sBase' placeholder='Valor mayor igual a 0' required min={0.00} step={0.01}/>
                            <Form.Label htmlFor='sBase'>Salario base</Form.Label>
                            <Form.Control.Feedback type='invalid'>
                                Ingresar una valor valido
                            </Form.Control.Feedback>
                        </Form.Floating>
                        <Form.Floating className='mb-3'>
                            <Form.Control type='number' id='gratif' name='gratif' placeholder='Valor mayor igual a 0' required min={0.00} step={0.01}/>
                            <Form.Label htmlFor='gratif'>Gratificación</Form.Label>
                            <Form.Control.Feedback type='invalid'>
                                Ingresar una valor valido
                            </Form.Control.Feedback>
                        </Form.Floating>
                        <Form.Floating className='mb-3'>
                            <Form.Control type='number' id='desp' name='desp' placeholder='Valor mayor igual a 0' required min={0.00} step={0.01}/>
                            <Form.Label htmlFor='desp'>Despensa</Form.Label>
                            <Form.Control.Feedback type='invalid'>
                                Ingresar una valor valido
                            </Form.Control.Feedback>
                        </Form.Floating>
                        <Form.Floating className='mb-3'>
                            <Form.Control type='number' id='isr' name='isr' placeholder='Valor mayor igual a 0' required min={0.00} step={0.01}/>
                            <Form.Label htmlFor='isr'>ISR</Form.Label>
                            <Form.Control.Feedback type='invalid'>
                                Ingresar una valor valido
                            </Form.Control.Feedback>
                        </Form.Floating>
                        <Form.Floating className='mb-3'>
                            <Form.Control type='number' id='sSocial' name='sSocial' placeholder='Valor mayor igual a 0' required min={0.00} step={0.01}/>
                            <Form.Label htmlFor='sSocial'>Seguro social</Form.Label>
                            <Form.Control.Feedback type='invalid'>
                                Ingresar una valor valido
                            </Form.Control.Feedback>
                        </Form.Floating>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='secondary' onClick={handleClose}>Cerrar</Button>
                        <Button variant='primary' type='submit' disabled={isSubmitting}>Agregar</Button>
                    </ModalFooter>
                </Form>              
            </Modal>
        </>
    )
}