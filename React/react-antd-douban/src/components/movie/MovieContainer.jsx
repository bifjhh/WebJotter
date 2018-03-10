import React from 'react'

// 布局相关的组件
import {Layout, Menu, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

// HashRouter, 在一个网站中,只需要使用一次
import {Route, Link} from "react-router-dom";

import MovieList from './MovieList.jsx';
export default class MovieContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Layout style={{
        height: '100%'
      }}>
        <Sider width={200} style={{
          background: '#fff'
        }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
            height: '100%',
            borderRight: 0
          }}>
            <Menu.Item key="1">
              <Link to="/movie/in_theaters/1">正在热映</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/movie/coming_soon/1">即将上映</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/movie/top250/1">Top250</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{
          paddingLeft: "1px"
        }}>
          <Content
            style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280
          }}>
            {/* 配置路由参数 */}
            <Route path='/movie/:type/:page' component={MovieList}/>

          </Content>
        </Layout>
      </Layout>
    )
  }

}