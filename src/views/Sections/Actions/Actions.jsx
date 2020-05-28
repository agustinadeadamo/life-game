/**
 * Dependencias
 */
import React, { memo } from "react";

/**
 * Estilos
 */
import { Button, ContainerActions, ContainerFirstColumn, ContainerSecondColumn } from "./style";


/**
 * Componente de acciones
 */
const Actions =  memo(({ ...props }) => {

  // Desestructuramos props
  const {
    onClickStart = () => {},
    onClickStop = () => {},
    onClickReload = () => {},
    generation = 0
  } = props;

  return (
    <ContainerActions>

      {/** Columna de botones */}
      <ContainerFirstColumn>

        {/** Botón que inicializa */}
        <Button onClick={() => onClickStart()}>
          <b>Iniciar</b>
        </Button>

        {/** Botón que detiene */}
        <Button onClick={() => onClickStop()}>
          <b>Detener</b>
        </Button>

        {/** Botón que reinicia */}
        <Button onClick={() => onClickReload()}>
          <b>Reiniciar</b>
        </Button>
      </ContainerFirstColumn>
      
      {/** Columna de contador */}
      <ContainerSecondColumn>
        <p><b>Generación # {generation ? generation : "--"}</b></p>
      </ContainerSecondColumn>

    </ContainerActions>
  )

})

export default Actions

