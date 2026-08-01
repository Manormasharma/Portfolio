import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import profile from "../../data/profile.json";
import linkedin from "./../../images/social/linkedin.png";
import gmail from "./../../images/social/gmail.png";
import github from './../../images/skills/github.png'
import "./Footer.scss"

const socialIcons = {
  github: { icon: github },
  linkedin: { icon: linkedin },
  email: { icon: gmail },
};

export default function Footer() {
    return (
        <div className='footer-sec'>
            <Container>
                <Row className="align-items-center py-5">
                    <Col md="6" className="text-center text-md-start mb-3 mb-md-0">
                        <span className="footer-brand">{profile.name}</span>
                    </Col>
                    <Col md="6" className="text-center text-md-end">
                        {profile.socialLinks.map((link) => {
                          const meta = socialIcons[link.platform];
                          if (!meta) return null;
                          return (
                            <a
                              key={link.platform}
                              className="social-icon-link ms-2"
                              href={link.url}
                              title={link.platform}
                              target={link.platform === 'email' ? undefined : '_blank'}
                              rel="noreferrer"
                            >
                              <img src={meta.icon} className="img-fluid" width={18} alt={link.platform} />
                            </a>
                          );
                        })}
                    </Col>
                </Row>
            </Container>
            <div className='footer-copyright'>
                <Container>
                    <Row>
                        <Col className='text-center py-3'>
                            <small>&copy; {new Date().getFullYear()} Made by <strong>{profile.name}</strong></small>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
