import{DataStore} from './base/DataStore.js';

import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

//导演类，控制游戏的逻辑
export class Director{
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    constructor(){
        this.dataStore=DataStore.getInstance();
        this.moveSpeed = 2;
        //this.dataStore.isGameOver=this.dataStore.isGameOver;
    }
    //小鸟飞行
    birdsEvent(){
        for(let i=0;i<=2;i++){
            this.dataStore.get('birds').y[i]=this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }
    //创建铅笔
    createPencil() {
        const minTop = DataStore.getInstance().canvas.height / 8;
        const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }
        //判断小鸟是否和铅笔撞击
        static isStrike(bird, pencil) {
            let s = false;
            if (bird.top > pencil.bottom ||
                bird.bottom < pencil.top ||
                bird.right < pencil.left ||
                bird.left > pencil.right
            ) {
                s = true;
            }
            return !s;
        }
    //判断小鸟是否装机地板和铅笔
    check(){
        //console.log(111111111111);
        const birds=this.dataStore.get('birds');
        const land=this.dataStore.get('land');
        const pencils=this.dataStore.get('pencils');
        const score=this.dataStore.get('score');
        // console.log(score);
        // console.log(this.score);
       if(birds.birdsY[0]+birds.birdsHeight[0]>=land.y){
            console.log('撞击地板了');
            this.dataStore.isGameOver=true;
       }
       //小鸟的边框模型
       const birdsBorder={
           top:birds.y[0],
           bottom:birds.birdsY[0]+birds.birdsHeight[0],
           left: birds.birdsX[0],
           right: birds.birdsX[0] + birds.birdsWidth[0]
       };
       const length=pencils.length;
       for (let i =0;i<length;i++){
           const pencil=pencils[i];
           const pencilBorder={
            top:pencil.y,
            bottom:pencil.y+pencil.height,
            left:pencil.x,
            right:pencil.x+pencil.width
           };
        if(Director.isStrike(birdsBorder,pencilBorder)){
            console.log('撞到铅笔了');
            //console.log(birdsBorder+'---'+pencilBorder);
            this.dataStore.isGameOver=true;
            return;
        }
       }
        if(birds.birdsX[0]>pencils[0].x+pencils[0].width && score.isScore){
            wx.vibrateShort({
                success:function(){
                    console.log('振动开始');
                }
            });
           score.isScore=false;
            score.scoreNumber++;
        }
    }
    //运行开始
    run(){
        this.check();
        if(!this.dataStore.isGameOver){
            this.dataStore.get('background').draw();        
            const pencils = this.dataStore.get('pencils');
            //销毁铅笔
            if (pencils[0].x + pencils[0].width <= 0 &&
                pencils.length === 4) {
                pencils.shift();
                pencils.shift();
                this.dataStore.get('score').isScore = true;
            }
            //创建铅笔
            if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 &&
                pencils.length === 2) {
                this.createPencil();
            }
            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            });
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();
            this.dataStore.get('score').draw();
           let timer=requestAnimationFrame(()=>this.run());
           this.dataStore.put('timer',timer);
        }else{
            console.log('游戏结束');
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
        }
    }
}