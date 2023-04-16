import React, { ReactNode, useState } from 'react'
import styles from './index.module.css'

type TRount = Pick<React.CSSProperties, 'left' | 'top' | 'right' | 'bottom'>

// 需要结合绝对定位使用
export const Dragged: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [canDrag, setCanDrag] = useState<boolean>(false)
  const [offset, setOffset] = useState<TRount>()
  return (
    <div
      className={styles.dragDiv}
      style={offset}
      onDragStart={() => {
        setCanDrag(true)
      }}
      draggable
      onDragEnd={(event) => {
        if (canDrag) {
          setOffset({ left: `${event.clientX}px`, top: `${event.clientY}px` })
          setCanDrag(false)
        }
      }}
    >
      {children}
    </div>
  )
}
