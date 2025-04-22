
// import styled from 'styled-components';

import { styled } from "styled-components";

// export const StyledRequests = styled.div`
//   .header-line {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 24px;
//     background-color: green;
//   }

//   .global-title {
//     font-size: 24px;
//     font-weight: 600;
//     color: #1a1a1a;
//   }

//   .upload-download {
//     display: flex;
//     gap: 16px;
//   }

//   .spinnig-wrrap {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
//   }

//   .table-detail {
//     padding: 24px;
//     background: #fff;
//     border-radius: 8px;
//     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//     margin: 16px 0;
//     max-width: 750px;
//     width: 100%;
//     position: relative;

//     .header {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 24px;
//     }

//     .title {
//       font-size: 24px;
//       font-weight: 600;
//       color: #1a1a1a;
//     }

//     .close-button {
//       background: #f5f5f5;
//       border: none;
//       padding: 8px 16px;
//       border-radius: 4px;
//       cursor: pointer;
//       font-size: 14px;
//     }
//   }
// `;

export const StyledTableDetail = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 16px 0;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  width: 90%;
  transform: translateX(-50%, -50%);
  position: relative;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 10px;
  }

  .title {
    font-size: 24px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .close-button {
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
`;