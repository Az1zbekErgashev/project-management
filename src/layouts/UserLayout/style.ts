import styled from 'styled-components';

export const StyledPage = styled.div`
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .ant-layout-content {
    width: initial !important;

    margin-bottom: 120px;
  }

  .logo {
    display: inline-block;
    font-size: 1.66667rem;
    line-height: normal;
    font-weight: 700;

    @media screen and (min-width: 1280px) {
      font-size: 2.22222rem;
    }
  }

  .primary-btn {
    background: ${({ theme }) => theme.antd.colorPrimary};
  }
`;
