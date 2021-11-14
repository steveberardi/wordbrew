import React from "react";

import { Row, Col } from 'react-bootstrap';

import WordbrewLogoDark from '../images/logo-dark.svg';

export const Footer = () => {

    return (
        <footer className="py-5 bg-light">
            <Row>
                <Col md={2}></Col>

                <Col md={8}>
                    <div className="card mb-3 bg-light border-light">
                        <div className="row g-0">
                            <div className="col-md-2">
                                <img src={WordbrewLogoDark} height="130" width="130" className="img-fluid opacity-25 mb-3 me-3" alt="WordBrew Logo"/>
                            </div>
                            <div className="col-md-10">
                                <div className="card-body">
                                    <h3 className="card-title">About</h3>
                                    <p><strong>WordBrew</strong> is a tool for exploring words and their related words. It's similar to a thesaurus, but also much more. It's powered by the wonderful <a href="https://wordnet.princeton.edu/">WordNet</a> database.</p>

                                    <br/>
                                    <a className="btn btn-outline-primary text-dark opacity-75" href="https://github.com/steveberardi/wordbrew" style={{textDecoration: "none"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="me-2"><path fill="#ed9547" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                        View Source on GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={2}></Col>
            </Row>
        </footer>
    )
}

export default Footer;
