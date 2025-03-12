import React, { useEffect, useState } from 'react';
import { StyledFixedScrollUpButton } from './style';
import { smoothScroll } from 'utils/globalFunctions';

export const FixedScrollUpButton = () => {
  const [isVisibleButton, setIsVisibleButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && !isVisibleButton) {
        setIsVisibleButton(true);
      } else if (window.scrollY <= 500 && isVisibleButton) {
        setIsVisibleButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisibleButton]);

  return (
    <StyledFixedScrollUpButton
      className={`${isVisibleButton ? '' : 'invisible'}`}
      onClick={() => {
        smoothScroll('top', 0);
      }}
    >
    </StyledFixedScrollUpButton>
  );
};
