import React from 'react';
import { Row, Col, Typography } from 'antd'
import { Component } from 'react'
import { FireOutlined } from '@ant-design/icons'
import LazyLoad from 'react-lazyload'
import '../publicCSS/allTheme.css';
import 'moment/locale/zh-cn';
import {
    withRouter,
    Link,
} from 'react-router-dom';
import { LemonLoading } from '../Component/loader';
import LemonAxios from 'utils/lemon_axios'
import LemonCard from './lemon-card'

var baseAxios = new LemonAxios('/blogView');
var hoster = baseAxios.environment;

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
    componentDidMount() {
        this.setState({ loading: true });
        baseAxios.get('/getHotTag')
            .then(({ data }) => {
                var tags = data.tags;
                var hots = data.hots;
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
                <LemonCard />
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
                    <LemonLoading loading={loading}>
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
                    </LemonLoading>
                </div>
                <div className="hot-door animated fadeInRight">
                    <div className="hot-title">
                        <span className='animated'><FireOutlined /><br /> 热度榜</span>
                    </div>
                    <div className="hot-context">
                        <LemonLoading loading={loading}>
                            <ul className='hot-list'>
                                {hots.map(item => (
                                    <LazyLoad height={400}>
                                        <li className='hot-item animated fadeInRight'>
                                            <div>
                                                <Link to={"/blogassign/article" + item.id}> {item.title}</Link>
                                                <span>{item.fire}<FireOutlined /></span>
                                            </div>
                                            <div className='hot-brief'>
                                                <img src={hoster + item.imgsrc} />
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
                        </LemonLoading>
                    </div>
                </div>
            </div>

        )
    }
}
export default withRouter(Laside)