
import React from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

class ChartsLine extends React.Component{

    getOption = ()=>{
        return {
            title: {
                text: this.props.title,
                top:"0%",
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: this.props.data.map(item => Object.keys(item)[0]),
                top: "6%",
            },
            grid: {
                left: '3%',
                right: '6%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                // 是否显示保存图片
                // feature: {
                //     saveAsImage: {}
                // }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.props.xAxis
            },
            yAxis: {
                type: 'value'
            },
            series: this.props.data.map(item=>{
                return {
                    name: Object.keys(item)[0],
                    type: this.props.type,
                    data: Object.values(item)[0],
                    smooth: this.props.smooth,
                    barWidth: 10,//柱图宽度
                }
            }),
        }
    }

    render(){
        return(
            <div style={{height:300, }}>
                <ReactEcharts option={this.getOption()}/>
            </div>
        )
    }
}

export default ChartsLine;