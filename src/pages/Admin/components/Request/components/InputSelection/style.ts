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
    background: transparent !important;

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
    row-gap: 15px;
    justify-content: flex-end;
    margin-bottom: 50px;

    &:second-child {
      margin-bottom: 50px;
    }
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

  .file-upload-container {
    position: relative; /* For positioning the delete button */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    width: fit-content;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

    .delete-button {
      position: absolute;
      top: 4px;
      right: 4px;
      background: none;
      border: none;
      cursor: pointer;
      color: #999;
      font-size: 12px;
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: #ff4d4f; /* Red on hover */
      }

      .anticon {
        font-size: 12px;
      }
    }

    .ant-btn {
      background-color: var(--base-color);
      color: white;
      border: none;
      padding: 4px 12px;
      height: 28px;
      font-size: 14px;
      border-radius: 4px;
      display: flex;
      align-items: center;

      &:hover {
        background-color: var(--base-color);
      }

      .anticon {
        margin-right: 4px;
      }
    }

    .file-info {
      display: flex;
      gap: 8px;
      font-size: 12px;
      color: #666;

      .file-name {
        font-weight: 500;
        color: #333;
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .file-size {
        color: #999;
      }
    }

    .file-link {
      font-size: 12px;

      a {
        color: var(--base-color);
        text-decoration: none;
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;

        &:hover {
          text-decoration: underline;
          color: var(--base-color);
        }
      }
    }
  }
`;
