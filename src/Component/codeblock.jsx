import React from 'react';
import { Component } from 'react'
import ReactHighLight from 'react-highlight'
import 'highlight.js/styles/atelier-sulphurpool-light.css'

class codeblock extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <ReactHighLight className='javascript'>
                {this.props.value}
            </ReactHighLight>
        )
    }
}
export default codeblock;