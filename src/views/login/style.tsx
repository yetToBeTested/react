import React from 'react'
import styled from 'styled-components'

// with some styles
export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.section`
  padding: 200px;
  background: papayawhip;
  height: 100vh;
  box-sizing: border-box;
`
export const Button: any = styled.button<any>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.$primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.$primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`
export const Link = ({ className, children }: any) => (
  <a className={className}>{children}</a>
)

export const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`
