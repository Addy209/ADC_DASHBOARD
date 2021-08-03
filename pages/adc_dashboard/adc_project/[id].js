import React from 'react'
import { useRouter } from 'next/router'
import SiderDemo from '../../../components/Layout/layout'
import SpecficProject from '../../../components/Dashboard/projects/projectdesc'
import {request, gql} from 'graphql-request'
import {BACKEND_URL} from '../../../utils/constants'

const formdata_query=gql`
query{
  module{
    code
    module
  }
  priority{
    code
    priority
  }
  
}
`

const Home=props=>{
    const router=useRouter()
    const id=router.query
    console.log(props)
    return (
        <SpecficProject {...props} {...id} />
    )
}

export async function getServerSideProps(context) {
    // const variable={id:context.params.id}
    const data=await request(BACKEND_URL,formdata_query)
    return{
      props:data
    }
  }

Home.Layout=SiderDemo

export default Home