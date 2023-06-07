var arena;
var status = 0;

importPackage(Packages.client);

function start() {
    arena = cm.getPlayer().getAriantColiseum();
    if (arena == null) {
        cm.sendOk("Hey, I did not see you on the field during the battle in the arena! What are you doing here?");
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
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            copns = arena.getAriantScore(cm.getPlayer());
            if (copns < 1 && !cm.getPlayer().isGM()) {
                cm.sendOk("������һ����ʯҲû�õ�����");
                cm.dispose();
            } else {
                cm.sendNext("�ã��ҿ���...��ɵò���Ū���� #b" + copns + "#k ö��ϲ���ı�ʯ����Ȼ������˱������Ҿͽ����� #b" + arena.getAriantRewardTier(cm.getPlayer()) + " �㾺��������#k��Ҫ���㻹��֪�������йؾ��������ֵ����飬��ȥ��#b#p2101015##k �ʰɡ�");
            }
        } else if (status == 1) {
            //cm.warp(980010020, 0);
            copns = arena.getAriantRewardTier(cm.getPlayer());
            arena.clearAriantRewardTier(cm.getPlayer());
            arena.clearAriantScore(cm.getPlayer());
            cm.removeAll(4031868);
            
            cm.getPlayer().gainExp(92.7 * cm.getPlayer().getExpRate() * copns, true, true);
            cm.getPlayer().gainAriantPoints(copns);
            cm.sendOk("���ˣ��´θ��Ҵ������౦ʯ��Ŷ�ǺǺǺǺǣ�"); 
            cm.dispose();
        }
    }
}