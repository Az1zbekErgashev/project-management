import styled from 'styled-components';

export const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
  form {
    width: 400px;
    border-radius: 8px;
    padding: 50px 20px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    box-shadow: 1px 1px 20px 0 rgba(205, 215, 228, 0.5);
    background: var(--white);
    position: relative;

    .flex {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }
  }

  .ant-image {
    position: absolute;
    width: 100%;
    height: 100%;
    img {
      object-fit: cover;
    }
  }

  .button {
    button {
      width: 100%;
    }
  }

  .title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
  }
`;
