import React from 'react';
import { Row, Col, Affix } from 'antd'
import { Component } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import qq2 from '../qq2.png'
import wx2 from '../wx2.png'
import { FireOutlined, LoadingOutlined, UnorderedListOutlined, ArrowRightOutlined, QqOutlined, GithubOutlined, WechatOutlined, ZhihuOutlined } from '@ant-design/icons'
import banner from '../68.jpg';
import headImg from '../headImg.jpg'
import '../css/theme.css';
import '../css/firstTheme.css'
import '../css/secondTheme.css'
import '../css/thirdTheme.css'
import '../css/fourthTheme.css'
import '../css/animate.min.css'
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import '../index.css';
import {
    withRouter,
    Link,
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

class Laside extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    <div className='visiting-card'  >
                        <div className="card-banner" style={{ background: 'url(' + banner + ') no-repeat top center' }}>
                            <img src={headImg} alt="" />
                        </div>
                        <div className="card-context">
                            <div className="card-name">Lemon | Limcong</div>
                            <div className="card-tag"><i>准前端工程师</i></div>
                            <div className="card-mail">1301872983@qq.com</div>
                            <div className="card-smalltext">
                                一个爱吉他爱篮球爱唱歌的95后伪全能程序猿一枚，对很多方向都略有涉猎，但是没有一项精通。希望通过我在这里分享的踩坑记录可以帮助一些人更好更快的掌握一些知识或者技巧。
                                </div>
                        </div>
                        <div className="card-footer">
                            <Row>
                                <Col span={9}><div className="solid"></div></Col>
                                <Col span={6}><div className="tips">社交账号</div></Col>
                                <Col span={9}><div className="solid"></div></Col>
                            </Row>
                        </div>
                        <div className="card-link">
                            <Row>
                                <Col span={8}><div className="link-item"> <a href="http://wpa.qq.com/msgrd?v=3&uin=1301872984&site=qq&menu=yes" className="card-qq"><QqOutlined /></a></div></Col>
                                <Col span={8}><div className="link-item"><a href="https://github.com/soul-of-code" className="card-github"><GithubOutlined /></a></div></Col>
                                <Col span={8}><div className="link-item"> <a href="https://www.zhihu.com/people/cong-ba-ba-bu-ge-you" className="card-zhihu"><ZhihuOutlined /></a></div></Col>
                            </Row>
                        </div>
                    </div>
                    <Affix offsetTop={76}>
                        <div className="tag-cloud">
                            <div className="tag-title">
                                <span className='animated'><WechatOutlined/> 我的微信</span>
                            </div>
                            <div className="tag-2m">麻烦备注从博客扫码来的哦<img src={wx2} alt=""/></div>
                        </div>
                        <div className="tag-cloud">
                            <div className="tag-title">
                                <span className='animated'><QqOutlined/> 我的丘丘</span>
                            </div>
                            <div className="tag-2m tag-qq">麻烦备注从博客扫码来的哦<img src={qq2} alt=""/></div>
                        </div>
                    </Affix>
                </div>
            </div>

        )
    }
}
export default withRouter(Laside)