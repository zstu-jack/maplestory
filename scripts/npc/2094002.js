var status = -1;
var level = 1;

function start() {
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (cm.getPlayer().getMapId() == 925100700) {
	cm.warp(251010404,0);
	cm.dispose();
	return;
    }
    
    if(status == 1) {   // leaders cant withdraw
        cm.warp(251010404,0);
        return;
    }
    
    if (!cm.isEventLeader()) {
	cm.sendYesNo("ϣ����Ķӳ������������ҶԻ����ֻ��ߣ�������˳���������λ��");
    }
    else {
        var eim = cm.getEventInstance();
        if (eim == null) {
            cm.warp(251010404,0);
            cm.sendNext("û�п�ʼ�������������ô�ܵ�������ģ�");
            cm.dispose();
            return;
        }

        level = eim.getProperty("level");

        switch(cm.getPlayer().getMapId()) {
            case 925100000:
                cm.sendNext("���������򺣵���ǰ����Ҫ���ȥ�����Ǳ���ɵ����е���·�ϵĹ��");
                cm.dispose();
                break;
            case 925100100:
                var emp = eim.getProperty("stage2");
                if (emp.equals("0")) {
                    if (cm.haveItem(4001120,20)) {
                        cm.sendNext("�ɵ�Ư��������ȥ����20���м�������֤����");
                        cm.gainItem(4001120,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "1");
                    } else {
                        cm.sendNext("���������򺣵���ǰ����Ҫ���ȥ�����Ǳ�����֤���Լ�ӵ�к�������ݡ�ȥ����20������������֤����");
                    }
                } else if (emp.equals("1")) {
                    if (cm.haveItem(4001121,20)) {
                        cm.sendNext("�ɵ�Ư��������ȥ����20���м�������֤����");
                        cm.gainItem(4001121,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "2");
                    } else {
                        cm.sendNext("���������򺣵���ǰ����Ҫ���ȥ�����Ǳ�����֤���Լ�ӵ�к�������ݡ�ȥ����20���м�������֤����");
                    }
                } else if (emp.equals("2")) {
                    if (cm.haveItem(4001122,20)) {
                        cm.sendNext("�ɵ�Ư���������ߡ�");
                        cm.gainItem(4001122,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "3");
                        eim.showClearEffect(cm.getMapId());
                    } else {
                        cm.sendNext("���������򺣵���ǰ����Ҫ���ȥ�����Ǳ�����֤���Լ�ӵ�к�������ݡ�ȥ����20���߼�������֤����");
                    }
                } else {
                    cm.sendNext("��һ�׶��Ѿ������ˣ�ǰ����");
                }
                cm.dispose();
                break;
            case 925100200:
            case 925100300:
                cm.sendNext("���ǵ��������أ�������Ϯ��������");
                cm.dispose();
                break;
            case 925100201:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("�Ϻ����ı�������ˣ�����������һ��Կ�ף��������ڱ���ǰ�����ؾͻ���֡�������Ҳ�����Ϻ�����ø��ӷ�ŭ��");
                    if (eim.getProperty("stage2a") == "0") {
                        cm.getMap().setReactorState();
                        eim.setProperty("stage2a", "1");
                    }
                } else {
                    cm.sendNext("��Щ�۹����������ˣ����ǵ÷��������ɡ�");
                }
                cm.dispose();
                break;
            case 925100301:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("�Ϻ����ı�������ˣ�����������һ��Կ�ף��������ڱ���ǰ�����ؾͻ���֡�������Ҳ�����Ϻ�����ø��ӷ�ŭ��");
                    if (eim.getProperty("stage3a").equals("0")) {
                        cm.getMap().setReactorState();
                        eim.setProperty("stage3a", "1");
                    }
                } else {
                    cm.sendNext("��Щ�۹����������ˣ����ǵ÷��������ɡ�");
                }
                cm.dispose();
                break;
            case 925100202:
            case 925100302:
                cm.sendNext("��Щ�һ��ǿ����Ϳ�³������Ϊ�Ϻ����������������ʱ���ѵ����Ͱ����Ǹɵ���");
                cm.dispose();
                break;
            case 925100400:
                cm.sendNext("��Щ�һ������Ҵ��Ķ�����Դ�����ǵ�������Կ�װ����Ƕ��������գ�");
                cm.dispose();
                break;
            case 925100500:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("лл����������ǵ����죬����Ƿ��һ�����飡");
                } else {
                    cm.sendNext("������й���Ϻ�����ආ�Ҳ��Ҫ�Ź���");
                }
                cm.dispose();
                break;
        }
    }
    
    
}