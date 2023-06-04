/**
 * @author: Eric
 * @author: Ronan
 * @npc: Red Sign
 * @map: 101st Floor Eos Tower (221024500)
 * @func: Ludi PQ
*/

var status = 0;
var em = null;

function start() {
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
                
                if (status == 0) {
                        em = cm.getEventManager("LudiPQ");
                        if(em == null) {
                                cm.sendOk("��߳�101�������������һ������");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<�������ʱ���ѷ�>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n��Ϊ�зǳ�Σ�յ������̾����ϲ㣬Ŀǰ�޷�ͨ�С�����Ҫ����ӳ�Աһ��������������������������������#b�ӳ�#k�����ҶԻ���#b\r\n#L0#����Ҫִ���������\r\n#L1#����Ҫ " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " ���������\r\n#L2#����Ҫ��ȡ�������ϸ�ڡ�");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("�������״̬ʱ������ִ���������");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("�����ִ���������������Ķӳ������ҶԻ���");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("��Ƶ���Ѿ��ж�������ִ�����������ȴ���������������л�������Ƶ����");                            
                                                }
                                        }
                                        else {
                                                cm.sendOk("Ŀǰ�޷�ִ���������ԭ��������������������Ҫ������д��ڲ������ʸ�ĳ�Ա����ӳ�Աû�н��뱾��ͼ֮һ�����ȱ����ӳ�Ա���볢������������ܡ�");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("�����������״̬Ϊ: #b" + (psState ? "����" : "����") + "#k����Ҫ����ʱ�����ҶԻ���");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<�������ʱ���ѷ�>#k#n\r\nһ��ʱ���ѷ���#b#m220000000##k�γ��ˡ�������Ҫ�¸ҵ�ð��������ܴ�����ά�����ֵĹ����ǡ���Ѱ�ҿɿ��Ķ���һ������#m220000000#�����ǽ����ܹ�������������ͨ�����ֹؿ���������#r#o9300012##k��");
                                cm.dispose();
                        }
                }
        }
}