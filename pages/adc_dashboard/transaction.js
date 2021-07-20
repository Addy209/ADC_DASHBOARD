import Head from 'next/head'
import Image from 'next/image'
import SiderDemo from '../../components/Layout/layout'
import Transaction from '../../components/Dashboard/transaction/transaction'

export default function Home() {
  return (
     <Transaction />
  )
}

Home.Layout=SiderDemo