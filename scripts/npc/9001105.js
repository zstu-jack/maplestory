var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        if (cm.getPlayer().getMapId() == 922240200)  {
                                cm.sendOk("�治�����ӣ�����׼�����������ɡ�");
                        }
                        
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if (cm.getMapId() == 922240200) {
                                cm.sendSimple("��ո��ǲ�����ʲô��Ҫ˵...��#b\b\r\n#L0#����Ҫ���ȼѼѡ�#l\r\n");    //#L1#I want to go to the Space Mine.#l
                        } else if (cm.getMapId() >= 922240000 && cm.getMapId() <= 922240019) {
                                cm.sendYesNo("���������Ҳ��Ҫ���ġ����ܹ���3�λ��ᡣ������Ҫ������"); 
                        } else if (cm.getMapId() >= 922240100 && cm.getMapId() <= 922240119) {
                                var text = "����˺ܴ�Ĺ�����Ӫ�ȼѼѣ��������������ֻص�ԭ���ˡ�";				
                                var rgaga = cm.getPlayer().getEvents().get("rescueGaga");
                                if (rgaga.getCompleted() > 10) {
                                        text += "��������ֱ���Ѽѻ�ȡ���Ҫ����һ��̫�մ�������������Ϊֹ�ĳɾ͡���Ȼ�������õģ���Ӧ�û���ʹ�á��������#b���ܴ���#k�ɡ�";
                                        rgaga.giveSkill(cm.getPlayer());
                                } else 
                                        text += "���ǻ�ȥ�ɡ�";

                                cm.sendNext(text); 
                        }
                } else {
                        if (cm.getPlayer().getMapId() == 922240200) {
                                if (status == 1) {
                                        if(selection == 0) {
                                                selected = 1;
                                                cm.sendNext("�����ˣ�����ľ������Ѿ���Ӥ������������˵�ˡ���������������ο������Ҫ���˰�æ�ء��Ѽ����ҵ����ѣ�����ǰ�������ң�����ʱ������߿����ҡ��ܲ��ҵ��ǣ����������˰���ˡ�"); 
                                        } else {
                                                selected = 2;
                                                cm.sendYesNo("�������ɽ������ҵ�һ����Ϊ#b봽ᾧ��#k�Ŀ�ʯ�����̺������ص�����������#b봽ᾧ��#lͨ������ĸ��ɫ�ģ�Ȼ��һ����̫�մ���#b̫������#k���оͻ�ת��Ϊ��ɫ��Ҫ��ס��Ϊ�˴�������˵���ı����Ҫ�ҵ�#b10ö��ɫ봽ᾧ���10ö��ɫ봽ᾧ��#k����������ֻ��#b1ö봽ᾧ��#kҲ�ܰ���æ�������ܶ�ذ������������ҡ�Ŷ������һ���£�̫�տ�ɽ���������㿴���š�������Ϊ#b봽ᾧ��#k����������ޱ�ǿ�����Բ�Ҫ��ͼ������ǡ�ֻҪ��ע���������ڿ����ռ��ᾧ���Ͼͺá�"); 
                                        } 
                                } else if (status == 2) {
                                        if(selected == 1) {
                                                cm.sendYesNo("������Ǿ���ô�ѼѼѶ�������������ͻ��п��µ����鷢���������ϣ��һ�����Ӥ�������ǰ�ù�������̫�մ����������ȼѼѡ��Ѽѿ�����Щ�Ժ�����������ģ�����#k������Ǹ�����������ˡ���������Ҫȥ������");
                                        } else if(selected == 2) { 
                                                cm.sendOk("��û�б��룬�޿�����");//�����˼���������ɽ��·��ͨ��L1��ע�͵���
                                                cm.dispose();
                                        }
                                } else if (status == 3) {
                                        var em = cm.getEventManager("RescueGaga");
                                        if (em == null) {
                                                cm.sendOk("�Ŀǰ��δ������");
                                        } else if (!em.startInstance(cm.getPlayer())) {
                                                cm.sendOk("��ͼ��Ŀǰ����������ң����Ժ�������");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (cm.getPlayer().getMapId() >= 922240000 && cm.getPlayer().getMapId() <= 922240019) {
                                cm.warp(922240200, 0);
                                cm.dispose();
                        } else if (cm.getPlayer().getMapId() >= 922240100 && cm.getPlayer().getMapId() <= 922240119) {
                                cm.warp(922240200, 0);
                                cm.dispose();
                        }
                }
        }
}