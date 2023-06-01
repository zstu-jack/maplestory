/*
 	Author: Ronan
 	Map: Mushroom Castle - Deep Inside Mushroom Forest (106020300)
 	Right Portal
 */
 
 function enter(pi){
 	if (pi.isQuestStarted(100202)) {
 		pi.playPortalSound(); pi.warp(106020400, 2);
 		return true;
 	} else if (pi.hasItem(4000507)) {
                pi.gainItem(4000507, -1);
                pi.message("使用紫色毒蘑菇的孢子，穿过了魔法森林的魔法孢子结界。");
                
                pi.playPortalSound(); pi.warp(106020400, 2);
                return true;
        }

        pi.message("前方被茂密的藤蔓拦住了去路。");
 	return false;
 } 