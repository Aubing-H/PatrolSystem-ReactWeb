import React from 'react';
import '../scss/query.scss';

class DefaultPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            date: new Date(),
        }
    }

    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    tick(){
        this.setState({
            date: new Date(),
        })
    }

    render(){
        return(
            <div className="query">
                <div style={{margin: 5}} className="query-items">
                    <div style={{margin: "5px 0px", borderRadius: 5, padding: 10, background: "#def"}}>
                        <h1>欢迎来到巡更管理系统</h1>
                        <h2>现在是{this.state.date.toLocaleTimeString()}.</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default DefaultPage;