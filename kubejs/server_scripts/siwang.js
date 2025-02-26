// priority: 500
// 生物死亡事件
//参考脆骨症夜鸢大佬的代码
//不清楚优化会不会更好，但是写起来方便一点
global.deathevent = event => {
    let player = event?.source?.player;
    if (!player) return;

    let item = player.getMainHandItem();
    let itemNbt = item.nbt;
    if (!itemNbt) return;

    for (let key1 in itemNbt) {
        let key2 = itemNbt[key1];
        if (Object.prototype.toString.call(key2) === '[object String]') {
            let nbt = key2.split('/');
            for (let i = 0; i < nbt.length; i++) {
                let strategy = tetraDeathStrategies[nbt[i]] || tetraDeathStrategies.default;
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