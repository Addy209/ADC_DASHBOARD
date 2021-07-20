import '../styles/globals.css'
import 'antd/dist/antd.css'; 
import React from 'react'

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || React.Fragment;
  console.log(Component)
  return (
  <Layout>
  <Component {...pageProps} />
  </Layout>
  )
}

export default MyApp
