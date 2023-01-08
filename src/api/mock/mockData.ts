export type ResponseData = Partial<{
  numberId: number
  name: string
  age: number
  class: string
  authorization: string
}>

export type RequestForm = Partial<{
  name: string
  age: number
  class: string
}>

type TPropsData = ResponseData[]

export const dataSource: TPropsData = [
  {
    numberId: Math.random() * 100,
    name: '小米1',
    age: 20,
    class: '高三1',
    authorization: '1',
  },
  {
    numberId: Math.random() * 100,
    name: '小米1',
    age: 20,
    class: '高三1',
    authorization: '1',
  },
  {
    numberId: Math.random() * 100,
    name: '小米2',
    age: 21,
    class: '高三2',
    authorization: '2',
  },
  {
    numberId: Math.random() * 100,
    name: '小米3',
    age: 22,
    class: '高三3',
    authorization: '3',
  },
  {
    numberId: Math.random() * 100,
    name: '小米4',
    age: 28,
    class: '高三4',
    authorization: '4',
  },
  {
    numberId: Math.random() * 100,
    name: '小米5',
    age: 60,
    class: '高三5',
    authorization: '5',
  },
  {
    numberId: Math.random() * 100,
    name: '小米6',
    age: 30,
    class: '高三6',
    authorization: '6',
  },
  {
    numberId: Math.random() * 100,
    name: '小米7',
    age: 40,
    class: '高三7',
    authorization: '7',
  },
  {
    numberId: Math.random() * 100,
    name: '小米8',
    age: 28,
    class: '高三8',
    authorization: '8',
  },
  {
    numberId: Math.random() * 100,
    name: '小米9',
    age: 19,
    class: '高三9',
    authorization: '9',
  },
  {
    numberId: Math.random() * 100,
    name: '小米10',
    age: 29,
    class: '高三10',
    authorization: '10',
  },
  {
    numberId: Math.random() * 100,
    name: '小米11',
    age: 56,
    class: '高三11',
    authorization: '11',
  },
]
