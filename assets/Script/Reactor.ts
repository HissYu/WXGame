// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Particle from "./Particle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Reactor extends cc.Component {

    onCollisionEnter(other:cc.CircleCollider, self: cc.BoxCollider){
        console.log('collision');
        
        
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
