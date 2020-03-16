export class TabMask{
	constructor(option) {
		this.navList = []
		this.tabbarList = []
		
		option = option || {}
	
		let tabbarHeight = !option.tabbarHeight&&option.tabbarHeight!=0?50:option.tabbarHeight
		
		let navHeight = !option.navHeight&&option.navHeight!=0?(uni.getSystemInfoSync().statusBarHeight + 44):option.navHeight
		let opacity = option.opacity || 0
		let fn = ()=>{}
		this.fn = option.fn || fn
		
		//#ifdef APP-PLUS
		this.creatPlusMask(navHeight,tabbarHeight,opacity)
		//#endif
	}
	creatPlusMask(navHeight,tabbarHeight,opacity){
		let opa = 1-Math.pow((1-opacity),1/10)
		
		for (let i = 1; i <= 10; i++) {
			
			let navView = this.creatView({height:`${navHeight}px`,top:0},opa)
			let tabbarView = this.creatView({height:`${tabbarHeight}px`,bottom:0},opa)
			
			this.navList.push(navView)
			this.tabbarList.push(tabbarView)
		}
	}
	//生成 opacity view
	creatView(style,opa){
		style = {
			left:'0px',
			width:'100%',
			...style
		}
		let view = new plus.nativeObj.View('view',style);
		view.draw([
			{tag:'rect',id:'rect',color:`rgba(0,0,0,${opa})`,position:{top:'0px',left:'0px',width:'100%',height:'100%'}},
		]);
		view.addEventListener("click", (e) => {
			this.fn()
			this.hide()
		}, false);
		return view
	}
	show(time=300){
		
		let i = 0
		this.timer = setInterval(()=>{
			if(i==10){
				clearInterval(this.timer)
			}else{
				if (this.navList[i]) this.navList[i].show()
				if (this.tabbarList[i]) this.tabbarList[i].show()
				i++
			}
		},time/10)
	}
	hide(){
		
		clearInterval(this.timer)
		for (let item of this.navList) {
			item.hide();
		}
		for (let item of this.tabbarList) {
			item.hide();
		}
	}
}

export default TabMask

