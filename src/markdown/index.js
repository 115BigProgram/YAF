import React, { Component } from "react";
//import  * as texme from "texme"
import * as ReactMarkdown from "react-markdown";
import MathJax from "@matejmazur/react-mathjax";
import RemarkMathPlugin  from "remark-math";

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
        math: () =>{
          console.log("Block Math Value", props)
            return(
          <MathJax.Node  formula={props.value}/>
        )
          },
        inlineMath: () => {
          console.log("Inline Math Value", props)
          return(
            <MathJax.Node inline formula={props.value}/>
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