/*
  Growlie (that fatass uhh.. hungry lion or whatever)

  @author FightDesign (RageZONE)
  @author Ronan
  */

var status = 0;
var chosen = -1;

function clearStage(stage, eim) {
        eim.setProperty(stage + "stageclear", "true");
        eim.showClearEffect(true);

        eim.giveEventPlayersStageReward(stage);
}

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode < 0) {
                cm.dispose();
                return;
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 0)
                        status += ((chosen == 2) ? 1 : -1);
                else
                        status++;
                    
                if (status == 0) {
                        if (cm.isEventLeader()) {
                                cm.sendSimple("����С�ϻ�������ô���ģ�\r\n#b#L0# ����֪�������һ�С�#l\r\n#L1# �Ҹ�������� #t4001101#.#l\r\n#L2# ��Ҫ�뿪���#l");
                        } else {
                                cm.sendSimple("����С�ϻ�������ô���ģ�\r\n#b#L0# �鿴˵����#l\r\n#L2# ��Ҫ�뿪���#l");
                        }
                } else if (status == 1) {
                        if (chosen == -1)
                                chosen = selection;
                        if (chosen == 0) {
                                cm.sendNext("ÿ�����¶���������Ʒ������������������ζ��⡣");
                        } else if (chosen == 1) {
                                if (cm.haveItem(4001101, 10)) {
                                        cm.sendNext("������ݸ��ҡ��š������⿴��������ζ���´����������˽����#b#t4001101##k��ף��ؼ���;ƽ����");
                                } else {
                                        cm.sendOk("�������ټ��һ�±������Ƿ��� #b10 #t4001101#s#k.");
                                        cm.dispose();
                                }
                        } else if (chosen == 2) {
                                cm.sendYesNo("��ȷ��Ҫ�뿪������");
                        }
                        else {
                                cm.dispose();
                                return;
                        }
                } else if (status == 2) {
                        if (chosen == 0) {
                                cm.sendNextPrev("����Ƭ����ı�����Ҷ���ϲɼ����������ӣ���������ֲ�����¸�����ƽ̨�������ɿ������������š���������6�����ͣ����Ƕ���Ҫ��Ӧ��ƽ̨��ƽ̨���ˣ���������Ӳ��ܿ���������");
                        } else if (chosen == 1) {
                                cm.gainItem(4001101, -10);

                                var eim = cm.getEventInstance();
                                clearStage(1, eim);

                                var map = eim.getMapInstance(cm.getPlayer().getMapId());
                                map.killAllMonstersNotFriendly();

                                eim.clearPQ();
                                cm.dispose();
                        } else {
                                if (mode == 1) {
                                        cm.warp(910010300);
                                } else {
                                        cm.sendOk("���ռ�һЩ��ζ����⣬ʱ�䲻���ˡ�����");
                                }
                                cm.dispose();
                        }
                } else if (status == 3) {
                        if (chosen == 0) {
                                cm.sendNextPrev("��������ʢ��ʱ�����¾ͻ�������ʱ�����þͻ���ֲ���ʼ�ô�������⡣�����������ֹ����ɧ�������ã�ȷ�����ܹ����о���������⡣");
                        }
                } else if (status == 4) {
                        if (chosen == 0) {
                                cm.sendNextPrev("��ϣ��������ͬ�����������10����⡣ע�⵹��ʱ������ʱ����ر�ǿ�ƴ����뿪��");
                        }
                } else {
                        cm.dispose();
                }
        }
}