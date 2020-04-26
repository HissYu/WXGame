// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

type ParticleState = "charged" | "normal" | "captured";

@ccclass
export default class Particle extends cc.Component {

    particleID: number = 0;

    status: ParticleState = 'normal';
    velocity: cc.Vec2;

    public SetParticle(status: ParticleState, v: cc.Vec2, id = 0){
        this.status = status;
        this.velocity = v.normalize();

        this.particleID = id;


        var forceMultipler = 10000;
        switch(this.status){
            case 'charged':
                break;
            case 'normal':

                break;
            case 'captured':
                break;
        }
        
        var rigidbody = this.getComponent(cc.RigidBody)
        // rigidbody.applyForce(this.velocity.mul(forceMultipler), cc.v2(0,0) , true);
        rigidbody.applyForceToCenter(this.velocity.mul(forceMultipler), true);
        // rigidbody.linearVelocity = this.velocity.multiplyScalar(forceMultipler);
        // rigidbody.active = true
        // console.log(rigidbody);
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    update (dt) {
        
    }
}
