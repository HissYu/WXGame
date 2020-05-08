// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Particle from "./Particle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    @property
    is_debug = true;
    @property(cc.Vec2)
    gravity:cc.Vec2 = new cc.Vec2(0, 0)


    @property(cc.Prefab)
    particleObject: cc.Prefab = null;
    @property
    baseParticleLimit = 20;

    baseParticleCount = 0;  

    createParticleTimer = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true; // 开启了物理引擎
        cc.director.getCollisionManager().enabled = true;
        // 独立的形状，打开一个调试区域,游戏图像的，逻辑区域;
        // 开始调试模式:
        cc.director.getCollisionManager().enabledDebugDraw = this.is_debug;
        if (this.is_debug) { // 开启调试信息
            var Bits = cc.PhysicsManager.DrawBits; // 这个是我们要显示的类型
            cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit;
        }
        else { // 关闭调试信息
            cc.director.getPhysicsManager().debugDrawFlags = 0;
        }
        cc.director.getPhysicsManager().gravity = this.gravity;
    }

    createParticle(){
        var scene = cc.director.getScene();
        let p = cc.instantiate(this.particleObject);
        var v = cc.v2(0,0);
        cc.Vec2.random(v);
        p.parent = scene;

        p.setPosition(59,559); // TODO: random position out of sight
        (p.getComponent("Particle") as Particle).ShootParticle(v);
        this.baseParticleCount++;
        
    }

    start () {
        console.log(this);
        
    }
    update (dt) {
        if(this.baseParticleCount>=this.baseParticleLimit){
            clearInterval(this.createParticleTimer)
            this.createParticleTimer = null;
        }else{
            if(this.createParticleTimer==null){
                this.createParticleTimer = setInterval(this.createParticle.bind(this),500)
            }
        }
    }
}
