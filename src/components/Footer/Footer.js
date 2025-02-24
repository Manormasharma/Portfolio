import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import "./Footer.scss"

export default class Footer extends React.Component {
  render() {
    return (
        <div className='footer-sec'>
            <div className='footer-copyright bg-black text-light'>
                <Container>
                    <Row>
                        <Col className='text-center py-4'>
                            <small className='pb-0'>&copy; 2025 Made by <strong>Manorma Sharma</strong></small>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
  }
}