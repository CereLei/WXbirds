
import{ResourceLoader} from './js/base/ResourceLoader.js';
import{DataStore} from './js/base/DataStore.js';
import{BackGround } from './js/runtime/Background.js';
import{Director} from './js/Director.js';
import {Land} from './js/runtime/Land.js';


//初始化整个游戏的精灵，作为游戏开始的入口
export class Main{
    constructor(){
        console.log(window.innerWidth+'----'+window.innerHeight);
        this.canvas=wx.createCanvas();
        this.ctx=this.canvas.getContext('2d');
        this.dataStore=DataStore.getInstance();
        this.director=Director.getInstance();
        const loader=ResourceLoader.create();
       loader.onLoaded(map=>this.onResourceFirstLoaded(map));
        // var image=wx.createImage();
        // image.src='./res/background.png';
        // image.onload=()=>{
        //     this.ctx.drawImage(
        //      image,
        //      0,0,
        //      image.width,image.height,
        //      0,0,
        //      image.width,image.height
        //     );
        // }
    }
    //游戏开始之前将一些元素保存在dataStore找
    onResourceFirstLoaded(map){
        this.dataStore.canvas=this.canvas;
        this.dataStore.ctx=this.ctx;
        this.dataStore.res=map;
        this.init();
    }
    //入口初始化
    init(){
        //首先重置游戏为没有结束
        this.dataStore.isGameOver=false;
        this.dataStore.put('background',new BackGround());
       this.dataStore.put('land',new Land());
       this.dataStore.put('pencils',[])

        //创建铅笔要在游戏逻辑运行之前
        this.director.createPencil();
        this.director.run();
    }
}