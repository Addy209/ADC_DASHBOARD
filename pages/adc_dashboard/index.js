import Head from 'next/head'
import Image from 'next/image'
import SiderDemo from '../../components/Layout/layout'
import Dashboard from '../../components/Dashboard/dashboard'

export default function Home() {
  return (
     <Dashboard />
  )
}

Home.Layout=SiderDemo