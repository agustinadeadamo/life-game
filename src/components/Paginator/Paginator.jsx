// Dependencies
import React, { memo } from 'react';

// Components
import { Button } from 'react-bootstrap';

// Styles
import './style.scss'

// Component that renders paginator
const Paginator = memo((props) => {

  // Destructuring props
  let {
    onClickPrevious = () => {},
    onClickNext = () => {}
  } = props;

  return (
            
    <div className="paginator">

      {/** Previous button */}
      {
        props.previous && 
          <Button data-testid="previous" variant="danger" onClick={() => onClickPrevious()} >{'<'}</Button>
      }

      {/** Next button */}
      {
        props.next && 
          <Button data-testid="next" variant="danger" onClick={() => onClickNext()} >{'>'}</Button>
      }
    </div>
  )
    
})  

export default Paginator