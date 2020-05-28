/**
 * Dependencias
 */
import React, { memo, useEffect, useState } from "react";

/**
 * Estilos
 */
import { Cell, BoardContainer, Row } from "./style";


/**
 * Componente de tablero
 */
const Board = memo(({ ...props }) => {

  // Tamaño de cada celula
  let [ cellSize, setCellSize ] = useState( 0 );
  

  /**
   * Hook que se ejecuta cada vez que se monta el componente Board
   */
  useEffect(() => {
    
    // Funcion que detecta el ancho del navegador y en base a esto actualiza el tamaño de las celulas
    const updateWindowSize = () =>  {

      // Desestructuramos props y obtenemos la cantidad de celulas que se mostraran
      let {
        boardSize
      } = props

      // Obtiene el ancho de la ventanda
      let windowWidth = window.innerWidth

      // Divido el ancho de la ventana por la cantidad de celulas por filas y le restamos 10 px que van a servir para el padding
      let cellWidth = ( windowWidth / boardSize.width ) - 10

      // Actualizo el estado modificando el tamaño de las celulas
      setCellSize(cellWidth)

      // Indicamos al navegador que ejecute la funcion updateWindowSize cada vez que este haga un resize
      window.addEventListener('resize', updateWindowSize);

    }

    // Llamamos a la función
    updateWindowSize();

    // Limpiamos el evento cada vez que se desmonta
    return () => window.removeEventListener('resize', updateWindowSize);

  }, [props])

  return (
    <BoardContainer id="board-container">

      {/** Filas */}
      {
        props.board && props.board.map((row, indexRow) => {
          return (
            <Row key={indexRow}>

              {/** Celulas */}
              {
                row.map((column,indexColumn) => {
                  return <Cell 
                            key={indexColumn}
                            onClick={ (e) => props.onClickCell(indexRow, indexColumn) } 
                            column={column} 
                            cellSize={cellSize}/>
                })
              }

          </Row>
          )
        })
      }

    </BoardContainer>
  )

})

export default Board;


