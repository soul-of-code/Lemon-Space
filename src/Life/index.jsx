import React, { useState, useEffect } from 'react';
import { Row, Col, Timeline, message } from 'antd'
import { Helmet } from 'react-helmet'
import { ClockCircleOutlined } from '@ant-design/icons'
import Laside from '../Component/baseAside';
import moment from 'moment';
import '../publicCSS/allTheme.css';
import '../publicCSS/style.css';
import 'moment/locale/zh-cn';
import {
    withRouter,
} from 'react-router-dom';
import { LemonLoading } from '../Component/loader';
import LemonAxios from 'utils/lemon_axios'

var baseAxios = new LemonAxios('/lifeView');

function Life() {
    const [state, setState] = useState({
        loading: true,
        timeLine: []
    })
    const setNewState = (type, data) => {
        setState(v => ({
            ...v,
            [type]: data
        }))
    }
    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setNewState("loading", true);
        baseAxios.get('/getlife')
            .then(res => {
                if (res.data.err) {
                    message.error(res.data.err);
                    return
                }
                setState({
                    timeLine: res.data,
                    loading: false
                })

            })
    }, [])
    const { loading, timeLine } = state;
    return (
        <div className='center'>
            <Helmet>
                <title>历程 | Lemon-LimCong的个人博客</title>
            </Helmet>
            <div className="wrap-title">向着某一天终于要达到的那个终极目标迈步还不够，还要把每一步骤看成目标，使它作为步骤而起作用。——歌德</div>
            <Row justify="space-between">
                <Col xs={24} sm={24} md={24} lg={17} xl={17} id='main-left'>
                    <div className="life-wrap">
                        <div className="life-title-wrap">
                            <div className="life-title">
                                博客的生命周期
                                </div>
                        </div>
                        <LemonLoading loading={loading}>
                            <Timeline mode="alternate">
                                <Timeline.Item dot={<ClockCircleOutlined color="green" style={{ fontSize: '16px' }} />}>
                                    未来还在继续……
                                </Timeline.Item>
                                {timeLine.map(item => (
                                    <Timeline.Item color={item.color}>
                                        <span className='time-context' style={{ color: item.color }}>{item.href ? (<a href={item.href}>{item.context}</a>) : item.context}</span>
                                        <br />
                                        <span className='time-timer'>{moment(new Date(item.show_time * 1000)).format('YYYY-MM-DD')}</span>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                            <div className="waiting">
                                -- Endding --
                            </div>
                        </LemonLoading>
                    </div>

                </Col>
                <Col xs={0} sm={0} md={0} lg={7} xl={7} id='main-right'>
                    <Laside />
                </Col>
            </Row>
        </div>
    )

}

export default withRouter(Life);