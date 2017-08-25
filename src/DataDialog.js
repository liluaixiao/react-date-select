/**
 * 弹窗组件
 */
import React, { Component } from 'react';
import WheelView from './WheelView.js';

export default class DataDialog extends Component{
    constructor(props) {
        super(props);
        this.state = {
            year: [],//年份数组
            month: [],//月份数组
            date: [],//天数数组
            yIndex: 0,//当前的年下标
            mIndex: 0,//当前的月下标
            dIndex: 0,//当前的日下标
        }
    }
    componentDidMount() {
        var year = [];//年数组
        var month = [];//月数组
        var day = [];//日数组
        for (var i = this.props.startTime.getFullYear(); 
              i <= this.props.endTime.getFullYear(); i++)
        {
            year.push(i);
        }
            //起始年份等于终止年份时，月份数组的获取
        if(this.props.startTime.getFullYear()== this.props.endTime.getFullYear())
            {
            for (var i = this.props.startTime.getMonth()+1;
                  i <= this.props.endTime.getMonth()+1; i++) {
                month.push(i);
            }

            //起始月份等于终止月份时，日期的获取
            if(this.props.startTime.getMonth()==this.props.endTime.getMonth()){
                for (var i = this.props.startTime.getDate();
                           i <= this.props.endTime.getDate();i++) 
                        {
                                 day.push(i);
                        }  
            }else{  //等年不等月
                for (var i = this.props.startTime.getDate();
                         i <= new Date(year[0], month[0], 0).getDate();i++) 
                 {
                                 day.push(i);
                 }  
            }
        }else{
            for (var i = this.props.startTime.getMonth()+1; i <= 12; i++) {
                month.push(i);
            }
            for (var i = this.props.startTime.getDate();
                     i <= new Date(year[0], month[0], 0).getDate(); i++) {
                day.push(i);
            }
        } 
        this.setState({
            year: year,//年数组
            month: month,//月数组
            day: day,//日数组
            yIndex: 0,//当前的年
            mIndex: 0,//当前的月
            dIndex: 0//当前的日
        })
        var data = year[this.state.yIndex]+'-'+month[this.state.mIndex]+
                    '-'+day[this.state.dIndex];
        this.props.onDataSelect(data);//初次渲染后，触发回调

    }
    onDataChange(type, index) {
        console.log(type + "--->" + index)

        var year = this.state.year;
        var month = [];
        var day = [];

        switch (type) {
            case  "year"://年带动月日变化
                var isInStartYear = this.state.year[index] == 
                    this.props.startTime.getFullYear();
                var isInEndYear = this.state.year[index] == 
                    this.props.endTime.getFullYear();
                var isInStartYearmonth = this.state.month[0] == 
                    this.props.startTime.getMonth()+1;
                var isInEndYearmonth = this.state.month[0] == 
                    this.props.endTime.getMonth()+1;

                if (isInStartYear) {//如果当前年份等于初始年份
                    for (var i = this.props.startTime.getMonth()+1; i <= 12; i++) {
                        month.push(i);
                    }
                    for (var i = this.props.startTime.getDate();
                         i <= new Date(year[0], month[0], 0).getDate(); i++) {
                        day.push(i);
                    }
                }else if (isInEndYear) {  //如果当前年份等于终止年份
                    for (var i = 1; i <= this.props.endTime.getMonth()+1; i++) {
                        month.push(i);
                    }
                    if(isInEndYearmonth){//当前月份等于终止月份
                        for (var i = 1; i <= this.props.endTime.getDate(); i++) {
                            day.push(i);
                        }
                    }else{//当前月份不等于终止月份
                        for (var i = 1; i <= new Date(this.state.year[index], 
                                   month[0], 0).getDate(); i++) {
                            day.push(i);
                        }
                    }   
                }else {//当前年份既不等于起始也不等于终止年份
                    for (var i = 1; i <= 12; i++) {
                        month.push(i);
                    }
                    for (var i = 1; i <= new Date(this.state.year[index], month[0], 0).getDate(); i++) {
                        day.push(i);
                    }
                }
                this.setState({
                    month: month,
                    day: day,
                    yIndex: index,
                    mIndex: 0,
                    dIndex: 0,
                });
                break;
            case  "month"://月带动日变化
                 var isInStartYear = this.state.year[this.state.yIndex] == this.props.startTime.getFullYear();
                 var isInEndYear = this.state.year[this.state.yIndex] == this.props.endTime.getFullYear();
                 var isInStartYearmonth = this.state.month[index] == this.props.startTime.getMonth()+1;
                 var isInEndYearmonth = this.state.month[index] == this.props.endTime.getMonth()+1;

                 //当前年月份等于起始年月份等于终止年月份
                 if (isInStartYear && isInEndYear && isInStartYearmonth && isInEndYearmonth) {
                    for (var i = this.props.startTime.getDate();
                         i <= this.props.endTime.getDate();i++) 
                    {
                             day.push(i);
                    }   
                }else if (isInStartYear && isInStartYearmonth) {  //当前年月等于起始年月
                    for (var i = this.props.startTime.getDate(); i <= new Date(this.state.year[this.state.yIndex], this.state.month[index], 0).getDate(); i++) {
                        day.push(i);
                    }
                }else if (isInEndYear && isInEndYearmonth) {  //当前年月等于终止年月
                    for (var i = 1; i <= this.props.endTime.getDate(); i++) {
                        day.push(i);
                    }
                }else {
                    for (var i = 1; i <= new Date(this.state.year[this.state.yIndex], this.state.month[index], 0).getDate(); i++) {
                        day.push(i);
                    }
                }
                this.setState({
                    mIndex: index,
                    day: day,
                    dIndex: 0,
                });
                break;
            case  "day":
                this.setState({dIndex: index});
                break;
        }
        var data = this.state.year[this.state.yIndex]+'-'+this.state.month[this.state.mIndex]+'-'+this.state.day[this.state.dIndex];
        this.props.onDataSelect(data);//数据变化之后，触发回调
    }

    render() {
        return (
                <div className="dialog">
                    <div  className="box"></div>
                    <WheelView type="year" data={this.state.year}
                               index={this.state.yIndex}
                               onDataChange={this.onDataChange.bind(this)}/>
                    <WheelView type="month" data={this.state.month}
                               index={this.state.mIndex}
                               onDataChange={this.onDataChange.bind(this)}/>
                    <WheelView type="day" data={this.state.day}
                               index={this.state.dIndex}
                               onDataChange={this.onDataChange.bind(this)}/>

                </div>
        );
    }
};
