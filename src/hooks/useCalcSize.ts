import { MutableRefObject, useEffect, useState } from 'react'

const useCalcSize = (element: MutableRefObject<HTMLIFrameElement | null>) => {
  const [size, setSize] = useState<{ size: number }>({
    size: 96,
  })

  useEffect(() => {
    const parentElement = element.current?.parentElement
    if (!parentElement) {
      return
    }
    // top、bottom、left、right
    // console.log(parentElement.getBoundingClientRect());

    const { top } = parentElement.getBoundingClientRect()
    setSize({ size: top })
  }, [element])

  return {
    size,
  }
}

export default useCalcSize
