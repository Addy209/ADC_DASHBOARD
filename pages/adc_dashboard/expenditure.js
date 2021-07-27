import Head from 'next/head'
import Image from 'next/image'
import SiderDemo from '../../components/Layout/layout'
import Expenditure from '../../components/Dashboard/expenditure/expenditure'
import {request, gql} from 'graphql-request'
import {BACKEND_URL} from '../../utils/constants'
import Cookies from 'js-cookie'

const formdata_query=gql`
query{
  module{
    code
    module
  }
}
`

const Home=(props)=> {
 
  return (
     <Expenditure {...props} />
  )
}

export async function getServerSideProps(context) {

  const data=await request(BACKEND_URL,formdata_query)
  return{
    props:data
  }
}

Home.Layout=SiderDemo

export default Home