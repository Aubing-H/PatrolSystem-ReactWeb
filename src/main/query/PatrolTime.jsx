import React from 'react';
import axios from 'axios';
import {Button, Descriptions, Input, message, TimePicker} from 'antd';
import '../scss/query.scss';
import moment from 'moment';

const ipAddress = 'http://10.128.230.82:8080';

const {Search} = Input;

class PatrolTime extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: [],
            req: null,
        };
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        axios.get(ipAddress + '/patrolTime/queryList')
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

    onTimeChange(value){
        let newData = {
            startTime: moment(value[0]).format("HH:mm"),
            endTime:  moment(value[1]).format("HH:mm"),
        }
        console.log('time:' + newData);
        this.setState({
            req: newData,
        });
    }

    newTimeData(){
        if(this.state.req == null){
            message.error('请选择时间');
        }else{
            axios.post(ipAddress + '/patrolTime/add', this.state.req).then((response)=>{
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
    }

    deleteItem(item){
        let data = {startTime: item};
        axios.post(ipAddress + '/patrolTime/delete', data).then((response)=>{
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
                    <Button type="primary" onClick={()=>this.getData()} style={{margin: "5px 10px"}}>
                        查看所有巡更时间
                    </Button>
                    
                    <TimePicker.RangePicker 
                        showTime={{ format: 'HH:mm' }}
                        format="HH:mm"
                        onChange={(value)=>this.onTimeChange(value)}
                        style={{margin: "5px 10px"}}/>
                    <Button type="primary" onClick={()=>this.newTimeData()} style={{margin: "5px 10px"}}>
                        新增巡更时间
                    </Button>
                </div>
                <div style={{margin: 5}} className="query-items">
                    {this.state.data.map(item=>{
                        return (
                        <div  key={item.startTime} style={{margin: "5px 0px", borderRadius: 5, padding: 10, background: "#def"}}>
                            <Descriptions title={item.startTime}>
                                <Descriptions.Item label="开始时间">{item.startTime}</Descriptions.Item>
                                <Descriptions.Item label="结束时间">{item.endTime}</Descriptions.Item>
                                <Descriptions.Item>
                                    <Button type="primary" onClick={()=>this.deleteItem(item.startTime)}>删除</Button>
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

export default PatrolTime;