var status = 0;
var imaps = [104000000, 102000000, 100000000, 101000000, 103000000, 120000000, 105040300];
var maps = [102000000, 100000000, 101000000, 103000000, 120000000];
var cost = [1000, 1000, 800, 1000, 800];
var townText = [
    ["�������ĵط����ϸۣ�������������ܸ������ #b�ϸ�#k ����Ϣ��������������ɴ��ִ�������ĵ�һվ��Ҳ�Ǵ�������뿪�ʺ絺�󣬽���ð���ó̵���㡣", "����һ��������С�򣬱����й�����ˮ����Ҫ�鹦�ڸۿ�λ�ڵ������ˡ�����Ĵ�����˶������񣬻��������������������ǿ����������ˣ�������������ǽ�̸�����ǻ������Ѻá�", "С����Χ��һƬ�����Ĵ��ԭ������Ĵ�������ﶼ����С���º͵ģ��ǳ��ʺ����ˡ�����㻹û��ѡ��ְҵ��������������ȼ��ĺõط���"],
    ["������������������ #b��ʿ����#k ����Ϣ����һ�������ڽ��������������ʯɽ�����Ƶ���ʿС���������ղ�̫�Ѻã�ֻ��ǿ�߲����������档", "�ڸߵ���Χ�����ܿ���ʮ��ϸС����ľ������Ұ���ܵĵط������������ڵ��κεط��ĺ��ӡ��Ƕ�������ȣ�һ����̤�룬��ᷢ��һ�������������������Ժ�����������ƥ�䡣����ò�Ҫȥ�ǣ����Ҫȥ���Ҫ�ǳ�С�ģ�", "���������һ�� #bսʿ#k�������ȥ����ʿ������ #r�����̹�#k��������Ѿ��ﵽ10�����߸��ߣ��ټ���һ���ܺõ��������ԣ������ܻ������Ϊһ��սʿ��������ǣ���ü���ѵ���Լ���ֱ���ﵽ���ˮƽ��"],
    ["������������������ #bħ������#k ����Ϣ����һ�������ڽ�����Զ�����������Ǹߴ�������ľ��ħ��ʦС����Ҳ�������﷢��һЩ���顣����һ�㶼��ϲ�����࣬���������վ�����ǵ�һ�ߣ����ְ�����", "��ɭ�ָ�������ᷢ����ɫʷ��ķ�����ߵ�Ģ�������Ӻͽ�ʬ���Ӷ���ס���ǡ�����ɭ�֣���ῴ��Ů������ɨ���ڿ��з��С�һ�侯�棺��������ĺ�ǿ׳�������ҽ����㲻Ҫ�������ǡ�", "��������Ϊһ�� #bħ��ʦ#k���ҵ� #r��˹#k��ֻҪ��ĵȼ��ﵽ8�����������������������������ͻ������Ϊһ��ħ��ʦ������㻹������������������Ҫ��������ԣ���ѵ���Լ����ܵ������"],
    ["Alright I'll explain to you more about #bHenesys#k. It's a bowman-town located at the southernmost part of the island, made on a flatland in the midst of a deep forest and prairies. The weather's just right, and everything is plentiful around that town, perfect for living. Go check it out.", "Around the prairie you'll find weak monsters such as snails, mushrooms, and pigs. According to what I hear, though, in the deepest part of the Pig Park, which is connected to the town somewhere, you'll find a humongous, powerful mushroom called Mushmom every now and then.", "If you want to be a #bBowman#k, you need to go see #rAthena Pierce#k at Henesys. With a level at or above 10 and a decent amount of DEX, she may make you be one afterall. If not, go train yourself, make yourself stronger, then try again."], ["Alright I'll explain to you more about #bKerning City#k. It's a thief-town located at the northwest part of Victoria Island, and there are buildings up there that have just this strange feeling around them. It's mostly covered in black clouds, but if you can go up to a really high place, you'll be able to see a very beautiful sunset there.", "From Kerning City, you can go into several dungeons. You can go to a swamp where alligators and snakes are abound, or hit the subway full of ghosts and bats. At the deepest part of the underground, you'll find Lace, who is just as big and dangerous as a dragon.", "If you want to be a #bThief#k, seek #rDark Lord#k, the heart of darkness of Kerning City. He may well make you a thief if you're at or above level 10 with a good amount of DEX. If not, go hunt and train yourself to reach there."], ["Here's a little information on #b#m120000000##k. It's a submarine that's currently parked in between Ellinia and Henesys in Victoria Island. That submarine serves as home to numerous pirates. You can have just as beautiful a view of the ocean there as you do here in Lith Harbor.", "#m120000000# is parked in between Henesys and Ellinia, so if you step out just a bit, you'll be able to enjoy the view of both towns. All the pirates you'll meet in town are very gregarious and friendly as well.", "If you are serious about becoming a #bPirate#k, then you better meet the captain of #m120000000#, #r#p1090000##k. If you are over Level 10 with 20 DEX, then she may let you become one. If you aren't up to that level, then you'll need to train harder to get there!"], ["Alright I'll explain to you more about #bSleepywood#k. It's a forest town located at the southeast side of Victoria Island. It's pretty much in between Henesys and the ant-tunnel dungeon. There's a hotel there, so you can rest up after a long day at the dungeon ... it's a quiet town in general.", "In front of the hotel there's an old buddhist monk by the name of #rChrishrama#k. Nobody knows a thing about that monk. Apparently he collects materials from the travelers and create something, but I am not too sure about the details. If you have any business going around that area, please check that out for me.", "From Sleepywood, head east and you'll find the ant tunnel connected to the deepest part of the Victoria Island. Lots of nasty, powerful monsters abound so if you walk in thinking it's a walk in the park, you'll be coming out as a corpse. You need to fully prepare yourself for a rough ride before going in.", "And this is what I hear ... apparently, at Sleepywood there's a secret entrance leading you to an unknown place. Apparently, once you move in deep, you'll find a stack of black rocks that actually move around. I want to see that for myself in the near future ..."]];
var selectedMap = -1;
var town = false;

function start() {
    cm.sendNext("����ǰ����ĳ�����ֻҪ����Ǯ���Ҿ��ܰ������������ܻ��е�С�󣬵��Ҷ����˴�9��Ŷ��");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if ((mode == 0 && !town) || mode == -1) {
            if (type == 1 && mode != -1) {
                cm.sendNext("��������Ҳ�кܶ�ɿ��ġ��������ȥ��ĵط���������ҡ�");
            }
            cm.dispose();
            return;
        } else {
            status -= 2;
            if (status < 1) {
                cm.dispose();
                return;
            }
        }

    }
    if (status == 1) {
        cm.sendSimple("������ǵ�һ�����⣬�����������ܶ�����ط��кܶ������������ʲô���⣬�뽲��\r\n#L0##b��������һ��ʲô���ĳ���#l\r\n#L1#�����ȥ��ĵط���#k#l");
    } else if (status == 2) {
        if (selection == 0) {
            town = true;
            var text = "�ڽ�������7�����ͳ���������˽���һ���أ�#b";
            for (var i = 0; i < imaps.length; i++) {
                text += "\r\n#L" + i + "##m" + imaps[i] + "##l";
            }
            cm.sendSimple(text);
        } else if (selection == 1) {
            var selStr = cm.getJobId() == 0 ? "There's a special 90% discount for all beginners. Alright, where would you want to go?#b" : "Oh you aren't a beginner, huh? Then I'm afraid I may have to charge you full price. Where would you like to go?#b";
            for (var i = 0; i < maps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cost[i] / (cm.getJobId() == 0 ? 10 : 1)) + " mesos)#l";
            }
            cm.sendSimple(selStr);
        }
    } else if (town) {
        if (selectedMap == -1) {
            selectedMap = selection;
        }
        if (status == 3) {
            cm.sendNext(townText[selectedMap][status - 3]);
        } else {
            townText[selectedMap][status - 3] == undefined ? cm.dispose() : cm.sendNextPrev(townText[selectedMap][status - 3]);
        }
    } else if (status == 3) {
        selectedMap = selection;
        cm.sendYesNo("I guess you don't need to be here. Do you really want to move to #b#m" + maps[selection] + "##k? Well it'll cost you #b" + (cost[selection] / (cm.getJobId() == 0 ? 10 : 1)) + " mesos#k. What do you think?");
    } else if (status == 4) {
        if (cm.getMeso() < (cost[selectedMap] / (cm.getJobId() == 0 ? 10 : 1))) {
            cm.sendNext("You don't have enough mesos. With your abilities, you should have more than that!");
        } else {
            cm.gainMeso(-(cost[selectedMap] / (cm.getJobId() == 0 ? 10 : 1)));
            cm.warp(maps[selectedMap]);
        }
        cm.dispose();
    }
}