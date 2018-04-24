import{ Resource } from './Resource.js';
//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染
export class ResourceLoader{
    constructor(){
        this.map=new Map(Resource);
        
        for(let [key,value] of this.map){
            const image=wx.createImage();
            image.src=value;
            this.map.set(key,image);
        }
    }
    //确保所有的图片加载完毕
    onLoaded(callback){
        let loadedCount=0;
        for(let value of this.map.values()){
            value.onload=()=>{
                loadedCount++;
                if (loadedCount >= this.map.size) {
                    callback(this.map);
                }
            }
        }
    }
    static create(){
        return new ResourceLoader();
    }
}