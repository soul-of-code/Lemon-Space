import React from 'react';
import { Component } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import '../css/theme.css';
import '../css/firstTheme.css'
import '../css/secondTheme.css'
import '../css/thirdTheme.css'
import '../css/fourthTheme.css'
import '../css/animate.min.css'
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Blog from './Blog'
import '../index.css';
import { withRouter} from 'react-router-dom'
import { message } from 'antd';

var baseAxios = axios.create({
    baseURL: 'https://myblog.city:4000/blogView'
})

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogList: [],
            loading: true
        }
    }

    componentWillMount() {
        this.setState({loading: true });
        var {str} = this.props.match.params;

        baseAxios.get('/getBlogBySearch',{params:{tag:str}})
            .then(data => {
                console.log(data.data);
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                if(data.data.nullmsg){
                    this.setState({loading: false });
                    message.error('该类别没有文章，即将返回首页');
                    message.error('该类别没有文章，即将返回首页');
                    window.location.href = '/'
                    return
                }
                data.data.forEach(item => {
                    item.time = new Date(item.time*1000)
                })
                this.setState({ blogList: data.data, loading: false });
            })
    }

    componentWillReceiveProps(newProps){
        this.setState({loading: true });
        var {str} = newProps.match.params;

        baseAxios.get('/getBlogBySearch',{params:{tag:str}})
            .then(data => {
                console.log(data.data);
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                if(data.data.nullmsg){
                    this.setState({loading: false });
                    message.error('该类别没有文章，即将返回首页');
                    message.error('该类别没有文章，即将返回首页');
                    window.location.href = '/'
                    return
                }
                data.data.forEach(item => {
                    item.time = new Date(item.time*1000)
                })
                this.setState({ blogList: data.data, loading: false });
            })
    }

    render() {
        const { blogList, loading } = this.state;
        return (
            <div>
                {loading ? <LoadingOutlined /> : <Blog data={blogList} />}
            </div>
        )
    }
}

export default withRouter( home);