var status = 0;

var spawnPnpc = false;
var spawnPnpcFee = 7000000;
var jobType = 21;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "������ǧ�����Ż���˽���ĳɾ͡���Ҫ #r������������������#k ��";
        if(spawnPnpcFee > 0) {
            sendStr += "ֻҪ֧�� #b " + cm.numberWithCommas(spawnPnpcFee) + " ���#k���ҾͿ��Խ����������������á�";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        cm.sendOk("���������������Ӣ�۴��ˣ���Щ������ǿ���������ڴӺܾ�֮ǰ�ͱ��������ǵ�Ӣ��ս�ѡ�");//ս��ű���������û����
        cm.dispose();
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type != 1)
        status -= 2;
    if (status == -1){
        start();
        return;
    } else {
        if(spawnPnpc) {
            if(mode > 0) {
                if(cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("��Ǹ����û���㹻�Ľ�ң��޷����������á�");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("��ȥ�����ɣ�ϣ�����ϲ����");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("��Ǹ���������Ѿ���Ա�ˡ�");
                }
            }
            
            cm.dispose();
            return;
        } else {
            // do nothing
        }
    }
}