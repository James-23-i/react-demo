import React, { useRef } from 'react'
import useCalcSize from '../../hooks/useCalcSize'

type TIframeContainerProps = {
  src: string
}

export const IframeContainer: React.FC<TIframeContainerProps> = ({ src }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const { size } = useCalcSize(iframeRef)

  return (
      <iframe
        ref={iframeRef}
        title="iframe"
        src={src}
        frameBorder="0"
        width="100vw"
        height={`${size}px`}
      />
  )
}
