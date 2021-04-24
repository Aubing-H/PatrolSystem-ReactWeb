
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

class ChartsPie extends React.Component{

    getOption = ()=>{
        return {
            title: {
                text: this.props.title,
                top:"3%",
            },
            grid: {
                left: '3%',
                right: '6%',
                bottom: '3%',
                containLabel: true
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data: this.props.data
                }
            ]
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

export default ChartsPie;