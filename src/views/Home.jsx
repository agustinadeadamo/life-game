/**
 * Dependencias
 */
import React, {useEffect, useState, useRef, useCallback} from "react";

/**
 * Componentes
 */
import Actions from './Sections/Actions/Actions'
import Board from './Sections/Board/Board'

/**
 * Vista
 */
const Home = () => {

  // Generación
  const [ generation, changeGeneration ] = useState( 0 );

  // Tablero
  const [ board, changeBoard ] = useState( null )

  // Tamaño tablero
  const boardSize = {width: 50, height: 30};

  // Referencia del setInterval
  const intervalRef = useRef();

  // Referencia del generador inicial
  const generationRef = useRef(0)


  /**
   * Función que se ejecuta cada vez que se selecciona una celula
   * 
   * @param { number } indexRow 
   * @param { number } indexColumn 
   * @param { number } statusCell 
   */
  const onClickCell = (indexRow, indexColumn) => {

    // Creamos un nuevo array
    let newBoard = [...board]

    // Actualizamos el valor de la celula correspondiente
    newBoard[indexRow][indexColumn] = ~~!newBoard[indexRow][indexColumn] 

    // Actualizo el estado
    changeBoard(newBoard)

  }
 

  
  /**
   * Función que se ejecuta cada vez que se debe volver a setear el board en blanco 
   */
  const createBoard = useCallback(() => {

    // Creo las filas segun está seteado en el state 
    let rowsBoard = new Array(boardSize.height)

    // Recorro las filas
    for(let i = 0; i < rowsBoard.length; i++) {

      // A cada fila le creo las celulas segun está seteado en el state
      let columsBoard = new Array(boardSize.width)

      // Recorro cada celula
      for(let i = 0; i < columsBoard.length; i++) {

        // Le asigno el valor inicial
        columsBoard[i] = 0

      }

      // Asigno a cada fila el array de celulas
      rowsBoard[i] = columsBoard

    }

    // Actualizo el estado
    changeBoard(rowsBoard)

  },[boardSize.height, boardSize.width])
  
  /**
   * Hook que se ejecuta cuendo se monta el componente
   */
  useEffect(() => {

    // Llamo a la función que crea el array de filas y celulas
    createBoard()

  },[createBoard])


  /**
   * Función que se ejecuta cada vez que se presiona el boton iniciar
   */
  const onClickStart = () =>  {

    // Declaramos una variable local para que tome los cambios el setInterval
    let boardRef = board;

    // Ejecutamos un setInterval
    let timer =  setInterval(() => {

      // Declaraciones iniciales
      let firstRowToModifie = 0
      let lastRowToModifie = 0
      let firstColumnToModifie = 0
      let lastColumnToModifie = 0
      let lastColumn = 0
      let lastRow = board.length

      // Creamos un nuevo board para no modificar el actual ya que sobre el actual vamos a iterar
      let newBoard = [] 

      // Por cada fila
      for(let indexRow = 0; indexRow < boardRef.length; indexRow++){

        // Agregamos cada fila al nuevo board
        newBoard.push([])

        // Si es la primera fila la actual, la primera fila por recorrer va a ser la ultima del array
        firstRowToModifie = indexRow === 0 ? lastRow - 1 : indexRow - 1;

        // Si es la ultima fila la actual, la ultima fila por recorrer va a ser la primera del array
        lastRowToModifie = indexRow === lastRow -1 ? 0 : indexRow + 1

        // Por cada columna
        for(let indexColumn = 0; indexColumn < boardRef[indexRow].length; indexColumn++){

          // Agregamos un nuevo array
          newBoard[indexRow].push([])

          // Obtenemos el lenght de celulas por fila
          lastColumn = boardRef[indexRow].length

          // Volvemos a declarar las celulas vivas alrededor en cero por cada celula
          let cells = 0

          // Si es la primera celula de la fila la actual, se va a verificar la ultima celula de de la fila
          firstColumnToModifie = indexColumn === 0 ? lastColumn -1 : indexColumn - 1;

          // Si es la ultima celula de la fila la actual, se va a verificar la primera celula de de la fila
          lastColumnToModifie = indexColumn === lastColumn - 1 ? 0 : indexColumn + 1

          // Recorro la fila anterior y en caso de encontrar una celula viva sumo 1 a cells
          boardRef[firstRowToModifie][firstColumnToModifie] && cells++
          boardRef[firstRowToModifie][indexColumn] && cells++
          boardRef[firstRowToModifie][lastColumnToModifie] && cells++

          // Recorro la fila actual, solo la celula anterior y la proxima, y en caso de encontrar una celula viva sumo 1 a cells
          boardRef[indexRow][firstColumnToModifie] && cells++
          boardRef[indexRow][lastColumnToModifie] && cells++

          // Recorro la proxima fila y en caso de encontrar una celula viva sumo 1 a cells
          boardRef[lastRowToModifie][firstColumnToModifie] && cells++
          boardRef[lastRowToModifie][indexColumn] && cells++
          boardRef[lastRowToModifie][lastColumnToModifie] && cells++


          // Modificamos el estado de la celula de acuerdo a sus reglas
          // En caso de que la celula actual esté viva y tenga de 2 a 3 celulas vivas alrededor
          if( boardRef[indexRow][indexColumn] && cells >= 2 && cells <= 3){
            // La celula actual se mantiene vive
            newBoard[indexRow][indexColumn] = 1
          
          // En caso de que la celula actual no este viva pero tenga 3 celulas vivas alrededor
          } else if( !boardRef[indexRow][indexColumn] && cells === 3){
            // La celula actual se reaviva
            newBoard[indexRow][indexColumn] = 1
          
          } else {
            // Si no cumple con ninguna de las condiciones anteriores muere o se mantiene muerta
            newBoard[indexRow][indexColumn] = 0  
          }

        }

      }

      // Actualizamos la variable local para el setInterval
      boardRef = newBoard

      // Contamos una generación mas
      changeGeneration(prevGeneration => prevGeneration + 1)

      // Actualizamos el board
      changeBoard(newBoard)
      
    }, 300);

    // Le asignamos a la referencia el setInterval
    intervalRef.current = timer

}

/**
 * Función que se ejecuta cada vez que se presiona el botón reiniciar
 */
const onClickReload = () => {

  // Vuelve al valor inicial de las generaciones
  changeGeneration(generationRef.current)

  // Eliminamos el setInterval
  clearInterval(intervalRef.current)

  // Llamamos a la función que vuelve a crear la tabla
  createBoard()

}

  return(
    <div>

      {/** Acciones */}
      <Actions
        onClickStart={() => onClickStart()}
        onClickStop={() => clearInterval(intervalRef.current)}
        onClickReload={() => onClickReload()}
        generation={generation}
      />

      {/** Tablero */}
      <Board
        onClickCell={(indexRow, indexColumn) => onClickCell(indexRow, indexColumn)}
        boardSize={boardSize} 
        board={board} />

    </div>
  )

}

export default Home;
