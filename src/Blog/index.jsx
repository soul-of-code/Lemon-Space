import React from 'react';
import { Row, Col } from 'antd'
import { Component } from 'react'
import { Helmet } from 'react-helmet'
import { FireFilled, BorderlessTableOutlined, LikeFilled } from '@ant-design/icons'
import axios from 'axios'
import Laside from '../Component/Laside'
import LazyLoad from 'react-lazyload'
import '../publicCSS/theme.css';
import '../publicCSS/firstTheme.css'
import '../publicCSS/secondTheme.css'
import '../publicCSS/thirdTheme.css'
import '../publicCSS/fourthTheme.css'
import '../publicCSS/animate.min.css'
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
class Blog extends Component {
    constructor(props) {
        // this.props.match.params.name 获取props
        super(props);
        this.state = {
            blogList: []
        }
    }
    componentWillMount() {
        this.setState({ blogList: [] });
        this.setState({ blogList: this.props.data });
    }
    componentWillReceiveProps(newProps) {
        this.setState({ blogList: [] });
        this.setState({ blogList: newProps.data });
    }
    render() {
        const { blogList } = this.state
        return (
            <div className='center'>
                <Helmet>
                    <title>博客 | Lemon-LimCong的个人博客</title>
                </Helmet>
                <div className="wrap-title">台阶是一层一层筑起的，目前的现实是未来理想的基础。 —— 徐特立</div>
                <Row justify="space-between">
                    <Col xs={24} sm={24} md={24} lg={17} xl={17} id='main-left'>
                        {this.props.panelName && <div className="blog-panel"><Link to="/">{this.props.panelName}</Link></div>}
                        {blogList.map(data => (
                            <LazyLoad height={400}>
                                <div className='blog-item animated rollIn'>
                                    <div className="blog-header">
                                        <div className="blog-title-wrap">
                                            <div className="blog-title">
                                                <strong>{data.type == 1 ? '【转载】' : '【原创】'}</strong> <Link to={`/blogassign/article${data.id}`}>{data.title}</Link>
                                                <div className='blog-icon-list'>
                                                    <span className="blog-icon">
                                                        <Link to={`/blog/tag${data.tag}`}>
                                                            <BorderlessTableOutlined /> {data.tagname}
                                                        </Link>

                                                    </span>
                                                    <span className="blog-icon">
                                                        <Link to={`/blogassign/article${data.id}`}>
                                                            <FireFilled /> {data.fire}
                                                        </Link>
                                                    </span>
                                                    <span className="blog-icon">
                                                        <Link to={`/blogassign/article${data.id}`}>
                                                            <LikeFilled /> {data.remark}
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="blog-time">
                                            <div className="blog-day">
                                                <span className="blog-highlight">{data.time.getDate()}</span>日
                                    </div>
                                            <div className="blog-else">
                                                <span className="blog-highlight">{data.time.getFullYear()}</span> 年-
                                        <span className="blog-highlight"> {data.time.getMonth() + 1}</span> 月
                                    </div>
                                        </div>
                                    </div>
                                    <div className="blog-context">
                                        <Row>
                                            <Col xs={24} sm={24} md={14} lg={14} xl={14} className='text'>
                                                <Link to={`/blogassign/article${data.id}`} style={{ color: 'inherit' }}>
                                                    <div className="text-title">文章简介：</div>
                                                    <div className="text-context">{data.brief}</div>
                                                    <div className="text-look"><Link to={`/blogassign/article${data.id}`}>阅读全文</Link></div>
                                                </Link>
                                            </Col>
                                            <Col xs={24} sm={24} md={10} lg={10} xl={10} className='img'>
                                                <Link to={`/blogassign/article${data.id}`}>
                                                    <img src={"https://myblog.city:4000" + data.imgsrc} />
                                                </Link>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="blog-footer">www.myblog.city</div>
                                </div>
                            </LazyLoad>
                        ))}
                        <div className='waiting'>-- 已经到底了 --</div>
                        <br />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={7} xl={7} id='main-right'>
                        <Laside />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default withRouter(Blog);
