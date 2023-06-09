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
                                    cm.sendNext("ร�������Ǵ����ˡ����ǿ��Լ�����һ�׶��ˣ����ڳ�����");
                                } else {
                                    cm.sendOk("������Ǵ����ˣ����㲢���Ƕӳ���������Ķӳ����ְѹ���֮�齻����...");
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
                                                cm.sendOk("������10�� #t2270004#������Ҫ #r���� #o9300174##k��һ�����ǵ�HPֵ�½���һ���̶ȣ������ҽ�����ĵ���׽ס���ǡ�");
                                                cm.dispose();
                                                return;
                                            } else {
                                                cm.sendOk("����ˮԴ֮ǰ����ȷ�����������㹻�Ŀռ䡣");
                                                cm.dispose();
                                                return;
                                            }
                                        } else {
                                            cm.sendYesNo(ellinStr + "\r\n\r\n������Ҫ����#r�����˳�#k������ȷ��һ�£��������ͬ����Ȼ��Ҫ������");
                                        }
                                    } else {
                                        cm.sendYesNo("����ץס������#o9300174#���öӳ���ȫ��#b20�� #t4001169##k�����ң��Ϳ��Լ�������" + "\r\n\r\n������Ҫ����#r�����˳�#k������ȷ��һ�£��������ͬ����Ȼ��Ҫ������");
                                    }
                                }
                            }
                        } else {
                            cm.sendYesNo(ellinStr + "\r\n\r\n������Ҫ����#r�����˳�#k������ȷ��һ�£��������ͬ����Ȼ��Ҫ������");
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
	    return "��ӭ��������ɭ�֡�����봫�͵��������";
	    
	case 930000100:
	    return "#b#o9300172##kռ������Ƭ�������Ǳ����������б���Ⱦ�Ĺ�����ܼ���ǰ����";
	    
	case 930000200:
	    return "һ���޴�Ĵ��ٵ�ס��ǰ���ĵ�·��Ϊ��������һ�ϰ���������Ҫ��ȡ#b#o9300173##kЯ���Ķ��أ�����ֹ��Ƭ����������������Ȼ�Ķ��ؼ��������ƿأ�Ũ��̫���ˡ����Ǳߵ�#bȪˮ#k��ϡ��һ�°ɡ�";
	    
	case 930000300:
            return "̫���ˣ��㵽��������������ڿ��Լ���̽��ɭ�ֵ���ˡ�";
	    
	case 930000400:
	    return "#b#o9300175##kռ������Ƭ�������ǲ�����ͨ�Ĺ�����ǵ������ٶȷǳ�Ѹ�٣�����#r��ȫ������ͨ�������ħ�������˺�#k�����Ǳ���ʹ��#b#t2270004##k�����������б���Ⱦ�Ĺ������Ķӳ�����20�����������ϻ�õĹ���֮�顣";
	    
	case 930000600:
	    return "�������ɭ������������ĸ�Դ���ѵõ���ħ��ʯ���ڼ�̳�ϣ�����׼��ӭս�ɣ�";
	    
	case 930000700:
	    return "�������������������ˣ���ĺܸ�л���Ǿ�������Ƭɭ�֣�";
	    
    }
}