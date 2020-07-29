import React from 'react';
import { Row, Col, Affix } from 'antd'
import { Component } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
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

var baseAxios = axios.create({
    baseURL: 'https://myblog.city:4000/blogView'
})

class Laside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            hots: [],
            tag_action:[false,false,false,false,false,false],
            loading:true,
            searchStr:""
        }
    }
    componentWillMount() {
        baseAxios.get('/getHotTag')
            .then(data => {
                var tags = data.data.tags;
                var hots = data.data.hots;
                var path = window.location.pathname.split('/');//解析path
                var action = [false,false,false,false,false,false];
                if(path[1] == ''){
                    action[0] = true;
                }
                else{
                    action[path[2][3]] = true
                }
                this.setState({
                    tags: tags,
                    hots: hots,
                    tag_action:action,
                    loading: false
                })
            })
    }
    handleChange = (e)=>{
        this.setState({
            searchStr:e.target.value
        })
        console.log(this.state.searchStr)
    }
    render() {
        const { tags, hots, loading ,tag_action,searchStr} = this.state;
        return (
            <div>
                {loading?<LoadingOutlined />:(
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
                                <Col span={8}><div className="link-item"> <a href="tencent://message/?uin=1301872984&Site=&Menu=yes" className="card-qq"><QqOutlined /></a></div></Col>
                                <Col span={8}><div className="link-item"><a href="https://github.com/soul-of-code" className="card-github" target="_blank"><GithubOutlined /></a></div></Col>
                                <Col span={8}><div className="link-item"> <a href="https://www.zhihu.com/people/cong-ba-ba-bu-ge-you" className="card-zhihu" target="_blank"><ZhihuOutlined /></a></div></Col>
                            </Row>
                        </div>
                    </div>
                    <Affix offsetTop={76}>
                        <div className="search-box">
                            <Row>
                                <Col span={20}>
                                    <input placeholder="请输入搜索关键字" className='input-box' value={searchStr} onChange={this.handleChange}></input>
                                </Col>
                                <Col span={4}>
                                    <Link className='submit-box' to={'/search/'+searchStr}>搜索</Link>
                                </Col>
                            </Row>
                        </div>
                        <div className="tag-cloud">
                            <div className="tag-title">
                                <span className='animated'><UnorderedListOutlined /> 文章分类</span>
                            </div>
                            <div className="tag-context">
                                <ul className='tag-list'>
                                    <Link to = '/'>
                                    <li className={tag_action[0]?'tag-item tag-item-action':'tag-item'}>
                                        <a to = '/'>全部文章</a>
                                        <span></span>
                                    </li>
                                    </Link>
                                    {tags.map(item => (
                                         <Link to= {"/blog/tag"+item.id}>
                                        <li className={tag_action[item.id]?'tag-item tag-item-action':'tag-item'}>
                                            <a>{item.name}</a>
                                            <span>{item.num}</span>
                                        </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="hot-door">
                            <div className="hot-title">
                                <span className='animated'><FireOutlined /><br /> 热度榜</span>
                            </div>
                            <div className="hot-context">
                                <ul className='hot-list'>
                                    <li className='hot-item'>
                                        <strong id='hot1'>1</strong>
                                        <Link style={{ color: 'red' }} to={"/blogassign/article"+hots[0].id}> {hots[0].title}</Link>
                                        <span>{hots[0].fire}<FireOutlined /></span>
                                    </li>
                                    <li className='hot-item'>
                                        <strong id='hot2'>2</strong>
                                        <Link style={{ color: 'orangered' }}  to={"/blogassign/article"+hots[1].id}> {hots[1].title}</Link>
                                        <span>{hots[1].fire}<FireOutlined /></span>
                                    </li>
                                    <li className='hot-item'>
                                        <strong id='hot3'>3</strong>
                                        <Link style={{ color: 'orange' }} to={"/blogassign/article"+hots[2].id}> {hots[2].title}</Link>
                                        <span>{hots[2].fire}<FireOutlined /></span>
                                    </li>
                                    <li className='hot-item'>
                                        <strong>4</strong>
                                        <Link  to={"/blogassign/article"+hots[3].id}> {hots[3].title}</Link>
                                        <span>{hots[3].fire}<FireOutlined /></span>
                                    </li>
                                    <li className='hot-item'>
                                        <strong>5</strong>
                                        <Link  to={"/blogassign/article"+hots[4].id}> {hots[4].title}</Link>
                                        <span>{hots[4].fire}<FireOutlined /></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Affix>
                </div>
                )}
            </div>

        )
    }
}
export default withRouter(Laside)