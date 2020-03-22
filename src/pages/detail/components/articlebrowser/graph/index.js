import { Graph } from "react-d3-graph";
import React from "react"
import { actionCreators } from '../../../store'
import store from "../../../../../store/index"

// graph payload (with minimalist structure)
const data = {
    nodes: [{ id: "Harry", name: "1" }, { id: "Sally", name: "2" }, { id: "Alice", name: "3" }],
    links: [{source:"Harry",target:"Harry"}],
    focusedNodeId:"Harry"
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const labelProperty = (node) => {
    return node.name
}

const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: "lightgreen",
        size: 400,
        highlightStrokeColor: "blue",
        labelProperty: labelProperty
    },
    link: {
        highlightColor: "lightblue",
    },
    directed: true,
    focusZoom: 1,
};

const onClickGraph = function () {
    window.alert(`Clicked the graph background`);
};

const onClickNode = function (nodeId) {
    store.dispatch(actionCreators.onClickNode(nodeId))
};

const onDoubleClickNode = function (nodeId) {
    window.alert(`Double clicked node ${nodeId}`);
};

const onRightClickNode = function (event, nodeId) {
    window.alert(`Right clicked node ${nodeId}`);
};

const onMouseOverNode = function (nodeId) {
    window.alert(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function (nodeId) {
    window.alert(`Mouse out node ${nodeId}`);
};

const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
};

const onRightClickLink = function (event, source, target) {
    window.alert(`Right clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function (source, target) {
    window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function (source, target) {
    window.alert(`Mouse out link between ${source} and ${target}`);
};

const onNodePositionChange = function (nodeId, x, y) {
    window.alert(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
};


export default ({graph}) => {
    return (
        <Graph
            id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
            data={graph}
            config={myConfig}
            onClickNode={onClickNode}
        />
    )
}