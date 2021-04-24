import React from 'react';
import axios from 'axios';
import {Button, Descriptions, Input, message} from 'antd';
import '../scss/query.scss';

const ipAddress = 'http://10.128.230.82:8080';

const {Search} = Input;

class ConditionItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: [],
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        axios.get(ipAddress + '/conditionItem/queryList')
        .then((response) => {
            if(response !== null) {
                console.log("## Query ## " + response.data.msg);
                this.setState({
                    data: response.data.data,
                });
            }else{
                console.log("## Query ## post failed.");
            }
        });
    }

    newData(value){
        let data = {name: value};
        axios.post(ipAddress + '/conditionItem/add', data).then((response)=>{
            if(response !== null) {
                if(response.data.state === 1){
                    message.success("添加成功");
                    this.getData();
                }else{
                    message.error(response.data.msg);
                }
            }else{
                console.log("## Query ## post failed.");
            }
        });
    }

    deleteItem(itemId){
        let data = {id: itemId};
        axios.post(ipAddress + '/conditionItem/delete', data).then((response)=>{
            if(response !== null) {
                if(response.data.state === 1){
                    message.success("删除成功");
                    this.getData();
                }else{
                    message.error(response.data.msg);
                }
            }else{
                console.log("## Query ## post failed.");
            }
        });
    }

    render(){
        return(
            <div className="query">
                <div className="queryHeader">
                    <Button type="primary" onClick={this.getData} style={{margin: "5px 10px"}}>
                        查看所有条目
                    </Button>
                    <Search style={{margin: "5px 10px", width: 400  }}
                        placeholder="新增条目内容"
                        allowClear
                        enterButton="新增条目"
                        onSearch={(value)=>this.newData(value)}/>
                </div>
                <div style={{margin: 5}} className="query-items">
                    {this.state.data.map(item=>{
                        return (
                        <div  key={item.id} style={{margin: "5px 0px", borderRadius: 5, padding: 10, background: "#def"}}>
                            <Descriptions title={item.name}>
                                <Descriptions.Item label="条目名称">{item.name}</Descriptions.Item>
                                <Descriptions.Item label="条目ID">{item.id}</Descriptions.Item>
                                <Descriptions.Item>
                                    <Button type="primary" onClick={()=>this.deleteItem(item.id)}>删除</Button>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ConditionItem;