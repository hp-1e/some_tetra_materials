// priority: 500
// 生物事件
//参考脆骨症夜鸢大佬的代码
//不清楚优化会不会更好，但是写起来方便一点
global.deathevent = event => {
    // 先获取玩家对象
    let player = event.source.player;
    // 检查玩家对象是否存在
    if (!player) return;
    // 获取玩家主手物品
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
                let strategy = tetraDeathStrategies[part] ||tetraDeathStrategies.default;
                strategy(event, nbt, player);
            }
        }
    }
};

const tetraDeathStrategies = {
//招魂球效果
'orbofthe_summoner' : function (event,nbt,player){
    player.give(Item.of('born_in_chaos_v1:ethereal_spirit').withCount(1));
},
'default': function (event,nbt,player) {
    return
}
}