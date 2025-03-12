import styled from 'styled-components';

export const StyledConiformModal = styled.div`
  .content {
    text-align: center;
    padding: 24px 0 32px 0;
    font-size: 0.888888rem;
    font-weight: 400;
  }
  .title {
    text-align: center;
    margin-top: 40px;
    font-size: 1.11111rem;
    font-weight: 600;
    line-height: 24.2px;
    text-decoration-skip-ink: none;
    color: #c52323;

    &.title-green {
      color: var(--accent-color);
    }
  }

  .profile-modal-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
`;
