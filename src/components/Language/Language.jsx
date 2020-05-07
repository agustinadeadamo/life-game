// Dependencies
import React, { memo } from 'react';

// Components
import { Button, Row, Col } from 'react-bootstrap';

// Styles
import './style.scss'

// Images
import ArgIcon from '../../assets/arg.png'
import UkIcon from '../../assets/uk.png'

// Component Select
const Language = memo((props) => {

  // Destructuring props
  let {
    onClickCountry = () => {},
  } = props;

  return (

   <Row>

     {/** Button Argentina */}
     <Col xs={12}>
      <Button data-testid="button-language" variant="light" className="language-button" onClick={() => onClickCountry('es')}>
          <img src={ArgIcon} alt="argentina" />
      </Button>

      {/** Button Uk */}
      <Button data-testid="button-language" variant="light" className="language-button" onClick={() => onClickCountry('en')}>
        <img src={UkIcon} alt="uk" />
      </Button>
     </Col>
   </Row>
      
  )

})

export default Language 