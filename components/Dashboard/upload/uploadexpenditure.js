import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import styles from '../expenditure/expenditure.module.css'
import {TiUploadOutline} from 'react-icons/ti'



const ExpenditureForm = (props) => {
  const [state, setState] = useState({
      fintxns:"",
      nonfintxns:"",
      finrate:0.00,
      nonfinrate:0.00,
      fincost:0,
      nonfincost:0,
      baseamount:"",
      gst_percent:0,
      gst:"",
      penalty:0,
      finalamt:0

  });

  const SetGST=(base, per=null, pen=null)=>{
      const gst=per??state.gst_percent??0
      console.log(gst)
      const penalty=pen??state.penalty??0
      const gst_amt=Math.round(base*gst/100)
      let final_amt=(base+gst_amt)-penalty
      setState(state=>{
          return {
              ...state,
              baseamount:base,
              gst_percent:gst,
              gst:gst_amt,
              finalamt:final_amt,
              penalty:penalty

          }
      })

  }

  const SetTheState=(values)=>{
    setState(state=>{
        return {...state,
        ...values
        }
        })
  }

  const handleChange=(values)=>{
      let val=Object.values(values)[0]
        if(val===null){
            val=0
        }
      switch(Object.keys(values)[0]){
          case "fintxns": {
               SetTheState(values)
              if(state.finrate){
                  let res=Math.round(val*state.finrate)
                  SetTheState({fincost:res})
                      res=res+state.nonfincost
                    SetTheState({baseamount:res})
                    if(state.gst_percent){
                        SetGST(res)
                    }
                  
              }
              break
          }
          case "finrate":{
            SetTheState(values)
            if(state.fintxns){
                let res=Math.round(state.fintxns*val)
                SetTheState({fincost:res})
                    res=res+state.nonfincost
                  SetTheState({baseamount:res})
                  if(state.gst_percent){
                      SetGST(res)
                  
                }
            }
            break
          }
          case "nonfintxns":{
            SetTheState(values)
            if(state.nonfinrate){
                let res=Math.round(val*state.nonfinrate)
                SetTheState({nonfincost:res})
            
                    res=res+state.fincost
                  SetTheState({baseamount:res})
                  if(state.gst_percent){
                      SetGST(res)
                  }
                
            }
            break
          }
          case "nonfinrate":{
            SetTheState(values)
            if(state.nonfintxns){
                let res=Math.round(state.nonfintxns*val)
                SetTheState({nonfincost:res})
                
                    res=res+state.fincost
                  SetTheState({baseamount:res})
                  if(state.gst_percent){
                      SetGST(res)
                  
                }
            }
            break

          }
          case "gst_percent":{
            SetTheState(values)
            if(state.baseamount){
                const res=state.baseamount
                SetGST(res,val)
            }
            break
          }
          case "penalty":{
            SetTheState(values)
            if(state.baseamount && state.gst_percent){
                const res=state.baseamount
                SetGST(res,state.gst_percent,val)
            }
            break
          }
      }
  }

  const formSubmit=(values)=>{
    const data={
      ...state,
      ...values,
      month:values.month.toDate().getMonth()+1,
      year:values.month.toDate().getFullYear()
    }

    console.log(data);
  }

  return (
    <>
    
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        initialValues={{
            month:"",
            module:"00",
            fintxns:"",
            nonfintxns:"",
            finrate:state.finrate,
            nonfinrate:state.nonfinrate,
            gst_percent:state.gst_percent,
            penalty:0,
            description:""

        }}
        onValuesChange={(values)=>handleChange(values)}
        onFinish={formSubmit}
        size="large"
      >
          <div className={styles.expenditureform}>
          <div className={styles.expenditureform_field}>
        <Form.Item label="Month" name="month">
          <DatePicker picker="month" placeholder="Select Month and Year"  className={styles.setwidth}/>
        </Form.Item>
        
        <Form.Item label="Financial Txns" name="fintxns">
          <InputNumber className={styles.setwidth}/>
        </Form.Item>
        <Form.Item label="Rate" name="finrate">
        <InputNumber
            className={styles.setwidth}
            min={0}
            step={0.01}
        />
        </Form.Item>
        <Form.Item label="Financial Txns Cost">
          <InputNumber className={styles.setwidth} value={state.fincost} disabled/>
        </Form.Item>
        <Form.Item label="Base Amount">
          <InputNumber className={styles.setwidth} value={state.baseamount} disabled/>
        </Form.Item>
        <Form.Item label="GST Amount">
          <InputNumber className={styles.setwidth} value={state.gst} disabled/>
        </Form.Item>
        <Form.Item label={<strong style={{fontSize:"large"}}>Final Payment</strong>}>
          <InputNumber className={styles.setwidth} min={0} value={state.finalamt} disabled/>
        </Form.Item>
        </div>



        <div className={styles.expenditureform_field}>
        <Form.Item label="Module" name="module">
          <Select className={styles.setwidth}>
          <Select.Option value="00">---Select Module---</Select.Option>
            {props.module.map((val, index)=>(
              <Select.Option value={val.code} key={index}>{val.module}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Non-Financial Txns" name="nonfintxns">
          <InputNumber className={styles.setwidth}/>
        </Form.Item>
        <Form.Item label="Rate" name="nonfinrate">
        <InputNumber
            className={styles.setwidth}
            min={0}
            step={0.01}
        />
        </Form.Item>
        <Form.Item label="Non-Financial Txns Cost">
          <InputNumber className={styles.setwidth} disabled  value={state.nonfincost}/>
        </Form.Item>

        <Form.Item label="GST Percent" name="gst_percent">
          <InputNumber className={styles.setwidth} min={0} max={100} step={0.01}/>
        </Form.Item>

        <Form.Item label="Penalty" name="penalty">
          <InputNumber className={styles.setwidth} min={0} />
        </Form.Item>

        <Form.Item label="Expense Description" name="description">
          <Input className={styles.setwidth} min={0} />
        </Form.Item>
      </div>
        </div>
        <Form.Item wrapperCol={{ offset: 8, span:8 }}>
        <Button type="primary" htmlType="submit" className={styles.setwidth}>
          Upload&nbsp;<TiUploadOutline size="1.5rem" style={{verticalAlign:"middle"}} />
        </Button>
      </Form.Item>
      </Form>
    </>
  );
};

export default ExpenditureForm