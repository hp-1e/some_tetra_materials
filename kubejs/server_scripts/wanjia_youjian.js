// priority: 500
// 玩家右键事件
//参考脆骨症夜鸢大佬的代码
//不清楚优化会不会更好，但是写起来方便一点
ItemEvents.rightClicked(event => {
    let player = event.player;
    if (!player)return
     // 获取主手物品
     let item = player.getMainHandItem();
       let itemNbt = item.nbt;
       if (!itemNbt) return;
   
       for (let key1 in itemNbt) {
           let key2 = itemNbt[key1];
           if (Object.prototype.toString.call(key2) === '[object String]') {
               let nbt = key2.split('/');
               for (let i = 0; i < nbt.length; i++) {
                   let strategy = tetraPlayerYoujianStrategies[nbt[i]] || tetraPlayerYoujianStrategies.default;
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