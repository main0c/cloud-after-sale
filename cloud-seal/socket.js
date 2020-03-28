import socket from '@/components/plus-websocket/index.js'

//检测socket连接是否打开
var socketOpen = false;
//记录未发送的消息
var socketMsgQueue = [];

var socketTask = null;

var webSocketPath = 'ws://192.168.1.104:8081/'

var connect = function() {
	var userToken = uni.getStorageSync("userToken") || '';
	//用户信息不为空时创建连接
	if(userToken != '' && userToken != 'undefined' && userToken != null){
		//创建连接
		socketTask = uni.connectSocket({
			url: webSocketPath + 'phonetalkwebsocket/' + userToken,
			data() {
				return {
					x: ''
				};
			},
			header: {
				'content-type': 'application/json'
			},
			success: function(res){
				if(res.errMsg == 'connectSocket:ok'){
					console.log('请求成功')
				}
			},
			fail: function(res){
				console.log(res)
			},
			complete: ()=> {}
		});
		
		//监听WebSocket连接打开事件
		socketTask.onOpen(function (res) {
			socketOpen = true;
			//注意这里有时序问题，
			//如果 uni.connectSocket 还没回调 uni.onSocketOpen，而先调用 uni.closeSocket，那么就做不到关闭 WebSocket 的目的。
			//必须在 WebSocket 打开期间调用 uni.closeSocket 才能关闭。
			console.log('WebSocket连接已打开！');
			// uni.closeSocket();
		})
		
		//监听WebSocket接收到服务器的消息事件
		socketTask.onMessage(function(res){
			console.log('收到服务器内容：' + res.data);
			plus.push.createMessage( "测试消息" );
		})
		
		//监听WebSocket错误
		socketTask.onError(function(res){
			console.log('WebSocket连接打开失败，请检查！');
		})
		
		socketTask.onClose(function(res){
			console.log('WebSocket 已关闭！');
		})
	}
	
}

//发送消息
function sendSocketMessage(msg) {
	if (socketOpen && socketTask) {
		socketTask.send({
			data: msg,
			async success() {
				console.log("消息发送成功");
			}
		})
	} else {
		socketMsgQueue.push(msg);
	}
}

//关闭连接
function cls(){
	var userToken = uni.getStorageSync("userToken") || '';
	
	//用户信息不为空时创建连接
	if(userToken != '' && userToken != 'undefined' && userToken != null && socketTask){
		socketTask.close({
			success(res) {
				this.socketOpen = false;
			},
			fail(err) {
				console.log("关闭失败", err)
			}
		})
	}
}
export default {
	sendSocketMessage,
    cls,
    connect
}
