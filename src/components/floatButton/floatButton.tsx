import { Button } from 'antd'
import React, { ReactNode, useState } from 'react'

const SLICE_COUNT = 3

const FloatButton: React.FC<{ children?: ReactNode }> = ({ children }) => {
  /**
   *
   * React.Children方法
   *  - React.Children.map
   *  - React.Children.forEach
   *  - React.Children.count
   *  - React.Children.only
   *  - React.Children.toArray
   */

  const [isExpand, setIsExpand] = useState<boolean>(false)
  const renderChildren = () => {
    if (!Array.isArray(children)) {
      return undefined
    }
    const count = React.Children.count(children)
    if (count <= SLICE_COUNT) {
      return children
    }
    return (
      <>
        {children.slice(0, SLICE_COUNT)}
        {isExpand && <>{children.slice(SLICE_COUNT)}</>}
        <Button
          style={{ width: '56px', height: '48px' }}
          onClick={() => setIsExpand((state) => !state)}
        >
          {isExpand ? '收起' : '展开'}
        </Button>
      </>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {renderChildren()}
      </div>
    </div>
  )
}

export default FloatButton
