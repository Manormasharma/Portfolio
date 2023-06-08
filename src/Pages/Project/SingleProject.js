import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Container, Row, Col } from 'reactstrap';

const SingleProject = () => {
    let { postSlug } = useParams();
    useEffect(() => {
        // Fetch post using the postSlug
    }, [postSlug]);
    return (
        <div class="">
            <Container>
                <Row>
                    <h1>{postSlug}</h1>
                    
                </Row>
            </Container>
        </div>
    )
}

export default SingleProject