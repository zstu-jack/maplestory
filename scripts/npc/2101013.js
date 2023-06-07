/* Author: aaroncsn <MapleSea Like>
	NPC Name: 		Karcasa
	Map(s): 		The Burning Sands: Tents of the Entertainers(260010600)
	Description: 		Warps to Victoria Island
*/
var towns = new Array(100000000,101000000,102000000,103000000,104000000);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (mode == 0) {
		cm.sendNext("��...���ǿֿ컹�ǿָ߰����ڻ����ҵķ��м����������ң��Ҷ���ʹ��ָ���ˣ�");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if(status == 0){
		cm.sendNext("�Ҳ�֪��������ô�ҵ�������ģ��������Եط��ˣ���һ�̲�ͣ��Ϊ��Щ�����ɳĮ���ǻ���˼�����е������ṩǰ����������ֱ�ɺ��ࡣ������ܷ�ͧ������Ҳ�͵�������һ���أ���˵�ˣ�����ôС�ķɴ���;���У������ıտ־�֢������ ");
	} else if(status == 1){
		cm.sendYesNo("��ס�����¡���һ������ʵ����Զ�����亽�ߣ����� #rI��Ҳ��֪��������ĸ��������#k���ڶ�����ȻҪ���������⺽�࣬�շѾ�Ҫ��һЩ��������� #e#b10,000 ���#n#k�������Ҫ����ˣ�����Ȥ�������ֱ�ﺽ����");
	} else if(status == 2){
		cm.sendNext("�ã�׼�������~");
	} else if(status == 3){
		if(cm.getMeso() >= 10000){
			cm.gainMeso(-10000);
			cm.warp(towns[Math.floor(Math.random() * towns.length)]);
		} else{
			cm.sendNextPrev("�٣���Ǯ�����𣿶�˵���ˣ������� #b10,000#k ��Ҳ�����������");
			cm.dispose();
			}
		}
	}
}