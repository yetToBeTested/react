import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface Iprops {
  children?: ReactNode
}
const index: FC<Iprops> = () => {
  return <div>aa</div>
}
export default memo(index)
