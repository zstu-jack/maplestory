# GM
- CommandsExecutor.java
- 常用GM
    - 使用前 @setgmlevel 角色名 6
    - 物品
        - @givenx：点券
        - @givems: 金币
        - @gmshop：gm商店
        - @item： 添加物品
        - @setslot： 背包栏位
    - 成长
        - @fly       ：飞天
        - @hide      : 隐身
        - @unhide    ：取消隐身
        - @heal      ：恢复
        - @maxhpmp   ：最大hpmp
        - @sp        : 技能点
        - @ap        ：属性点
        - @level     ：设置等级
        - @job       ：切换职业
        - @maxskill  ：满技能
        - @resetskill：重置技能
        - @empowerme ： 给我一坨buff
        - @seteqstat 1605631： 牛逼装备，谨慎使用

    - 交互，服务器设置
        - @face ： 变脸
        - @hair:  做头发
        - @online: 查人所在位置        
        - @summon: 召唤玩家
        - @gotonpc：去npc这里
        - @follow: 飞去某个玩家位置
        - @xiguai： 开关吸怪
        - @spawn： 生成怪物
        - @pmob： 创角怪物
        - boss
            - @zakum：扎昆
            - @horntail：龙王
            - @pinkbean
            - @pap：闹钟
            - @pianus：鱼王
            - @cake：蛋糕
        - @killall：杀死所有怪物
        - @rates： 查询倍率
        - @exprate: 经验倍率
        - @mesorate：金币倍率
        - @droprate： 掉落倍率
        - @bossdroprate：boss掉落倍率
        - @questrate： 任务倍率
        - @travelrate： 坐船倍率
# npc


# map
```
put("南港", 60000);
put("彩虹村西郊平原", 1000000);
put("射手村", 100000000);
put("魔法密林", 101000000);
put("勇士部落", 102000000);
put("废弃都市", 103000000);
put("明珠港", 104000000);
put("林中之城", 105040300);
put("黄金海滩", 110000000);
put("诺特勒斯号码头", 120000000);
put("圣地", 130000000);
put("里恩", 140000000);
put("天空之城", 200000000);
put("幸福村", 209000000);
put("冰峰雪域", 211000000);
put("玩具城", 220000000);
put("水下世界", 230000000);
put("神木村", 240000000);
put("武陵", 250000000);
put("百草堂", 251000000);
put("地球防御本部", 221000000);
put("童话村", 222000000);
put("阿尔泰营地", 300000000);
put("新叶城", 600000000);
put("昭和村", 801000000);
put("古代神社", 800000000);
put("阿里安特", 260000000);
put("玛加提亚", 261000000);
put("新加坡", 540000000);
put("驳船码头城", 541000000);
put("马来西亚", 551000000);
put("婚礼村", 680000000);
put("时间神殿", 270000100);
put("废都广场", 103040000);
put("大海兽峡谷", 240070000);
put("蘑菇城", 106020000);
```


# item


# 拍卖GM
- code: `9900001.js`
    - EnterMTSHandler
        - openCenterScript
            - NPCScriptManager.getInstance().start(c, 9900001, null);
    - cm.openNpc
        - public void start(String filename, MapleClient c, int npc, List<MaplePartyCharacter> chrs)

- npc脚本流程
    - `cm.sendOk，cm.dispose`：完成流程
    - `cm.sendSimple`: 选择框
    - `cm.sendNext`: 点击下一步会进行下一个state

- 获取客户端输入
    - `cm.sendGetText`: 下一个state中需要`var text = cm.getText();`
    - `cm.sendGetNumber`:`(text def,min,max)`
