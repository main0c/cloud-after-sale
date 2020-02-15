<template>
	<view>
		<template v-if="showLoading">
			<view class="ly-loader ly-flex-center">
				<view class="ly-loader-inner">加载中...</view>
			</view>
		</template>
		<template v-else>
			<view v-if="isEmpty" class="ly-empty">{{emptyText}}</view>
			<view class="ly-tree" :class="{ 'ly-tree--highlight-current': highlightCurrent }" role="tree" name="LyTreeExpand">
				<ly-tree-node v-for="nodeId in childNodesId" 
					:nodeId="nodeId" 
					:render-after-expand="renderAfterExpand"
					:show-checkbox="showCheckbox" 
					:show-radio="showRadio" 
					:check-only-leaf="checkOnlyLeaf"
					:key="getNodeKey(nodeId)" 
					:indent="indent" 
					:icon-class="iconClass">
				</ly-tree-node>
			</view>
		</template>
	</view>
</template>

<script>
	import Vue from 'vue'
	import TreeStore from './model/tree-store.js';
	import {getNodeKey} from './tool/util.js';
	import LyTreeNode from './ly-tree-node.vue';

	export default {
		name: 'LyTree',
		componentName: 'LyTree',
		components: {
			LyTreeNode
		},
		data() {
			const elId = `ly_${Math.ceil(Math.random() * 10e5).toString(36)}`
			
			return {
				elId,
				store: {
					ready: false
				},
				currentNode: null,
				childNodesId: []
			};
		},
		props: {
			// 展示数据
			treeData: Array,
			
			// 自主控制loading加载，避免数据还没获取到的空档出现“暂无数据”字样
			ready: {
				type: Boolean,
				default: true
			},
			
			// 内容为空的时候展示的文本
			emptyText: {
				type: String,
				default: '暂无数据'
			},
			
			// 是否在第一次展开某个树节点后才渲染其子节点
			renderAfterExpand: {
				type: Boolean,
				default: true
			},
			
			// 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
			nodeKey: String,
			
			// 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
			checkStrictly: Boolean,
			
			// 是否默认展开所有节点
			defaultExpandAll: Boolean,
			
			// 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点
			expandOnClickNode: {
				type: Boolean,
				default: true
			},
			
			// 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点
			checkOnClickNode: Boolean,
			checkDescendants: {
				type: Boolean,
				default: false
			},
			
			// 展开子节点的时候是否自动展开父节点
			autoExpandParent: {
				type: Boolean,
				default: true
			},
			
			// 默认勾选的节点的 key 的数组
			defaultCheckedKeys: Array,
			
			// 默认展开的节点的 key 的数组
			defaultExpandedKeys: Array,
			
			// 当前选中的节点
			currentNodeKey: [String, Number],
			
			// 是否最后一层叶子节点才显示单选/多选框
			checkOnlyLeaf: {
				type: Boolean,
				default: false
			},
			
			// 节点是否可被选择
			showCheckbox: {
				type: Boolean,
				default: false
			},
			
			// 节点单选
			showRadio: {
				type: Boolean,
				default: false
			},
			
			// 配置选项
			props: {
				type: Object,
				default () {
					return {
						children: 'children', // 指定子树为节点对象的某个属性值
						label: 'label', // 指定节点标签为节点对象的某个属性值
						disabled: 'disabled' //	指定节点选择框是否禁用为节点对象的某个属性值
					};
				}
			},
			
			// 是否懒加载子节点，需与 load 方法结合使用
			lazy: {
				type: Boolean,
				default: false
			},
			
			// 是否高亮当前选中节点，默认值是 false
			highlightCurrent: Boolean,
			
			// 加载子树数据的方法，仅当 lazy 属性为true 时生效
			load: Function,
			
			// 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
			filterNodeMethod: Function,
			
			// 搜索时是否展示匹配项的所有子节点
			childVisibleForFilterNode: {
				type: Boolean,
				default: false
			},
			
			// 是否每次只打开一个同级树节点展开
			accordion: Boolean,
			
			// 相邻级节点间的水平缩进，单位为像素
			indent: {
				type: Number,
				default: 18
			},
			
			// 自定义树节点的展开图标
			iconClass: String,
			
			// 是否显示节点图标，如果配置为true,需要配置props中对应的图标属性名称
			showNodeIcon: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			children: {
				set(value) {
					this.treeData = value;
				},
				get() {
					return this.treeData;
				}
			},
			isEmpty() {
				const childNodes = this.store.root.getChildNodes(this.childNodesId);
				return !childNodes || childNodes.length === 0 || childNodes.every(({visible}) => !visible);
			},
			showLoading() {
				return !(this.store.ready && this.ready);
			}
		},
		watch: {
			defaultCheckedKeys(newVal) {
				this.store.setDefaultCheckedKey(newVal);
			},
			defaultExpandedKeys(newVal) {
				this.store.defaultExpandedKeys = newVal;
				this.store.setDefaultExpandedKeys(newVal);
			},
			treeData(newVal) {
				this.store.setData(newVal);
			},
			checkStrictly(newVal) {
				this.store.checkStrictly = newVal || this.checkOnlyLeaf;
			},
			'store.root.childNodesId'(newVal) {
				this.childNodesId = newVal;
			}
		},
		methods: {
			getStore() {
				return this.store;
			},
			
			/*
				说明：对树节点进行筛选操作
				参数：(value, data)
					1、接收一个任意类型的参数，该参数会在 filter-node-method 中作为第一个参数
					2、搜索指定节点的节点数据，不传代表搜索所有节点，假如要搜索A节点下面的数据，那么nodeData代表treeData中A节点的数据
			*/
			filter(value, data) {
				if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
				this.store.filter(value, data);
			},
			
			/*
				说明：获取节点的唯一标识符
				参数：(node)节点数据
			*/
			getNodeKey(nodeId) {
				let node = this.store.root.getChildNodes([nodeId])[0];
				return getNodeKey(this.nodeKey, node.data);
			},
			
			/*
				说明：获取节点路径
				参数：(data)节点数据
			*/
			getNodePath(data) {
				return this.store.getNodePath(data);
			},
			
			/*
				说明：若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组
				参数：(leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数
					1. 是否只是叶子节点，默认值为 false 
					2. 是否包含半选节点，默认值为 false
			*/
			getCheckedNodes(leafOnly, includeHalfChecked) {
				return this.store.getCheckedNodes(leafOnly, includeHalfChecked);
			},
			
			/*
				说明：若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
				参数：(leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false
			*/
			getCheckedKeys(leafOnly) {
				return this.store.getCheckedKeys(leafOnly);
			},
			
			/*
				说明：获取当前被选中节点的 data，若没有节点被选中则返回 null
			*/
			getCurrentNode() {
				const currentNode = this.store.getCurrentNode();
				return currentNode ? currentNode.data : null;
			},
			
			/*
				说明：获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null
			*/
			getCurrentKey() {
				if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey');
				const currentNode = this.getCurrentNode();
				return currentNode ? currentNode[this.nodeKey] : null;
			},
			
			/*
				说明：设置目前勾选的节点，使用此方法必须设置 node-key 属性
				参数：(nodes) 接收勾选节点数据的数组
			*/
			setCheckedNodes(nodes, leafOnly) {
				if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
				this.store.setCheckedNodes(nodes, leafOnly);
			},
			
			/*
				说明：通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
				参数：(keys, leafOnly) 接收两个参数
					1. 勾选节点的 key 的数组 
					2. boolean 类型的参数，若为 true 则仅设置叶子节点的选中状态，默认值为 false
			*/
			setCheckedKeys(keys, leafOnly) {
				if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedKeys');
				this.store.setCheckedKeys(keys, leafOnly);
			},
			
			/*
				说明：通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性
				参数：(key/data, checked, deep) 接收三个参数
					1. 勾选节点的 key 或者 data 
					2. boolean 类型，节点是否选中 
					3. boolean 类型，是否设置子节点 ，默认为 false
			*/
			setChecked(data, checked, deep) {
				this.store.setChecked(data, checked, deep);
			},
			
			/*
				说明：若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点所组成的数组
			*/
			getHalfCheckedNodes() {
				return this.store.getHalfCheckedNodes();
			},
			
			/*
				说明：若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点的 key 所组成的数组
			*/
			getHalfCheckedKeys() {
				return this.store.getHalfCheckedKeys();
			},
			
			/*
				说明：通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
				参数：(node) 待被选节点的 node
			*/
			setCurrentNode(node) {
				if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode');
				this.store.setUserCurrentNode(node);
			},
			
			/*
				说明：通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
				参数：(key) 待被选节点的 key，若为 null 则取消当前高亮的节点
			*/
			setCurrentKey(key) {
				if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentKey');
				this.store.setCurrentNodeKey(key);
			},
			
			/*
				说明：根据 data 或者 key 拿到 Tree 组件中的 node
				参数：(data) 要获得 node 的 key 或者 data
			*/
			getNode(data) {
				return this.store.getNode(data);
			},
			
			/*
				说明：删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性
				参数：(data) 要删除的节点的 data 或者 node
			*/
			remove(data) {
				this.store.remove(data);
			},
			
			/*
				说明：为 Tree 中的一个节点追加一个子节点
				参数：(data, parentNode) 接收两个参数
					1. 要追加的子节点的 data 
					2. 子节点的 parent 的 data、key 或者 node
			*/
			append(data, parentNode) {
				this.store.append(data, parentNode);
			},
			
			/*
				说明：为 Tree 的一个节点的前面增加一个节点
				参数：(data, refNode) 接收两个参数
					1. 要增加的节点的 data 
					2. 要增加的节点的后一个节点的 data、key 或者 node
			*/
			insertBefore(data, refNode) {
				this.store.insertBefore(data, refNode);
			},
			
			/*
				说明：为 Tree 的一个节点的后面增加一个节点
				参数：	(data, refNode) 接收两个参数
					1. 要增加的节点的 data 
					2. 要增加的节点的前一个节点的 data、key 或者 node
			*/
			insertAfter(data, refNode) {
				this.store.insertAfter(data, refNode);
			},
			
			/*
				说明：通过 keys 设置节点子元素，使用此方法必须设置 node-key 属性
				参数：(key, data) 接收两个参数
					1. 节点 key 
					2. 节点数据的数组
			*/
			updateKeyChildren(key, data) {
				if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild');
				this.store.updateChildren(key, data);
			}
		},
		created() {
			this.isTree = true;

			this.store = new TreeStore({
				key: this.nodeKey,
				data: this.treeData,
				lazy: this.lazy,
				props: this.props,
				load: this.load,
				currentNodeKey: this.currentNodeKey,
				checkStrictly: this.checkStrictly || this.checkOnlyLeaf,
				checkDescendants: this.checkDescendants,
				defaultCheckedKeys: this.defaultCheckedKeys,
				defaultExpandedKeys: this.defaultExpandedKeys,
				autoExpandParent: this.autoExpandParent,
				defaultExpandAll: this.defaultExpandAll,
				filterNodeMethod: this.filterNodeMethod,
				childVisibleForFilterNode: this.childVisibleForFilterNode,
				showNodeIcon: this.showNodeIcon
			});

			this.childNodesId = this.store.root.childNodesId;
		},
		beforeDestroy() {
			if (this.accordion) {
				uni.$off(`${this.elId}-tree-node-expand`)
			}
		}
	};
</script>
