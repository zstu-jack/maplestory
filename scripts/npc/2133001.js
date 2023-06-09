/**
 * @author: Ronan
 * @npc: Ellin
 * @map: Ellin PQ
 * @func: Ellin PQ Coordinator
*/

var status = 0;
var mapid;

function start() {
        mapid = cm.getPlayer().getMapId();
    
	status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                    
                if(status == 0) {
                        var ellinStr = ellinMapMessage(mapid);
                    
                        if(mapid == 930000000) {
                            cm.sendNext(ellinStr);
                        } else if(mapid == 930000300) {
                            var eim = cm.getEventInstance();
                            
                            if(eim.getIntProperty("statusStg4") == 0) {
                                eim.showClearEffect(cm.getMap().getId());
                                eim.setIntProperty("statusStg4", 1);
                            }
                            
                            cm.sendNext(ellinStr);
                        } else if(mapid == 930000400) {
                            if (cm.haveItem(4001169, 20)) {
                                if(cm.isEventLeader()) {
                                    cm.sendNext("喔！你把它们带来了。我们可以继续下一阶段了，现在出发吗？");
                                } else {
                                    cm.sendOk("你把它们带来了，可你并不是队长！请让你的队长亲手把怪物之珠交给我...");
                                    cm.dispose();
                                    return;
                                }
                            } else {
                                if(cm.getEventInstance().gridCheck(cm.getPlayer()) != 1) {
                                    cm.sendNext(ellinStr);
                                    
                                    cm.getEventInstance().gridInsert(cm.getPlayer(), 1);
                                    status = -1;
                                } else {
                                    var mobs = cm.getMap().countMonsters();
                                
                                    if(mobs > 0) {
                                        if (!cm.haveItem(2270004)) {
                                            if(cm.canHold(2270004, 10)) {
                                                cm.gainItem(2270004, 10);
                                                cm.sendOk("拿着这10个 #t2270004#。首先要 #r削弱 #o9300174##k，一旦它们的HP值下降到一定程度，就用我交给你的道具捉住它们。");
                                                cm.dispose();
                                                return;
                                            } else {
                                                cm.sendOk("净化水源之前，请确保消耗栏有足够的空间。");
                                                cm.dispose();
                                                return;
                                            }
                                        } else {
                                            cm.sendYesNo(ellinStr + "\r\n\r\n你们想要现在#r现在退场#k吗？请再确认一下，或许你的同伴仍然想要继续。");
                                        }
                                    } else {
                                        cm.sendYesNo("你们抓住了所有#o9300174#。让队长把全部#b20个 #t4001169##k交给我，就可以继续任务。" + "\r\n\r\n你们想要现在#r现在退场#k吗？请再确认一下，或许你的同伴仍然想要继续。");
                                    }
                                }
                            }
                        } else {
                            cm.sendYesNo(ellinStr + "\r\n\r\n你们想要现在#r现在退场#k吗？请再确认一下，或许你的同伴仍然想要继续。");
                        }
                } else if(status == 1) {
                        if(mapid == 930000000) {
                        } else if(mapid == 930000300) {
                            cm.getEventInstance().warpEventTeam(930000400);
                        } else if(mapid == 930000400) {
                            if(cm.haveItem(4001169, 20) && cm.isEventLeader()) {
                                cm.gainItem(4001169, -20);
                                cm.getEventInstance().warpEventTeam(930000500);
                            } else {
                                cm.warp(930000800, 0);
                            }
                        } else {
                            cm.warp(930000800, 0);
                        }
                        
                        cm.dispose();
                }
        }
}

function ellinMapMessage(mapid) {
    switch(mapid) {
	case 930000000:
	    return "欢迎来到毒雾森林。请进入传送点继续任务。";
	    
	case 930000100:
	    return "#b#o9300172##k占据了这片区域。我们必须消灭所有被污染的怪物才能继续前进。";
	    
	case 930000200:
	    return "一条巨大的刺藤挡住了前方的道路。为了消除这一障碍，我们需要提取#b#o9300173##k携带的毒素，来阻止这片刺藤增生。不过天然的毒素剂量不易掌控，浓度太高了。在那边的#b泉水#k里稀释一下吧。";
	    
	case 930000300:
            return "太好了，你到达了这里。我们现在可以继续探索森林的深处了。";
	    
	case 930000400:
	    return "#b#o9300175##k占据了这片区域。它们不是普通的怪物，它们的再生速度非常迅速，并且#r完全免疫普通的物理或魔法攻击伤害#k。我们必须使用#b#t2270004##k净化这里所有被污染的怪物！让你的队长拿来20个从它们身上获得的怪物之珠。";
	    
	case 930000600:
	    return "这里就是森林里所有问题的根源！把得到的魔法石放在祭坛上，做好准备迎战吧！";
	    
	case 930000700:
	    return "就是这样，你们做到了！真的很感谢你们净化了这片森林！";
	    
    }
}