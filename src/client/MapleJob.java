/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
package client;

public enum MapleJob {
    BEGINNER(0),

    // Warriors战士
    WARRIOR(100),
    // Fighter(剑客)---Crusader(勇士)---Hero(英雄)
    FIGHTER(110), CRUSADER(111), HERO(112),
    // Page(准骑士)---White Knight(骑士)---Paladin(圣骑士)
    PAGE(120), WHITEKNIGHT(121), PALADIN(122),
    // Spearman(枪战士)---Dragon Knight(龙骑士)---Dark Knight(黑骑士)
    SPEARMAN(130), DRAGONKNIGHT(131), DARKKNIGHT(132),

    // Magicans魔法师
    MAGICIAN(200),
    // Fire/Poison Wizard(火毒法师)---Fire/Poison Mage(火毒巫师)---Fire/Poison Archmage(火毒魔导师)
    FP_WIZARD(210), FP_MAGE(211), FP_ARCHMAGE(212),
    // Ice/Lightning Wizard(冰雷法师)---Ice/Lightning Mage(冰雷巫师)---Ice/Lightning Archmage(冰雷魔导师)
    IL_WIZARD(220), IL_MAGE(221), IL_ARCHMAGE(222),
    // Cleric(牧师)---Priest(祭司)---Bishop(主教)
    CLERIC(230), PRIEST(231), BISHOP(232),

    // Bowmen弓箭手
    BOWMAN(300),
    // Hunter(猎人)---Ranger(射手)---Bowmaster(神射手)
    HUNTER(310), RANGER(311), BOWMASTER(312),
    // Crossbowman(弩弓手)---Sniper(游侠)---Marksman(箭神)
    CROSSBOWMAN(320), SNIPER(321), MARKSMAN(322),

    // Thieves飞侠(一转名Rogue)
    THIEF(400),
    // Assassin(刺客)---Hermit(无影人)---Night Lord(隐士)
    ASSASSIN(410), HERMIT(411), NIGHTLORD(412),
    // Bandit(侠客)---Chief Bandit(独行客)---Shadower(侠盗)
    BANDIT(420), CHIEFBANDIT(421), SHADOWER(422),

    // Pirate海盗
    PIRATE(500),
    // Brawler(拳手)--Marauder(斗士)---Buccaneer(冲锋队长)
    BRAWLER(510), MARAUDER(511), BUCCANEER(512),
    // Gunslinger(火枪手)---Outlaw(大副)---Corsair(船长)
    GUNSLINGER(520), OUTLAW(521), CORSAIR(522),
    
    // Angelic Buster(爆莉萌天使)
    MAPLELEAF_BRIGADIER(800),
    // GM, 超级GM
    GM(900), SUPERGM(910),

    NOBLESSE(1000),
    DAWNWARRIOR1(1100), DAWNWARRIOR2(1110), DAWNWARRIOR3(1111), DAWNWARRIOR4(1112),
    BLAZEWIZARD1(1200), BLAZEWIZARD2(1210), BLAZEWIZARD3(1211), BLAZEWIZARD4(1212),
    WINDARCHER1(1300), WINDARCHER2(1310), WINDARCHER3(1311), WINDARCHER4(1312),
    NIGHTWALKER1(1400), NIGHTWALKER2(1410), NIGHTWALKER3(1411), NIGHTWALKER4(1412),
    THUNDERBREAKER1(1500), THUNDERBREAKER2(1510), THUNDERBREAKER3(1511), THUNDERBREAKER4(1512),

    // 战神
    LEGEND(2000), EVAN(2001),
    ARAN1(2100), ARAN2(2110), ARAN3(2111), ARAN4(2112),
	
    // 龙神
    EVAN1(2200), EVAN2(2210), EVAN3(2211), EVAN4(2212), EVAN5(2213), EVAN6(2214),
    EVAN7(2215), EVAN8(2216), EVAN9(2217), EVAN10(2218);

    final int jobid;
    final static int maxId = 22;    // maxId = (EVAN / 100);
    
    private MapleJob(int id) {
        jobid = id;
    }
    
    public static int getMax() {
        return maxId;
    }

    public int getId() {
        return jobid;
    }

    public static MapleJob getById(int id) {
        for (MapleJob l : MapleJob.values()) {
            if (l.getId() == id) {
                return l;
            }
        }
        return null;
    }

    public static MapleJob getBy5ByteEncoding(int encoded) {
        switch (encoded) {
            case 2:
                return WARRIOR;
            case 4:
                return MAGICIAN;
            case 8:
                return BOWMAN;
            case 16:
                return THIEF;
            case 32:
                return PIRATE;
            case 1024:
                return NOBLESSE;
            case 2048:
                return DAWNWARRIOR1;
            case 4096:
                return BLAZEWIZARD1;
            case 8192:
                return WINDARCHER1;
            case 16384:
                return NIGHTWALKER1;
            case 32768:
                return THUNDERBREAKER1;
            default:
                return BEGINNER;
        }
    }
    
    public boolean isA(MapleJob basejob) {  // thanks Steve (kaito1410) for pointing out an improvement here
        int basebranch = basejob.getId() / 10;
        return (getId() / 10 == basebranch && getId() >= basejob.getId()) || (basebranch % 10 == 0 && getId() / 100 == basejob.getId() / 100);
    }
    
    public int getJobNiche() {
        return (jobid / 100) % 10;
        
        /*
        case 0: BEGINNER;
        case 1: WARRIOR;
        case 2: MAGICIAN;
        case 3: BOWMAN;  
        case 4: THIEF;
        case 5: PIRATE;
        */
    }
}
