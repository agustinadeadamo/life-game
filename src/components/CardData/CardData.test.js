// Dependencies
import React from 'react';
import { render, cleanup } from '@testing-library/react';

// Utils
import {translate} from '../../utils/translate'

// Components
import CardData from './CardData';

afterEach(cleanup);

// Props
const defaultProps = { 
  showCardDetail: true,
  cardDetailData: {
    name: 'name',
    abilities: [{
      names: [{
        language: {
          name: "es", 
          url: "https://pokeapi.co/api/v2/language/7/"
        },
        name: "Clorofila"
      }],
      description: [{
        flavor_text: "Descripción 1",
        language: {
          name: "es", 
          url: "https://pokeapi.co/api/v2/language/7/"
        },
      }]
    },
    {
      names: [{
        language: {
          name: "es", 
          url: "https://pokeapi.co/api/v2/language/7/"
        },
        name: "Clorofila2"
      }],
      description: [{
        flavor_text: "Descripción 2",
        language: {
          name: "es", 
          url: "https://pokeapi.co/api/v2/language/7/"
        },
      }]
    }
    ]
  },
  language: 'es'
};

test('[Component CardData] Test if renders component with all the names of the abilities', () => {
  
  const { getByText } = render(<CardData {...defaultProps} />);

  defaultProps.cardDetailData.abilities.forEach(ability => {
    let nameTranslated = translate(ability.names, defaultProps.language, 'name')
    expect(getByText(nameTranslated)).toBeTruthy(); 
  });

});

test('[Component CardData] Test if renders component with all the descriptions of the abilities', () => {

  const { getByText } = render(<CardData {...defaultProps} />);

  defaultProps.cardDetailData.abilities.forEach(ability => {
    let nameTranslated = translate(ability.description, defaultProps.language, 'flavor_text')
    expect(getByText(nameTranslated)).toBeTruthy(); 
  }); 

});

test('[Component CardData] Test if renders component', () => {
  const { getByTestId } = render(<CardData {...defaultProps} />);
  expect(getByTestId('card-data')).toBeTruthy(); 
});



