import '../styles/globals.css'
import 'antd/dist/antd.css'; 
import React from 'react'
import { wrapper } from "../redux/store"
import Root from './_root';

function MyApp({Component, pageProps}) {

  return <Root pageProps={pageProps} Component={Component} />
  
}


export default wrapper.withRedux(MyApp)
