/* @Author Ronan
 * @Author Vcoc
        Name: Steward
        Map(s): Foyer
        Info: Commands
        Script: commands.js
*/

importPackage(Packages.client.command);

var status;

var common_heading = "@";
var staff_heading = "!";

var levels = ["普通玩家", "捐赠玩家", "小GM", "GM", "大GM", "开发者", "超级管理员"];
var commands;

function writeHeavenMSCommands() {
    commands = CommandsExecutor.getInstance().getGmCommands();
}

function start() {
    status = -1;
    writeHeavenMSCommands();
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            var sendStr = "你当前可用的指令:\r\n\r\n#b";
            for (var i = 0; i <= cm.getPlayer().gmLevel(); i++) {
                sendStr += "#L" + i + "#" + levels[i] + "#l\r\n";
            }

            cm.sendSimple(sendStr);
        } else if (status == 1) {
            var lvComm, lvDesc, lvHead = (selection < 2) ? common_heading : staff_heading;

            if (selection > 6) {
                selection = 6;
            } else if (selection < 0) {
                selection = 0;
            }

            lvComm = commands.get(selection).getLeft();
            lvDesc = commands.get(selection).getRight();

            var sendStr = "以下命令可用于 #b" + levels[selection] + "#k:\r\n\r\n";
            for (var i = 0; i < lvComm.size(); i++) {
                sendStr += "  #L" + i + "# " + lvHead + lvComm.get(i) + " - " + lvDesc.get(i);
                sendStr += "#l\r\n";
            }

            cm.sendPrev(sendStr);
        } else {
            cm.dispose();
        }
    }
}
