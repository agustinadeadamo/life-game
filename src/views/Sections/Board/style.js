
/**
 * Dependencias
 */
import styled, { css } from "styled-components";

/**
 * Estilos tablero
 */
export const BoardContainer = styled.div`
    width: 100%;   
`;

/**
 * Estilos filas
 */
export const Row = styled.div`
    width: 100%;   
    display: flex;
    flex-wrap: nowrap;
`;

/**
 * Estilos celulas
 */
export const Cell = styled.div`
    border: 1px solid #3E4244;
    margin: 5px;
    background-color:  ${props => props.column ? "#97D0F5" : "#fff"};
    border-radius: 50%;
    width: ${props => props.cellSize}px;
    height: ${props => props.cellSize}px;
`;

