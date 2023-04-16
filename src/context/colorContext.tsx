import React, { ReactNode, useContext, useMemo, useState } from 'react'

type TContext = {
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
}

const Context = React.createContext<TContext | null>(null)

export const ColorContextValue = () => {
  const ctxValue = useContext(Context)
  if (!ctxValue) {
    throw new Error('value is null')
  }
  return ctxValue
}

/** react18 把React.FC类型默认为空对象，没有children了
 *  type FC<P = {}> = FunctionComponent<P>;
 */

const ColorContext: React.FC<{ children?: ReactNode }> = (props) => {
  const [color, setColor] = useState<string>('red')

  const value = useMemo(() => {
    return {
      color,
      setColor,
    }
  }, [color, setColor])

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}

export default ColorContext
