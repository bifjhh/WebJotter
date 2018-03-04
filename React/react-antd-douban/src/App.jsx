import React from 'react'

import {HashRouter, Route, Link} from "react-router-dom";

import {Layout, Menu} from 'antd';
const {Header, Content, Footer} = Layout;


import styles from "./css/App.scss";
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <HashRouter>
        <Layout className="layout" style={{ height: "100%" }}>
          <Header>
            <div className={styles.logo} />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{lineHeight: '64px'}}>
              <Menu.Item key="1">首页</Menu.Item>
              <Menu.Item key="2">电影</Menu.Item>
              <Menu.Item key="3">关于</Menu.Item>
            </Menu>
          </Header>

          <Content style={{background:"#fff"}}>

          </Content>

          <Footer style={{textAlign: 'center'}}>
           bifjhh - Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </HashRouter>
    )
  }

}