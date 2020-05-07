// Dependencies
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

// Components
import Card from './Card';

afterEach(cleanup);

// Props
const defaultProps = { 
  id: '1' ,
  name: 'nombre',
  weight: 69,
  height: 7
};

test('[Component Card] Tests if components renders prop id correctly', () => {

  const { queryByText } = render(<Card {...defaultProps} />);
  const text = '#' + defaultProps.id

  expect(queryByText(text)).toBeTruthy(); 

});

test('[Component Card] Tests if components renders prop name correctly', () => {

  const { queryByText } = render(<Card {...defaultProps} />);
  expect(queryByText(defaultProps.name)).toBeTruthy(); 

});

test('[Component Card] Tests if components renders prop weight and height correctly', () => {

  const { queryByText } = render(<Card {...defaultProps} />);
  const text = (defaultProps.weight/10).toFixed(1) + ' Kg - ' + (defaultProps.height/10).toFixed(1) + 'm'

  expect(queryByText(text)).toBeTruthy(); 

});

test('[Component Card] Tests if function is called after button is clicked', () => {
  
  const onClickPokemon = jest.fn();
  const { getByTestId } = render(
    <Card {...defaultProps} onClickPokemon={onClickPokemon}/>
  );

  const button = getByTestId('button-card');

  fireEvent.click(button);
  expect(onClickPokemon).toHaveBeenCalled();

});

