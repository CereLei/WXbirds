import {Sprite } from '../base/Sprite.js';
import {DataStore} from '../base/DataStore.js';
export class Land extends Sprite{
    constructor(){
        const image=Sprite.getImage('land');
        console.log(image);
        super(
            image,
            0, 0,
            image.width, image.height,
            0, DataStore.getInstance().canvas.height - image.height,
            image.width,
            image.height
            
        )
       
    }
}