import React, { ReactNode, useEffect, useState } from 'react'
import { ButtonGroup } from '../buttonGroup'

export const BaseButtonGroup: React.FC<{
  children?: ReactNode[] | ReactNode
  isShowScroll: boolean
  containerRef?: React.MutableRefObject<HTMLElement>
}> = ({ children, containerRef, isShowScroll = false }) => {
  const [isShowByScroll, setIsShowByScroll] = useState<boolean>(false)

  useEffect(() => {
    if (!isShowScroll) {
      setIsShowByScroll(true)
      return
    }
    const target = containerRef?.current ?? document.documentElement
    const observer = new ResizeObserver(() => {
      const isShowAffix = target.scrollHeight > target.offsetHeight
      setIsShowByScroll((state) => {
        if (isShowAffix) {
          return isShowAffix
        }
        return state
      })
    })
    observer.observe(target)
    return () => {
      observer.unobserve(target)
    }
  }, [isShowScroll, containerRef])

  return (
    <>{isShowByScroll && <ButtonGroup children={children}></ButtonGroup>}</>
  )
}
