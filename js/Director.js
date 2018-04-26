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
    }
    //创建铅笔
    createPencil() {
        const minTop = DataStore.getInstance().canvas.height / 8;
        const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }
    //运行开始
    run(){
        this.dataStore.get('background').draw();        
        const pencils = this.dataStore.get('pencils');
        //销毁铅笔
        if (pencils[0].x + pencils[0].width <= 0 &&
            pencils.length === 4) {
            pencils.shift();
            pencils.shift();
          //  this.dataStore.get('score').isScore = true;
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
       requestAnimationFrame(()=>this.run());
    }
}