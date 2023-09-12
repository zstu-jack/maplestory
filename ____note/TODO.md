
- 脚本英文替换
- 召唤BOSS的物品放到GM里：
    - 闹钟：时空裂缝的碎片D
- 任务列表->npc->物品:setQuestProgress
- 商城隐藏的打开 Etc.wz
- 宠吸，一键拾取
- 喇叭:GM商店看下哪里发的
    - 上线发，gm发喇叭
- 屏幕中间文件特效：?改
- 技能速度
- 宠吸
    ```
    005049C2： 90 90
    005049CA： 90 90

    捡取/吃药/攻击 能同时进行
    0x00085C01: 0x90
    0x00085C02: 0x90

    0x00085C08: 0x90
    0x00085C09: 0x90

    0x00085C21: 0x90
    0x00085C22: 0x90

    0x00085C32: 0x90
    0x00085C33: 0x90
    ```

# Done 2023-09-12
- 在线玩家传送
- salon脚本
- 去除npc gm 指令获得的item不能交易的限制
- 搜索道具时显示下id
- 搜索npc时显示下id
- 快捷获取debuff解药
- 去除飞天的时候不能攻击箱子的限制
    ```
    Hxd
    Memory::WriteByte(0x009509DC, 0xEB);
	Memory::WriteByte(0x0095385B, 0xEB);
	Memory::WriteByte(0x00955783, 0xEB);
	Memory::WriteByte(0x009571F6, 0xEB);
    改下面二进制地址内容，我好像只改了0x005571F6位置的前面三个已经是EB了
    0x005509DC, EB
    0x0055385B, EB
    0x00555783, EB
    0x005571F6, EB
    ```
# Done

- TODO：人气指令: 拍卖指令里加了
- TODO: 怪物名字->地点
    - 传过来的selection竟然是int,会把0去了
    - 但是怪物图片需要String
    - 新增一个AllMobsById, key是id的
- TODO：GM取消自动隐藏: config.yaml里改配置就行
- TODO：怪物嘉年华人数限制 NPC id=2042000: 直接配置里打开远征人数限制就好了
- TODO:用原来的药水来调用了不新增了。 描述就先不改了
    - 清屏药水：2022359：UseItemHandler.java killall
    - 拣取药水: 2022361
    - 超级药水：2000019
    - TODO: ？增加一个Cosume道具，调用自己的指令？// 已经用原来的药水来调用了不新增了
- TODO：物品名字模糊搜索, 获取100，200，400，800，1600个，哪些怪物爆的
    - 直接用的wz
- TODO: npc搜索
    - 直接用的wz