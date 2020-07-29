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
        baseAxios.get('/getBlog')
            .then(data => {
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