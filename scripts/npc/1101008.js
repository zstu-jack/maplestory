function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if(status == 0){
			cm.sendSimple("���㵽��10��ʱ������˽�ģ������������ǰ����׼��������Բ鿴������Ϣ��\r\n\r\n �����ң�����֪��ʲô?\r\n#b#L0#������#l\r\n#L1#С��ͼ#l\r\n#L2#���񴰿�w#l\r\n#L3#��Ʒ��#l\r\n#L4#��ͨ��������#l\r\n#L5#���ʰȡ��Ʒ#l\r\n#L6#���װ����Ʒ#l\r\n#L7#������#l\r\n#L8#���ʹ�ÿ����#l\r\n#L9#��ι�������#l\r\n#L10#�������������#l\r\n#L11#�����ͼ#l\r\n#L12#����֪ͨ#l\r\n#L13#����ͳ��#l\r\n#L14#�������ʿ��˭?#l");
	    } else if(status == 1){
			if(selection == 0){
				cm.sendNext("����Ů��ϣ��˹���ػ������ޡ��ҵ����ˡ�������Ů�ʣ�����������ÿһ������ð��������˼���Ů����ʿ�š��ҽ�Э���������㣬ֱ�����Ϊ��ʿ����һ�졣������κ����⣬��ʱ��ѯ�ҡ�");
		    } else if(selection == 1){
				cm.guideHint(1);
				cm.dispose();
			} else if(selection == 2){
				cm.guideHint(2);
				cm.dispose();
			} else if(selection == 3){
				cm.guideHint(3);
				cm.dispose();
			} else if(selection == 4){
				cm.guideHint(4);
				cm.dispose();
			} else if(selection == 5){
				cm.guideHint(5);
				cm.dispose();
			} else if(selection == 6){
				cm.guideHint(6);
				cm.dispose();
			} else if(selection == 7){
				cm.guideHint(7);
				cm.dispose();
			} else if(selection == 8){
				cm.guideHint(8);
				cm.dispose();
			} else if(selection == 9){
				cm.guideHint(9);
				cm.dispose();
			} else if(selection == 10){
				cm.guideHint(10);
				cm.dispose();
			} else if(selection == 11){
				cm.guideHint(11);
				cm.dispose();
			} else if(selection == 12){
				cm.guideHint(12);
				cm.dispose();
			} else if(selection == 13){
				cm.guideHint(13);
				cm.dispose();				
			} else if(selection == 14){
				cm.sendOk("��ħ��ʦ����ͼ�ı䲢�������Ǻ�ƽ��ð�յ����硣Ϊ��Ӧ�Է��գ�Ů�ʳ�������ʿ�ţ����ڱ���ΪŮ����ʿ�š�����ﵽ10��ʱ������Գ�Ϊһ����ʿ��");
				cm.dispose();
			} 
		}else if(status == 2){
				cm.sendNextPrev("���õ��ġ�������������л���ѧ���������ܡ���ﵽ10�����������ʱ�������⣬���Բ����ż���");
				cm.dispose();
			}
	}
}