import React from 'react';
import axios from 'axios';
import {Button, Descriptions, DatePicker, Select} from 'antd';
import '../scss/query.scss';
import moment from 'moment';

const ipAddress = 'http://10.128.230.82:8080';

const { RangePicker } = DatePicker;
const { Option } = Select;

class QueryPatrol extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: [],
            patrolList: [{id: 'default', name: '所有', password: 'XXXXXX', type: 1}],
            locationList: [{id: 'default', name: '所有', longitude: 0.0, latitude: 0.0}],
            startTime: null,
            endTime: null,
            patrol: null,
            location: null,
        };
        this.onChange = this.onChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.getData = this.getData.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
    }

    componentDidMount(){
        axios.get(ipAddress + '/user/queryPatrolList').then((response)=>{
            if(response !== null) {
                console.log("## Query ## " + response.data.msg);
                this.setState({
                    patrolList: [{id: 'default', name: '所有', password: '12345', type: 1}].concat(response.data.data),
                })
            }else{
                console.log("## Query ## post failed.");
            }
        })
        axios.get(ipAddress + '/location/queryList').then((response)=>{
            if(response !== null) {
                console.log("## Query ## " + response.data.msg);
                this.setState({
                    locationList: [{id: 'default', name: '所有', longitude: 0.0, latitude: 0.0}].concat(response.data.data),
                })
            }else{
                console.log("## Query ## post failed.");
            }
        })
    }

    getName(id){
        const items = this.state.patrolList;
        for(let i = 0; i < items.length; i++){
            if(items[i].id === id){
                return items[i].name;
            }
        }
        return 'XXX';
    }

    getLocationName(id){
        const records = this.state.locationList;
        for(let i = 0; i < records.length; i++){
            if(records[i].id === id){
                return records[i].name;
            }
        }
    }

    getData(){
        console.log(this.state.startTime, this.state.endTime, this.state.patrol, this.state.location)
        let req = {
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            userId: this.state.patrol,
            locId: this.state.location,
        };
        axios.post(ipAddress + '/patrolRecord/queryByInfo', req)
        .then((response) => {
            if(response !== null) {
                console.log("## Query ## " + response.data.msg);
                this.setState({
                    data: response.data.data,
                })

            }else{
                console.log("## Query ## post failed.");
            }
        });
    }

    onChange(value, dateString){
        if(dateString != null && dateString.length === 2 && dateString[0].length > 0){
            this.setState({
                startTime: dateString[0],
                endTime: dateString[1],
            });
        }else{
            this.setState({
                startTime: null,
                endTime: null,
            });
        }
        console.log(dateString);
    }

    onSelectChange(value){
        this.setState({
            patrol: value === 'default' ? null : value,
        });
        console.log(value);
    }

    onLocationChange(value){
        this.setState({
            location: value === 'default' ? null : value,
        });
        console.log(value);
    }

    render(){
        return(
            <div className="query">
                <div className="queryHeader">
                    <span>巡更员选择</span>
                    <Select style={{margin: "5px 10px", width: 160}}
                        placeholder="所有"
                        optionFilterProp="children"
                        onChange={this.onSelectChange}>
                            {this.state.patrolList.map(item=>{
                                return (
                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                )
                            })}
                    </Select>
                    <span>地点选择</span>
                    <Select style={{margin: "5px 10px", width: 160}}
                        placeholder="所有"
                        optionFilterProp="children"
                        onChange={this.onLocationChange}>
                            {this.state.locationList.map(item=>{
                                return (
                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                )
                            })}
                    </Select>
                    <span>时间选择</span>
                    <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={this.onChange}
                    style={{margin: "5px 10px"}}
                    />
                    <Button type="primary" onClick={()=>this.getData()} style={{margin: "5px 10px"}}>
                        查询
                    </Button>
                </div>
                <div style={{margin: 5}} className="query-items">
                    {this.state.data.map(item=>{
                        return (
                        <div  key={item.userId + item.time} style={{margin: "5px 0px", borderRadius: 5, padding: 10, background: "#def"}}>
                            <Descriptions title={this.getName(item.userId)}>
                                <Descriptions.Item label="时间">{
                                    moment(new Date('' + item.time)).format('YYYY-MM-DD HH:mm:ss')
                                }</Descriptions.Item>
                                <Descriptions.Item label="地点">{this.getLocationName(item.patrolLocId)}</Descriptions.Item>
                                <Descriptions.Item label="有无异常">{item.condition === 1 ? '无' : '有'}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default QueryPatrol;