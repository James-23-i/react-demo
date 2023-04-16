import React from 'react'
import { AButton } from './aButton'

export const Expand: React.FC<{
  isExpand: boolean
  setIsExpand: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setIsExpand, isExpand }) => {
  return (
    <AButton
      onClick={() => {
        setIsExpand((state) => !state)
      }}
      text={isExpand ? '收起' : '展开'}
    ></AButton>
  )
}
