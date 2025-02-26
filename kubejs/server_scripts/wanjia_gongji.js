// priority: 500
// 玩家攻击事件
//参考脆骨症夜鸢大佬的代码
//不清楚优化会不会更好，但是写起来方便一点
global.playerattack = event => {
    let player = event.source.player;
    //获取主手物品
    let item = player.getMainHandItem();
    let itemNbt = item.nbt;
    if (!itemNbt) return;

    for (let key1 in itemNbt) {
        let key2 = itemNbt[key1];
        if (Object.prototype.toString.call(key2) === '[object String]') {
            let nbt = key2.split('/');
            for (let i = 0; i < nbt.length; i++) {
                let strategy = tetraPlayerAttackStrategies[nbt[i]] || tetraPlayerAttackStrategies.default;
                strategy(event, nbt, player);
            }
        }
    }
};

const tetraPlayerAttackStrategies = {
// 混沌种子镶嵌效果
'seedof_chaos' : function (event,nbt,player){
    event.amount = event.amount * (0.8 + Math.random() * 0.4)
},
//裂纹头骨
'shattered_skull' : function (event,nbt,player){
    player.potionEffects.add('minecraft:strength',20 * 10, 0)
},
//梦魇寻踪兽
'nightmare_stalker_skull' : function (event,nbt,player){
    if (player.hasEffect('minecraft:invisibility')) {
        event.amount = event.amount * 1.3
    }
},
//恶魔灯笼
'fel_lamp' : function (event,nbt,player){
    if (player.isPassenger()) {
        event.amount = event.amount * 1.3
    }
},
//恶魔灯笼
'lord_pumpkinheads_lamp' : function (event,nbt,player){
    let entity = event.entity
    if (entity.hasEffect('born_in_chaos_v1:soul_stratification')) return
    entity.potionEffects.add('born_in_chaos_v1:soul_stratification', 20 * 3, 0)
},
// 转变之花镶嵌效果
'transformative_flower' : function (event,nbt,player){
    event.amount = event.amount * (0.8 + Math.random() * 0.6)
},
//骇狼首领之牙攻击效果
'fangofthe_hound_leader' : function (event,nbt,player){
    let item = player.getMainHandItem();
    let itemNbt = item.nbt;
    if (itemNbt.contains('double/head_left') && itemNbt.contains('double/head_right')){
    player.potionEffects.add('born_in_chaos_v1:rampant_rampage',20 * 3, 4)}
},
//蜘蛛鄂剑刃效果
'spider_mandible' : function (event,nbt,player){
    let entity = event.entity
    entity.potionEffects.add('minecraft:slowness',20 * 3, 1)
    entity.potionEffects.add('minecraft:wither',20 * 3, 1)
    entity.potionEffects.add('minecraft:glowing',20 * 3, 1)
    entity.potionEffects.add('minecraft:nausea',20 * 3, 1)
    entity.potionEffects.add('minecraft:hunger',20 * 3, 1)
    entity.potionEffects.add('minecraft:instant_damage',2, 0)
    entity.potionEffects.add('minecraft:poison',20 * 3, 5)
    entity.potionEffects.add('tetra:severed',20 * 300, 1)
    entity.potionEffects.add('minecraft:weakness',20 * 3, 1)
},
'default': function (event, nbt, player) {
    return
}}