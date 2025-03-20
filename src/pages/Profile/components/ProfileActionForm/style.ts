import styled from 'styled-components';

export const StyledProfileActionForm = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .upload {
    .ant-form-item {
      padding: 8px 16px;
      border-radius: 18px;
      border: 1px solid var(--base-color);
      height: 33px !important;
      max-width: 150px;
      justify-content: center;
      display: flex;
      align-items: center;
      margin-top: 20px !important;
    }
    .ant-upload {
      color: var(--base-color);
      font-size: 0.777777rem;
      cursor: pointer;
    }
  }

  .right-layout,
  .left-layout {
    width: 100%;
  }

  .upload_wrapper {
    display: flex;
    justify-content: space-between;
    .form-wrapper {
      display: flex;
      flex-direction: column;
      gap: 16px;
      color: var(--gray-text);
    }

    .image-side {
      width: 300px;
      height: 300px;
      position: relative;
    }

    .ant-image-img {
      width: 300px;
    }

    .upload_settings {
      margin: 12px 0 20px 0 !important;
      font-size: 0.7777777rem;
      font-weight: 400;
      line-height: 16.94px;
      color: var(--gray-text);
    }

    .image-title {
      font-size: 0.88888888rem;
      font-weight: 500;
    }
  }

  .delete-profile {
    position: absolute;
    right: 5px;
    top: 5px;
    border: 1px solid white;
    border-radius: 100%;
    background: white;
    display: flex;
    align-items: center;
    padding: 2px;

    svg {
      width: 15px;
      height: 15px;
      path {
        fill: var(--ant-reqired-label-color);
      }
    }
  }

  .flex {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    .ant-form-item {
      width: 100%;
    }
  }

  .action-button {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .password-item {
    width: 100%;
  }
`;
