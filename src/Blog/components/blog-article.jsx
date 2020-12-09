import React from 'react';
import { Row, Col } from 'antd'
import { FireFilled, BorderlessTableOutlined, LikeFilled } from '@ant-design/icons'
import {
    Link,
} from 'react-router-dom'
import LazyLoad from 'react-lazyload'


export default function BlogArticle (props) {
    const { data, hoster } = props;

    return (
        <LazyLoad height={400}>
            <div className='blog-item animated rollIn'>
                <div className="blog-header">
                    <div className="blog-title-wrap">
                        <div className="blog-title">
                            <strong>{data.type == 1 ? '【转载】' : '【原创】'}</strong> <Link to={`/blogassign/article${data.id}`}>{data.title}</Link>
                            <div className='blog-icon-list'>
                                <span className="blog-icon">
                                    <Link to={`/blog/tag${data.tag}`}>
                                        <BorderlessTableOutlined /> {data.tagname}
                                    </Link>
                                </span>
                                <span className="blog-icon">
                                    <Link to={`/blogassign/article${data.id}`}>
                                        <FireFilled /> {data.fire}
                                    </Link>
                                </span>
                                <span className="blog-icon">
                                    <Link to={`/blogassign/article${data.id}`}>
                                        <LikeFilled /> {data.remark}
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="blog-time">
                        <div className="blog-day">
                            <span className="blog-highlight">{data.time.getDate()}</span>日
                        </div>
                        <div className="blog-else">
                            <span className="blog-highlight">{data.time.getFullYear()}</span> 年-
                            <span className="blog-highlight"> {data.time.getMonth() + 1}</span> 月
                        </div>
                    </div>
                </div>
                <div className="blog-context">
                    <Row>
                        <Col xs={24} sm={24} md={14} lg={14} xl={14} className='text'>
                            <Link to={`/blogassign/article${data.id}`} style={{ color: 'inherit' }}>
                                <div className="text-title">文章简介：</div>
                                <div className="text-context">{data.brief}</div>
                                <div className="text-look"><Link to={`/blogassign/article${data.id}`}>阅读全文</Link></div>
                            </Link>
                        </Col>
                        <Col xs={24} sm={24} md={10} lg={10} xl={10} className='img'>
                            <Link to={`/blogassign/article${data.id}`}>
                                <img src={hoster + data.imgsrc} />
                            </Link>
                        </Col>
                    </Row>
                </div>
                <div className="blog-footer">www.myblog.city</div>
            </div>
        </LazyLoad>
    )

}