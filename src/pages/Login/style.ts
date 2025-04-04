import styled from 'styled-components';
export const StyledLoginPage = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;

  .image-container {
    width: 50%;
    height: 100%;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      max-height: 100%;
    }
  }

  .form-container {
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: var(--white);
    padding: 20px;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    form {
      width: 100%;
      max-width: 350px;
      height: 500px;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      background: var(--white);



      .flex {
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 20px;
        gap: 30px;
      }

      .button {
        margin-top: 30px;

        button {
          margin-top: 90px;
          width: 100%;
          background-color: var(navy);
          color: var(--white);
          border: none;
          font-size: 16px;
          font-weight: 500;
          border-radius: 15px;
          transition: background-color 0.3s ease-in-out;

          &:hover {
            background-color: var(--primary-dark-color);
            color: navy;
            border: 2px, solid, navy;
          }
        }
      }

      .title {
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 20px;
        color: var(navy);
      }
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
