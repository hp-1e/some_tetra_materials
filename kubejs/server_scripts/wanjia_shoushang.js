// priority: 500
// 玩家受伤事件
//参考脆骨症夜鸢大佬的代码
//不清楚优化会不会更好，但是写起来方便一点
global.playerhurt = event => {
    let player = event.entity;
    // 获取主手物品
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
                let strategy = tetraPlayerHurtStrategies[part] || tetraPlayerHurtStrategies.default;
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