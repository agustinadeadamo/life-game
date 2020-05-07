// Dependencies
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

// Components
import Language from './Language';

afterEach(cleanup);

test('[Component Language] Tests if function is called after onClick in buttons', () => {
  
  const onClickCountry = jest.fn();
  const { getAllByTestId } = render(
    <Language  onClickCountry={onClickCountry}/>
  );
  
  const buttons= getAllByTestId("button-language");

  buttons.forEach(button => {   
    fireEvent.click(button);
    expect(onClickCountry).toHaveBeenCalled();
  });

});