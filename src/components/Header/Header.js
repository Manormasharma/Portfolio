import React from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import "./Header.scss";
import linkedin from "./../../images/social/linkedin.png";
import gmail from "./../../images/social/gmail.png";
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
            this.toggle = this.toggle.bind(this);
            this.state = {
                isOpen: false
            };
        }
        toggle() {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
    render(){
        return (
            <>
                <div class="coloredborder fixed-top"></div>
                <Navbar color="white" container expand="md" className='py-3 w-100 fixed-top'>
                    <div className='navbar-brand'>
                        <Link to="/portfolio"> Manorma Sharma</Link>
                    </div>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar className='justify-content-end'>
                        <Nav className="mr-auto align-items-center flex-row" navbar>
                            <NavItem className='me-4'>
                                <Link to="/portfolio/resume">Resume</Link>
                            </NavItem>       
                            <NavItem className='me-4'>   
                                <NavLink className='' aria-label="email" href="mailto:manorma.bussiness@gmail.com?subject=Mail from Manorma Portfolio">
                                    <img src={gmail} className="img-fluid" width={25}  alt='gmail'/>
                                </NavLink>
                            </NavItem>
                            <NavItem className='me-4'>
                                <NavLink href="https://www.linkedin.com/in/manorma-sharma/" target="_blank">
                                    <img src={linkedin} className="img-fluid" width={25} alt='linkedin' />
                                </NavLink>
                            </NavItem>
                                                
                            {/* <NavItem className=''>
                                <NavLink className="nav-link" href="#project">
                                    Project
                                </NavLink>
                            </NavItem> */}
                        </Nav>
                    </Collapse>
                </Navbar>
                
            </>
        );
    }
  
}
