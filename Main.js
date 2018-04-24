
import{ResourceLoader} from './js/base/ResourceLoader.js';
//初始化整个游戏的精灵，作为游戏开始的入口
export class Main{
    constructor(){
        console.log(window.innerWidth+'----'+window.innerHeight);
        this.canvas=wx.createCanvas();
        this.ctx=this.canvas.getContext('2d');
        const loader=ResourceLoader.create();
       loader.onLoaded(map=>this.onResourceFirstLoaded(map));
  //     console.log(loader.map);

    }
    onResourceFirstLoaded(map){
        console.log(map);
    }
}