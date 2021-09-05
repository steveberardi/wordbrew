import React from "react";

import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';


export const Footer = () => {

    return (
        <footer className="py-5 mt-2 bg-light bg-opacity-50">
            <Container>
                <Row>
                    <Col md={6}>
                        <h3>About</h3>
                        <p><strong>WordBrew</strong> is a tool for exploring words and their related words. It's similar to a thesaurus, but also much more. It's powered by the wonderful <a href="https://wordnet.princeton.edu/">WordNet</a> database.</p>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;
