import React from 'react'
import { Row, Col } from 'antd'
import headImg from '../img/headImg.jpg'
import banner from '../img/68.jpg';
import { QqOutlined, GithubOutlined, ZhihuOutlined } from '@ant-design/icons'

export default function LemonCard() {
    return (
        <div className='visiting-card animated fadeInRight'>
            <div className="card-banner" style={{ background: 'url(' + banner + ') no-repeat top center' }}>
                <img src={headImg} alt="" />
            </div>
            <div className="card-context">
                <div className="card-name">Lemon | Limcong</div>
                <div className="card-tag"><i>前端工程师</i></div>
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
    )
}