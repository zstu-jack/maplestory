/*
 * Time Temple - Kirston
 * Twilight of the Gods
 */

function start() {
    cm.sendAcceptDecline("���ӵ��Ů��ľ��ӣ��ҾͿ��������ٻ���ħ��ʦ�ˣ�\r\n�ȵȣ����Ծ���Ϊʲôû���ٻ��ɹ����ȵȣ���������ǣ��Ҹ��ܵ�����...ȫȻ��ͬ�ں�ħ��ʦ�Ĵ��ڰ�����������!!!!! \r\n\r\n #b(��һֻ�ַ��������ļ���ϡ�)");
}

function action(mode, type, selection) {
    if (mode == 1) {
	cm.removeNpc(270050100, 2141000);
	cm.forceStartReactor(270050100, 2709000);
    }
    cm.dispose();

// If accepted, = summon PB + Kriston Disappear + 1 hour timer
// If deny = NoTHING HAPPEN
}