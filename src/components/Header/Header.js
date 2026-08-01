import React, { useEffect, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import "./Header.scss";
import linkedin from "./../../images/social/linkedin.png";
import gmail from "./../../images/social/gmail.png";
import { Link } from 'react-router-dom';
import profile from "../../data/profile.json";

const NAV_LINKS = [
    { number: '01', label: 'About', hash: '#about' },
    { number: '02', label: 'Skills', hash: '#skills' },
    { number: '03', label: 'Work', hash: '#project' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const emailLink = profile.socialLinks.find((l) => l.platform === 'email');
    const linkedinLink = profile.socialLinks.find((l) => l.platform === 'linkedin');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <Navbar
            expand="md"
            container
            className={`site-navbar py-3 w-100 fixed-top${scrolled ? ' is-scrolled' : ''}`}
        >
            <div className='navbar-brand'>
                <Link to="/">{profile.name.split(' ')[0]}<span className="brand-dot">.</span></Link>
            </div>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar className='justify-content-end'>
                <Nav className="mr-auto align-items-center flex-row" navbar>
                    {NAV_LINKS.map((link) => (
                        <NavItem className='me-4' key={link.number}>
                            <a href={`${process.env.PUBLIC_URL}/${link.hash}`} className="nav-link-numbered">
                                <span className="nav-link-number">{link.number}.</span> {link.label}
                            </a>
                        </NavItem>
                    ))}
                    <NavItem className='me-4'>
                        <Link to="/resume" className="btn-custom nav-resume-btn">Resume</Link>
                    </NavItem>
                    {emailLink && (
                      <NavItem className='me-3'>
                          <NavLink className='social-icon-link' aria-label="email" href={emailLink.url}>
                              <img src={gmail} className="img-fluid" width={18} alt='gmail'/>
                          </NavLink>
                      </NavItem>
                    )}
                    {linkedinLink && (
                      <NavItem className='me-3'>
                          <NavLink className='social-icon-link' href={linkedinLink.url} target="_blank">
                              <img src={linkedin} className="img-fluid" width={18} alt='linkedin' />
                          </NavLink>
                      </NavItem>
                    )}
                </Nav>
            </Collapse>
        </Navbar>
    );
}
