import styled from 'styled-components';

export const StyledRequestFilter = styled.div`
  form {
    display: grid;
    grid-template-columns: repeat(6, 1fr);   
    gap: 5px;
    border-radius: 5px;
    .input-selection {
      width: 100%;
      min-width: 0;
      max-width: 100%;
}

    @media screen and (max-width: 1200px) {   
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 768px) {    
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 480px) {     
      grid-template-columns: 1fr;
    }
  }
`;