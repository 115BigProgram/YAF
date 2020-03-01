import React, { Component } from "react";
//import  * as texme from "texme"
import * as ReactMarkdown from "react-markdown";
import MathJax from "@matejmazur/react-mathjax";
import RemarkMathPlugin  from "remark-math";
import Codeblock from "./renderer/codeblock"
import markdown from "marked"

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
        math: () =>{
            return(
          <MathJax.Node  formula={props.value}/>
        )
          },
        inlineMath: () => {
          return(
            <MathJax.Node inline formula={props.value}/>
          )
        },
      }
    };

    let md=markdown.parse(this.props.source);
    return (
      <MathJax.Context input="tex">
        <ReactMarkdown {...newProps} />
      </MathJax.Context>
    )
  }
}

export default MarkdownRenderer