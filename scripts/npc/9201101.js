/**
 *9201101 - T-1337
 *@author Ronan
 */
 
function start() {
    if (Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
        cm.openShopNPC(9201101);
    } else {
        //cm.sendOk("��Ҷ�ǵľ�������ʱ�̴�����û���κ������ܹ�ͻ���������еķ��ߡ�");
        cm.sendDefault();
    }

    cm.dispose();
}
