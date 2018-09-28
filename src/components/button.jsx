import React, { Component } from 'react';
class Submitbutton extends Component{
    render(){
        return <button className={this.props.cn}>{this.props.text}</button>
    }
}
export default Submitbutton;