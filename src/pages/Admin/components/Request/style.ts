import styled from 'styled-components';

export const StyledRequests = styled.div`
  position: relative;
  .header-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .upload-download {
    display: flex;
    gap: 10px;
  }

  .down-upload {
    margin-right: 10px;
    border-radius: 10px;
  }

  .spinnig-wrrap {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
