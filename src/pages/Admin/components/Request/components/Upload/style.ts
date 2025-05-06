import styled from 'styled-components';

export const StyledUpload = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;

  .upload-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .file-rules {
    font-size: 14px;
    color: #888;
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

  .ant-upload,
  .ant-form-item {
    width: 100%;
    max-width: 300px;
    width: 300px;
  }

  .footer-btn {
    display: flex;
    align-items: center;
    gap: 20px;

    button {
      width: 140px;
      max-width: 140px;
    }
  }
`;
