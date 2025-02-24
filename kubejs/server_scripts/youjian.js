// priority: 500
// 玩家攻击事件
//参考脆骨症夜鸢大佬的代码
//不清楚优化会不会更好，但是写起来方便一点
ItemEvents.rightClicked(event => {
    let player = event.entity;
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
                let strategy = tetraPlayerYoujianStrategies[part] || tetraPlayerYoujianStrategies.default;
                strategy(event, nbt, player);
            }
        }
    }
})

const tetraPlayerYoujianStrategies = {
    //暴怒符咒右键效果
    'charmof_fury' : function (event,nbt,player){
        if (player.hasEffect('born_in_chaos_v1:medium_rampage')) return
        let item = player.getMainHandItem();
        player.potionEffects.add('born_in_chaos_v1:medium_rampage',20 * 60 *5, 1)
        item.damageValue = item.damageValue + 50
    },
    //耐力符文右键效果
    'charmof_endurance' : function (event,nbt,player){
        if (player.hasEffect('minecraft:speed')) return
        let item = player.getMainHandItem();
        player.potionEffects.add('minecraft:speed',20 * 60 *5, 4)
        item.damageValue = item.damageValue + 50
    },
    //隐身符咒右键效果
    'charmof_stealth' : function (event,nbt,player){
        if (player.hasEffect('minecraft:invisibility')) return
        let item = player.getMainHandItem();
        player.potionEffects.add('minecraft:invisibility',20 * 60 *5, 2)
        item.damageValue = item.damageValue + 50
    },
    //力量符咒右键效果
    'charmof_power' : function (event,nbt,player){
        if (player.hasEffect('minecraft:strength')) return
        let item = player.getMainHandItem();
        player.potionEffects.add('minecraft:strength',20 * 60 *5, 2)
        item.damageValue = item.damageValue + 50
    },
    //抗性符咒右键效果
    'charmof_resistance' : function (event,nbt,player){
        if (player.hasEffect('minecraft:resistance')) return
        let item = player.getMainHandItem();
        player.potionEffects.add('minecraft:resistance',20 * 60 *5, 0)
        item.damageValue = item.damageValue + 50
    },
    'default': function (event,nbt,player) {
     return
}}