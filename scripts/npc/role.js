
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
        var text = "#e#k小睡冒险岛变强服务#k\r\n\r\n #L0##e#d设置技能点#l \t #L1#设置属性值#l \t #L2#满HPMP#l \r\n ";
        text += "#L3#设置等级#l  \t\t " + "#L5#给我buff#l  \t\t " + "#L4#牛逼装备#l \r\n ";
        text += "#L6#切换职业#l  \t\t " + "#L7#给我金币#l  \t\t " + "#L8#给我点券#l \r\n ";
        text += "#L9#设置背包#l  \t\t " + "#L10#给我人气#l \r\n";
        cm.sendSimple(text);
    } else if (status === 1) {
        selectType = selection;
        if (selection === 0) {
            cm.sendGetNumber("设为多少技能点", 100, 1, 10000);
        } else if (selection === 1) {
            cm.sendGetNumber("设为多少属性点", 100, 1, 10000);
        } else if (selection === 2) {
            cm.executeGM("@heal");
            cm.message("OK, 满血复活");
            cm.dispose();
        } else if (selection === 3) {
            cm.sendGetNumber("设为多少级", 20, 1, 255);
        } else if (selection === 4) {
            cm.executeGM("@seteqstat 1605631");
            cm.message("OK, 背包里的装备都变得很牛逼了");
            cm.dispose();
        } else if (selection === 5) {
            cm.executeGM("@empowerme");
            cm.message("OK, 你有很多很多buff了");
            cm.dispose();
        }  else if (selection === 6) {
            var text = "#e#k你要变成哪个职业(@job)#k\r\n";
            text += "#L0#新手#l \r\n \r\n";
            
            text += "#L100#战士#l \r\n ";
            text += "#L110#剑客#l \t #L111#勇士#l \t #L112#英雄#l \r\n ";
            text += "#L120#准骑士#l \t #L121#骑士#l \t #L122#圣骑士#l \r\n ";
            text += "#L130#枪战士#l \t #L131#龙骑士#l \t #L132#黑骑士#l \r\n \r\n";

            text += "#L200#魔法师#l \r\n ";
            text += "#L210#火毒法师#l \t #L211#火毒巫师#l \t #L212#火毒魔导师#l \r\n ";
            text += "#L220#冰雷法师#l \t #L221#冰雷巫师#l \t #L222#冰雷魔导师#l \r\n ";
            text += "#L230#牧师#l \t #L231#祭司#l \t #L232#主教#l \r\n \r\n";

            text += "#L300#弓箭手#l \r\n ";
            text += "#L310#猎人#l \t #L311#射手#l \t #L312#神射手#l \r\n ";
            text += "#L320#弩弓手#l \t #L321#游侠#l \t #L322#箭神#l \r\n \r\n ";

            text += "#L400#飞侠#l \r\n ";
            text += "#L410#刺客#l \t #L411#无影人#l \t #L412#隐士#l \r\n ";
            text += "#L420#侠客#l \t #L421#独行客#l \t #L422#侠盗#l \r\n \r\n ";

            text += "#L500#海盗#l \r\n ";
            text += "#L510#拳手#l \t #L511#斗士#l \t #L512#冲锋队长#l \r\n ";
            text += "#L520#火枪手#l \t #L521#大副#l \t #L522#船长#l \r\n \r\n ";

            // text += "#L800#爆莉萌天使#l \r\n \r\n";
            
            text += "#L2000#战童#l \r\n ";
            // text += "#L2001#EVAN#l \r\n ";
            text += "#L2100#ARAN1#l \t #L2110#ARAN2#l \t #L2111#ARAN3#l \t #L2112#ARAN4#l \r\n\r\n  ";

            // text += "#L2200#龙神#l \r\n ";
            // text += "#L2210#EVAN2#l \t #L2211#EVAN3#l \t #L2212#EVAN4#l \t #L2213#EVAN5#l \r\n ";
            // text += "#L2214#EVAN6#l \t #L2215#EVAN7#l \t #L2216#EVAN8#l \t #L2217#EVAN9#l \r\n ";
            // text += "#L2218#EVAN10#l \r\n\r\n  ";
            cm.sendSimple(text);
        } else if (selection === 7) {
            cm.sendGetNumber("需要多少金币", 500000, 500000, 50000000);
        } else if (selection === 8) {
            cm.sendGetNumber("需要多少点券", 100000, 100000, 10000000);
        } else if (selection === 9) {
            cm.sendGetNumber("需要设置为多少栏位", 96, 24, 96);
        } else if (selection === 10) {
            cm.sendGetNumber("需要多少人气", 10, 1, 9999);
        }

    } else if (status === 2) {
        if (selectType === 0) {
            cm.executeGM("@sp " + selection);
            cm.message("OK, 技能点=" + selection);
        } else if (selectType === 1) {
            cm.executeGM("@ap " + selection);
            cm.message("OK, 属性点=" + selection);
        }else if (selectType === 3) {
            cm.executeGM("@level " + selection);
            cm.message("OK, 等级+" + selection);
        }else if(selectType === 6){
            cm.executeGM("@job " + selection);
            cm.message("OK, 你成功转职了，玩去吧，职业id=" + selection);
        }else if (selectType === 7) {
            cm.executeGM("@givems " + selection);
            cm.message("OK, 金币+" + selection);
        } else if (selectType === 8) {
            cm.executeGM("@givenx " + selection);
            cm.message("OK, 点券+" + selection);
        }else if (selectType === 9) {
            cm.executeGM("@setslot " + selection);
            cm.message("OK, 栏位=" + selection);
        }else if (selectType === 10) {
            cm.executeGM("@fame " + cm.getName() + " " + selection);
            cm.message("OK, " + cm.getName() + " 人气增加了:" + selection);
        }
        cm.dispose();
    }
}

