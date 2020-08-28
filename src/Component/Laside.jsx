import React from 'react';
import { Row, Col, Typography } from 'antd'
import { Component } from 'react'
import axios from 'axios'
import { FireOutlined, LoadingOutlined, QqOutlined, GithubOutlined, ZhihuOutlined } from '@ant-design/icons'
import banner from '../img/68.jpg';
import headImg from '../img/headImg.jpg'
import LazyLoad from 'react-lazyload'
import '../publicCSS/allTheme.css';
import 'moment/locale/zh-cn';
import {
    withRouter,
    Link,
} from 'react-router-dom'

var baseAxios = axios.create({
    baseURL: 'https://myblog.city:4000/blogView'
})
const { Paragraph } = Typography
class Laside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            hots: [],
            tag_action: 0,
            loading: true,
            searchStr: ""
        }
    }
    componentWillMount() {
        this.setState({ loading: true });
        baseAxios.get('/getHotTag')
            .then(({ data }) => {
                var tags = data.tags;
                var hots = data.hots;
                console.log(hots);
                var path = window.location.pathname.split('/');//解析path
                var action = 0;
                if (path[1] == 'blog') {
                    action = path[2].replace(/[^0-9]/ig, "");
                }
                this.setState({
                    tags,
                    hots,
                    tag_action: action,
                    loading: false
                })
            })
    }
    handleChange = (e) => {
        this.setState({
            searchStr: e.target.value
        })
    }
    render() {
        const { tags, hots, loading, tag_action, searchStr } = this.state;
        return (
            <div>
                {loading ? <LoadingOutlined /> : (
                    <div>
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
                                    <Col span={8}><div className="link-item"> <a href="tencent://message/?uin=1301872984&Site=&Menu=yes" className="card-qq"><QqOutlined /></a></div></Col>
                                    <Col span={8}><div className="link-item"><a href="https://github.com/soul-of-code" className="card-github" target="_blank"><GithubOutlined /></a></div></Col>
                                    <Col span={8}><div className="link-item"> <a href="https://www.zhihu.com/people/cong-ba-ba-bu-ge-you" className="card-zhihu" target="_blank"><ZhihuOutlined /></a></div></Col>
                                </Row>
                            </div>
                        </div>
                        <div className="search-box animated fadeInRight">
                            <Row>
                                <Col span={20}>
                                    <input placeholder="请输入搜索关键字" className='input-box' value={searchStr} onChange={this.handleChange}></input>
                                </Col>
                                <Col span={4}>
                                    <Link className='submit-box' to={'/search/' + searchStr}>搜索</Link>
                                </Col>
                            </Row>
                        </div>
                        <div className="tag-cloud animated fadeInRight">
                            <div className="tag-title">
                                <span className='animated'>文章分类</span>
                            </div>
                            <div className="tag-context">
                                <ul className='tag-list'>
                                    <Link to='/'>
                                        <li className={tag_action == 0 ? 'tag-item tag-item-action' : 'tag-item'} key={0}>
                                            <b to='/'>全部文章</b>
                                            <span></span>
                                        </li>
                                    </Link>
                                    {tags.map(item => (
                                        <Link to={"/blog/tag" + item.id} key={item.id}>
                                            <li className={tag_action == item.id ? 'tag-item tag-item-action' : 'tag-item'} key={item.id}>
                                                <b>{item.name}</b>
                                                <span>{item.num}</span>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="hot-door animated fadeInRight">
                            <div className="hot-title">
                                <span className='animated'><FireOutlined /><br /> 热度榜</span>
                            </div>
                            <div className="hot-context">
                                <ul className='hot-list'>
                                    {hots.map(item => (
                                        <LazyLoad height={400}>
                                        <li className='hot-item animated fadeInRight'>
                                            <div>
                                                <Link to={"/blogassign/article" + item.id}> {item.title}</Link>
                                                <span>{item.fire}<FireOutlined /></span>
                                            </div>
                                            <div className='hot-brief'>
                                                <img src={"https://myblog.city:4000" + item.imgsrc} />
                                                <p>
                                                    <Paragraph ellipsis={{ rows: 5, expandable: false }}>
                                                        {item.brief}
                                                    </Paragraph>
                                                </p>
                                            </div>
                                        </li>
                                        </LazyLoad>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        )
    }
}
export default withRouter(Laside)