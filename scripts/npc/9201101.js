/**
 *9201101 - T-1337
 *@author Ronan
 */
 
function start() {
    if (Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
        cm.openShopNPC(9201101);
    } else {
        //cm.sendOk("新叶城的警备力量时刻待命，没有任何生物能够突破这座城市的防线。");
        cm.sendDefault();
    }

    cm.dispose();
}
