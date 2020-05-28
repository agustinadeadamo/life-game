/**
 * Dependencias
 */
import styled from "styled-components";

/**
 * Estilos contenedor acciones
 */
export const ContainerActions = styled.div`
    width: 100%;   
    display: flex;
    margin:50px 0 20px;
    flex-wrap: wrap;
    color: #3E4244;
    padding: 5px;
`;

/**
 * Estilos columna botones
 */
export const ContainerFirstColumn = styled.div`
    width: 50%;   
    display: flex;
    flex-wrap: nowrap;

    @media (max-width: 768px) {
      width: 100%;
    }
`;

/**
 * Estilos columna contador
 */
export const ContainerSecondColumn = styled.div`
    width: 50%;   
    display: flex;
    flex-wrap: nowrap;    
    justify-content: flex-end;

    @media (max-width: 768px) {
      width: 100%;
      justify-content: flex-start;
      margin-top: 20px;
    }
`;

/**
 * Estilos botones
 */
export const Button = styled.button`
    width: 150px;
    background-color: #97D0F5;
    border: 0;
    margin-right: 10px;
    color: #fff;
    padding: 7px 0;

    &:focus {
      outline: 0;
      background-color: #72AECB
    }
`;

