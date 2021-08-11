import React from "react";
import { Layout, Menu, Button, Tooltip } from "antd";
import {
  FundProjectionScreenOutlined,
  FundTwoTone,
  FolderAddTwoTone,
  BellTwoTone,
  UpCircleTwoTone,
  TabletTwoTone,
  SlidersTwoTone,
  DollarCircleTwoTone,
  BankTwoTone,
  PieChartTwoTone,
  ScheduleTwoTone,
  PushpinTwoTone,
} from "@ant-design/icons";
import { ImMobile } from "react-icons/im";
import styles from "../Dashboard/dashboard.module.css";

import { FaRegMoneyBillAlt } from "react-icons/fa";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { URLS } from "../../utils/constants";
import { connect } from "react-redux";
import * as actionTypes from "../../redux/actions/main";
import { useRouter, withRouter } from "next/router";
import { IoNotificationsSharp } from "react-icons/io5";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const font30 = { fontSize: "30px" };
const font26 = { fontSize: "26px" };

const SiderDemo = (props) => {
  const router = useRouter();
  React.useEffect(() => {
    if (!props.loggedIn) {
      router.push(URLS.home);
    }
  }, []);

  const [collapsed, setCollapse] = React.useState(true);

  const onCollapse = () => {
    setCollapse((val) => {
      return !val;
    });
  };

  const logout = () => {
    props.logout();
    router.push(URLS.home);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => onCollapse()}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
        }}
      >
        <div className="logo" style={{ marginTop: "2vh" }} />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            key="1"
            icon={<PieChartTwoTone twoToneColor="#52c41a" style={font30} />}
          >
            <Link href={URLS.dashboard}>Overview</Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            icon={<FundTwoTone twoToneColor="#eb2f96" style={font30} />}
            title="Analytics"
          >
            <Menu.Item
              key="2"
              icon={
                <DollarCircleTwoTone
                  spin
                  style={font26}
                  twoToneColor="#e9c46a"
                />
              }
            >
              <Link href={URLS.expenditure}>Expenditures</Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<SlidersTwoTone style={font26} twoToneColor="#7400b8" />}
            >
              <Link href={URLS.transaction}>Transaction Statistics</Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<UpCircleTwoTone style={font26} twoToneColor="#247ba0" />}
            >
              <Link href={URLS.upload}>Upload Data</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="5"
            icon={<PushpinTwoTone twoToneColor="#f26419" style={font30} />}
          >
            <Link href={URLS.project}>Projects</Link>
          </Menu.Item>

          <Menu.Item
            key="7"
            icon={<FolderAddTwoTone twoToneColor="#4cc9f0" style={font30} />}
          >
            <Link href={URLS.documents}>Files</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 5, position: "sticky", top: 0, zIndex: 2 }}
        >
          <div className={styles.header}>
            <div className={styles.left}>
              <pre className={styles.heading}>
                {" "}
                <BankTwoTone twoToneColor="#E7DFC6" /> ADC-Dashboard
              </pre>
            </div>
            <div className={styles.right}>
              <Tooltip title="Logout">
                <RiLogoutBoxRFill
                  onClick={logout}
                  fill="#DFC5A4"
                  size="35px"
                  className={styles.user}
                />
              </Tooltip>
              <span className={styles.usertext}>
                <span className={styles.usertext_hello}>
                  {`Hello ${props.name} (${props.username})`}&nbsp;
                </span>
              </span>
            </div>
          </div>
        </Header>

        <Content style={{ margin: "0 16px" }}>{props.children}</Content>

        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#001529",
            color: "white",
            fontSize: "large",
          }}
        >
          Created for{" "}
          <strong>Central Bank of India&apos;s ADC Department</strong> by{" "}
          <strong>Aditya Kumar (136595)</strong>
        </Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  name: state.main.name,
  username: state.main.username,
  loggedIn: state.main.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actionTypes.Logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SiderDemo);
