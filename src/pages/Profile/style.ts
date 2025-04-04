import styled from 'styled-components';

export const StyledProfile = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;
  padding: 20px;

  form {
    width: 100%;
    max-width: 1200px;
    max-height: 700px;
    background-color: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
      border-radius: 10px;
    }
  }

  .ant-input,
  .ant-picker,
  .ant-select-selector {
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;
    &:hover {
      border-color: #1890ff;
    }

    &:focus {
      border-color: #1890ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }

  .profile-image {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    border-radius: 50%;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #1890ff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
`;
