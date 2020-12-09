import React, { useState, useEffect } from 'react';
import 'moment/locale/zh-cn';
import Blog from '../index'
import { withRouter } from 'react-router-dom'
import { LemonLoading } from '../../Component/loader'
import LemonAxios from 'utils/lemon_axios'

var baseAxios = new LemonAxios('/blogView');

function Home() {
    const [state, setState] = useState({
        blogList: [],
        loading: true
    })
    const setLoading = (loading) => {
        setState(v => ({
            ...v,
            loading
        }))
    }

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setLoading(true);

        baseAxios.get('/getBlog')
            .then((data) => {
                const { data: Data } = data;
                Data.forEach(item => {
                    item.time = new Date(item.time * 1000)
                })
                setState({ blogList: Data, loading: false });
            })
    }, [])

    const { blogList, loading } = state;
    return (
        <LemonLoading loading={loading}>
            <Blog data={blogList} />
        </LemonLoading>
    )
}


export default withRouter(Home);