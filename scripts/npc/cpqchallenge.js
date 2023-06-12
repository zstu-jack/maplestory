/**
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Drago (MapleStorySA)
        2.0 - Second Version by Jayd - translated CPQ contents to English
---------------------------------------------------------------------------------------------------
**/

importPackage(Packages.constants.game);

var status = 0;
var party;

function start(chrs) {
    status = -1;
    party = chrs;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.answerCPQChallenge(false);
        cm.getChar().setChallenged(false);
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.answerCPQChallenge(false);
            cm.getChar().setChallenged(false);
            cm.dispose();
            return;
        }
    }
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            if (cm.getParty().getMembers().size() == party.size()) {
                cm.getPlayer().setChallenged(true);
                var snd = "";
                for (var i = 0; i < party.size(); i++)
                    snd += "#b名字： " + party.get(i).getName() + " / (等级： " + party.get(i).getLevel() + ") / " + GameConstants.getJobName(party.get(i).getJobId()) + "#k\r\n\r\n";
                cm.sendAcceptDecline(snd + "你想要在怪物嘉年华中与这支队伍对抗吗？");
            } else {
                cm.answerCPQChallenge(false);
                cm.getChar().setChallenged(false);
                cm.dispose();
            }
        } else if (status == 1) {
            if (party.size() == cm.getParty().getMembers().size()) {
                cm.answerCPQChallenge(true);
            } else {
                cm.answerCPQChallenge(false);
                cm.getChar().setChallenged(false);
                cm.sendOk("需要组队成员人数相等方可开启战斗。");
            }
            cm.dispose();
        }
    }
}