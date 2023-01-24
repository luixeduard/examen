import { Button, ModalBody, Modal, ModalFooter, ModalHeader, ModalTitle, Form, FloatingLabel, FormControl } from 'react-bootstrap';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Router from 'next/router';
import { deleteWhiteSpaces } from '@/libs/strings';
import { Puesto } from '@/types/Puesto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import style from "./buttons.module.css"
import { Empleado } from '@/types/Empleado';


export default function EditarEmpleado({puestos, empleado}: {puestos: Puesto[], empleado: Empleado}) {
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
                empId: event.target.empId.value,
                nombre: event.target.nombre.value,
                apellido: event.target.apellido.value,
                pLaboral: event.target.pLaboral.value
            }
            const JSONdata = JSON.stringify(data);
            const endPoint = '/api/empleados/update';
            const options = {
                method: 'PUT',
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
            <FontAwesomeIcon icon={faPen} onClick={handleShow} className={style.cursoren} />
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Editar empleado</ModalTitle>
                </ModalHeader>
                <Form noValidate validated={validated} onSubmit={onSubmit} method='post'>
                    <ModalBody>
                        <FormControl type='hidden' name='empId' value={empleado.empID}></FormControl>
                        <Form.Floating className='mb-3'>
                            <Form.Control type='text' id='nombre' name='nombre' placeholder='Nombre del empleado' required maxLength={70} defaultValue={empleado.nombre} onBlur={e => deleteWhiteSpaces(e.currentTarget.value)}/>
                            <Form.Label htmlFor='nombre'>Nombre</Form.Label>
                            <Form.Control.Feedback type='invalid'>
                                Ingresar una nombre valido no mayor a 70 caracteres
                            </Form.Control.Feedback>
                        </Form.Floating>
                        <Form.Floating className='mb-3'>
                            <Form.Control type='text' id='apellido' name='apellido' placeholder='Apellido del empleado' required maxLength={70} defaultValue={empleado.apellido} onBlur={e => deleteWhiteSpaces(e.currentTarget.value)}/>
                            <Form.Label htmlFor='apellido'>Apellido</Form.Label>
                            <Form.Control.Feedback type='invalid'>
                                Ingresar una apellido valido no mayor a 70 caracteres
                            </Form.Control.Feedback>
                        </Form.Floating>
                        <FloatingLabel label="Puesto" className="mb-3">
                            <Form.Select name="pLaboral" required defaultValue={empleado.pLaboral}>
                                {puestos.map(puesto => (
                                    <option key={puesto.idPuesto} value={puesto.idPuesto?.toString()}>{puesto.descr}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type='invalid'>
                                Se necesita seleccionar un valor valido
                            </Form.Control.Feedback>
                        </FloatingLabel>
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