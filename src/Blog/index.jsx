import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd'
import { Helmet } from 'react-helmet'
import Laside from '../Component/Laside'
import '../publicCSS/allTheme.css';
import 'moment/locale/zh-cn';
import {
    withRouter,
    Link,
} from 'react-router-dom'
import LemonAxios from 'utils/lemon_axios'
import BlogArticle from './components/blog-article'

var baseAxios = new LemonAxios('/blogView');
var hoster = baseAxios.environment;

function Blog(props) {
    const [blogList, setBlogList] = useState([]);

    const { data, panelName } = props;

    useEffect(() => {
        //先清空后加入data，使动画重新生效
        setBlogList([])
        setBlogList(data)
    }, [data])
    return (
        <div className='center' >
            <Helmet>
                <title>博客 | Lemon-LimCong的个人博客</title>
            </Helmet>
            <div className="wrap-title">台阶是一层一层筑起的，目前的现实是未来理想的基础。 —— 徐特立</div>
            <Row justify="space-between">
                <Col xs={24} sm={24} md={24} lg={17} xl={17} id='main-left'>
                    {panelName && <div className="blog-panel"><Link to="/">{panelName}</Link></div>}
                    {blogList.map(data => (
                        <BlogArticle data={data} hoster={hoster} />
                    ))}
                    <div className='waiting'>-- 已经到底了 --</div>
                    <br />
                </Col>
                <Col xs={0} sm={0} md={0} lg={7} xl={7} id='main-right'>
                    <Laside />
                </Col>
            </Row>
        </div>
    )
}
export default withRouter(Blog);
