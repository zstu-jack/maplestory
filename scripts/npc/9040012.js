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
/* @Author Lerk
 * Armor Statue - Sharenian: Hall of the Knight (990000400)
 * Guild Quest Stage 2 Info
 */

function start() {
    cm.sendOk("雕像下的石匾中刻有这样的文字：\r\n\"圣瑞尼亚的骑士们是荣耀的勇士。他们的圣枪既是强大的武器，也是守卫城堡的关键所在：将它们从这座大厅的最高处取下时，就切断了入侵者的所有道路。\"\r\n\r\n似乎有些现代文字被刻在一旁，几乎无法辨认：\r\n\"恶魔盗走了圣枪，将它们锁在重重障碍之后......送回顶部......长枪......从高处抓住......\"\r\n(很显然，不论是哪位探险者发现其中奥秘并刻在这里，都没有多久好活了，真可怜。)");
    cm.dispose();
}