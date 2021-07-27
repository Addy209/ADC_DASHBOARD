import '../styles/globals.css'
import 'antd/dist/antd.css'; 
import React from 'react'
import { wrapper } from "../redux/store"
import Cookies from 'js-cookie';
import {connect} from 'react-redux'
import * as actionTypes from '../redux/actions/main'

function MyApp(props) {
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
<Component {...props.pageProps} loggedIn={props.loggedIn}/>
</Layout>
)
  
}

const mapStateToProps=state=>({
  loggedIn:state.main.loggedIn
})

const mapDispatchToProps=dispatch=>({
  login:(status)=>dispatch(actionTypes.setToken(status))
})

export default wrapper.withRedux(connect(mapStateToProps,mapDispatchToProps)(MyApp))
