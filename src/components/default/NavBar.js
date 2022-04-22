import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import styles from "../../css/NavBar.css"


function NavbarLink(props) {
    return (
        <Link
            className="nav-Link"
            to={props.to}>
            {props.children}
        </Link>
    )
}

export default function NavBar() {
    return (
        <Navbar className="my-Navbar">
            <NavbarLink to="/">
                <Navbar.Brand className="nav-Logo">
                    Test task
                </Navbar.Brand>
            </NavbarLink>
            <Nav className="my-Nav">
                <NavbarLink to="/banners">Banners</NavbarLink>
                <NavbarLink to="/categories">Categories</NavbarLink>
            </Nav>
        </Navbar>
    )
}