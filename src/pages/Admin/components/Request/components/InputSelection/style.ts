import styled from 'styled-components';

export const StyledInputSelection = styled.div`
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    h1 {
      font-weight: 700;
    }
  }

  .form-div {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    padding-top: 2px;
    /* padding-left: 80px; */
  }

  .form {
    display: flex;
    gap: 50px;
  }
  .text-area {
    width: 100%;
    max-width: 850px;
  }

  .upload-group {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    box-shadow: none !important;

    .file_name {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      font-size: 10px;
      text-align: center;
    }
  }
  .upload-form {
    width: 90px;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.08);
    position: relative;
    &.big {
      svg {
        width: 80px;
        height: 130px;
        color: var(--base-color);
      }
    }
    &.small {
      svg {
        width: 30px;
        height: 60px;
        color: var(--base-color);
      }
    }
  }

  .upload-container {
    position: relative;
  }

  .delete-svg {
    position: absolute;
    right: -20px;

    cursor: pointer;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.08);
    svg {
      height: 20px !important;
      width: 20px !important;
      color: var(--base-color);
    }
  }

  .form-content {
    width: 400px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }

  .form-cont {
    width: 400px;
    display: flex;
    flex-direction: column;
    row-gap: 100px;
    justify-content: flex-end;
    margin-bottom: 50px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    padding: 10px;
    border-radius: 8px;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: #fff;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 12px;
      background-color: rgb(214, 207, 207);
      padding: 10px;
      border-radius: 8px;
    }
  }

  .action-btns {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 30px !important;
    justify-content: end;
  }

  .category {
    width: 100%;
    margin-top: 0 !important;

    .category_input {
      margin-top: 20px !important;
      display: flex;
      gap: 10px;

      .ant-form-item {
        width: 100%;
      }

      button {
        margin-top: 30px !important;
      }
    }
  }

  .date-picker {
    height: 77px;
    display: flex;
    align-items: center;

    .ant-form-item {
      width: 100%;
    }
  }
`;
