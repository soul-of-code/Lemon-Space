import React, { useState, useEffect } from 'react';
import { Popover } from 'antd'
import logo from '../img/LemonLogo.png';
import '../publicCSS/allTheme.css';
import 'moment/locale/zh-cn';
import { UpSquareOutlined, DownSquareOutlined } from '@ant-design/icons'
import {
  Link,
  withRouter
} from 'react-router-dom'


/**
 * 内容：导航栏
 * props：无
 */
function Lheader(props) {
  const [state, setState] = useState({
    leaderAction: 0,//控制header的item高亮
    headerVisible: false//绑定手机端header的item-visible
  })
  function setAction(leaderAction) {
    setState(e => ({
      ...e,
      leaderAction
    }))
  }
  function setVisible(headerVisible) {
    setState(e => ({
      ...e,
      headerVisible
    }))
  }
  useEffect(() => {//改变header-item的高亮状态
    var { leaderAction } = state;
    var path = window.location.pathname.split('/');//解析path
    switch (path[1]) {//绑定高亮
      case '': leaderAction = 0; break;
      case 'interact': leaderAction = 1; break;
      case 'life': leaderAction = 2; break;
      case 'friendLink': leaderAction = 3; break;
      case 'about': leaderAction = 4; break;
    }
    setAction(leaderAction)
  }, [props.location.pathname])
  const HeaderContent = (//HeadIcon的提示
    <div className='h-content'>
      <span>欢迎你来到我的空间，希望你可以从这里找到你感兴趣的知识！</span>
    </div>
  )

  const HeaderItem = () => {//手机端的Header-item
    const { leaderAction } = state;
    return (<div className="h-item">
      <li className={leaderAction == 0 ? 'item-ph action-ph' : 'item-ph'}><Link to="/">技术博客</Link></li>
      <li className={leaderAction == 1 ? 'item-ph action-ph' : 'item-ph'}><Link to="/interact">留言板</Link></li>
      <li className={leaderAction == 2 ? 'item-ph action-ph' : 'item-ph'}><Link to="/life">历程</Link></li>
      <li className={leaderAction == 3 ? 'item-ph action-ph' : 'item-ph'}><Link to="/friendLink">友链</Link></li>
      <li className={leaderAction == 4 ? 'item-ph action-ph' : 'item-ph'}><Link to="/about">关于</Link></li>
    </div>)
  }

  //控制手机端header-menu的Visable
  const handleHeaderVisibleChange = (visible) => setVisible(visible);
  const { leaderAction, headerVisible } = state;
  return (
    <header>
      <div className="center">
        <Popover placement="bottom" content={HeaderContent} trigger="hover">
          <span className='header-title animated'>
            <img src={logo} alt="Lemon" />
            <span className='Lemon'> LimCong个人博客</span>
          </span>
        </Popover>
        <ul className="header-menu">
          <li className={leaderAction == 0 ? 'item animated action' : 'item animated'}><Link to="/">技术博客</Link></li>
          <li className={leaderAction == 1 ? 'item animated action' : 'item animated'}><Link to="/interact">留言板</Link></li>
          <li className={leaderAction == 2 ? 'item animated action' : 'item animated'}><Link to="/life">历程</Link></li>
          <li className={leaderAction == 3 ? 'item animated action' : 'item animated'}><Link to="/friendLink">友链</Link></li>
          <li className={leaderAction == 4 ? 'item animated action' : 'item animated'}><Link to="/about">关于</Link></li>
        </ul>
        <Popover placement="bottom" content={HeaderItem} trigger="hover" visible={headerVisible} onVisibleChange={handleHeaderVisibleChange}>
          <span className="header-menu-ph">{headerVisible ? <UpSquareOutlined /> : <DownSquareOutlined />} </span>
        </Popover>
      </div>
    </header>
  )
}
export default withRouter(Lheader);
