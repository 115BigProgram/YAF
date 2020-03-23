export class TreeNode {
    constructor(name, uid) {
        this.name = name
        this.uid = uid
        this.children = []

        this.setChildren = this.setChildren.bind(this)
        this.addChild = this.addChild.bind(this)
        this.findNode = this.findNode.bind(this)
    }

    hasChildren() {
        return this.children === undefined || this.children.length == 0
    }

    setChildren(children) {
        this.children = this.children.concat(children)
    }

    addChild(child) {
        this.children.push(child)
    }

    findNode(uid) {
        console.log("begin find")
        if (this.children === undefined || this.children.length == 0) {
            console.log(this.children.length)
            if (this.uid == uid) {
                return this
            } else {
                return null
            }
        }

        let queue = []
        queue = queue.concat(this.children)

        for (let i = 0; i < queue.length; i++) {
            let cur = queue[i]
            console.log('cur', cur)
            if (cur.uid == uid) {
                return cur
            }

            if (cur.children !== undefined && cur.children.length != 0) {
                queue = queue.concat(cur.children)
            }
            console.log('queue', queue)
        }

        return null
    }
}

export function getTreeDepth(root) {
    let depth = 0
    let queue = {
        A: [],
        B: [],
    }

    let curQueue = "A"
    queue[curQueue].push(root)

    for (; queue[curQueue].length != 0;) {
        depth++
        let nextQueue = curQueue == "A" ? "B" : "A"

        queue[curQueue].forEach(node => {
            if (node.children !== undefined) {
                queue[nextQueue] = queue[nextQueue].concat(node.children)
            }
        })

        queue[curQueue] = []
        curQueue = nextQueue
    }

    return depth

}

export function getTreeWidth(root) {
    if (root.children === undefined || root.children.length == 0) {
        return 1
    }

    let childrenWidth = 0
    root.children.forEach(node => {
        childrenWidth += getTreeWidth(node)
    })

    return childrenWidth
}

export class Graph {
    constructor(node) {
        node.id=node.id.toString()
        this.first=true
        this.hashNodes = {}
        this.hashNodes[node.id]=node
        this.links = [{source:node.id,target:node.id}]

        this.addLink=this.addLink.bind(this)
        this.addNode=this.addNode.bind(this)
        this.getLinks=this.getLinks.bind(this)
        this.getNodes=this.getNodes.bind(this)
        this.getNode=this.getNode.bind(this)
    }

    getNode(idx){
        return this.hashNodes[idx]
    }

    addLink(source, target) {
        source=source.toString()
        target=target.toString()
        if(this.first){
            this.links=[]
            this.first=false
        }

        this.links.push({ source, target })
    }

    addNode(node) {
        node.id=node.id.toString()
        this.hashNodes[node.id] = node
    }

    getLinks() {
        return this.links
    }

    getNodes() {
        let hashNodes=this.hashNodes
        let nodes=[]
        for(let key in hashNodes){
            nodes.push(hashNodes[key])
        }

        return nodes
    }
}