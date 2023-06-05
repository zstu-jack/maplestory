/*
	@Author Ronan
        (Neo Tokyo Teleporter)
*/

var quests = [3719, 3724, 3730, 3736, 3742, 3748];
var array = ["2021年 - 平凡的村庄", "2099年 - 深夜港口入口", "2215年 - 遭到攻击的城区", "2216年 - 变成废墟的城市", "2230年 - 危险的塔大厅", "2503年 - 天空战舰船头"/*, "2227年 - 危险的城市交叉路"*/];
var limit;

function start() {
        if(!cm.isQuestCompleted(3718)) {
            cm.sendOk("时间机器还没有激活。");
            cm.dispose();
            return;
        }
        
        for(limit = 0; limit < quests.length; limit++) {
            if(!cm.isQuestCompleted(quests[limit])) {
                break;
            }
        }
        
        if(limit == 0) {
            cm.sendOk("在进入未来东京地图之前，请向#b时间守护兽努克斯#k证明你的勇气。");
            cm.dispose();
            return;
        }
    
        status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        var menuSel = generateSelectionMenu(array, limit);
                        cm.sendSimple(menuSel);
                } else if(status == 1) {
                        var mapid = 0;

                        switch (selection) {
                            case 0:
                                mapid = 240070100;
                                break;
                            case 1:
                                mapid = 240070200;
                                break;
                            case 2:
                                mapid = 240070300;
                                break;
                            case 3:
                                mapid = 240070400;
                                break;
                            case 4:
                                mapid = 240070500;
                                break;
                            case 5:
                                mapid = 240070600;
                                break;
                            /*case 6:
                                mapid = 683070400;
                                break;*/
                        }
                        
                        if (mapid > 0) {
                            cm.warp(mapid, 1);
                        } else {
                            cm.sendOk("请完成关卡目标。");
                        }
                }
        }
}

function generateSelectionMenu(array, limit) {     // nice tool for generating a string for the sendSimple functionality
        var menu = "";
        
        var len = Math.min(limit, array.length);
        for (var i = 0; i < len; i++) {
                menu += "#L" + i + "#" + array[i] + "#l\r\n";
        }
        return menu;
}

    