// priority: 500
// 玩家攻击事件
//参考脆骨症夜鸢大佬的代码
//不清楚优化会不会更好，但是写起来方便一点
global.playerattack = event => {
    let player = event.source.player;
    //获取主手物品
    let item = player.getMainHandItem();
     // 检测主手物品是否为 tetra 物品(这部分还没写)
    // 获取主手物品 nbt
    let itemNbt = item.nbt;
    for (let key1 in itemNbt) {
        // 获取对应的属性值
        let key2 = itemNbt[key1];
        // 检查 key2 是否为字符串类型
        if (typeof key2 === 'string') {
            let nbt = key2.split('/');
            // 检查 nbt 数组是否包含所需元素
            for (let i = 0; i < nbt.length; i++) {
                let part = nbt[i];
                let strategy = tetraPlayerAttackStrategies[part] || tetraPlayerAttackStrategies.default;
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
// 转变之花镶嵌效果
'transformative_flower' : function (event,nbt,player){
    event.amount = event.amount * (0.8 + Math.random() * 0.6)
},
//骇狼首领之牙攻击效果
'fangofthe_hound_leader' : function (event,nbt,player){
    player.potionEffects.add('born_in_chaos_v1:rampant_rampage',20 * 3, 5)
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