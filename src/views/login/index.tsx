import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Title, Wrapper, Button, Link, StyledLink } from './style'

interface Iprops {
  children?: ReactNode
}

const login: FC<Iprops> = () => {
  return (
    <Wrapper>
      <Title>Hello World!</Title>
      <br />
      <Button>Normal</Button>
      <Button $primary>Primary</Button>
      <br />
      <Link>Unstyled, boring Link</Link>
      <br />
      <StyledLink>Styled, exciting Link</StyledLink>
    </Wrapper>
  )
}
export default memo(login)
