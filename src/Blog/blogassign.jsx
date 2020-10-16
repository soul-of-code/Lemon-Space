import React from 'react';
import { Row, Col, message } from 'antd'
import { Component } from 'react'
import { Helmet } from 'react-helmet'
import ReactMarkdown from 'react-markdown'
import { FireFilled, LikeFilled, BorderlessTableOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import axios from 'axios'
import Laside from '../Component/baseAside'
import moment from 'moment'
import '../publicCSS/allTheme.css';
import 'moment/locale/zh-cn';
import '../publicCSS/style.css'
import codeblock from '../Component/codeblock'
import {
    withRouter,
    Link,
} from 'react-router-dom'

var baseAxios = axios.create({
    baseURL: 'https://myblog.city:4000/blogView'
})

window.scroll = 0
class blogAssign extends Component {
    constructor(props) {
        // this.props.match.params.name 获取props
        super(props);
        this.state = {
            Art: {},
            loading: true,
            isAssist: false
        }
    }
    componentDidMount() {
        this.setState({ loading: true });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        var { art } = this.props.match.params;
        baseAxios.get('/getArticle', { params: { art: art.split('article')[1] } })
            .then(res => {
                if (res.data.err) {
                    window.location.href = '/'
                }
                this.setState({ Art: res.data, loading: false });
            })
            .catch(errInfo => {
                console.log(errInfo);
            })
    }
    componentWillReceiveProps(newProps) {
        this.setState({ loading: true });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        var { art } = newProps.match.params;
        baseAxios.get('/getArticle', { params: { art: art.split('article')[1] } })
            .then(res => {
                this.setState({ Art: res.data, loading: false });
            })
            .catch(errInfo => {
                console.log(errInfo);
            })
    }
    handleAssist = () => {
        const { isAssist, Art } = this.state;
        if (isAssist) {
            message.error('你在本次浏览中已经赞过啦~')
        }
        else {
            baseAxios.get('/addAssist', { params: { _id: Art.id } })
                .then(res => {
                    if (res.data.err) {
                        message.error('点赞过程出问题了！！原因：' + res.data.err);
                    }
                    message.success('感谢你的赞，点赞成功！');
                    message.success('感谢你的赞，点赞成功！');
                    var newArt = { ...Art };
                    newArt.remark++;
                    this.setState({ isAssist: true, Art: newArt });
                })
        }
    }
    render() {
        const { Art, loading } = this.state
        return (
            <div className='center'>
                <Helmet>
                    <title>博客 | Lemon-LimCong的个人博客</title>
                </Helmet>
                <Row justify="space-between">
                    <Col xs={24} sm={24} md={24} lg={17} xl={17} id='main-left'>
                        {!loading &&
                            <div className='md-wrap animated rollIn'>
                                <div className="md-back"><Link to='/'><ArrowLeftOutlined /> 返回首页</Link></div>
                                <div className="md-header">
                                    <div className="md-title">
                                        <strong>{Art.type == 1 ? '【转载】' : '【原创】'}</strong>{Art.title}
                                    </div>
                                    <div className='md-icon-list'>
                                        <span className="md-icon">
                                            <BorderlessTableOutlined /> {moment(new Date(Art.time * 1000)).format('YYYY年MM月DD日 hh:mm')}
                                        </span>
                                        <span className="md-icon">
                                            <BorderlessTableOutlined /> {Art.tagName}
                                        </span>
                                        <span className="md-icon">
                                            <FireFilled /> {Art.fire}
                                        </span>
                                        <span className="md-icon">
                                            <LikeFilled /> {Art.remark}
                                        </span>
                                    </div>
                                </div>
                                <div className="md-context markdown">
                                    <ReactMarkdown
                                        source={Art.markdown}
                                        escapeHtml={false}
                                        renderers={{
                                            code: codeblock
                                        }}
                                    />
                                    <div className="endding">
                                        -- Endding --
                                </div>
                                    <div className="assist" onClick={this.handleAssist}>
                                        赞
                                </div>

                                </div>

                            </div>}
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={7} xl={7} id='main-right'>
                        <Laside />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(blogAssign);