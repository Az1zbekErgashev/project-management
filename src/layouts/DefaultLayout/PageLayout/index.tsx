import React from 'react'
import { StyledPage } from './style'

interface PageLayoutProps {
  children?: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return <StyledPage className={'page-layout'}>{children}</StyledPage>
}

export default PageLayout
