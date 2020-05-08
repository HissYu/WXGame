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
        // var rigidbody = this.getComponent(cc.RigidBody)

        // rigidbody.applyLinearImpulse(this.velocity.mul(100), rigidbody.getLocalCenter(), true);
    }
    public ShootParticle(v:cc.Vec2){
        this.SetParticle('charged',v);
        var rigidbody = this.getComponent(cc.RigidBody)

        rigidbody.linearVelocity = this.velocity.multiplyScalar(400);

    }
    public SetBounce(n: cc.Vec2){

    }
    onCollisionEnter(other:cc.Collider, self: cc.CircleCollider){
        console.log(other.node.parent.name);
        
        var rigidbody = this.getComponent(cc.RigidBody)
        if(other.node.parent.name ==='Accelerator'){
            if(other.tag === 1){ // 左右碰撞
                var t = cc.mat4(-1,0,0,0,
                                0,1,0,0,
                                0,0,1,0,
                                0,0,0,1)

                rigidbody.linearVelocity = rigidbody.linearVelocity.transformMat4(t);

            }else if(other.tag === 0){ // 上下碰撞
                var t = cc.mat4(1,0,0,0,
                                0,-1,0,0,
                                0,0,1,0,
                                0,0,0,1)

                rigidbody.linearVelocity = rigidbody.linearVelocity.transformMat4(t);
            }
            else if(other.tag === 2){ // 加速
                if(!this.captured){
                    var t = cc.mat4(2,0,0,0,
                                    0,2,0,0,
                                    0,0,2,0,
                                    0,0,0,1)
                    
                    rigidbody.linearVelocity = rigidbody.linearVelocity.transformMat4(t);
                }
            }
        }
        if(other.node.parent.name ==='Reactor'){
            if(this.captured){
                if(other.tag === 1){ // 左右碰撞
                    var t = cc.mat4(-1,0,0,0,
                                    0,1,0,0,
                                    0,0,1,0,
                                    0,0,0,1)

                    var v =this.velocity;

                    rigidbody.linearVelocity = rigidbody.linearVelocity.transformMat4(t);
                    this.SetParticle('inert',v);
                }else if(other.tag === 0){ // 上下碰撞
                    var t = cc.mat4(1,0,0,0,
                                    0,-1,0,0,
                                    0,0,1,0,
                                    0,0,0,1)

                    var v =this.velocity;
                    rigidbody.linearVelocity = rigidbody.linearVelocity.transformMat4(t);

                    this.SetParticle('inert',v);
                }
            }else{
                this.captured = true; // TODO: better capture process to be done
            }
        }
        if(other.node.parent.name ==='game'){
            console.log('out of sight');
            
            this.destroy();
        }
        // console.log('self',this.captured,this.velocity);
        
        // other.
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }
    
    update (dt) {
        var forceMultipler = 2;
        var rigidbody = this.getComponent(cc.RigidBody)
        // rigidbody.linearVelocity = this.velocity.multiplyScalar(rigidbody.linearVelocity.mag());

        switch(this.status){
            case 'charged':
                // forceMultipler = 5;
                rigidbody.linearDamping = 0;
                // rigidbody.linearVelocity = this.velocity.multiplyScalar(forceMultipler);
        // rigidbody.linearVelocity = this.velocity.multiplyScalar(600);

                break;
            case 'normal':
                // forceMultipler = 2;
                rigidbody.linearDamping = 0;
                // rigidbody.linearVelocity = this.velocity.multiplyScalar(forceMultipler);
        // rigidbody.linearVelocity = this.velocity.multiplyScalar(400);

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
