import React from 'react';
import axios from 'axios';
import {Button, Descriptions, Input, message, DatePicker} from 'antd';
import '../scss/query.scss';
import moment from 'moment';
import ChartsLine from './ChartsLine';
import ChartsPie from './ChartsPie';

const ipAddress = 'http://10.128.230.82:8080';

const {Search} = Input;
const {RangePicker} = DatePicker;

class DataAnalysis extends React.Component{
    constructor(props){
        super(props);
        this.state={
            /* 响应 */
            dateList: null,
            actualPattern: null, // 实际巡更数
            ratePattern: null, // 完成率
            abnormalPattern: null, // 异常数
            pie: null, // 饼图 总完成情况
            /* 请求 */
            date: {startDate: null, endDate: null}, 
        };
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
        let req = this.state.date;
        axios.post(ipAddress + '/tripRecord/dataAnalysis', req)
        .then((response) => {
            if(response !== null) {
                console.log("## Query ## " + response.data);
                this.setState({
                    dateList: response.data.date,
                    actualPattern: response.data.actual, // 实际巡更数
                    ratePattern: response.data.rate, // 完成率
                    abnormalPattern: response.data.abnormal, // 异常数
                    pie: response.data.pie
                });
            }else{
                console.log("## Query ## post failed.");
            }
        });
    }

    render(){
        return (
            <div className="query">
                <div className="queryHeader">
                    <span>日期选择</span>
                    <RangePicker
                        onChange={(value)=>this.onChange(value)}
                        style={{margin: "5px 10px"}}
                        />
                    <Button type="primary" onClick={()=>this.getData()} style={{margin: "5px 10px"}}>
                        数据统计
                    </Button>
                </div>
                <div style={{margin: 5}} className="query-items">
                    {this.state.actualPattern === null ? <div/> : 
                    <div className="clearfix">
                        <div className="img-container">
                            <ChartsLine xAxis={this.state.dateList} data={this.state.actualPattern} 
                            title="日期-实际日巡更数折线图" type="line" smooth={false}/>
                        </div>
                        <div className="img-container">
                            <ChartsLine xAxis={this.state.dateList} data={this.state.ratePattern} 
                            title="日期-巡更完成率曲线" type="line" smooth={true}/>
                        </div>
                        <div className="img-container">
                            <ChartsLine xAxis={this.state.dateList} data={this.state.abnormalPattern} 
                            title="日期-巡更异常数柱形" type="bar"/>
                        </div>
                        <div className="pie-container">
                            <ChartsPie data={this.state.pie.map(item=>{
                                return{
                                    value: item.value, 
                                    name: item.name + ' ' + item.value.toFixed(3) // 保留三位小数
                                }
                            })} title="总完成率饼图"/>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

export default DataAnalysis;