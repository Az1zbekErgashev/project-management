import styled from 'styled-components';

export const StyledSitebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: var(--base-color);
  width: 250px;
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;

  .title {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .logout-btn {
    display: flex;
    justify-content: center;
    button {
      background: none;
      border: none;
      color: var(--white);
    }
  }

  .navlinks {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding-left: 20px;

    a {
      &:hover {
        color: var(--accent-color);
      }
      &.active {
        color: var(--accent-color);
      }
    }
  }
`;
