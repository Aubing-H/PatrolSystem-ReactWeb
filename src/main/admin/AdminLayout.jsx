import React from 'react';
import {MenuUnfoldOutlined, MenuFoldOutlined,} from '@ant-design/icons';
import {Button} from 'antd';
import SiderMenu from './SiderMenu';
import Query from '../query/Query';
import '../scss/admin.scss';
import QueryPatrol from '../query/QueryPatrol';
import QueryAbnormal from '../query/QueryAbnormal';
import ConditionItem from '../query/ConditionItem';
import PatrolTime from '../query/PatrolTime';
import DataAnalysis from '../statistics/DataAnalysis';
import LocationAnalysis from '../statistics/LocationAnalysis';
import DefaultPage from './DefaultPage';

class AdminLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
            collapsed: false,
            page: <DefaultPage/>,
        };
    }
    
    // 处理菜单点击事件
    handleClick(value){
        let pageDefault = <DefaultPage/>;
        switch(value.key){
            case "admin":
                pageDefault = <DefaultPage/>;
                break;
            case "controlPanel":
                pageDefault = <DataAnalysis/>;
                break;
            case "locationAbnormal":
                pageDefault = <LocationAnalysis/>;
                break;
            case "tripRecord":
                pageDefault = <Query/>;
                break;
            case "patrolRecord":
                pageDefault = <QueryPatrol/>;
                break;
            case "abnormalRecord":
                pageDefault = <QueryAbnormal/>;
                break;
            case "patrolTime":
                pageDefault = <PatrolTime/>;
                break;
            case "conditionItem":
                pageDefault = <ConditionItem/>;
                break;
            default:
                break;
        }
        this.setState({
            page: pageDefault,
        });
    }

    collapsedButtonClick(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render(){
        const collapsed = this.state.collapsed;

        return(
            <div className="app">
                <div className="aside">
                    <SiderMenu collapsed={collapsed} handleClick={(value)=>this.handleClick(value)}/>
                </div>
                <div style={{ marginLeft: (collapsed ? 80 : 200)}} className="main" >
                    <div className="header">
                        <Button type="primary" onClick={()=>this.collapsedButtonClick()} style={{ margin: 5 }}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
                        
                    </div>
                    <div className="content">
                        {this.state.page}
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminLayout;