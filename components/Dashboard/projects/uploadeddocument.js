import { Table, Tag, Space, Button } from 'antd';
import React from 'react'
import { MEDIA_URL, MONTH_NAMES } from '../../../utils/constants';
import {BsDownload} from 'react-icons/bs'

const UploadedDocuments=props=>{
    

const columns = [
  {
    title: 'Document Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Uploaded On',
    dataIndex: 'uploadedon',
    key: 'uploadedon',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex:'action',
    render:function fun(link){ return <a href={link} target="_blank"rel="noreferrer" download><Button icon={<BsDownload />}/></a>}
  },
];

const data = props.data.map((val, index)=>{
  const datetime=new Date(val.uploadedAt)
  return {
    key: index,
    name: val.name,
    action:MEDIA_URL+val.document ,
    uploadedon:`${datetime.getDate()}-${MONTH_NAMES[datetime.getMonth()+1]}-${datetime.getFullYear()} at ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`
  }

})

return <Table columns={columns} dataSource={data} />

}

export default UploadedDocuments