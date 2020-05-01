import {
	markNodeData,
	NODE_KEY
} from '../tool/util';

const objectAssign = function(target) {
	for (let i = 1, j = arguments.length; i < j; i++) {
		let source = arguments[i] || {};
		for (let prop in source) {
			if (source.hasOwnProperty(prop)) {
				let value = source[prop];
				if (value !== undefined) {
					target[prop] = value;
				}
			}
		}
	}

	return target;
};

// TODO: use native Array.find, Array.findIndex when IE support is dropped
const arrayFindIndex = function(arr, pred) {
	for (let i = 0; i !== arr.length; ++i) {
		if (pred(arr[i])) {
			return i;
		}
	}
	return -1;
};

const getChildState = function(node) {
	let all = true;
	let none = true;
	let allWithoutDisable = true;
	for (let i = 0, j = node.length; i < j; i++) {
		const n = node[i];
		if (n.checked !== true || n.indeterminate) {
			all = false;
			if (!n.disabled) {
				allWithoutDisable = false;
			}
		}
		if (n.checked !== false || n.indeterminate) {
			none = false;
		}
	}

	return {
		all,
		none,
		allWithoutDisable,
		half: !all && !none
	};
};

const reInitChecked = function(node) {
	if (!node || node.childNodesId.length === 0) return;

	let childNodes = node.getChildNodes(node.childNodesId);
	const {
		all,
		none,
		half
	} = getChildState(childNodes);
	if (all) {
		node.checked = true;
		node.indeterminate = false;
	} else if (half) {
		node.checked = false;
		node.indeterminate = true;
	} else if (none) {
		node.checked = false;
		node.indeterminate = false;
	}

	let parent = node.getParent(node.parentId);
	if (!parent || parent.level === 0) return;

	if (!node.store().checkStrictly) {
		reInitChecked(parent);
	}
};

const getPropertyFromData = function(node, prop) {
	const props = node.store().props;
	const data = node.data || {};
	const config = props[prop];

	if (typeof config === 'function') {
		return config(data, node);
	} else if (typeof config === 'string') {
		return data[config];
	} else if (typeof config === 'undefined') {
		const dataProp = data[prop];
		return dataProp === undefined ? '' : dataProp;
	}
};

const getStore = function(store) {
	let thisStore = store;
	
	return function() {
		return thisStore;
	}
}

let nodeIdSeed = 0;

export default class Node {
	constructor(options) {
		this.id = nodeIdSeed++;
		this.text = null;
		this.checked = false;
		this.indeterminate = false;
		this.data = null;
		this.expanded = false;
		this.parentId = null;
		this.visible = true;
		this.isCurrent = false;

		for (let name in options) {
			if (options.hasOwnProperty(name)) {
				if (name === 'store') {
					this.store = getStore(options[name]);
				} else {
					this[name] = options[name];
				}
			}
		}

		// internal
		this.level = 0;
		this.loaded = false;
		this.childNodesId = [];
		this.loading = false;
		this.label = getPropertyFromData(this, 'label');
		this.key = this.data ? this.data[this.store().key] : null;
		this.disabled = getPropertyFromData(this, 'disabled');
		this.nextSibling = null;
		this.previousSibling = null;

		if (this.parentId !== null) {
			let parent = this.getParent(this.parentId);
			//由于这里做了修改，默认第一个对象不会被注册到nodesMap中，所以找不到parent会报错，所以默认parent的level是0
			if (!parent) {
				parent = {
					level: 0
				}
			} else {
				let parentChildNodes = parent.getChildNodes(parent.childNodesId);
				const index = parent.childNodesId.indexOf(this.key);
				this.nextSibling = index > -1 ? parentChildNodes[index + 1] : null;
				this.previousSibling = index > 0 ? parentChildNodes[index - 1] : null;
			}
			this.level = parent.level + 1;
		}

		if (!this.store()) {
			throw new Error('[Node]store is required!');
		}
		
		const props = this.store().props;
		
		if (this.store().showNodeIcon && props && typeof props.icon !== 'undefined') {
			this.icon = getPropertyFromData(this, props.icon);
		}
		
		this.store().registerNode(this);
		
		if (props && typeof props.isLeaf !== 'undefined') {
			const isLeaf = getPropertyFromData(this, 'isLeaf');
			if (typeof isLeaf === 'boolean') {
				this.isLeafByUser = isLeaf;
			}
		}

		if (this.store().lazy !== true && this.data) {
			this.setData(this.data);

			if (this.store().defaultExpandAll) {
				this.expanded = true;
			}
		} else if (this.level > 0 && this.store().lazy && this.store().defaultExpandAll) {
			this.expand();
		}
		
		if (!Array.isArray(this.data)) {
			markNodeData(this, this.data);
		}
		
		if (!this.data) return;
		
		const defaultExpandedKeys = this.store().defaultExpandedKeys;
		const key = this.store().key;
		if (key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
			this.expand(null, this.store().autoExpandparent);
		}

		if (key && this.store().currentNodeKey !== undefined && this.key === this.store().currentNodeKey) {
			this.store().currentNode = this;
			this.store().currentNode.isCurrent = true;
		}

		if (this.store().lazy) {
			this.store()._initDefaultCheckedNode(this);
		}

		this.updateLeafState();
	}

	setData(data) {

		if (!Array.isArray(data)) {
			markNodeData(this, data);
		}

		this.data = data;
		this.childNodesId = [];

		let children;
		if (this.level === 0 && Array.isArray(this.data)) {
			children = this.data;
		} else {
			children = getPropertyFromData(this, 'children') || [];
		}

		for (let i = 0, j = children.length; i < j; i++) {
			this.insertChild({
				data: children[i]
			});
		}
	}

	contains(target, deep = true) {
		const walk = function(parent) {
			const children = parent.getChildNodes(parent.childNodesId) || [];
			let result = false;
			for (let i = 0, j = children.length; i < j; i++) {
				const child = children[i];
				if (child === target || (deep && walk(child))) {
					result = true;
					break;
				}
			}
			return result;
		};

		return walk(this);
	}

	remove() {
		if (this.parentId !== null) {
			const parent = this.getParent(this.parentId);
			parent.removeChild(this);
		}
	}

	insertChild(child, index, batch) {
		if (!child) throw new Error('insertChild error: child is required.');

		if (!(child instanceof Node)) {
			if (!batch) {
				const children = this.getChildren(true);
				if (children.indexOf(child.data) === -1) {
					if (typeof index === 'undefined' || index < 0) {
						children.push(child.data);
					} else {
						children.splice(index, 0, child.data);
					}
				}
			}
			objectAssign(child, {
				parentId: this.key || '',
				store: this.store()
			});
			child = new Node(child);
		}

		child.level = this.level + 1;

		if (typeof index === 'undefined' || index < 0) {
			this.childNodesId.push(child.key);
		} else {
			this.childNodesId.splice(index, 0, child.key);
		}

		this.updateLeafState();
	}

	insertBefore(child, ref) {
		let index;
		if (ref) {
			index = this.childNodesId.indexOf(ref.id);
		}
		this.insertChild(child, index);
	}

	insertAfter(child, ref) {
		let index;
		if (ref) {
			index = this.childNodesId.indexOf(ref.id);
			if (index !== -1) index += 1;
		}
		this.insertChild(child, index);
	}

	removeChild(child) {
		const children = this.getChildren() || [];
		const dataIndex = children.indexOf(child.data);
		if (dataIndex > -1) {
			children.splice(dataIndex, 1);
		}

		const index = this.childNodesId.indexOf(child.id);

		if (index > -1) {
			this.store() && this.store().deregisterNode(child);
			child.parentId = null;
			this.childNodesId.splice(index, 1);
		}

		this.updateLeafState();
	}

	removeChildByData(data) {
		let targetNode = null;

		for (let i = 0; i < this.childNodesId.length; i++) {
			let node = this.getChildNodes(this.childNodesId);
			if (node[i].data === data) {
				targetNode = node[i];
				break;
			}
		}

		if (targetNode) {
			this.removeChild(targetNode);
		}
	}

	//为了避免APP端parent嵌套结构导致报错，这里parent需要从nodesMap中获取
	getParent(parentId) {
		if (!parentId) return null;
		return this.store().nodesMap[parentId];
	}

	//为了避免APP端childNodes嵌套结构导致报错，这里childNodes需要从nodesMap中获取
	getChildNodes(childNodesId) {
		let childNodes = [];
		if (childNodesId.length === 0) return childNodes;
		childNodesId.forEach((key) => {
			childNodes.push(this.store().nodesMap[key]);
		})
		return childNodes;
	}

	expand(callback, expandparent) {
		const done = () => {
			if (expandparent) {
				let parent = this.getParent(this.parentId);
				while (parent.level > 0) {
					parent.expanded = true;
					parent = this.getParent(parent.parentId);
				}
			}
			this.expanded = true;
			if (callback) callback();
		};

		if (this.shouldLoadData()) {
			this.loadData((data) => {
				if (Array.isArray(data)) {
					if (this.checked) {
						this.setChecked(true, true);
					} else if (!this.store().checkStrictly) {
						reInitChecked(this);
					}
					done();
				}
			});
		} else {
			done();
		}
	}

	doCreateChildren(array, defaultProps = {}) {
		array.forEach((item) => {
			this.insertChild(objectAssign({
				data: item
			}, defaultProps), undefined, true);
		});
	}

	collapse() {
		this.expanded = false;
	}

	shouldLoadData() {
		return this.store().lazy === true && this.store().load && !this.loaded;
	}

	updateLeafState() {
		if (this.store().lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
			this.isLeaf = this.isLeafByUser;
			return;
		}
		const childNodesId = this.childNodesId;
		if (!this.store().lazy || (this.store().lazy === true && this.loaded === true)) {
			this.isLeaf = !childNodesId || childNodesId.length === 0;
			return;
		}
		this.isLeaf = false;
	}

	setChecked(value, deep, recursion, passValue) {
		this.indeterminate = value === 'half';
		this.checked = value === true;

		if (this.store().checkStrictly) return;

		if (!(this.shouldLoadData() && !this.store().checkDescendants)) {
			let childNodes = this.getChildNodes(this.childNodesId);
			let {
				all,
				allWithoutDisable
			} = getChildState(childNodes);

			if (!this.isLeaf && (!all && allWithoutDisable)) {
				this.checked = false;
				value = false;
			}

			const handleDescendants = () => {
				if (deep) {
					let childNodes = this.getChildNodes(this.childNodesId)
					for (let i = 0, j = childNodes.length; i < j; i++) {
						const child = childNodes[i];
						passValue = passValue || value !== false;
						const isCheck = child.disabled ? child.checked : passValue;
						child.setChecked(isCheck, deep, true, passValue);
					}
					const {
						half,
						all
					} = getChildState(childNodes);
					if (!all) {
						this.checked = all;
						this.indeterminate = half;
					}
				}
			};

			if (this.shouldLoadData()) {
				this.loadData(() => {
					handleDescendants();
					reInitChecked(this);
				}, {
					checked: value !== false
				});
				return;
			} else {
				handleDescendants();
			}
		}

		if (!this.parentId) return;

		let parent = this.getParent(this.parentId);
		if (parent && parent.level === 0) return;

		if (!recursion) {
			reInitChecked(parent);
		}
	}

	setRadioChecked(value) {
		const allNodes = this.store()._getAllNodes().sort((a, b) => b.level - a.level);
		allNodes.forEach(node => node.setChecked(false, false));
		this.checked = value === true;
	}

	getChildren(forceInit = false) {
		if (this.level === 0) return this.data;
		const data = this.data;
		if (!data) return null;

		const props = this.store().props;
		let children = 'children';
		if (props) {
			children = props.children || 'children';
		}

		if (data[children] === undefined) {
			data[children] = null;
		}

		if (forceInit && !data[children]) {
			data[children] = [];
		}

		return data[children];
	}

	updateChildren() {
		let childNodes = this.getChildNodes(this.childNodesId);
		const newData = this.getChildren() || [];
		const oldData = childNodes.map((node) => node.data);

		const newDataMap = {};
		const newNodes = [];

		newData.forEach((item, index) => {
			const key = item[NODE_KEY];
			const isNodeExists = !!key && arrayFindIndex(oldData, data => data[NODE_KEY] === key) >= 0;
			if (isNodeExists) {
				newDataMap[key] = {
					index,
					data: item
				};
			} else {
				newNodes.push({
					index,
					data: item
				});
			}
		});

		if (!this.store().lazy) {
			oldData.forEach((item) => {
				if (!newDataMap[item[NODE_KEY]]) this.removeChildByData(item);
			});
		}

		newNodes.forEach(({
			index,
			data
		}) => {
			this.insertChild({
				data
			}, index);
		});

		this.updateLeafState();
	}

	loadData(callback, defaultProps = {}) {
		if (this.store().lazy === true && this.store().load && !this.loaded && (!this.loading || Object.keys(defaultProps).length)) {
			this.loading = true;

			const resolve = (children) => {
				this.loaded = true;
				this.loading = false;
				this.childNodesId = [];

				this.doCreateChildren(children, defaultProps);

				this.updateLeafState();
				if (callback) {
					callback.call(this, children);
				}
			};

			this.store().load(this, resolve);
		} else {
			if (callback) {
				callback.call(this);
			}
		}
	}
}
