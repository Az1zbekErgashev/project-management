import React from 'react'
import { StyledPage } from './style'
interface PageContentProps {
  children?: React.ReactNode
}

const PageContent = ({ children }: PageContentProps) => {
  return <StyledPage className={'page-content'}>{children}</StyledPage>
}

export default PageContent
