! function(e, n) {
	for (var t in n) e[t] = n[t]
}(exports, function(e) {
	function n(o) {
		if (t[o]) return t[o].exports;
		var a = t[o] = {
			i: o,
			l: !1,
			exports: {}
		};
		return e[o].call(a.exports, a, a.exports, n), a.l = !0, a.exports
	}
	var t = {};
	return n.m = e, n.c = t, n.d = function(e, t, o) {
		n.o(e, t) || Object.defineProperty(e, t, {
			configurable: !1,
			enumerable: !0,
			get: o
		})
	}, n.n = function(e) {
		var t = e && e.__esModule ? function() {
			return e.default
		} : function() {
			return e
		};
		return n.d(t, "a", t), t
	}, n.o = function(e, n) {
		return Object.prototype.hasOwnProperty.call(e, n)
	}, n.p = "", n(n.s = 1)
}([function(e, n, t) {
	"use strict";

	function o(e) {
		"object" === ("undefined" == typeof plus ? "undefined" : c(plus)) ? e(): n.isApp && window.addEventListener(
			"plusready", e, !1)
	}

	function a(e, n, t) {
		n ? n.errMsg || (n.errMsg = "callback:ok") : "object" === (void 0 === t ? "undefined" : c(t)) ? (t || (t = {
				errMsg: "callback:fail"
			}), t.errMsg || (t.errMsg = t.message || "callback:fail")) : t = {
				errMsg: "callback:fail " + String(t)
			}, e && "function" == typeof e.success && n && e.success(n), t && console.warn("Callback Fail:", t), e &&
			"function" == typeof e.fail && t && e.fail(t), e && "function" == typeof e.complete && e.complete(n || t)
	}

	function r() {
		return a
	}
	var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
	};
	Object.defineProperty(n, "__esModule", {
			value: !0
		}), n.isPlus = "object" === ("undefined" == typeof navigator ? "undefined" : c(navigator)) && !!navigator.userAgent
		.match(/Html5Plus/i), n.isWeb = "object" === ("undefined" == typeof document ? "undefined" : c(document)) && !n.isPlus,
		n.isWeex = "object" === ("undefined" == typeof weex ? "undefined" : c(weex)), n.isApp = n.isPlus || n.isWeex, n.plusReady =
		o, n.callback = a, n.getCallback = r
}, function(e, n, t) {
	"use strict";
	Object.defineProperty(n, "__esModule", {
		value: !0
	});
	var o = t(2);
	n.connectSocket = o.connectSocket, n.onSocketOpen = o.onSocketOpen, n.onSocketError = o.onSocketError, n.sendSocketMessage =
		o.sendSocketMessage, n.onSocketMessage = o.onSocketMessage, n.closeSocket = o.closeSocket, n.onSocketClose = o.onSocketClose
}, function(e, n, t) {
	"use strict";

	function o(e) {
		function n() {
			f = null
		}
		e = e || {};
		var t = new d.SocketTask(e);
		if (t.onClose(n), t.onError(n), !f) {
			f = t;
			for (var o in b) b.hasOwnProperty(o) && t[o](b[o])
		}
		return f = f || t, t
	}

	function a(e, n) {
		f ? f[e](n) : b[e] = n
	}

	function r(e) {
		a("onOpen", e)
	}

	function c(e) {
		a("onError", e)
	}

	function i(e) {
		f && f.send(e)
	}

	function s(e) {
		a("onMessage", e)
	}

	function l(e) {
		f && f.close(e)
	}

	function u(e) {
		a("onClose", e)
	}
	Object.defineProperty(n, "__esModule", {
		value: !0
	});
	var d = t(3),
		f = null,
		b = {};
	n.connectSocket = o, n.onSocketOpen = r, n.onSocketError = c, n.sendSocketMessage = i, n.onSocketMessage = s, n.closeSocket =
		l, n.onSocketClose = u
}, function(e, n, t) {
	"use strict";

	function o(e, n) {
		if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
	}

	function a(e) {
		var n = plus.webview.getWebviewById(b);
		if (!n) {
			var o = t(7);
			n = plus.webview.create("http://www.dcloud.io", b, {
				kernel: "UIWebview",
				render: "always",
				plusrequire: "none"
			}), n.overrideUrlLoading({
				match: ".*data.*"
			}, function(e) {
				var t = e.url,
					o = t.match(/\?(\S+)=(\S+)/);
				if (o) {
					var a = o[1],
						r = JSON.parse(decodeURIComponent(o[2]));
					"event" === a ? u.emit(r.type, r.data) : "callback" === a && p[r.callbackName](r.error)
				} else !y && "number" != typeof l && t.indexOf("load") >= 0 ? l = setInterval(function() {
					n.evalJS(k)
				}, 16) : !y && t.indexOf("ready") >= 0 && (clearInterval(l), y = !0, h.forEach(function(e) {
					e(n)
				}), h = [])
			}), n.loadData(o, {
				baseURL: "http://websocket.websocket"
			})
		}
		y ? e(n) : h.push(e)
	}
	var r = function() {
			function e(e, n) {
				for (var t = 0; t < n.length; t++) {
					var o = n[t];
					o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(
						e, o.key, o)
				}
			}
			return function(n, t, o) {
				return t && e(n.prototype, t), o && e(n, o), n
			}
		}(),
		c = function(e) {
			if (e && e.__esModule) return e;
			var n = {};
			if (null != e)
				for (var t in e) Object.hasOwnProperty.call(e, t) && (n[t] = e[t]);
			return n.default = e, n
		},
		i = function(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		};
	Object.defineProperty(n, "__esModule", {
		value: !0
	});
	var s, l, u = c(t(4)),
		d = t(0),
		f = i(t(5)),
		b = "__websocket__",
		p = {},
		k = t(6),
		y = !1,
		h = [],
		v = function() {
			function e(n) {
				o(this, e), this.id = Date.now().toString(), this.eval("connect", n)
			}
			return r(e, [{
				key: "send",
				value: function(e) {
					e.data && "string" != typeof e.data && (e.data = [f.default.encode(e.data)]), this.eval("send", e)
				}
			}, {
				key: "close",
				value: function(e) {
					this.eval("close", e)
				}
			}, {
				key: "onOpen",
				value: function(e) {
					this.on("open", e)
				}
			}, {
				key: "onClose",
				value: function(e) {
					this.on("close", e)
				}
			}, {
				key: "onError",
				value: function(e) {
					this.on("error", e)
				}
			}, {
				key: "onMessage",
				value: function(e) {
					this.on("message", function(n) {
						n = n.data, n = n && "string" != typeof n ? f.default.decode(n[0]) : n, e({
							data: n
						})
					})
				}
			}, {
				key: "eval",
				value: function(e, n) {
					var t = "callback" + Date.now(),
						o = d.isWeb ? window : p;
					o[t] = function(e) {
						delete o[t], e ? d.callback(n, {}, e) : d.callback(n, {})
					};
					var r = "window.__webSocket&&__webSocket." + e + "(" + this.id + "," + JSON.stringify(n) + ",'" + t + "')";
					d.isWeb ? (s || (window.eval(k), s = !0), window.eval(r)) : d.plusReady(function() {
						a(function(e) {
							e.evalJS(r)
						})
					})
				}
			}, {
				key: "on",
				value: function(e, n) {
					u.on("websocket" + e + this.id, function(e) {
						n(e.detail)
					})
				}
			}]), e
		}();
	n.SocketTask = v
}, function(e, n, t) {
	"use strict";

	function o(e, n) {
		c.isWeb ? window.addEventListener(e, n, !1) : (i[e] = i[e] || [], i[e].push(n))
	}

	function a(e, n) {
		if (c.isWeb) window.removeEventListener(e, n, !1);
		else {
			var t = i[e];
			t && t.splice(t.indexOf(n), 1)
		}
	}

	function r(e, n) {
		if (c.isWeb) document.dispatchEvent(new CustomEvent(e, {
			detail: n,
			bubbles: !0
		}));
		else {
			var t = i[e];
			t && t.forEach(function(e) {
				e({
					detail: n
				})
			})
		}
	}
	Object.defineProperty(n, "__esModule", {
		value: !0
	});
	var c = t(0),
		i = {};
	n.on = o, n.off = a, n.emit = r
}, function(e, n, t) {
	"use strict";
	Object.defineProperty(n, "__esModule", {
		value: !0
	});
	var o = {
		chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
		lookup: null,
		encode: function(e) {
			var n, t = this.chars,
				o = new Uint8Array(e),
				a = o.length,
				r = "";
			for (n = 0; n < a; n += 3) r += t[o[n] >> 2], r += t[(3 & o[n]) << 4 | o[n + 1] >> 4], r += t[(15 & o[n + 1]) <<
				2 | o[n + 2] >> 6], r += t[63 & o[n + 2]];
			return a % 3 == 2 ? r = r.substring(0, r.length - 1) + "=" : a % 3 == 1 && (r = r.substring(0, r.length - 2) +
				"=="), r
		},
		decode: function(e) {
			var n = this.chars,
				t = this.lookup;
			if (!t) {
				t = this.lookup = new Uint8Array(256);
				for (var o = 0; o < n.length; o++) t[n.charCodeAt(o)] = o
			}
			var a, r, c, i, s = .75 * e.length,
				l = e.length,
				u = 0;
			"=" === e[e.length - 1] && (s--, "=" === e[e.length - 2] && s--);
			var d = new ArrayBuffer(s),
				f = new Uint8Array(d);
			for (o = 0; o < l; o += 4) a = t[e.charCodeAt(o)], r = t[e.charCodeAt(o + 1)], c = t[e.charCodeAt(o + 2)], i =
				t[e.charCodeAt(o + 3)], f[u++] = a << 2 | r >> 4, f[u++] = (15 & r) << 4 | c >> 2, f[u++] = (3 & c) << 6 | 63 &
				i;
			return d
		}
	};
	n.default = o
}, function(e, n) {
	e.exports =
		"'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n(function () {\n    if (window.__webSocket) {\n        return;\n    }\n    var isPlus = (typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator)) === 'object' && !!navigator.userAgent.match(/Html5Plus/i);\n    if (isPlus) {\n        location.href = 'http://data?ready';\n    }\n    // 自定义事件\n    var $event = {\n        emit: function emit(type, data) {\n            if (!isPlus) {\n                document.dispatchEvent(new CustomEvent(type, {\n                    detail: data,\n                    bubbles: true\n                }));\n                return;\n            }\n            location.href = 'http://data?event=' + encodeURIComponent(JSON.stringify({\n                type: type,\n                data: data\n            }));\n        }\n    };\n    var Base64 = {\n        chars: \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\",\n        lookup: null,\n        encode: function encode(arraybuffer) {\n            var chars = this.chars;\n            var bytes = new Uint8Array(arraybuffer),\n                i,\n                len = bytes.length,\n                base64 = \"\";\n\n            for (i = 0; i < len; i += 3) {\n                base64 += chars[bytes[i] >> 2];\n                base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];\n                base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];\n                base64 += chars[bytes[i + 2] & 63];\n            }\n\n            if (len % 3 === 2) {\n                base64 = base64.substring(0, base64.length - 1) + \"=\";\n            } else if (len % 3 === 1) {\n                base64 = base64.substring(0, base64.length - 2) + \"==\";\n            }\n\n            return base64;\n        },\n        decode: function decode(base64) {\n            var chars = this.chars;\n            var lookup = this.lookup;\n            if (!lookup) {\n                lookup = this.lookup = new Uint8Array(256);\n                for (var i = 0; i < chars.length; i++) {\n                    lookup[chars.charCodeAt(i)] = i;\n                }\n            }\n            var bufferLength = base64.length * 0.75,\n                len = base64.length,\n                p = 0,\n                encoded1,\n                encoded2,\n                encoded3,\n                encoded4;\n\n            if (base64[base64.length - 1] === \"=\") {\n                bufferLength--;\n                if (base64[base64.length - 2] === \"=\") {\n                    bufferLength--;\n                }\n            }\n\n            var arraybuffer = new ArrayBuffer(bufferLength),\n                bytes = new Uint8Array(arraybuffer);\n\n            for (i = 0; i < len; i += 4) {\n                encoded1 = lookup[base64.charCodeAt(i)];\n                encoded2 = lookup[base64.charCodeAt(i + 1)];\n                encoded3 = lookup[base64.charCodeAt(i + 2)];\n                encoded4 = lookup[base64.charCodeAt(i + 3)];\n\n                bytes[p++] = encoded1 << 2 | encoded2 >> 4;\n                bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;\n                bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;\n            }\n\n            return arraybuffer;\n        }\n    };\n\n    window.__webSocket = {\n        webSockets: {},\n        connect: function connect(id, data, callbackName) {\n            var url = data.url;\n            var header = data.header; // 未支持\n            var method = data.method; // 未支持\n            var protocols = data.protocols || [];\n            var webSocket;\n            try {\n                webSocket = this.webSockets[id] = new WebSocket(url, protocols);\n                webSocket.binaryType = 'arraybuffer';\n            } catch (error) {\n                this.callback(callbackName, error);\n                return;\n            }\n            this.callback(callbackName);\n            if (webSocket) {\n                webSocket.addEventListener('open', function () {\n                    $event.emit('websocketopen' + id, {});\n                });\n                webSocket.addEventListener('message', function (_ref) {\n                    var data = _ref.data;\n\n                    $event.emit('websocketmessage' + id, {\n                        data: data && typeof data !== 'string' ? [Base64.encode(data)] : data\n                    });\n                });\n                webSocket.addEventListener('error', function () {\n                    $event.emit('websocketerror' + id, {});\n                });\n                webSocket.addEventListener('close', function () {\n                    $event.emit('websocketclose' + id, {});\n                });\n            }\n        },\n        send: function send(id) {\n            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n            var callbackName = arguments[2];\n\n            data = data.data;\n            data = data && typeof data !== 'string' ? Base64.decode(data[0]) : data;\n            try {\n                this.webSockets[id].send(data);\n            } catch (error) {\n                this.callback(callbackName, error);\n                return;\n            }\n            this.callback(callbackName);\n        },\n        close: function close(id) {\n            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n            var callbackName = arguments[2];\n\n            var options = [];\n            options.push(data.code || 1000);\n            if (typeof data.reason === 'string') {\n                options.push(data.reason);\n            }\n            try {\n                var _webSockets$id;\n\n                (_webSockets$id = this.webSockets[id]).close.apply(_webSockets$id, options);\n            } catch (error) {\n                this.callback(callbackName, error);\n                return;\n            }\n            this.callback(callbackName);\n        },\n        callback: function callback(callbackName, error) {\n            if (isPlus) {\n                location.href = 'http://data?callback=' + encodeURIComponent(JSON.stringify({\n                    callbackName: callbackName,\n                    error: error\n                }));\n            } else {\n                var js = 'window.' + callbackName + '&&window.' + callbackName + '(\\'' + (error || '') + '\\')';\n                window[callbackName] && window[callbackName](error | '');\n                window.eval(js);\n            }\n        }\n    };\n})();"
}, function(e, n) {
	e.exports =
		'<!doctype html> <html lang=en> <head> <meta charset=UTF-8> <title>WebSocket</title> </head> <body> <script>location.href="http://data/load"<\/script> </body> </html>'
}]));
