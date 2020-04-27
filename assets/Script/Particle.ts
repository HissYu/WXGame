// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

type ParticleState = "charged" | "normal" | "inert";

@ccclass
export default class Particle extends cc.Component {

    particleID: number = 0;

    public status: ParticleState = 'normal';
    public velocity: cc.Vec2 = cc.v2(0,0);
    public captured:boolean = false;

    public SetParticle(status: ParticleState, v: cc.Vec2, id = 0){
        this.status = status;
        // console.log('before',this.velocity);

        this.velocity = v.normalize();

        this.particleID = id;

        // console.log('after',this.velocity);
        var rigidbody = this.getComponent(cc.RigidBody)

        // rigidbody.applyLinearImpulse(this.velocity.mul(100), rigidbody.getLocalCenter(), true);
        rigidbody.linearVelocity = this.velocity.multiplyScalar(600);
        
        
    }
    public SetBounce(n: cc.Vec2){

    }
    onCollisionEnter(other:cc.Collider, self: cc.CircleCollider){
        console.log('other', other);
        console.log('self',this.captured,this.velocity);
        if(other.node.parent.name ==='Reactor'){
            if(this.captured){
                if(other.tag === 1){
                    var v =this.velocity;
                    v.x = -v.x;
                    this.SetParticle('inert',v);
                }else if(other.tag === 0){
                    var v =this.velocity;
                    v.y = -v.y;
                    this.SetParticle('inert',v);
                }
            }else{
                this.captured = true;
            }
        }
        console.log('self',this.captured,this.velocity);
        
        // other.
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    update (dt) {
        var forceMultipler = 2;
        var rigidbody = this.getComponent(cc.RigidBody)
        switch(this.status){
            case 'charged':
                // forceMultipler = 5;
                rigidbody.linearDamping = 0;
                // rigidbody.linearVelocity = this.velocity.multiplyScalar(forceMultipler);

                break;
            case 'normal':
                // forceMultipler = 2;
                rigidbody.linearDamping = 0;
                // rigidbody.linearVelocity = this.velocity.multiplyScalar(forceMultipler);

                break;
            case 'inert':
                rigidbody.linearDamping = 0.8;
                break;
        }
        
        
        // rigidbody.applyForce(this.velocity.mul(forceMultipler), cc.v2(0,0) , true);
        // rigidbody.applyForceToCenter(this.velocity.mul(forceMultipler).mul(dt), true);
        // rigidbody.linearVelocity = this.velocity.multiplyScalar(forceMultipler);
        // rigidbody.active = true
        // console.log(rigidbody);
    }
}
