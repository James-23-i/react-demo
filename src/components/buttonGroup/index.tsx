import React, { ReactNode, useRef, useState } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { Expand } from './fragment/expand'
import styles from './index.module.css'

const BUTTON_LENGTH = 3

export const ButtonGroup: React.FC<{ children?: ReactNode[] | ReactNode }> = ({
  children,
}) => {
  const dragRef = useRef<HTMLDivElement | null>(null)
  const [isExpand, setIsExpand] = useState<boolean>(false)
  const [isMask, setIsMask] = useState<boolean>(false)
  // 设置随光标移动
  // const [bounds, setBounds] = useState<DraggableBounds>({
  //   bottom: 60,
  //   right: 60,
  //   top: 100,
  //   left: 100,
  // })

  /**
   * children
   *  button群组
   */

  const renderChildren = () => {
    if (Array.isArray(children)) {
      const count = React.Children.count(children)
      if (count <= BUTTON_LENGTH) {
        return children
      }
      return (
        <>
          {children.slice(0, BUTTON_LENGTH)}
          {isExpand && <>{children.slice(BUTTON_LENGTH)}</>}
          <Expand isExpand={isExpand} setIsExpand={setIsExpand}></Expand>
        </>
      )
    }
    return children // 不是array，就是只有一个按钮的场景
  }

  const onStart = (_e: DraggableEvent, data: DraggableData) => {
    // const drag = dragRef.current?.parentElement
    // if (!drag) {
    //   return
    // }
    // const { top, bottom, left, right } = drag.getBoundingClientRect()
    // const { clientHeight, clientWidth } = document.documentElement
    // console.log(clientHeight, clientWidth, data)
    // console.log(top, bottom, left, right)
    setIsMask(true)
    // setBounds({
    //   top: data.y - top,
    //   bottom: clientHeight - (bottom - data.y),
    //   left: data.x - left,
    //   right: clientWidth - (right - data.x),
    // })
  }
  return (
    <>
      {/* 使用mask防止与外界的元素形成干扰 */}
      {isMask && <div className={styles.mask}></div>}
      <Draggable
        nodeRef={dragRef}
        // bounds={bounds}
        onStop={() => {
          setIsMask(false)
        }}
        onStart={onStart}
      >
        <div
          className={styles.wrapDiv}
          style={{ display: 'flex', flexDirection: 'column' }}
          ref={dragRef}
        >
          {renderChildren()}
        </div>
      </Draggable>
    </>
  )
}
