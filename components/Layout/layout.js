import React from 'react'
import { Layout, Menu, Button, Dropdown } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UploadOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import {ImMobile} from 'react-icons/im'
import styles from '../Dashboard/dashboard.module.css'

import {FaRegMoneyBillAlt} from 'react-icons/fa'
import Link from 'next/link'
import {FaUserCircle} from 'react-icons/fa'
import {MdLaptopMac} from 'react-icons/md'
import {URLS} from '../../utils/constants'
import { connect } from 'react-redux';
import * as actionTypes from '../../redux/actions/main'
import { useRouter,withRouter } from 'next/router';
import {IoNotificationsSharp} from 'react-icons/io5'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SiderDemo =(props)=> {
  console.log(props)
  const router=useRouter()
  React.useEffect(()=>{
    if(!props.loggedIn){
      router.push(URLS.home)
    }
  },[])
  
const [collapsed,setCollapse]=React.useState(true)

  const onCollapse = () => {
      console.log(collapsed)
    setCollapse(val=>{
        return !val
    } );
  };

  const logout=()=>{
    props.logout()
    router.push(URLS.home)
  }


  const menu = (
    <Menu>
      <Menu.Item>
      <span className={styles.usertext}><span className={styles.usertext_hello}>{`Hello ${props.name} (${props.username})`}</span></span>
      </Menu.Item>
      <Menu.Item>
        <Link rel="noopener noreferrer" href="https://www.antgroup.com">
          My Profile
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link rel="noopener noreferrer" href="https://www.aliyun.com">
          My Tasks
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={logout}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={()=>onCollapse()}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="0" icon={<MdLaptopMac fill='#fff' size="30px"/>} className={styles.logo}>
              <h2 className={styles.title}>Digital ADC</h2>
            </Menu.Item>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link href={URLS.dashboard}>Overview</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FaRegMoneyBillAlt />}>
            <Link href={URLS.expenditure}>Expenditures</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<BarChartOutlined />}>
            <Link href={URLS.transaction}>Transaction Statistics</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UploadOutlined />}>
            <Link href={URLS.upload}>Upload Data</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">



          <Header className="site-layout-background" style={{ padding: 5 }} >
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <FaUserCircle fill="#fff" size="35px" className={styles.user}/>
          </Dropdown>
          <IoNotificationsSharp fill="#fff" size="35px" className={styles.user} />
            

          </Header>



          <Content style={{ margin: '0 16px' }}>

          {props.children}

          </Content>




          <Footer style={{ textAlign: 'center' }}>Created for <strong>Central Bank of India&apos;s ADC Department</strong> by <strong>Aditya Kumar</strong></Footer>
        </Layout>
      </Layout>
    );
  }

const mapStateToProps=state=>({
  name:state.main.name,
  username:state.main.username,
  loggedIn:state.main.loggedIn
})

const mapDispatchToProps=dispatch=>({
  logout:()=>dispatch(actionTypes.Logout())
})

export default connect(mapStateToProps,mapDispatchToProps)(SiderDemo)