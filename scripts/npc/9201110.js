/* @Author SharpAceX
*/

function start() {
	switch(cm.getPlayer().getMapId()) {
		case 610030500:
        		cm.sendOk("每一位飞侠都深知，最巧妙的攻击永远来自最意想不到的方位。而飞侠专精房间很好地诠释了这一点，在这里，你需要在平台与横档之间闪转腾挪，快速抵达全视之眼所在处，用短刀或是拳套消灭它们。等到全视之眼尽数清除后，开启飞侠雕像，从中取得原初之爪。祝你好运。");
			break;
		case 610030000:
			cm.sendOk("亮大师一度被称为“影武者”，他能够活用短刀与链爪，作战时兼具速度与力量。偶尔参与远征队的经历却令他声名大噪，那无与伦比的隐蔽能力令人难以忘怀。他的传说在与绯红魔神的作战中达到了顶峰，这场战斗中，绯红之主啸吼着尝试攻击，然而落在旁人眼中却只是对着空气徒劳无功地挥拳而已。而对于那些陷入不幸的同门，亮也从来不吝伸出援手。");
			break;
		case 610030530:
			if (cm.isAllReactorState(6108004, 1)) {
                                var eim = cm.getEventInstance();
                                var stgStatus = eim.getIntProperty("glpq5_room");
                                var jobNiche = cm.getPlayer().getJob().getJobNiche();

                                if ((stgStatus >> jobNiche) % 2 == 0) {
                                        if(cm.canHold(4001256, 1)) {
                                                cm.gainItem(4001256, 1);
                                                其他栏cm.sendOk("做得好。");

                                                stgStatus += (1 << jobNiche);
                                                eim.setIntProperty("glpq5_room", stgStatus);
                                        } else {
                                                cm.sendOk("需要先空出一格其他栏。");
                                        }
                                } else {
                                        cm.sendOk("这个房间中的武器已经被取走了。");
                                }
			} else {
				cm.sendOk("去吧，善用你伶俐的身手，摧毁所有全视之眼。");
			}
			break;
	}
	cm.dispose();
}