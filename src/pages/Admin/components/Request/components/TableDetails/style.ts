import { styled } from 'styled-components';

export const StyledTableDetail = styled.div`
  background: #fff;
  border-radius: 8px;
  margin: 16px 0;
  display: flex;
  flex-direction: column;

  .header-line {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-line {
      display: flex;
      gap: 20px;
    }

    .back-buttton {
      margin: 18px 0 40px 0 !important;
    }
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

  .delete-comment-button {
    background-color:rgb(226, 151, 151);
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .edit-comment-button {
    background-color: #B7E0FF;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .comment-author {
    background-color: #D9EAFD;
    padding: 5px;
    border-radius: 4px;
    color:rgb(67, 105, 144);
    font-weight: 300;
  }
`;
