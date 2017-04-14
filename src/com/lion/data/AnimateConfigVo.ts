module com.lion.data {
	export class AnimateConfigVo {
		public animateTime:number;
		public animateDistance:number;
		public constructor(time:number = .5, distance:number = 50) {
			this.animateTime = time;
			this.animateDistance = distance;
		}
	}
}