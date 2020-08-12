import React from 'react';
import { Component } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Blog from '../index'
import { withRouter} from 'react-router-dom'

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
        var {tag} = this.props.match.params;
        baseAxios.get('/getBlogByTag',{params:{tag:tag.split('tag')[1]}})
            .then(data => {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                if(data.data.nullmsg){
                    this.setState({loading: false });
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
        var {tag} = newProps.match.params;
        baseAxios.get('/getBlogByTag',{params:{tag:tag.split('tag')[1]}})
            .then(data => {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                if(data.data.nullmsg){
                    this.setState({loading: false });
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

export default withRouter(home);