import Head from 'next/head'
import Image from 'next/image'
import SiderDemo from '../../components/Layout/layout'
import Expenditure from '../../components/Dashboard/expenditure/expenditure'

export default function Home() {
  return (
     <Expenditure />
  )
}

Home.Layout=SiderDemo