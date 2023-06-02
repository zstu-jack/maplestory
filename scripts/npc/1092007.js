/*
NPC:        Muirhat - Nautilus' Port
Created By: Kevin
Function:   When on the quest, he warps player to Black Magician's Disciple
*/

var status;

function start() {
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection){
    if (mode == -1){
        cm.dispose();
    }
    else{
        if (mode == 0 && type > 0){
            cm.dispose();
            return;
        }

        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0){
            if (cm.getQuestStatus(2175) == 1){
                if (cm.getPlayer().canHold(2030019)){
                    cm.sendOk("拿好 #b#t2030019##k, 记得常回来看看大伙儿。  #i2030019#");
                }
                else{
                    cm.sendOk("消耗栏的空间不足。");
                    cm.dispose();
                }
            }
            else{
                cm.sendOk("凯琳船长和她的船员们一定会打败黑魔法师们。 \n 据我所知：他们彼此一旦遇到，就会互相厮杀，直到其中一方剩下最后一人。");
                cm.dispose();
            }
        }
        else if (status == 1){
            cm.gainItem(2030019, 1);
            cm.warp(100000006, 0);
            cm.dispose();
        }
    }
}