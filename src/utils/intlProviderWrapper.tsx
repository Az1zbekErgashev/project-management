import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Spinner } from '../ui';
import i18n from '../utils/i18n';

interface IntlProviderWrapperProps {
  children: React.ReactNode;
}

const IntlProviderWrapper = ({ children }: IntlProviderWrapperProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense
        fallback={
          <div className="page-preloader">
            <Spinner spinning={true} />
          </div>
        }
      >
        {children}
      </Suspense>
    </I18nextProvider>
  );
};

export default IntlProviderWrapper;
