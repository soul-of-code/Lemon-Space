import React, { useState, useEffect } from 'react';
import { LemonLoading } from '../../Component/loader'
import 'moment/locale/zh-cn';
import Blog from '../index'
import { withRouter } from 'react-router-dom'
import { message } from 'antd';
import LemonAxios from 'utils/lemon_axios'

var baseAxios = new LemonAxios('/blogView');

function Home(props) {
    const [state, setState] = useState({
        blogList: [],
        loading: true,
    })
    const setLoading = (loading) => setState(v => ({ ...v, loading }))

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setLoading(true);
        var { str } = props.match.params;
        baseAxios.get('/getBlogBySearch', { tag: str })
            .then(data => {
                const { data: Data } = data;
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                if (Data.nullmsg) {
                    setLoading(false)
                    message.error('该类别没有文章，即将返回首页');
                    message.error('该类别没有文章，即将返回首页');
                    window.location.href = '/'
                    return
                }
                Data.forEach(item => {
                    item.time = new Date(item.time * 1000)
                })
                setState({ blogList: Data, loading: false });
            })
    }, [props.location.pathname])

    const { blogList, loading } = state;
    return (
        <LemonLoading loading={loading}>
            <Blog data={blogList} panelName="回到首页" />
        </LemonLoading>
    )
}

export default withRouter(Home);