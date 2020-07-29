import React from 'react';
import { Popover } from 'antd'
import { Component } from 'react'
import logo from '../LemonLogo.png';
import qq2 from '../qq2.png'
import wx2 from '../wx2.png'
import '../css/theme.css';
import '../css/firstTheme.css'
import '../css/secondTheme.css'
import '../css/thirdTheme.css'
import '../css/fourthTheme.css'
import '../css/animate.min.css'
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import '../index.css'
import { UpSquareOutlined, DownSquareOutlined } from '@ant-design/icons'
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


/**
 * 内容：导航栏
 * props：无
 */
class Lheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderAction: [true, false, false, false, false],//控制header的item高亮
      headerVisible:false//绑定手机端header的item-visible
    }
  }
  componentWillMount(){//在组件加载前改变header-item的高亮状态
    var { leaderAction } = this.state;
    for (let i = 0; i < leaderAction.length; i++) {//清空全部高亮
      leaderAction[i] = false;
    }
    var path = window.location.pathname.split('/');//解析path
    switch(path[1]){//绑定高亮
      case '':leaderAction[0] = true;break;
      case 'interact':leaderAction[1] = true;break;
      case 'life':leaderAction[2] = true;break;
      case 'friendLink':leaderAction[3] = true;break;
      case 'about':leaderAction[4] = true;break;
    }
    this.setState({leaderAction:leaderAction})
  }
  HeaderContent = (//HeadIcon的提示
    <div className='h-content'>
      <span>欢迎你来到我的空间，希望你可以从这里找到你感兴趣的知识！</span>
    </div>
  )

  HeaderItem = () => {//手机端的Header-item
    const { leaderAction } = this.state;
    return (<div className="h-item">
      <li className={leaderAction[0] ? 'item-ph action-ph' : 'item-ph'} onClick={this.handleLeader}><Link to="/">技术博客</Link></li>
      <li className={leaderAction[1] ? 'item-ph action-ph' : 'item-ph'} onClick={this.handleLeader}><Link to="/interact">留言板</Link></li>
      <li className={leaderAction[2] ? 'item-ph action-ph' : 'item-ph'} onClick={this.handleLeader}><Link to="/life">历程</Link></li>
      <li className={leaderAction[3] ? 'item-ph action-ph' : 'item-ph'} onClick={this.handleLeader}><Link to="/friendLink">友链</Link></li>
      <li className={leaderAction[4] ? 'item-ph action-ph' : 'item-ph'} onClick={this.handleLeader}><Link to="/about">关于</Link></li>
    </div>)
  }

  handleLeader = () => {//header-item的Click方法绑定
    var { leaderAction } = this.state;
    for (let i = 0; i < leaderAction.length; i++) {
      leaderAction[i] = false;
    }
    var path = window.location.pathname.split('/');
    switch(path[1]){
      case '':leaderAction[0] = true;break;
      case 'interact':leaderAction[1] = true;break;
      case 'life':leaderAction[2] = true;break;
      case 'friendLink':leaderAction[3] = true;break;
      case 'about':leaderAction[4] = true;break;
    }
    this.setState({leaderAction:leaderAction})
  }
  //控制手机端header-menu的Visable
  handleHeaderVisibleChange = (visible)=>this.setState({headerVisible:visible});
  render() {
    const { leaderAction ,headerVisible} = this.state;
    return (
          <header>
            <div className="center">
              <Popover placement="bottom" content={this.HeaderContent} trigger="hover">
                <span className='header-title animated'>
                  <img src={logo} alt="Lemon" />
                  <span className='Lemon'> LimCong个人博客</span>
                </span>
              </Popover>
              <ul className="header-menu">
                <li className={leaderAction[0] ? 'item animated action' : 'item animated'} onClick={this.handleLeader}><Link to="/">技术博客</Link></li>
                <li className={leaderAction[1] ? 'item animated action' : 'item animated'} onClick={this.handleLeader}><Link to="/interact">留言板</Link></li>
                <li className={leaderAction[2] ? 'item animated action' : 'item animated'} onClick={this.handleLeader}><Link to="/life">历程</Link></li>
                <li className={leaderAction[3] ? 'item animated action' : 'item animated'} onClick={this.handleLeader}><Link to="/friendLink">友链</Link></li>
                <li className={leaderAction[4] ? 'item animated action' : 'item animated'} onClick={this.handleLeader}><Link to="/about">关于</Link></li>
              </ul>
              <Popover placement="bottom" content={this.HeaderItem} trigger="hover" visible={headerVisible}onVisibleChange={this.handleHeaderVisibleChange}>
                <span className="header-menu-ph">{headerVisible?<UpSquareOutlined />:<DownSquareOutlined/>} </span>
              </Popover>
            </div>
          </header>
    )
  }
}
export default Lheader;