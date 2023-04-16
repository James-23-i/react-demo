import { Button } from 'antd'
import React from 'react'
import FloatButton from './floatButton'

const Index = () => {
  return (
    <FloatButton>
      <Button style={{ width: '56px', height: '48px' }}>1</Button>
      <Button style={{ width: '56px', height: '48px' }}>2</Button>
      <Button style={{ width: '56px', height: '48px' }}>3</Button>
      <Button style={{ width: '56px', height: '48px' }}>4</Button>
      <Button style={{ width: '56px', height: '48px' }}>5</Button>
      <Button style={{ width: '56px', height: '48px' }}>6</Button>
    </FloatButton>
  )
}

export default Index
