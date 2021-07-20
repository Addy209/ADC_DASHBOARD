import React from 'react'
import { Layout, Menu, Divider, Dropdown } from 'antd';
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


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const menu = (
  <Menu>
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
  </Menu>
);

const SiderDemo =(props)=> {
  
const [collapsed,setCollapse]=React.useState(false)

  const onCollapse = () => {
      console.log(collapsed)
    setCollapse(val=>{
        return !val
    } );
  };

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
            <span className={styles.usertext}><span className={styles.usertext_hello}>Hello User</span> &nbsp;
            <FaUserCircle fill="#fff" size="35px" className={styles.user}/>
            </span>
          </Dropdown>
            

          </Header>



          <Content style={{ margin: '0 16px' }}>

          {props.children}

          </Content>




          <Footer style={{ textAlign: 'center' }}>Created for <strong>Central Bank of India&apos;s ADC Department</strong> by <strong>Aditya Kumar</strong></Footer>
        </Layout>
      </Layout>
    );
  }


export default SiderDemo