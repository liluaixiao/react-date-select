import React, { Component } from 'react';
import './App.css';
import './DateStyle.css';
import DataDialog from './DataDialog.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    }
  }
  onDataSelect(data) {
        console.log(' data:  --->' + data)
        this.data = data;
       //与渲染无关的数据  直接存在this对象里  如果存在State里面会导致页面脏渲染，卡顿
    }
  onClick() {
      this.input.innerHTML = this.data;
      this.setState({isShow: !this.state.isShow})
  }
  showCitySelect() {
      this.setState({isShow: !this.state.isShow})
  }
  render() {
    return (
      <div className="App">
      <div className="dataChoose" onClick={this.showCitySelect.bind(this)} ref={(input)=>{this.input=input}}>请选择时间</div>
        <div className={this.state.isShow?'containerb':'hide'}>
          <div className="picker">
            <div className="header">
              <span onClick={this.showCitySelect.bind(this)}>取消</span>
              <span>请选择时间</span>
              <span onClick={this.onClick.bind(this)}>确定</span>
            </div>
                <DataDialog
                startTime={new Date()}  //开始时间 当前时间
                endTime={new Date(2021,0,0)}    //结束时间
                onDataSelect={this.onDataSelect.bind(this)}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
