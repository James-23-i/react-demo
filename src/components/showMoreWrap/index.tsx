import React, { useEffect, useRef, useState } from 'react'
import './index.css'

type TShowMoreWrapProps = Partial<{
  children: React.ReactNode
  /** 收缩展开高度 */
  shrinkHeight: number
  /** 展开文字 */
  expandText: string
  /** 收取文字 */
  unExpandText: string
  /** 定义children wrap样式 */
  childDivClassName: string
}>

const ShowMoreWrap: React.FC<TShowMoreWrapProps> = ({
  shrinkHeight = 0,
  unExpandText = '收起',
  expandText = '展开',
  childDivClassName,
  children,
}) => {
  const childRef = useRef<HTMLDivElement | null>(null)
  const [isShowMore, setIsShowMore] = useState<boolean>(false)
  const [toggleShow, setToggleShow] = useState<boolean>(false)

  useEffect(() => {
    // ResizeObserver 这个监听某个元素变化更好
    const childElement = childRef.current as HTMLDivElement
    if (!childElement) {
      return
    }
    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height
      console.log(height, shrinkHeight)
      if (height > shrinkHeight) {
        setToggleShow(true)
      } else {
        setToggleShow(false)
      }
    })
    observer.observe(childElement)
    return () => {
      observer.unobserve(childElement)
    }
  }, [childRef, shrinkHeight])

  return (
    <>
      <div
        style={{ maxHeight: isShowMore ? '100%' : `${shrinkHeight}px` }}
        className="wrapDiv"
      >
        <div ref={childRef} className={childDivClassName}>
          <>
            {/* children可以用作遍历 */}
            {/* {React.Children.map(children, (child, index) => {
              // 判断是否是个有效的react节点
              if (!React.isValidElement(child)) {
                return
              }
              console.log(children, child, index)
            })} */}
            {children}
          </>
        </div>
      </div>
      {toggleShow && (
        <span
          className="moreSpan"
          onClick={() => {
            setIsShowMore((state) => !state)
          }}
        >
          {isShowMore ? unExpandText : expandText}
        </span>
      )}
    </>
  )
}

export default ShowMoreWrap
