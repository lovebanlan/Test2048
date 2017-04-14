module com.lion.managers {
	export class SecondManager implements com.lion.managers.interfaces.IEnterFrameAble{

		private static instance:SecondManager;
		protected items:interfaces.ISecondCountable[];
		protected seconds:number;
		protected lastTime:number;
		public static secondTime = 1000;

		public constructor() {
			if(SecondManager.instance){
				throw new Error("second manager is singlon");
			}
			SecondManager.instance = this;
			this.seconds = 0;
			this.items = [];
			this.lastTime = egret.getTimer();
			this.seconds = 0;

			EnterFrameManager.getInstance().addItem(this);
		}
		public static getInstance():SecondManager{
			if(SecondManager.instance == null){
				SecondManager.instance = new SecondManager();
			}
			return SecondManager.instance;
		}
		public updateFrame(frameNum:number):void{
			var newTime = egret.getTimer();
			if(newTime - this.lastTime - this.seconds * SecondManager.secondTime > SecondManager.secondTime){
				this.seconds = Math.floor((newTime - this.lastTime) / SecondManager.secondTime);
				console.log(this.items);
				for(var i = this.items.length - 1 ; i > -1 ; i --){
					this.items[i].updateSecond(this.seconds);
				}
			}
		}
		public addItem(item:interfaces.ISecondCountable):void{
			var ind = this.items.indexOf(item);
			if(ind == -1)
				this.items.push(item);
		}
		public removeItem(item:interfaces.ISecondCountable):void{
			var ind = this.items.indexOf(item);
			if(ind != -1)
				this.items.splice(ind, 1);
		}
		public destory():void{
			if(SecondManager.instance){
				EnterFrameManager.getInstance().removeItem(this);
				this.items = [];
				SecondManager.instance = null;
			}
		}
	}
}