import React from 'react'
import { Divider, Upload, Switch, message } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import styles from '../expenditure/expenditure.module.css'
import ExpenditureForm from './uploadexpenditure';

const { Dragger } = Upload;

const UploadData=props=>{

const [switchval, setSwitchVal]= React.useState({daily:true, expense:false})

const handleSwitchChange=(value, id)=>{
    switch(id){
      
      case "d":{
        setSwitchVal(state=>{
          return{
          ...state,
          daily:value
          }
        })
        break;
      }
      case "e":{
        setSwitchVal(state=>{
          return{
          ...state,
          expense:value
          }
        })
        break;
      }

    }
    console.log(switchval)
}

const prop = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
    return(
        <div>
            <Divider orientation="left">Daily Transaction Sheet Upload &nbsp; <Switch defaultChecked={switchval.daily} checkedChildren="On" unCheckedChildren="Off" onChange={(value)=>handleSwitchChange(value, "d")} /></Divider>
            {switchval.daily?<div className={styles.upload}>
            <Dragger {...prop} className={styles.dragger}>
    <p className="ant-upload-drag-icon">
    <FileAddOutlined />
    </p>
    <p className="ant-upload-text">Click this area and select file to upload</p>
    <p className="ant-upload-hint">
      &nbsp;&nbsp;&nbsp;&nbsp;Please upload daily transaction report sheet.&nbsp;&nbsp;&nbsp;&nbsp;
    </p>
  </Dragger>
  
    </div>:null}
    
    <Divider orientation="left">Expenditure Upload &nbsp; <Switch checkedChildren="On" unCheckedChildren="Off" onChange={(value)=>handleSwitchChange(value, "e")} /></Divider>
        {switchval.expense?<ExpenditureForm />:null}
        </div>
    )
}

export default UploadData
