module com.lion.display {
	export class BaseScene extends BaseUI{
		protected mainScene:BaseMainScene;
		protected animateVo:com.lion.data.AnimateConfigVo;
		protected showData:any;
		public constructor(mainScene:BaseMainScene, animateVo:com.lion.data.AnimateConfigVo = null) {
			super();
			this.mainScene = mainScene;
			if(animateVo == null){
				this.animateVo = new com.lion.data.AnimateConfigVo();
			}else{
				this.animateVo = animateVo;
			}
		}
		public show(data:any):void{
			this.showData = data;
			egret.Tween.removeTweens(this);
			this.mainScene.addChild(this);
			this.y = this.animateVo.animateDistance;
			this.alpha = 0;
			egret.Tween.get(this).to({y:0, alpha:1}, this.animateVo.animateTime).call(this.showAnimateOver);
		}
		public hide():void{
			this.touchChildren = false;
			egret.Tween.removeTweens(this);
			egret.Tween.get(this).to({y:this.animateVo.animateDistance, alpha:0}, this.animateVo.animateTime).call(this.hideAnimateOver);
		}
		protected hideAnimateOver():void{
			this.alpha = 1;
			this.y = 0;
			if(this.parent)
				this.mainScene.removeChild(this);
		}
		protected showAnimateOver():void{
			this.touchChildren = true;
		}
	}
}