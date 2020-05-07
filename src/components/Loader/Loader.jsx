// Dpeendencies
import React from 'react';

// Components
import { Spinner, Row, Col } from 'react-bootstrap'

// Component that renders loader 
const Loader = () => {

    return (

        <Row className="justify-content-center">
            <Col xs={3} className="text-center">
              <Spinner animation="border" variant="danger" />
            </Col>
        </Row>
    
    )

}

export default Loader