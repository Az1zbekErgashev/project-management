import styled from "styled-components";

export const StyledUpload = styled.div`
  background-color: #fff;
  height: 500px;
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
    background-color: #f4f4f4;
    border: 2px dashed #ccc;
    height: 150px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .close-btn {
    width: 100%;
  }
`;
