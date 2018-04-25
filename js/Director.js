import{DataStore} from './base/DataStore.js';


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
    run(){
        this.dataStore.get('background').draw();
        this.dataStore.get('land').draw();
    }
}