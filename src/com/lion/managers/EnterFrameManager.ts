module com.lion.managers {
	export class EnterFrameManager {
		private shape:egret.Shape = new egret.Shape();

		protected items:interfaces.IEnterFrameAble[];
		protected frameNumber:number;
		private static instance:EnterFrameManager;

		public constructor() {
			if(EnterFrameManager.instance){
				throw new Error("enterframe manager is singlon");
			}
			this.frameNumber = 0;
			this.items = [];

			this.shape.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
		}
		public static getInstance():EnterFrameManager{
			if(EnterFrameManager.instance == null){
				EnterFrameManager.instance = new EnterFrameManager();
			}
			return EnterFrameManager.instance;
		}
		protected enterFrameHandler(evt:egret.Event):void{
			this.frameNumber ++;
			for(var i = 0 ; i < this.items.length ; i ++){
				this.items[i].updateFrame(this.frameNumber);
			}
		}
		public addItem(item:interfaces.IEnterFrameAble):void{
			var ind = this.items.indexOf(item);
			if(ind == -1)
				this.items.push(item);
		}
		public removeItem(item:interfaces.IEnterFrameAble):void{
			var ind = this.items.indexOf(item);
			if(ind != -1)
				this.items.splice(ind, 1);
		}
		public destory():void{
			if(EnterFrameManager.instance){
				this.shape.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
				this.items = [];
				EnterFrameManager.instance = null;
			}
		}
	}
}