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
    /* background-color: green; */

    img {
      width: 100%;
      max-height: 100%;
      transition: transform 0.8s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .form-container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--white);
    padding: 20px;
    animation: slideIn 0.8s ease-in-out; 

    form {
      width: 100%;
      max-width: 400px;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      background: var(--white);
      transition: transform 0.3s ease-in-out;

      &:hover {
        transform: translateY(-5px); 
      }

      .flex {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
      }

      .button {
        margin-top: 20px; 

        button {
          margin-top: 20px;;
          width: 100%;
          background-color: var(--green);
          color: var(--white);
          border: none;
          font-size: 16px;
          font-weight: 500;
          border-radius: 4px; 
          transition: background-color 0.3s ease-in-out;

          &:hover {
            background-color: var(--primary-dark-color);
            color: green;
            border: 2px, solid, green;
          }
        }
      }

      .title {
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 20px;
        color: var(--text-color);
      }
    }
  }

  /* Animation keyframes */
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