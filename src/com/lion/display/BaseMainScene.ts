module com.lion.display {
	export class BaseMainScene extends BaseUI{
		protected sceneMap:any;
		protected currentSceneId:number;
		protected childrenRemainedNum:number = 0;
		public constructor() {
			super();
			this.sceneMap = {};
		}
		public registScene(sceneId:number, scene:BaseScene):void{
			this.destoryScene(sceneId);
			this.sceneMap[sceneId] = scene;
		}
		public getSceneById(sceneId:number):BaseScene{
			return this.sceneMap[sceneId];
		}
		protected init():void{

		}
		protected toStageHandler(evt:egret.Event):void{
			super.toStageHandler(evt);
			this.init();
		}
		public switchScene(sceneId:number, data:any = null):void{
			if(this.currentSceneId == sceneId){
				return;
			}
			this.clearScene();
			this.currentSceneId = sceneId;
			var curScene:BaseScene = this.getSceneById(sceneId);
			if(!curScene){
				console.log("no scene for id: " + sceneId);
				return;
			}
			curScene.show(data);
		}
		protected destoryScene(sceneId:number):void{
			var curScene:BaseScene = this.getSceneById(sceneId);
			if(curScene)
				curScene.destory();
			delete this.sceneMap[sceneId];
		}
		public clearScene():void{
			var tempScene:BaseScene = this.getSceneById(this.currentSceneId);
			if(tempScene)
				tempScene.hide();
		}
	}
}