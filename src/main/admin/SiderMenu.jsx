import React from 'react';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  MailOutlined,
} from '@ant-design/icons';

function SiderMenu(props){
    const collapsed = props.collapsed;
    return (
      <div style={{ width: (collapsed ? 80 : 200) }}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          onClick={props.handleClick}
        >
          <Menu.Item key="admin" icon={<PieChartOutlined />}>
            管理员账户
          </Menu.Item>
          <SubMenu key="sub0" icon={<DesktopOutlined />} title="信息统计">
            <Menu.Item key="controlPanel">巡更信息统计</Menu.Item>
            <Menu.Item key="locationAbnormal">异常统计</Menu.Item>
          </SubMenu>
          <SubMenu key="sub1" icon={<MailOutlined />} title="巡更信息查询">
            <Menu.Item key="tripRecord">查询巡更一躺记录</Menu.Item>
            <Menu.Item key="patrolRecord">查询巡更点记录</Menu.Item>
            <Menu.Item key="abnormalRecord">查询故障记录</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="巡更管理">
            <Menu.Item key="patrolTime">设置巡更时间</Menu.Item>
            <Menu.Item key="conditionItem">检查条目管理</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
}

export default SiderMenu;