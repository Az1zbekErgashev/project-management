import styled from 'styled-components';

export const StyledAdminUsers = styled.div`
  .action {
    display: flex;
    align-items: center;
    gap: 15px;
    svg {
      width: 20px;
      height: 20px;
    }

    .delete {
      svg {
        path {
          fill: var(--red);
        }
      }
    }
  }

  .header-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
