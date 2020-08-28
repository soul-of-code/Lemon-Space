import React from 'react';
import { Row, Col } from 'antd'
import { Component } from 'react'
import { Helmet } from 'react-helmet'
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons'
import LazyLoad from 'react-lazyload'
import axios from 'axios'
import Laside from '../Component/baseAside'
import '../publicCSS/allTheme.css';
import 'moment/locale/zh-cn';
import {
    withRouter,
} from 'react-router-dom'
var baseAxios = axios.create({
    baseURL: 'https://myblog.city:4000/FriendView'
})

class about extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendlist: [],
            loading: true
        }
    }
    componentWillMount() {
        this.setState({ loading: true })
        baseAxios.get('/getfriends')
            .then(res => {
                this.setState({ friendlist: res.data, loading: false });
            })
    }
    render() {
        const { friendlist, loading } = this.state;
        return (
            <div className='center'>
                <Helmet>
                    <title>友链 | Lemon-LimCong的个人博客</title>
                </Helmet>
                <div className="wrap-title">友谊像清晨的雾一样纯洁，奉承并不能得到友谊，友谊只能用忠实去巩固它。—— 马克思</div>
                <Row justify="space-between">
                    {!loading && (<Col xs={24} sm={24} md={24} lg={17} xl={17} id='main-left'>
                        <div className="friendLink-wrap">
                            <div className="friendLink-explain">
                                <div className="explain-title">
                                    友链申请说明
                                </div>
                                <div className="explain-icons">
                                    <div className="explain-icon-item red">
                                        <CloseCircleFilled /> 经常宕机
                                    </div>
                                    <div className="explain-icon-item red">
                                        <CloseCircleFilled /> 不和法规
                                    </div>
                                    <div className="explain-icon-item red">
                                        <CloseCircleFilled /> 擦边球站
                                    </div>
                                    <div className="explain-icon-item red">
                                        <CloseCircleFilled /> 红标报毒
                                    </div>
                                </div>
                                <div className="explain-icons">
                                    <div className="explain-icon-item green">
                                        <CheckCircleFilled /> 技术分享
                                    </div>
                                    <div className="explain-icon-item green">
                                        <CheckCircleFilled /> IT科技
                                    </div>
                                    <div className="explain-icon-item green">
                                        <CheckCircleFilled /> 移动互联网
                                    </div>
                                    <div className="explain-icon-item green">
                                        <CheckCircleFilled /> 生活分享类
                                    </div>
                                </div>
                                <div className="explain-context">
                                    <div className="context-item">
                                        交换友链可在留言板留言.同时请将本站加入友链
                                    </div>
                                    <div className="context-item">
                                        名称：LimCong个人博客
                                    </div>
                                    <div className="context-item">
                                        网址：https://www.myblog.city/
                                    </div>
                                    <div className="context-item">
                                        图标：https://www.myblog.city:4000/getlogo
                                    </div>
                                    <div className="context-item">
                                        描述：一个伪全能且却黑的准程序员。
                                    </div>
                                    <div className="context-item">
                                        特别提醒： 申请提交后若无其它原因将在24小时内完成审核,如超过时间还未通过,请留言或私信给我.
                                    </div>
                                </div>
                            </div>
                            <div className="friends-title">身边的朋友</div>
                            <Row className="friends-wrap" justify="space-between">
                                {friendlist.map(item => item.tag == 0 && (
                                    <Col className="friends-item" xs={24} sm={24} md={11} lg={11} xl={11}>
                                        <LazyLoad height={300}>
                                            <a href={item.url} target="_blank" className='animated bounceIn'>
                                                <img src={item.icon} alt="" />
                                                <h2>{item.name}</h2>
                                                <p>{item.fdescribe}</p>
                                            </a>
                                        </LazyLoad>
                                    </Col>
                                ))}
                            </Row>
                            <div className="friends-title">远方的大佬</div>
                            <Row className="friends-wrap" justify="space-between">
                                {friendlist.map(item => item.tag == 1 && (
                                    <Col className="friends-item" xs={24} sm={24} md={11} lg={11} xl={11}>
                                        <LazyLoad height={300}>
                                            <a href={item.url} target="_blank" className='animated bounceIn'>
                                                <img src={item.icon} alt="" />
                                                <h2>{item.name}</h2>
                                                <p>{item.fdescribe}</p>
                                            </a>
                                        </LazyLoad>
                                    </Col>
                                ))}
                            </Row>
                            <div className="friends-title">顶级大佬</div>
                            <Row className="friends-wrap" justify="space-between">
                                {friendlist.map(item => item.tag == 2 && (
                                    <Col className="friends-item" xs={24} sm={24} md={11} lg={11} xl={11}>
                                        <LazyLoad height={300}>
                                            <a href={item.url} target="_blank" className='animated bounceIn'>
                                                <img src={item.icon} alt="" />
                                                <h2>{item.name}</h2>
                                                <p>{item.fdescribe}</p>
                                            </a>
                                        </LazyLoad>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>)}
                    <Col xs={0} sm={0} md={0} lg={7} xl={7} id='main-right'>
                        <Laside />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(about);