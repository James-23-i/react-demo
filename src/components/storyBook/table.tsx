import { Table } from 'antd'
import { dataSource } from './mock'

type TMyTableProps = {
  config: Record<string, any>
  form: any
}

const MyTable: React.FC<TMyTableProps> = ({ config }) => {
  const getColumns = () => {
    const keyList = Object.keys(config).filter((key) => {
      return !config[key]['x-data'].hideInTable
    })

    const columns = keyList.map((item) => {
      return {
        title: config[item].title,
        key: item,
        dataIndex: item,
        visible: config[item]['x-visible'],
      }
    })

    // console.log(columns)
    // if (columns.every((item) => item.visible)) {
    //   return []
    // }
    return columns
  }

  const columns = getColumns()

  return <Table dataSource={dataSource} columns={columns}></Table>
}

export default MyTable
