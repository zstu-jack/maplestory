
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
        var text = "#e#kС˯ð�յ���ǿ����#k\r\n\r\n #L0##e#d���ü��ܵ�#l \t #L1#��������ֵ#l \t #L2#��HPMP#l \r\n ";
        text += "#L3#���õȼ�#l  \t\t " + "#L5#����buff#l  \t\t " + "#L4#ţ��װ��#l \r\n ";
        text += "#L6#�л�ְҵ#l  \t\t " + "#L7#���ҽ��#l  \t\t " + "#L8#���ҵ�ȯ#l \r\n ";
        text += "#L9#���ñ���#l  \t\t " + "#L10#��������#l \r\n";
        cm.sendSimple(text);
    } else if (status === 1) {
        selectType = selection;
        if (selection === 0) {
            cm.sendGetNumber("��Ϊ���ټ��ܵ�", 100, 1, 10000);
        } else if (selection === 1) {
            cm.sendGetNumber("��Ϊ�������Ե�", 100, 1, 10000);
        } else if (selection === 2) {
            cm.executeGM("@heal");
            cm.message("OK, ��Ѫ����");
            cm.dispose();
        } else if (selection === 3) {
            cm.sendGetNumber("��Ϊ���ټ�", 20, 1, 255);
        } else if (selection === 4) {
            cm.executeGM("@seteqstat 1605631");
            cm.message("OK, �������װ������ú�ţ����");
            cm.dispose();
        } else if (selection === 5) {
            cm.executeGM("@empowerme");
            cm.message("OK, ���кܶ�ܶ�buff��");
            cm.dispose();
        }  else if (selection === 6) {
            var text = "#e#k��Ҫ����ĸ�ְҵ(@job)#k\r\n";
            text += "#L0#����#l \r\n \r\n";
            
            text += "#L100#սʿ#l \r\n ";
            text += "#L110#����#l \t #L111#��ʿ#l \t #L112#Ӣ��#l \r\n ";
            text += "#L120#׼��ʿ#l \t #L121#��ʿ#l \t #L122#ʥ��ʿ#l \r\n ";
            text += "#L130#ǹսʿ#l \t #L131#����ʿ#l \t #L132#����ʿ#l \r\n \r\n";

            text += "#L200#ħ��ʦ#l \r\n ";
            text += "#L210#�𶾷�ʦ#l \t #L211#����ʦ#l \t #L212#��ħ��ʦ#l \r\n ";
            text += "#L220#���׷�ʦ#l \t #L221#������ʦ#l \t #L222#����ħ��ʦ#l \r\n ";
            text += "#L230#��ʦ#l \t #L231#��˾#l \t #L232#����#l \r\n \r\n";

            text += "#L300#������#l \r\n ";
            text += "#L310#����#l \t #L311#����#l \t #L312#������#l \r\n ";
            text += "#L320#����#l \t #L321#����#l \t #L322#����#l \r\n \r\n ";

            text += "#L400#����#l \r\n ";
            text += "#L410#�̿�#l \t #L411#��Ӱ��#l \t #L412#��ʿ#l \r\n ";
            text += "#L420#����#l \t #L421#���п�#l \t #L422#����#l \r\n \r\n ";

            text += "#L500#����#l \r\n ";
            text += "#L510#ȭ��#l \t #L511#��ʿ#l \t #L512#���ӳ�#l \r\n ";
            text += "#L520#��ǹ��#l \t #L521#��#l \t #L522#����#l \r\n \r\n ";

            // text += "#L800#��������ʹ#l \r\n \r\n";
            
            text += "#L2000#սͯ#l \r\n ";
            // text += "#L2001#EVAN#l \r\n ";
            text += "#L2100#ARAN1#l \t #L2110#ARAN2#l \t #L2111#ARAN3#l \t #L2112#ARAN4#l \r\n\r\n  ";

            // text += "#L2200#����#l \r\n ";
            // text += "#L2210#EVAN2#l \t #L2211#EVAN3#l \t #L2212#EVAN4#l \t #L2213#EVAN5#l \r\n ";
            // text += "#L2214#EVAN6#l \t #L2215#EVAN7#l \t #L2216#EVAN8#l \t #L2217#EVAN9#l \r\n ";
            // text += "#L2218#EVAN10#l \r\n\r\n  ";
            cm.sendSimple(text);
        } else if (selection === 7) {
            cm.sendGetNumber("��Ҫ���ٽ��", 500000, 500000, 50000000);
        } else if (selection === 8) {
            cm.sendGetNumber("��Ҫ���ٵ�ȯ", 100000, 100000, 10000000);
        } else if (selection === 9) {
            cm.sendGetNumber("��Ҫ����Ϊ������λ", 96, 24, 96);
        } else if (selection === 10) {
            cm.sendGetNumber("��Ҫ��������", 10, 1, 9999);
        }

    } else if (status === 2) {
        if (selectType === 0) {
            cm.executeGM("@sp " + selection);
            cm.message("OK, ���ܵ�=" + selection);
        } else if (selectType === 1) {
            cm.executeGM("@ap " + selection);
            cm.message("OK, ���Ե�=" + selection);
        }else if (selectType === 3) {
            cm.executeGM("@level " + selection);
            cm.message("OK, �ȼ�+" + selection);
        }else if(selectType === 6){
            cm.executeGM("@job " + selection);
            cm.message("OK, ��ɹ�תְ�ˣ���ȥ�ɣ�ְҵid=" + selection);
        }else if (selectType === 7) {
            cm.executeGM("@givems " + selection);
            cm.message("OK, ���+" + selection);
        } else if (selectType === 8) {
            cm.executeGM("@givenx " + selection);
            cm.message("OK, ��ȯ+" + selection);
        }else if (selectType === 9) {
            cm.executeGM("@setslot " + selection);
            cm.message("OK, ��λ=" + selection);
        }else if (selectType === 10) {
            cm.executeGM("@fame " + cm.getName() + " " + selection);
            cm.message("OK, " + cm.getName() + " ����������:" + selection);
        }
        cm.dispose();
    }
}

