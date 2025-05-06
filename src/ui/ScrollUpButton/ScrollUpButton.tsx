import { smoothScroll } from 'utils/globalFunctions';
import { StyledScrollUpButton } from './style';
import SvgSelector from 'assets/icons/SvgSelector';

export const ScrollUpButton = () => {
  return (
    <StyledScrollUpButton onClick={() => smoothScroll('top', 0)}>
      <SvgSelector id="backToTop" />
    </StyledScrollUpButton>
  );
};
