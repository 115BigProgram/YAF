import {PageHeader} from "antd"
import React,{Component} from "react"

class ToolBar extends Component{
    render(){
        return (
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title="Title"
                subTitle="This is a subtitle"
                ghost={false}
            />       
        )
    }
}

export default ToolBar