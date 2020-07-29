import React from 'react';
import { Row, Col, Input, Form, Checkbox, Button, Popover, Switch, Comment, Avatar, message, Tooltip } from 'antd'
import { Component } from 'react'
import { Helmet } from 'react-helmet'
import { SmileOutlined } from '@ant-design/icons'
import axios from 'axios'
import Laside from '../base/baseAside'
import inher from '../inherImg.jpg'
import moment from 'moment'
import '../css/theme.css';
import '../css/firstTheme.css'
import '../css/secondTheme.css'
import '../css/thirdTheme.css'
import '../css/fourthTheme.css'
import '../css/animate.min.css'
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import '../index.css';
import '../css/style.css'
import {
    withRouter,
    Link,
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

var baseAxios = axios.create({
    baseURL: 'https://myblog.city:4000/interactView'
})

class ExampleComment extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Comment
                actions={[<span key="comment-nested-reply-to">{this.props.Reply}</span>]}
                author={<span>{this.props.name}</span>}
                avatar={
                    <Avatar
                        src={this.props.headimg}
                        alt={this.props.name}
                    />
                }
                content={
                    <p>
                        {this.props.context}
                    </p>
                }
            >
                {this.props.children}
            </Comment>
        );
    }
}
class about extends Component {
    addRef = React.createRef();//处理添加数据的表单
    mscount = true;
    constructor(props) {
        // this.props.match.params.name 获取props
        super(props);
        this.state = {
            interactData: [],
            headimgSrc: '',
            isReply: false,
            loading: true,
            isClick: true,
            replyitem: {},
            emoji: [],
            emojiVisible: false,
            inputValue: ""
        }
    }
    componentWillMount() {
        this.setState({ loading: true })
        baseAxios.get('/getInteract')
            .then(res => {
                var { inter, emoji } = res.data
                this.setState({ emoji: emoji })
                for (let i = 0; i < inter.length; i++) {
                    inter[i].context = this.editContext(inter[i].context);
                    if (inter[i].child_act.length != 0)
                        for (let j = 0; j < inter[i].child_act.length; j++) {
                            inter[i].child_act[j].context = this.editContext(inter[i].child_act[j].context);
                        }
                }
                this.setState({
                    interactData: inter,
                    loading: false
                })
            })
            .catch(errInfo => {
                console.log(errInfo)
            })
    }
    editContext = context => {
        const { emoji } = this.state;
        context = context.split(']').join('/');
        context = context.split('[').join('/');
        var arr = context.split('/');
        for (let e = 0; e < emoji.length; e++) {
            for (let a = 0; a < arr.length; a++) {
                if (arr[a] == emoji[e].name) {
                    arr[a] = <img src={'https://myblog.city:4000/emoji/' + emoji[e].id + ".gif"} alt="" />
                }
            }
        }
        return (
            <span>
                {
                    arr.map(item => (
                        item
                    ))
                }
            </span>
        )
    }
    addRow = () => {
        const { isClick, replyitem, isReply } = this.state
        if (isClick) {   //如果为true 开始执行
            this.setState({ isClick: false })   //将isClick 变成false，将不会执行处理事件
            this.addRef.current.validateFields().then(values => {
                this.setState({ isClick: false })
                var addList = { ...values };

                if (addList.email.split('@')[1] != 'qq.com') {
                    if (this.mscount) {
                        message.error('请检查你的邮箱是否正确！');
                        this.mscount = false;

                    }
                    message.error('请检查你的邮箱是否正确！');
                    setTimeout(() => this.setState({ isClick: true }), 500)

                    return;
                }
                if (values.canremark) {
                    addList.canremark = 0;
                }
                else {
                    addList.canremark = 1;
                }
                addList.create_time = new Date().getTime() / 1000;
                if (isReply) {
                    addList.fid = replyitem.id;
                    addList.fname = replyitem.name;
                    addList.femail = replyitem.email;
                    addList.fismaster = replyitem.ismaster;
                    baseAxios.get('/addInteractcmt', { params: addList })
                        .then(res => {
                            if (res.data.err) {
                                message.error(res.data.err)
                                console.log('进来了')
                            }
                            else {
                                this.setState({ isReply: false, replyitem: {} });
                                message.success('留言成功！');
                                message.success('留言成功！');
                                setTimeout(() => window.location.reload(), 1000);
                            }

                        })
                        .catch(errInfo => {
                            const Mythis = this;
                            setTimeout(() => Mythis.setState({ isClick: true }), 1000);
                        })
                }
                else
                    baseAxios.get('/addInteract', { params: addList })
                        .then(res => {
                            if (res.data.err) {
                                message.error(res.data.err)
                                console.log('进来了')
                            }
                            else {
                                this.setState({ isReply: false, replyitem: {} });
                                message.success('留言成功！');
                                message.success('留言成功！');
                                setTimeout(() => window.location.reload(), 1000);
                            }

                        })
                        .catch(errInfo => {
                            const Mythis = this;
                            setTimeout(() => Mythis.setState({ isClick: true }), 1000);
                        })
            })
        }
    }
    handleMail = (e) => {
        if (e.target.value.indexOf('@') != -1) {
            this.setState({ headimgSrc: `http://q4.qlogo.cn/g?b=qq&nk=${e.target.value}&s=3` })
        }
        else {
            this.setState({ headimgSrc: '' })
        }
    }
    handleReply = (fitem, citem) => {
        var data = { ...fitem };
        if (citem) {
            data.name = citem.name;
            data.email = citem.email;
            data.context = citem.context;
            data.ismaster = citem.ismaster;
        }
        this.setState({ isReply: true, replyitem: data })
    }
    handleCancel = () => {
        this.setState({ isReply: false, replyitem: {} })
    }

    handleEmojiVisibleChange = visible => {
        this.setState({ emojiVisible: visible })
    }
    handleAddEmoji = name => {
        const { inputValue } = this.state
        var str = "[" + name + "]";
        this.addRef.current.setFieldsValue({ context: inputValue + str });
        this.setState({ inputValue: inputValue + str })
    }
    handleInput = e => {
        const { inputValue } = this.state;
        this.setState({ inputValue: e.target.value });
    }

    render() {
        const { headimgSrc, isReply, interactData, loading, replyitem, emoji, emojiVisible, inputValue } = this.state;
        return (
            <div className='center'>
                <Helmet>
                    <title>留言 | Lemon-LimCong的个人博客</title>
                </Helmet>
                <div className="wrap-title">人之相知，贵在知心。〈汉·李陵〉</div>
                <Row justify="space-between">
                    <Col xs={24} sm={24} md={24} lg={17} xl={17} id='main-left'>
                        <div className="interact-wrap">
                            <div className="interact-title">
                                <div className="interact-title-header">
                                    LimCong 的留言板
                                </div>
                                <div className="interact-title-context">
                                    <div className="context-line">
                                        不要轻易去爱，更不要轻易去恨
                                    </div>
                                    <div className="context-line">
                                        让青春多留下潇洒的印痕
                                    </div>
                                    <div className="context-line">
                                        你是快乐的，因为你很单纯
                                    </div>
                                    <div className="context-line">
                                        你是迷人的，因为你有一颗宽容的心
                                    </div>
                                    <div className="context-line">
                                        让友情成为草原上的牧歌
                                    </div>
                                    <div className="context-line">
                                        让敌意有如过眼烟云
                                    </div>
                                    <div className="context-line">
                                        伸出彼此的手，握紧令人羡慕的韶华与纯真
                                    </div>
                                    <div className="context-line">——汪国真 《妙龄时光》</div>
                                </div>
                            </div>
                            <div id="reply-a"></div>
                            <div className="interact-edit-wrap">
                                <div className="interact-edit-header">
                                    留个言吧~
                                </div>
                                {isReply ? (<div className="interact-reply">
                                    <div className="reply-item">回复 {replyitem.ismaster ? <span className='master'>博主</span> : replyitem.name} 的一条留言：</div>
                                    <div className="reply-item">{replyitem.context}</div>
                                    <div className="reply-item"><a onClick={this.handleCancel}>取消回复</a></div>
                                </div>) : ""}

                                <Form layout="horizontal" hideRequiredMark ref={this.addRef} onFinish={this.addRow}>
                                    <Row justify="space-between" style={{ marginBottom: "5px" }}>
                                        <Col xs={20} sm={20} md={20} lg={20} xl={21}>
                                            <Form.Item
                                                name="name"
                                                rules={[{ required: true, message: '来将可留姓名？' }]}
                                            >
                                                <Input className='interact-inputarea' placeholder='来将可留姓名？' />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={4} sm={3} md={4} lg={4} xl={3}> {headimgSrc == '' ? <img src={inher} id='interact-headImg' alt="" /> : <img src={headimgSrc} id='interact-headImg' alt='' />}</Col>
                                    </Row>
                                    <Form.Item
                                        name="context"
                                        rules={[{ required: true, message: '这也不能留个寂寞啊，整点字儿啊' }]}
                                    >
                                        <Input.TextArea rows={6} className='interact-inputarea' placeholder='朋友，来都来了，留个言再走吧~' value={inputValue} onChange={this.handleInput} />
                                    </Form.Item>
                                    <Row className="interact-edit-subline" justify='space-between'>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Row>
                                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                                    <Popover placement="bottom" content={<div className='emoji-list'>
                                                        {emoji.map(item => (
                                                            <span className='emoji-item'>
                                                                <Tooltip placement="top" trigger="hover" arrowPointAtCenter={true} title={'[' + item.name + ']'} mouseEnterDelay={0} mouseLeaveDelay={0}>
                                                                    <img src={'https://myblog.city:4000/emoji/' + item.id + ".gif"} alt="" onClick={() => this.handleAddEmoji(item.name)} />
                                                                </Tooltip >
                                                            </span>
                                                        ))}
                                                    </div>} trigger="click" arrowPointAtCenter={true} visible={emojiVisible} onVisibleChange={this.handleEmojiVisibleChange}>
                                                        <SmileOutlined className='smile' />
                                                    </Popover>
                                                </Col>
                                                <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                                    <Form.Item
                                                        name="email"
                                                        rules={[{ required: true, message: '朋友，你的邮箱还没留呐' }]}
                                                    >
                                                        <Input className='email-inputer' placeholder='你的QQ邮箱~' onChange={this.handleMail} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Row justify="end">
                                                <Col style={{ marginRight: "15px" }}>
                                                    <span className='canremark'>是否仅博主回复：</span>
                                                    <Form.Item
                                                        name="canremark"
                                                        noStyle={true}
                                                    >
                                                        <Switch checkedChildren="开" unCheckedChildren="关" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Button className='interact-submit' htmlType="submit" onClick={() => this.addRef.current.submit()}>留言</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                                <div className="interact-edit-header interact-list-header">
                                    留言列表
                                </div>
                                {
                                    loading ? '' : (
                                        <div className="interact-list-context">
                                            {interactData.map(fitem => (
                                                <ExampleComment
                                                    name={fitem.ismaster ? <span className='master'>博主</span> : fitem.name}
                                                    context={fitem.context}
                                                    headimg={`http://q4.qlogo.cn/g?b=qq&nk=${fitem.email}&s=3`}
                                                    Reply={(
                                                        <span>{moment(new Date(fitem.create_time * 1000)).format('YYYY年MM月DD日 HH:mm:ss')}
                                                            {fitem.canremark ? <a href="#reply-a" style={{ marginLeft: "10px" }}
                                                                onClick={() => this.handleReply(fitem)}>回复</a>
                                                                : <span style={{ marginLeft: "10px" }}>这位朋友设置了仅博主回复</span>} </span>)}>
                                                    {fitem.child_act.map(citem => (
                                                        <ExampleComment
                                                            name={<span>{(citem.ismaster ? <span className='master'>博主</span> : citem.name)}  回复  {(citem.fismaster ? <span className='master'>博主</span> : citem.fname)}  ：</span>}
                                                            context={citem.context}
                                                            headimg={`http://q4.qlogo.cn/g?b=qq&nk=${citem.email}&s=3`}
                                                            Reply={(
                                                                <span>{moment(new Date(citem.create_time * 1000)).format('YYYY年MM月DD日 HH:mm:ss')}
                                                                    {citem.canremark ? <a href="#reply-a" style={{ marginLeft: "10px" }}
                                                                        onClick={() => this.handleReply(fitem, citem)}>回复</a>
                                                                        : <span style={{ marginLeft: "10px" }}>这位朋友设置了仅博主回复</span>} </span>)}>

                                                        </ExampleComment>
                                                    ))}
                                                </ExampleComment>
                                            ))}
                                        </div>
                                    )
                                }

                                <div className='waiting'>-- 已经到底了 --</div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={7} xl={7} id='main-right'>
                        <Laside />
                    </Col>
                </Row>

            </div>
        )
    }
}

export default withRouter(about);