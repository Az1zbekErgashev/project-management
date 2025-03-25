import styled from 'styled-components';

export const StyledRequestFilter = styled.div`
  form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    @media screen and (min-width: 1440px) {
      grid-template-columns: repeat(auto-fit, minmax(390px, 1fr));
    }
  }
`;
