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

  .fields {
    display: flex;
    .rows {
      width: 100%;
      padding: 0 20px;

      display: flex;
      flex-direction: column;
      row-gap: 20px;
      .cards {
        min-height: 380px;

        border: 1px solid var(--gray-300);
        border-radius: 10px;
        overflow: hidden;

        .card_header {
          height: 50px;
          display: flex;
          align-items: center;
          padding-left: 50px;
          background: #f9f9fa;

          h3 {
            font-weight: 600;
          }
        }

        .inputs {
          display: flex;
          flex-direction: column;
          row-gap: 12px;
          padding: 20px 50px 30px 50px;
        }
      }
    }

    .ant-upload {
      width: 100%;
    }

    .upload-box {
      margin-top: 30px;
      background-color: #f4f4f4;
      border: 2px dashed #ccc;
      height: 150px;
      width: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .centeredFileName {
      text-align: center;
      margin: 10px 0;
      color: #333;
      font-size: 14px;
      word-break: break-all;
      height: 150px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f4f4f4;
      border: 2px dashed #ccc;
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
