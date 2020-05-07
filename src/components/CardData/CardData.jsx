// Dependencies
import React from 'react';

// Components
import { Modal } from 'react-bootstrap'

// Utils
import {translate} from '../../utils/translate';

// Component that shows abilities of each pokemon
const CardData = (props) => {

  // Destructuring props
    let {
      cardDetailData = {},
      handleClose = () => {},
      language = '',
      showCardDetail = false,
    } = props

    return (     

      <Modal show={showCardDetail} onHide={handleClose} data-testid="card-data">

        {/** Modal Header */}
        <Modal.Header closeButton>

          <Modal.Title className="text-capitalize">
            {cardDetailData.name}
          </Modal.Title>
        
        </Modal.Header>

        {/** Modal Content */}
        <Modal.Body>
          
          {/** Image */}
          <div className="text-center">
            <img src={cardDetailData.img} alt={cardDetailData.name}/>
          </div>

          {/** Abilities */}
          {
            cardDetailData.abilities && cardDetailData.abilities.map((ability, key) => {
              return (
                <div key={key}>
                  <hr/> 
                  <h6>{translate(ability.names, language, 'name')}</h6>
                  <p>{translate(ability.description, language, 'flavor_text')}</p>
                </div>
              ) 
            })
                  
          }
        </Modal.Body>
        
      </Modal>

    );
  }
  
export default CardData;