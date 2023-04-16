import React from 'react'
import { Button, ButtonProps } from 'antd'

export const AButton: React.FC<{ text: string } & ButtonProps> = ({
  text,
  ...restProps
}) => {
  return (
    <Button
      style={{
        width: '56px',
        height: '48px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...restProps}
    >
      {text}
    </Button>
  )
}
