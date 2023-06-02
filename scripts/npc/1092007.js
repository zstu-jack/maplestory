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
                    cm.sendOk("�ú� #b#t2030019##k, �ǵó���������������  #i2030019#");
                }
                else{
                    cm.sendOk("�������Ŀռ䲻�㡣");
                    cm.dispose();
                }
            }
            else{
                cm.sendOk("���մ��������Ĵ�Ա��һ�����ܺ�ħ��ʦ�ǡ� \n ������֪�����Ǳ˴�һ���������ͻụ����ɱ��ֱ������һ��ʣ�����һ�ˡ�");
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