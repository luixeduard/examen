import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarComponent() {
    return (
        <Navbar bg="dark" variant="dark" fixed='top'>
            <Container>
            <Navbar.Brand>Examen</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/empleados">Empleados</Nav.Link>
                <Nav.Link href="/puestos">Puestos</Nav.Link>
                <Nav.Link href="/nomina">Nomina</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    )
}