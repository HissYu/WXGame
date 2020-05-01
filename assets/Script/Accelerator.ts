// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Particle from "./Particle";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Accelerator extends cc.Component {

    @property(cc.Prefab)
    particleObject: cc.Prefab = null;

    pSource: cc.Vec2;
    pDest: cc.Vec2;

    triggerLength: number = 100;

    touchStart(e: cc.Event.EventTouch) {
        this.pSource = e.getLocation();

    }

    touchMove(e: cc.Event.EventTouch) {
        this.pDest = e.getLocation();
    }

    touchEnd(e: cc.Event.EventTouch) {
        var v = this.pDest.sub(this.pSource);
        var dist = v.mag();
        if (dist > 100) {
            var scene = cc.director.getScene();
            let p = cc.instantiate(this.particleObject);
            p.parent = scene;

            p.setPosition(this.pSource);
            (p.getComponent("Particle") as Particle).ShootParticle(v);

        }
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.node.on('touchstart', this.touchStart, this);
        this.node.on('touchmove', this.touchMove, this);
        this.node.on('touchend', this.touchEnd, this);
        this.node.on('touchcancel', this.touchEnd, this);
    }
    onDestroy() {
        this.node.off('touchstart', this.touchStart, this);
        this.node.off('touchmove', this.touchMove, this);
        this.node.off('touchend', this.touchEnd, this);
        this.node.off('touchcancel', this.touchEnd, this);
    }
    // update (dt) {}
}
