import 'antd/dist/antd.css'; 
import Cookies from 'js-cookie';
import React from 'react'
import {connect} from 'react-redux'
import * as actionTypes from '../redux/actions/main'

function Root(props) {
  const {Component, pageProps}=props

  React.useEffect(()=>{
      if(!props.loggedIn){
          const val=Cookies.get('JWT')
          if (val){
              props.login(true)
          }
      }
  },[props])

  const Layout = Component?.Layout ?? React.Fragment;
  console.log(props)
  return (
  <Layout>
  <Component {...props.pageProps} loggedin={props.loggedIn}/>
  </Layout>
  )
}

const mapStateToProps=state=>({
    loggedIn:state.main.loggedIn
})

const mapDispatchToProps=dispatch=>({
    login:(status)=>dispatch(actionTypes.setToken(status))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Root)
