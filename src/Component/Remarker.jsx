import React from 'react';
import { Comment, Avatar } from 'antd'
import '../publicCSS/allTheme.css';

function Remarker(props) {
    return (
        <Comment
            className="animated fadeInRight"
            actions={[<span key="comment-nested-reply-to">{props.Reply}</span>]}
            author={<span>{props.name}</span>}
            avatar={
                <Avatar
                    src={props.headimg}
                    alt={props.name}
                />
            }
            content={
                <p>
                    {props.context}
                </p>
            }
        >
            {props.children}
        </Comment>
    );
}

export default Remarker