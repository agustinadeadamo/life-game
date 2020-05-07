// Dependencies
import React, { memo } from 'react';

// Components
import { Row, Col, Button } from 'react-bootstrap';

// Styles
import './style.scss';

// Img
import View from '../../assets/lupa.png'

// Component that shows each pokemon
const Card = memo((props) => {

  // Destructuring props
  let {
    id = '',
    img = '',
    name = '',
    height = '',
    weight = '',
    onClickPokemon = () => {}
  } = props;

  return (

    <div className="card-container" data-textid="card">
      <Row className="align-items-center">

        {/** Id */}    
        <Col xs={12} md={1}>          
          <h2 className="text-center text-md-left">
              #{id}
          </h2>
        </Col>
            
        {/** Image */}
        <Col md={2} className="text-center text-md-left" >
          <img src={img} alt="pokemon"/>
        </Col>

        {/** Name and characteristics */}            
          <Col xs={12} md={4}>
            <Row>
              <Col>
                <p className="text-capitalize text-center text-md-left">
                  <b>{name}</b>
                </p>
              </Col>
            </Row>

            <Row>
              <Col>
                <p className="text-center text-md-left">
                  {(weight/10).toFixed(1)} Kg - {(height/10).toFixed(1)}m 
                </p>
              </Col>
            </Row>
          </Col>
            
          {/** Button */}
          <Col className="text-center text-md-right" md={5}>
            <Button 
              data-testid="button-card"
              className="text-uppercase font-weight-bold"
              variant="warning" 
              onClick={() => onClickPokemon(props.id)} >
                <img src={View} alt="view-details"/>
            </Button>
          </Col>

        </Row>
    </div>

  )

})

export default Card;
