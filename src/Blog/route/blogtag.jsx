import React from 'react';
import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Blog from '../index'
import { withRouter } from 'react-router-dom'

var baseAxios = axios.create({
    baseURL: 'https://myblog.city:4000/blogView'
})

function Home(props) {
    const [state, setState] = useState({
        blogList: [],
        loading: true,
    })
    const setLoading = (loading) => setState(v => ({ ...v, loading }))

    useEffect(() => {
        setLoading(true)
        const { tag } = props.match.params;
        baseAxios.get('/getBlogByTag', { params: { tag: tag.split('tag')[1] } })
            .then(data => {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                if (data.data.nullmsg) {
                    setLoading(false)
                    window.location.href = '/'
                    return
                }
                data.data.forEach(item => {
                    item.time = new Date(item.time * 1000)
                })
                setState({ blogList: data.data, loading: false });
            })
    }, [props.location.pathname])

    const { blogList, loading } = state;
    return (
        <div>
            {loading ? <LoadingOutlined /> : <Blog data={blogList} panelName="回到首页" />}
        </div>
    )
}

export default withRouter(Home);