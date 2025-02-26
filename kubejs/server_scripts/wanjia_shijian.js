// priority: 500
//每五秒玩家刻事件
//参考脆骨症夜鸢大佬的代码
//不清楚优化会不会更好，但是写起来方便一点
PlayerEvents.tick(event => {
    let player = event.player
    //每五秒执行一次
    if (player.age % 100 != 0) return
    //获取主手物品
    let item = player.getMainHandItem();
    let itemNbt = item.nbt;
    if (!itemNbt) return;

    for (let key1 in itemNbt) {
        let key2 = itemNbt[key1];
        if (Object.prototype.toString.call(key2) === '[object String]') {
            let nbt = key2.split('/');
            for (let i = 0; i < nbt.length; i++) {
                let strategy = tetraPlayerTickStrategies[nbt[i]] || tetraPlayerTickStrategies.default;
                strategy(event, nbt, player);
            }
        }
    }
});

const tetraPlayerTickStrategies = {
    //巨食人鱼眼强化复层效果
    'sea_terror_eye' : function (event,nbt,player){
        player.potionEffects.add('minecraft:night_vision', 20 * 10, 0)
        player.potionEffects.add('minecraft:water_breathing', 20 * 10, 0)
        player.potionEffects.add('minecraft:dolphins_grace', 20 * 10, 0)
    },
    'default': function (event,nbt,player) {
        return
    }
}