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
    //检测主手物品是否为tetra物品(这部分还没写)
    //获取主手物品nbt
    let itemNbt = item.nbt;
    for (let key in itemNbt) {
        // 获取对应的策略函数，如果不存在则使用默认函数
        let nbt = itemNbt[key]
        let strategy = tetraPlayerTickStrategies[nbt] || tetraPlayerTickStrategies.default;
        strategy(event, nbt,player);
    }
})

const tetraPlayerTickStrategies = {
    //巨食人鱼眼强化复层效果
    'reinforced_fuller/sea_terror_eye' : function (event,nbt,player){
        player.potionEffects.add('minecraft:night_vision', 20 * 10, 0)
        player.potionEffects.add('minecraft:water_breathing', 20 * 10, 0)
        player.potionEffects.add('minecraft:dolphins_grace', 20 * 10, 0)
    },
    'default': function (event,nbt,player) {
        return
    }
}