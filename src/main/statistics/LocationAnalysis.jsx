import React from 'react';
import axios from 'axios';
import {Button, Descriptions, Input, message, DatePicker} from 'antd';
import '../scss/query.scss';
import moment from 'moment';
import ChartsLine from './ChartsLine';

const ipAddress = 'http://10.128.230.82:8080';

const {Search} = Input;
const {RangePicker} = DatePicker;

class LocationAnalysis extends React.Component{
    constructor(props){
        super(props);
        this.state={
            date: {startDate: null, endDate: null}, // 请求数据
            data: null,
            xAxis: null,
        }
    }

    componentDidMount(){
        this.getData();
    }

    onChange(value){
        if(value !== null && value.length === 2 && value[0].length > 0){
            this.setState({
                date: {
                    startDate: moment(value[0]).format('YYYY-MM-DD'),
                    endDate: moment(value[1]).format('YYYY-MM-DD'),
                }
            })
        }else{
            this.setState({
                date: {
                    startDate: null,
                    endDate: null,
                }
            })
        }
    }

    getData(){
        axios.post(ipAddress + '/abnormalRecord/locationAnalysis', this.state.date).then((response)=>{
            if(response !== null){
                let temp = [{
                    "异常数": response.data.data.map(item=>item.number)
                }];
                let xAxis = response.data.data.map(item=>item.name);
                this.setState({
                    data: temp,
                    xAxis: xAxis,
                })
            }else{
                console.log("## can not get response");
            }
        })
    }

    render(){
        return(
            <div className="query">
                <div className="queryHeader">
                    <span>日期选择</span>
                    <RangePicker
                        onChange={(value)=>this.onChange(value)}
                        style={{margin: "5px 10px"}}
                        />
                    <Button type="primary" onClick={()=>this.getData()} style={{margin: "5px 10px"}}>
                        确定
                    </Button>
                </div>
                <div style={{margin: 5}} className="query-items">
                    {this.state.data === null ? <div/> : 
                    <div className="clearfix">
                        <div className="min-container"/>
                        <div className="max-container">
                            <ChartsLine xAxis={this.state.xAxis} data={this.state.data} 
                            title="地点-异常数统计" type="bar" smooth={false}/>
                        </div>
                        <div className="min-container"/>
                    </div>}
                </div>
            </div>
        )
    }
}

export default LocationAnalysis;