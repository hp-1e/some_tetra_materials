// priority: 500
// 玩家受伤事件
//参考脆骨症夜鸢大佬的代码
//不清楚优化会不会更好，但是写起来方便一点
global.playerhurt = event => {
    let player = event.entity;
       //获取主手物品
       let item = player.getMainHandItem();
       let itemNbt = item.nbt;
       if (!itemNbt) return;
   
       for (let key1 in itemNbt) {
           let key2 = itemNbt[key1];
           if (Object.prototype.toString.call(key2) === '[object String]') {
               let nbt = key2.split('/');
               for (let i = 0; i < nbt.length; i++) {
                   let strategy = tetraPlayerHurtStrategies[nbt[i]] || tetraPlayerHurtStrategies.default;
                   strategy(event, nbt, player);
               }
           }
       }
   };

const tetraPlayerHurtStrategies = {
// 骸骨之心镶嵌效果
'bone_heart': function (event, nbt, player) {
    // 获取主手物品
    let item = player.getMainHandItem();
    // 检测是否处于 cd
    if (player.getCooldowns().isOnCooldown(item)) return;
    // 免疫伤害
    event.amount = 0;
    // 添加 cd
    player.addItemCooldown(item, 20 * 10);
    },
//窃命者头颅
'lifestealer_skull': function (event, nbt, player) {
    let health = player.health 
    let maxHealth = player.maxHealth
    if (health > maxHealth * 0.3)return
    player.potionEffects.add('minecraft:resistance',20 * 10, 2)
    },
// dark_atrium镶嵌效果
'dark_atrium' : function (event,nbt,player){
    //获取玩家最大生命值
    let maxHealth = player.getMaxHealth()
    //获取主手物品
    let item = player.getMainHandItem();
    //检测是否处于cd
    if (player.getCooldowns().isOnCooldown(item)) return
    //如果受到的伤害小于当前生命值，返回
    if (event.amount < player.getHealth()) return
        //反之受到的伤害设置为0，并恢复百分之30生命值
        event.amount = 0
        player.heal(maxHealth * 0.3)
        //添加cd
        player.addItemCooldown(item, 20 * 60 * 30)
        if (player.hasEffect('tetra:severed')) {
            // 获取已有的切割效果
            let effect = player.getEffect('tetra:severed')
            // 获取效果等级
            let amplifier = effect.getAmplifier()
            // 获取效果时长
            let duration = effect.getDuration()
            player.potionEffects.add('tetra:severed', duration + 20 * 100, amplifier + 5)
        }
        else{
            player.potionEffects.add('tetra:severed', 20 * 10, 0)
        }
},
'default': function (event,nbt,player) {
    return
    }}