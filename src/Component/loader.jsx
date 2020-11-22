import { Spin } from "antd"
import React from "react"
import { LoadingOutlined } from '@ant-design/icons'

const spinIcon = <LoadingOutlined style={{ fontSize: 26 }} spin />;

export function LemonLoading(props) {
    const { loading, children } = props;
    return (
        <Spin
            tip="急速加载中……"
            style={{ color: "#f1c000" }}
            indicator={spinIcon}
            spinning={loading}
        >
            {children}
        </Spin>
    )
}