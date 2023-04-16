import { useEffect } from 'react'

type TMessage = {
  type: string
  payload?: unknown
}

const usePostMessage = () => {
  const postMessage = (message: TMessage) => {
    window.parent.postMessage(message, '*')
  }

  const receiveMessage = (event: MessageEvent) => {
    const origin = event.origin
    console.log(origin)
    if (origin !== 'https://react.docschina.org') {
      return
    }
    console.log(event.data)
  }

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false)

    return () => {
      window.removeEventListener('message', receiveMessage, false)
    }
  }, [])

  return {
    postMessage,
  }
}

export default usePostMessage
