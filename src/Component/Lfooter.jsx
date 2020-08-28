import React from 'react';
import { Component } from 'react'
import '../publicCSS/allTheme.css';
import 'moment/locale/zh-cn';
/**
 * 枢纽
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeStr: ""
        }
    }
    componentWillMount() {
        var thediv = (timespan) => {
            var result = Math.floor((new Date() - new Date(timespan)) / 3600000 / 24);
            var result2 = Math.floor((new Date() - new Date(timespan)) / 1000 / 60 / 60 % 24);
            var result3 = Math.floor((new Date() - new Date(timespan)) / 1000 / 60 % 60);
            var result4 = Math.floor((new Date() - new Date(timespan)) / 1000 % 60);
            var timeStr = result + "天" + result2 + "小时" + result3 + "分钟" + result4 + "秒";
            this.setState({ timeStr: timeStr });
        }
        window.setInterval(function () {
            thediv('2020/5/4')
        }, 0);
    }
    render() {
        const { timeStr } = this.state;
        return (

            <div className="app-footer">
                <p>本博客由React + Node + Ant Design联合驱动,感谢蚂蚁金服的慷慨开源。 <span style={{ color: 'rgb(252,192,0)' }}>已上线时间：{timeStr}</span></p>
                <p>Copyright © 2019-2020 Lemon All Rights Reserved V.1.0.3 备案号 <a href="http://www.beian.miit.gov.cn/">黑ICP备19003625号-2</a></p>
            </div>
        )
    }
}


export default App;
