import React, { Component } from "react";
//import  * as texme from "texme"
import * as ReactMarkdown from "react-markdown";
import MathJax from "react-mathjax2";
import RemarkMathPlugin  from "remark-math";
import Codeblock from "./renderer/codeblock"
import {fromJS} from "immutable"
//import markdown from "marked"

class MarkdownRenderer extends Component{
  render(){
    return (
      <div>
      </div>
    )
  }

  render() {
    let props = this.props
    const newProps = {
      ...props,
      plugins: [
        RemarkMathPlugin,
      ],
      renderers: {
        ...props.renderers,
        code: Codeblock,
        mutemath: (p) =>{
          return(
            <MathJax.Node inline >{p.value}</MathJax.Node>
          )
        },
        inlineMath: (p) => {
          return(
            <MathJax.Node inline >{p.value}</MathJax.Node>
          )
        },
      }
    };

    return (
      <MathJax.Context input="tex">
        <ReactMarkdown {...newProps} />
      </MathJax.Context>
    )
  }
}

export default MarkdownRenderer