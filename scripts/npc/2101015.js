var arena;
var status = 0;

importPackage(Packages.client);

function start() {
    arena = cm.getPlayer().getAriantColiseum();
    if (arena == null) {
        cm.sendOk("�٣����ھ�����֮ǰ��ս����û�����㣡��������ʲô�ģ�");
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
            menuStr = generateSelectionMenu(["��Ҫ�鿴�ҵľ��������֣�/ ��Ҫ����1��Ҭ����ɳ̲��", "�����˽��������й��ھ����������顣"]);
            cm.sendSimple("��ã���ʲô����\r\n\r\n" + menuStr);
        } else if (status == 1) {
            if (selection == 0) {
                apqpoints = cm.getPlayer().getAriantPoints();
                if (apqpoints < 100) {
                    cm.sendOk("��ľ����������ǣ�#b" + apqpoints + "#k �㡣��Ҫӵ�г��� #b100��#k �Ļ��ֲ��ܴ�������ȡ #bҬ����ɳ̲��#k���ȵ���ӵ�����㹻�ĵ��������ɡ�");
                    cm.dispose();
                } else if (apqpoints + arena.getAriantRewardTier(cm.getPlayer()) >= 100) {
                    cm.sendOk("��ľ����������ǣ�#b" + apqpoints + "#k �㡣���������Ҫ���ˣ�ȥ���ҵ�����#p2101016#�Ի���Ȼ���������ҡ�");
                    cm.dispose();
                } else {
                    cm.sendNext("�ۣ����������� #b100#k ���ˣ�Ҫ���ڽ�����");
                }
            } else if (selection == 1) {
                cm.sendOk("�ⳡ����������ҪĿ�����������ۻ��㹻�Ļ��֣������������ս����� #bҬ����ɳ̲��#k����ս���л�û��֣�Ȼ�����ҶԻ���ȡ������ÿ��ս���У���Ҷ����������ӵ�еı�ʯ������û��֡���Ҫע�⣬�����Ļ��������������� #r�߳�̫��#k���п��ܰ׷ѹ������ֻ�õ� #r1�����#k��");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.getPlayer().gainAriantPoints(-100);
            cm.gainItem(3010018, 1);
            cm.dispose();
        }
    }
}

function generateSelectionMenu(array) {     // nice tool for generating a string for the sendSimple functionality
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "##b" + array[i] + "#l#k\r\n";
    }
    return menu;
}