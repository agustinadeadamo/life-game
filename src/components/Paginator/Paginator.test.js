// Dependencies
import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

// Components
import Paginator from './Paginator';

afterEach(cleanup);

// Props
const defaultProps = { 
  previous: 'url',
  next: 'url'
};

test('[Component Paginator] Tests if functions is called after onclick in previous button', () => {
  
  const onClickPrevious = jest.fn();
  const { getByTestId } = render(
    <Paginator {...defaultProps}  onClickPrevious={onClickPrevious}/>
  );
  
  const button= getByTestId("previous");
    
  fireEvent.click(button);
  expect(onClickPrevious).toHaveBeenCalled();

});

test('[Component Paginator] Tests if functions is called after onclick in next button', () => {
  
  const onClickNext = jest.fn();
  const { getByTestId } = render(
    <Paginator {...defaultProps}  onClickNext={onClickNext}/>
  );

  const button= getByTestId("next");
    
  fireEvent.click(button);
  expect(onClickNext).toHaveBeenCalled();

});

test('[Component Paginator] Tests if buttons dont render if its prop value is null', () => {

  const onClickNext = jest.fn();

  const { queryByTestId } = render(
    <Paginator onClickNext={onClickNext}/>
  );

  const buttonNext= queryByTestId("next");
  const buttonPrevious= queryByTestId("previous");

  expect(buttonNext).toBeNull()
  expect(buttonPrevious).toBeNull()

});

test('[Component Paginator] Tests if buttons dont render if its prop value is null', () => {

  const onClickNext = jest.fn();

  const { queryByTestId } = render(
    <Paginator {...defaultProps} onClickNext={onClickNext}/>
  );

  const buttonNext= queryByTestId("next");
  const buttonPrevious= queryByTestId("previous");

  expect(buttonNext).toBeTruthy()
  expect(buttonPrevious).toBeTruthy()

});
