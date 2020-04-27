// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    @property
    is_debug = true;
    @property(cc.Vec2)
    gravity:cc.Vec2 = new cc.Vec2(0, 0) // 系统默认的
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

    start () {

    }

    // update (dt) {}
}
