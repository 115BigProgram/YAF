import React from 'react';
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { LinkHorizontal } from '@vx/shape';
import { hierarchy } from 'd3-hierarchy';
import { LinearGradient } from '@vx/gradient';
import { getTreeDepth, getTreeWidth } from "../../../../detail/utils"
import { Component } from 'react';
import { actionCreators } from '../../../store'
import store from "../../../../../store/index"

const peach = '#fd9b93';
const pink = '#fe6e9e';
const blue = '#03c0dc';
const green = '#26deb0';
const plum = '#71248e';
const lightpurple = '#374469';
const white = '#ffffff';
const bg = '#272b4d';

const tree = {
    "name": "T",
    "children": [{
        "name": "A",
        "children": [
            { "name": "A1" },
            { "name": "A2" },
            { "name": "A3" },
            {
                "name": "C",
                "children": [{
                    "name": "C1",
                }, {
                    "name": "D",
                    "children": [{
                        "name": "D1"
                    }, {
                        "name": "D2"
                    }, {
                        "name": "D3"
                    }]
                }]
            },
        ]
    },
    { "name": "Z" },
    {
        "name": "B",
        "children": [
            { "name": "B1" },
            { "name": "B2" },
            { "name": "B3" },
        ]
    },
    ],
};

function Node({ node }) {
    const width = 80;
    const height = 40;
    const centerX = -width / 2;
    const centerY = -height / 2;
    const isRoot = node.depth === 0;
    const isParent = !!node.children;

    if (isRoot) return <RootNode node={node} />;
    if (isParent) return <ParentNode node={node} />;

    return (
        <Group top={node.x} left={node.y}>
            <rect
                height={height}
                width={width}
                y={centerY}
                x={centerX}
                fill={bg}
                stroke={green}
                strokeWidth={1}
                strokeDasharray={'2,2'}
                strokeOpacity={0.6}
                rx={10}
                onClick={() => {
                    store.dispatch(actionCreators.onClickNode(node.data))
                }}
            />
            <text
                dy={'.66em'}
                fontSize={9}
                fontFamily="Arial"
                textAnchor={'middle'}
                fill={green}
                style={{ pointerEvents: 'none' }}
            >
                {node.data.name}
            </text>
        </Group>
    );
}

function RootNode({ node }) {
    return (
        <Group top={node.x} left={node.y}>
            <circle r={15} fill="url('#lg')"
                onClick={() => {
                    store.dispatch(actionCreators.onClickNode(node.data))
                }}
            />
            <text
                dy={'.33em'}
                fontSize={15}
                fontFamily="Arial"
                textAnchor={'middle'}
                style={{ pointerEvents: 'none' }}
                fill={plum}

            >
                {node.data.name}
            </text>
        </Group>
    );
}

function ParentNode({ node }) {
    const width = 80;
    const height = 40;
    const centerX = -width / 2;
    const centerY = -height / 2;

    return (
        <Group top={node.x} left={node.y}>
            <rect
                height={height}
                width={width}
                y={centerY}
                x={centerX}
                fill={bg}
                stroke={blue}
                strokeWidth={1}
                onClick={() => {
                    store.dispatch(actionCreators.onClickNode(node.data))
                }}
            />
            <text
                dy={'.66em'}
                fontSize={9}
                fontFamily="Arial"
                textAnchor={'middle'}
                style={{ pointerEvents: 'none' }}
                fill={white}
            >
                {node.data.name}
            </text>
        </Group>
    );
}

class TreeGraph extends Component {
    render() {
        return (
            <div></div>
        )
    }
}

export default ({
    root = tree,
    margin = {
        top: 10,
        left: 30,
        right: 50,
        bottom: 10
    }
}) => {
    //graph width is tree's heigth
    const width = getTreeDepth(root) * 200
    //graph heigth is tree's width
    const height = getTreeWidth(root) * (40+5)

    const data = hierarchy(root);
    const yMax = height - margin.top - margin.bottom;
    const xMax = width - margin.left - margin.right;



    return (
        <svg width={width} height={height}>
            <LinearGradient id="lg" from={peach} to={pink} />
            <rect width={width} height={height} fill={"#F8F8F8"} />
            <Tree root={data} size={[yMax, xMax]}>
                {tree => {
                    return (
                        <Group top={margin.top} left={margin.left}>
                            {tree.links().map((link, i) => {
                                return (
                                    <LinkHorizontal
                                        key={`link-${i}`}
                                        data={link}
                                        stroke={lightpurple}
                                        strokeWidth="1"
                                        fill="none"
                                    />
                                );
                            })}
                            {tree.descendants().map((node, i) => {
                                return <Node key={`node-${i}`} node={node} />;
                            })}
                        </Group>
                    );
                }}
            </Tree>
        </svg>
    );
};