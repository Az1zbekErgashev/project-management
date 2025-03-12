import styled from 'styled-components';

export const StyledScrollUpButton = styled.button`
  position: absolute;
  right: 0.5%;
  top: 0.5%;
  z-index: 1000;

  @media screen and (min-width: 728px) {
    right: 1%;
    top: 1%;
  }

  @media screen and (min-width: 1280px) {
    right: 3%;
    top: 3%;
  }

  transition: all 0.3s;

  svg {
    stroke: var(--base-color);
    transition: all 0.3s;
  }

  path {
    fill: var(--base-color);
    transition: all 0.3s;
  }

  &:hover {
    svg {
      stroke: var(--accent-color);
    }

    path {
      fill: var(--accent-color);
      transition: all 0.3s;
    }
  }
`;
