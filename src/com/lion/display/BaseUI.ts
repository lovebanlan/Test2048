module com.lion.display {
	export class BaseUI extends egret.Sprite{

		protected _displayWidth:number = -1;
		protected _displayHeight:number = -1;
		protected isToStage:Boolean = false;
    	protected isCreated:Boolean = false;
		protected _displayRectangle:egret.Rectangle;

		public constructor() {
			super();

			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.toStageHandler, this);
		}
		public get displayWidth():number{
			return this._displayWidth;
		}
		public set displayWidth(value:number){
			this._displayWidth = value;
			this.resetPosition();
		}
		public get displayHeighth():number{
			return this._displayHeight;
		}
		public set displayHeighth(value:number){
			this._displayHeight = value;
			this.resetPosition();
		}
		public get displayRectangle():egret.Rectangle{
			return this._displayRectangle;
		}
		public set displayRectangle(value:egret.Rectangle){
			this._displayRectangle = value;
			this.resetPosition();
		}
		public resetDisplaySize(wid:number, hei:number):void{
			this._displayWidth = wid;
			this._displayHeight = hei;
			this.resetPosition();
		}
		protected startLogic():void{

		}
		protected resetPosition():void{
			this.x = this._displayRectangle.x + (this._displayRectangle.width - this.displayWidth) / 2;
			this.y = this.displayRectangle.y + (this.displayRectangle.height - this.displayHeighth) / 2;
		}
		protected toStageHandler(evt:egret.Event):void{
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.offStageHandler, this);
			this.isToStage = true;
			if(this.isCreated){
				this.startLogic();
			}
		}
		public childrenCreated():void{
			this.isCreated = true;
			if(this.isToStage){
				this.startLogic();
			}
		}
		protected offStageHandler(evt:egret.Event):void{
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.offStageHandler, this);
		}
		public destory():void{
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.toStageHandler, this);
			//this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.offStageHandler, this);
			this.offStageHandler(null);
		}
	}
}