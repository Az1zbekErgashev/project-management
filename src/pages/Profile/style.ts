import styled from 'styled-components';

export const StyledProfile = styled.div`
  form {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 50px 0;
    .actions {
      display: flex;
      gap: 12px;
      position: absolute;
      bottom: 10px;
    }
  }
`;
