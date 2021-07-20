import Head from 'next/head'
import Image from 'next/image'
import SiderDemo from '../../components/Layout/layout'
import UploadData from '../../components/Dashboard/upload/upload'

export default function Home() {
  return (
     <UploadData />
  )
}

Home.Layout=SiderDemo