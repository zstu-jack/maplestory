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
package net.server.channel.handlers;

import client.MapleClient;
import net.AbstractMaplePacketHandler;
import scripting.npc.NPCScriptManager;
import scripting.quest.QuestScriptManager;
import tools.data.input.SeekableLittleEndianAccessor;

import tools.FilePrinter;
import java.util.logging.*;
/**
 *
 * @author Matze
 */
public final class NPCMoreTalkHandler extends AbstractMaplePacketHandler {
    public static final Logger logger = Logger.getLogger(FilePrinter.class.getName());
    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {        
        byte lastMsg = slea.readByte(); // 00 (last msg type I think)
        byte action = slea.readByte(); // 00 = end chat, 01 == follow
        if (lastMsg == 2) {
            logger.info("account=" + c.getAccountName() + "lastmsg=" + String.valueOf(lastMsg & 0xFF) + ", action=" + String.valueOf(action & 0xFF));
            if (action != 0) {
                String returnText = slea.readMapleGbkString();
                if (c.getQM() != null) {
                    c.getQM().setGetText(returnText);
                    if (c.getQM().isStart()) {
                        QuestScriptManager.getInstance().start(c, action, lastMsg, -1);
                    } else {
                        QuestScriptManager.getInstance().end(c, action, lastMsg, -1);
                    }
                } else {
                    c.getCM().setGetText(returnText);
                    NPCScriptManager.getInstance().action(c, action, lastMsg, -1);
                }
            } else if (c.getQM() != null) {
                c.getQM().dispose();
            } else {
                c.getCM().dispose();
            }
        } else {
            int selection = -1;
            if (slea.available() >= 4) {
                selection = slea.readInt();
            } else if (slea.available() > 0) {
                selection = slea.readByte();
            }
            logger.info("account=" + c.getAccountName() + ", lastmsg=" + String.valueOf(lastMsg & 0xFF) + ", action=" 
                + String.valueOf(action & 0xFF) + ",select=" + String.valueOf(selection & 0xFF));
            if (c.getQM() != null) {
                if (c.getQM().isStart()) {
                    QuestScriptManager.getInstance().start(c, action, lastMsg, selection);
                } else {
                    QuestScriptManager.getInstance().end(c, action, lastMsg, selection);
                }
            } else if (c.getCM() != null) {
                NPCScriptManager.getInstance().action(c, action, lastMsg, selection);
            }
        }
    }
}