import React from 'react';
import { Typography } from 'antd'
import { Component } from 'react'
import LazyLoad from 'react-lazyload'
import qq2 from '../img/qq2.png'
import wx2 from '../img/wx2.png'
import { FireOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
import '../publicCSS/allTheme.css';
import 'moment/locale/zh-cn';
import {
    withRouter,
    Link,
} from 'react-router-dom'
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
            hots: [],
            loading: true,
        }
    }
    componentDidMount() {
        const { haveHot } = this.props;
        this.setState({ loading: true });
        if (haveHot) {
            baseAxios.get('/getHotTag')
                .then(({ data }) => {
                    this.setState({
                        hots: data.hots,
                        loading: false
                    })
                })
        }
    }
    render() {
        const { hots, loading } = this.state;
        const { haveHot } = this.props;
        return (
            <div>
                <div>
                    <LemonCard />
                    <div className="tag-cloud animated fadeInRight">
                        <div className="tag-title">
                            <span className='animated'><WechatOutlined /> 我的微信</span>
                        </div>
                        <div className="tag-2m">麻烦备注从博客扫码来的哦<img src={wx2} alt="" /></div>
                    </div>
                    <div className="tag-cloud animated fadeInRight">
                        <div className="tag-title">
                            <span className='animated'><QqOutlined /> 我的丘丘</span>
                        </div>
                        <div className="tag-2m tag-qq">麻烦备注从博客扫码来的哦<img src={qq2} alt="" /></div>
                    </div>
                    {haveHot &&
                        <div className="hot-door animated fadeInRight">
                            <div className="hot-title">
                                <span className='animated'><FireOutlined /><br /> 热度榜</span>
                            </div>
                            <LemonLoading loading={loading}>
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
                                </div>
                            </LemonLoading>
                        </div>
                    }
                </div>
            </div>

        )
    }
}
export default withRouter(Laside)