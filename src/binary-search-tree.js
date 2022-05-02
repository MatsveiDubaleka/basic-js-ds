const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this.rootNode = null;
	}
	root() {
		return this.rootNode;
	}
	add(data) {
		let newNode = new Node(data);
		if (this.rootNode === null) {
			this.rootNode = newNode;
		} else {
			this.addNode(this.rootNode, newNode);
		}
	}
	addNode(node, newNode) {
		if (newNode.data < node.data) {
			if (node.left === null) {
				node.left = newNode;
			} else {
				this.addNode(node.left, newNode);
			}
		} else {
			if (node.right === null) {
				node.right = newNode;
			} else {
				this.addNode(node.right, newNode);
			}
		}
	}
	has(data) {
		let foundNode = this.findNode(this.rootNode, data);
		return foundNode ? true : false;
	}
	find(data) {
		let foundNode = this.findNode(this.rootNode, data);
		return foundNode ? foundNode : null;
	}
	findNode(node = this.rootNode, data) {
		if (node === null) {
			return null;
		} else if (data < node.data) {
			return this.findNode(node.left, data);
		} else if (data > node.data) {
			return this.findNode(node.right, data);
		} else {
			return node;
		}
	}
	remove(data) {
		this.rootNode = this.removeNode(this.rootNode, data);
	}
	removeNode(node, data) {
		if (node === null) {
			return null;
		} else if (data < node.data) {
			node.left = this.removeNode(node.left, data);
			return node;
		} else if (data > node.data) {
			node.right = this.removeNode(node.right, data);
			return node;
		} else {
			if (node.left === null && node.right === null) {
				node = null;
				return node;
			}
			if (node.left === null) {
				node = node.right;
				return node;
			} else if (node.right === null) {
				node = node.left;
				return node;
			}
			let newNode = this.findMinNode(node.right);
			node.data = newNode.data;
			node.right = this.removeNode(node.right, newNode.data);
			return node;
		}
	}
	min() {
		const node = this.findMinNode(this.rootNode);
		return node ? node.data : null;
	}
	findMinNode(node = this.rootNode) {
		if (node === null) {
			return null;
		} else if (node.left === null) {
			return node;
		} else {
			return this.findMinNode(node.left);
		}
	}
	max() {
		const node = this.findMaxNode();
		return node ? node.data : null;
	}
	findMaxNode(node = this.rootNode) {
		if (node === null) {
			return null;
		} else if (node.right === null) {
			return node;
		} else {
			return this.findMaxNode(node.right);
		}
	}
}

module.exports = {
	BinarySearchTree,
};
