
function start() {
    status = -1;
    action(1, 0, 0);
}

var selectType = -1;

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (status >= 0 && mode === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    if (status === 0) {
        var text = "#e#k百货商场#k\r\n\r\n"
        text += "#L0##i4080100##t4080100#(记忆大考验#l \t \r\n ";
        text += "#L1##i4080000##t4080000#(五子棋棋盘#l \t \r\n ";
        cm.sendSimple(text);
    } else if (status === 1) {
        selectType = selection;
        if (selection === 0) {
            cm.executeGM("@item 4080100 1");
            cm.dispose();  
        } else if (selection === 1) {
            cm.executeGM("@item 4080000 1");
            cm.executeGM("@item 4080001 1");
            cm.executeGM("@item 4080002 1");
            cm.executeGM("@item 4080003 1");
            cm.executeGM("@item 4080004 1");
            cm.executeGM("@item 4080005 1");
            cm.dispose();
        }else{
            cm.dispose();
        }
    }
}

