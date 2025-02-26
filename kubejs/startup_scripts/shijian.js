// priority: 1000

//生物死亡事件
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDeathEvent',event =>{
    global.deathevent(event);
})

//第一个是玩家受伤
//第二个是玩家造成伤害
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent', event => {
        if (event.entity.isPlayer()) {
            global.playerhurt(event);
        }
        if (event.source.player) {
            global.playerattack(event);
        }
    })

//跳劈事件
ForgeEvents.onEvent('net.minecraftforge.event.entity.player.CriticalHitEvent',event =>{
})

