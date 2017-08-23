//COMPONENTS
import { UpArrow, DownArrow, RightArrow, SouthEastArrow, SouthWestArrow } from '../components'

//LIBRARIES
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

//UTILS & STORE
import { logout } from '../store'
import { removeEmptyChildren, gradient, drawBasicNode } from '../utils'

export const drawNode = (node, toggled, index, highlightIndex) => {
  return (
    <div className="basicnode">
      {drawBasicNode(node, toggled, index, highlightIndex)}
      {(node.next !== null) ? RightArrow(node.value) : null}
    </div>
  );
}

export const drawQueueNode = (node, toggled, index, highlightIndex) => {
  return (
    <div className="queue-container">
     { <div className="basicnode">
        {drawBasicNode(node, toggled, index, highlightIndex)}
      </div>}
      <div id="down-arrow">
        {(node.next !== null) ? DownArrow(node.value) : null}
      </div>
    </div >
  );
}

export const drawStackNode = (node, toggled, index, highlightIndex) => {
  return (
    <div className="queue-container">
      <div id="down-arrow">
        {(node.next !== null) ? DownArrow(node.value) : null}
      </div>
      <div className="basicnode">
        {drawBasicNode(node, toggled, index, highlightIndex)}
      </div>
    </div>
  );
}



// Used for demo?
export const drawBSTNode2 = (node) => {
  return (
    <div className="demonode">
      {(node.left !== null) ? SouthWestArrow(node.value) : null}
      <svg>
        {gradient()}
        <circle className={ node.value === 1  ? 'bstNode2' : node.value === 2 ? 'bstNode3' : node.value === 3 ? 'bstNode4': node.value === 4 ? 'bstNode5' : node.value === 5 ? 'bstNode6': node.value === 6 ? 'bstNode7': node.value === 7 ? 'bstNode8' : 'bstNode'} cx="25" cy="25" r="25"> </circle>
        <text x="50%" y="50%" textAnchor="middle" stroke="black " strokeWidth="2px" dy=".3em">{node.value}</text>
      </svg>
      {(node.right !== null) ? SouthEastArrow(node.value) : null}
    </div>
  )
}

// Used for dynamic tree
export const drawBSTNode3 = (node, nodeArr) => {
  if (!node.value) {
    return (
      <div className="basicnode">
        <svg>
          <circle className="circle-empty" fill="none" cx="25" cy="25" r="25"> </circle>
          <text x="50%" y="50%" textAnchor="middle" stroke="#51c5cf " strokeWidth="2px" dy=".3em"></text>
        </svg>
      </div>
    )
  }

  return (
    <div className="basicnode">
      {(node.left && nodeArr[node.left] && nodeArr[node.left].value) ? SouthWestArrow(node.value) : null}
      <svg>
      <linearGradient id="MyGradient0">
        <stop offset="5%" stopColor="white" />
        <stop offset="95%" stopColor="yellow" />
      </linearGradient>
        <circle className="circle1" fill="yellow" cx="25" cy="25" r="25"> </circle>
        <text x="50%" y="50%" textAnchor="middle" stroke="#51c5cf " strokeWidth="2px" dy=".3em">{node.value}</text>
      </svg>

      {(node.right && nodeArr[node.right] && nodeArr[node.right].value) ? SouthEastArrow(node.value) : null}
    </div>
  )
}


export const breadthFirstForEach = (node, preOrder) => {
  var queue = preOrder || [node];
  var collection = [];
  var tree;
  while (queue.length) {
    tree = queue.shift();
    let level = treeLevel(tree);
    if (node.value) collection.push([drawBSTNode2(tree), level]);

    if (tree.left) queue.push(tree.left)
    if (tree.right) queue.push(tree.right)
  }
  return collection;
}



function treeLevel(node) {
  var counter = 0;
  let parent = node.parent || null;
  while (parent !== null) {
    counter++;
    parent = parent.parent || null;
  }
  return counter;
}



// takes user bst and calls drawBST() to render the nodes in full tree form

export const userBST = (cleanbst) => {
  cleanbst = removeEmptyChildren(cleanbst);
  const collection = [];

  cleanbst.map(node => {
    let parentIdx = node.parent;
    if (node.parent === null) parentIdx = "root";
    collection.push([drawBSTNode3(node), parentIdx]);
  })

  return collection;
}


// takes user bst and calls drawBST() to render the nodes in full tree form
export const drawBSTnodes = (cleanbst) => {

  cleanbst = removeEmptyChildren(cleanbst);
  const collection = [];

  cleanbst.map(node => {
    let parentIdx = node.parent;
    if (node.parent === null) parentIdx = "root";
    collection.push([drawBSTNode3(node, cleanbst), parentIdx]);
  })

  return collection;
}

const mapState = (state) => {
  return {
    toggled: state.node.toggledStatus
  }
}

export default connect(mapState, null)(drawNode);
