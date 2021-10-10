import React from "react";

import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

import WordbrewLogo from './static/images/wordbrew.png';

export const About = () => {
  return (
    <Container>
      <br/>
      <Row>
        <Col md={2}></Col>
        <Col className="text-center">
            <img className="img-fluid" src={WordbrewLogo} style={{ height: "200px" }}/>
            <br/><br/>

            <h1 className="text-dark">About WordBrew</h1>
            <p className="lead text-muted">More than a thesaurus. Less than a beer.</p>
            
            <br/>

            <p>The quick brown fox jumps over the lazy dog.</p>
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>

  );
};

export default About;