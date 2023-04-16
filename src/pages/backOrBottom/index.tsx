import { AffixProps } from 'antd'
import React from 'react'
import { BaseButtonGroup } from '../../components/baseButtonGroup'
import { AButton } from '../../components/buttonGroup/fragment/aButton'

export const BackOrBottom: React.FC<
  {
    containerRef?: React.MutableRefObject<HTMLElement>
  } & Pick<AffixProps, 'offsetBottom'> &
    Pick<ScrollToOptions, 'behavior'>
> = ({ containerRef, offsetBottom = 150, behavior = 'smooth' }) => {
  const onButtonClick = (params: { isTop: boolean }) => {
    const container = containerRef?.current
    const documentElement = document.documentElement
    const { isTop } = params
    if (isTop) {
      container
        ? container.scroll({ top: 0, behavior })
        : documentElement.scroll({ top: 0, behavior })
    } else {
      container
        ? container.scroll({
            top: container.scrollHeight,
            behavior,
          })
        : documentElement.scroll({
            top: documentElement.scrollHeight,
            behavior,
          })
    }
  }

  return (
    <BaseButtonGroup isShowScroll>
      <AButton
        text="TOP"
        onClick={() => onButtonClick({ isTop: true })}
      ></AButton>

      <AButton
        text="BOTTOM"
        onClick={() => onButtonClick({ isTop: false })}
      ></AButton>
    </BaseButtonGroup>
  )
}
