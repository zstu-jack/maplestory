/*
    This file is part of the HeavenMS MapleStory Server, commands OdinMS-based
    Copyleft (L) 2016 - 2019 RonanLana

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

/*
   @Author: Arthur L - Refactored command content into modules
*/
package client.command;

import client.command.commands.gm0.*;
import client.command.commands.gm1.*;
import client.command.commands.gm2.*;
import client.command.commands.gm3.*;
import client.command.commands.gm4.*;
import client.command.commands.gm5.*;
import client.command.commands.gm6.*;

import client.MapleClient;

import tools.FilePrinter;
import tools.Pair;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;

public class CommandsExecutor {

    public static CommandsExecutor instance = new CommandsExecutor();

    public static CommandsExecutor getInstance() {
        return instance;
    }

    // ��ָͨ��
    private static final char USER_HEADING = '@';
    // GMָ��
    private static final char GM_HEADING = '!';

    public static boolean isCommand(MapleClient client, String content) {
        char heading = content.charAt(0);
        if (client.getPlayer().isGM()) {
            return heading == USER_HEADING || heading == GM_HEADING;
        }
        return heading == USER_HEADING;
    }

    private final HashMap<String, Command> registeredCommands = new HashMap<>();
    private Pair<List<String>, List<String>> levelCommandsCursor;
    private final List<Pair<List<String>, List<String>>> commandsNameDesc = new ArrayList<>();

    private CommandsExecutor() {
        registerLv0Commands();
        registerLv1Commands();
        registerLv2Commands();
        registerLv3Commands();
        registerLv4Commands();
        registerLv5Commands();
        registerLv6Commands();
    }

    public List<Pair<List<String>, List<String>>> getGmCommands() {
        return commandsNameDesc;
    }

    public void handle(MapleClient client, String message) {
        if (client.tryacquireClient()) {
            try {
                handleInternal(client, message);
            } finally {
                client.releaseClient();
            }
        } else {
            client.getPlayer().dropMessage(5, "���Ժ����ԣ���һ��ָ������ִ���С�����");
        }
    }

    private void handleInternal(MapleClient client, String message) {
        if (client.getPlayer().getMapId() == 300000012) {
            client.getPlayer().yellowMessage("�����ﲻ����ʹ��ָ��");
            return;
        }
        final String splitRegex = " ";
        String[] splitedMessage = message.substring(1).split(splitRegex, 2);
        if (splitedMessage.length < 2) {
            splitedMessage = new String[]{splitedMessage[0], ""};
        }

        client.getPlayer().setLastCommandMessage(splitedMessage[1]);    // thanks Tochi & Nulliphite for noticing string messages being marshalled lowercase
        final String commandName = splitedMessage[0].toLowerCase();
        final String[] lowercaseParams = splitedMessage[1].toLowerCase().split(splitRegex);

        final Command command = registeredCommands.get(commandName);
        if (command == null) {
            client.getPlayer().yellowMessage("ָ�� '" + commandName + "' ��Ч������ @commands �鿴���õ�ָ�");
            return;
        }
        if (client.getPlayer().gmLevel() < command.getRank()) {
            client.getPlayer().yellowMessage("��û��Ȩ��ʹ�����ָ��");
            return;
        }
        String[] params;
        if (lowercaseParams.length > 0 && !lowercaseParams[0].isEmpty()) {
            params = Arrays.copyOfRange(lowercaseParams, 0, lowercaseParams.length);
        } else {
            params = new String[]{};
        }

        command.execute(client, params);
        writeLog(client, message);
    }

    private void writeLog(MapleClient client, String command) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm");
        FilePrinter.print(FilePrinter.USED_COMMANDS, client.getPlayer().getName() + " used: " + command + " on "
                + sdf.format(Calendar.getInstance().getTime()));
    }

    private void addCommandInfo(String name, Class<? extends Command> commandClass) {
        try {
            levelCommandsCursor.getRight().add(commandClass.newInstance().getDescription());
            levelCommandsCursor.getLeft().add(name);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void addCommand(String[] syntaxs, Class<? extends Command> commandClass) {
        for (String syntax : syntaxs) {
            addCommand(syntax, 0, commandClass);
        }
    }

    private void addCommand(String syntax, Class<? extends Command> commandClass) {
        //for (String syntax : syntaxs){
        addCommand(syntax, 0, commandClass);
        //}
    }

    private void addCommand(String[] surtaxes, int rank, Class<? extends Command> commandClass) {
        for (String syntax : surtaxes) {
            addCommand(syntax, rank, commandClass);
        }
    }

    private void addCommand(String syntax, int rank, Class<? extends Command> commandClass) {
        if (registeredCommands.containsKey(syntax.toLowerCase())) {
            System.out.println("ע��ָ��: " + syntax + " ʧ�ܣ���ָ���Ѵ��ڡ�");
            return;
        }

        String commandName = syntax.toLowerCase();
        addCommandInfo(commandName, commandClass);

        try {
            Command commandInstance = commandClass.newInstance();     // thanks Halcyon for noticing commands getting reinstanced every call
            commandInstance.setRank(rank);
            registeredCommands.put(commandName, commandInstance);
        } catch (InstantiationException | IllegalAccessException e) {
            e.printStackTrace();
        }
    }

    private void registerLv0Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());

        addCommand(new String[]{"help", "commands"}, HelpCommand.class);
        addCommand("droplimit", DropLimitCommand.class);    // �鿴������������������
        addCommand("time", TimeCommand.class);              // ������ʱ��
        addCommand("buyback", BuyBackCommand.class);        // ���ָ����������������� @buyback <info|now>
        addCommand("gacha", GachaCommand.class);            // ?
        addCommand("dispose", DisposeCommand.class);        // �⿨ָ��ͻ����쳣ʱ���Խ⿨"
        addCommand("equiplv", EquipLvCommand.class);        // ��ʾװ���ȼ�
        addCommand("rates", ShowRatesCommand.class);        // �鿴����
        addCommand("online", OnlineCommand.class);          // ��������λ��
        addCommand("bug", ReportBugCommand.class);          // �ϱ�bug
        addCommand("points", ReadPointsCommand.class);      // ��ѯ����������ͶƱ��������ʱû������ʲô��"
        addCommand("event", JoinEventCommand.class);        // �μӻ��뿪�
        addCommand("ranks", RanksCommand.class);            // �鿴����
        addCommand("autoadd", AutoAddCommand.class);        // �Զ��ӵ�
        addCommand("toggleexp", ToggleExpCommand.class);    // �л��Ƿ��þ���
        addCommand("mylawn", MapOwnerClaimCommand.class);   // ���Ƶ�ͼ����Ȩ
        addCommand("map", MapIdCommand.class);              // �鿴��ͼid
        addCommand("buyfame", BuyFameCommand.class);        // ������������Ҫ���ô�

        commandsNameDesc.add(levelCommandsCursor);
    }


    private void registerLv1Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("bosshp", level, BossHpCommand.class);   // ��ʾBOSSѪ�� 
        addCommand("mobhp", level, MobHpCommand.class);     // ��ʾ����Ѫ��
        addCommand("whatdropsfrom", level, WhatDropsFromCommand.class);     // �����������ʲô
        addCommand("whodrops", level, WhoDropsCommand.class);               // ʲô�����������
        addCommand("buffme", level, BuffMeCommand.class);       // �Ṧ��buff
        addCommand("goto", level, GotoCommand.class);           // �л���ͼ

        commandsNameDesc.add(levelCommandsCursor);
    }


    private void registerLv2Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("recharge", level, RechargeCommand.class);       // ��
        addCommand("whereami", level, WhereaMiCommand.class);       // ��ǰ��ͼ��Һ�npc
        addCommand("hide", level, HideCommand.class);               // ---------- ����
        addCommand("unhide", level, UnHideCommand.class);           // ---------- ȡ������
        addCommand("sp", level, SpCommand.class);                   // ---------- ����SP 
        addCommand("ap", level, ApCommand.class);                   // ---------- ����AP
        addCommand("empowerme", level, EmpowerMeCommand.class);     // ---------- һ��buff* 
        addCommand("buffmap", level, BuffMapCommand.class);         // һ��buff
        addCommand("buff", level, BuffCommand.class);               // ����buff
        addCommand("bomb", level, BombCommand.class);               // ��ը��
        addCommand("dc", level, DcCommand.class);                   // ����ĳ�����
        addCommand("cleardrops", level, ClearDropsCommand.class);   // �������
        addCommand("clearslot", level, ClearSlotCommand.class);     // ������Ʒ��
        addCommand("clearsavelocs", level, ClearSavedLocationsCommand.class);      // ��
        addCommand("warp", level, WarpCommand.class);                              // ��
        addCommand(new String[]{"warphere", "summon"}, level, SummonCommand.class);       // �ٻ�ĳ�����
        addCommand(new String[]{"warpto", "reach", "follow"}, level, ReachCommand.class); // ��ȥĳ����ҵĵط�
        addCommand("gmshop", level, GmShopCommand.class);           // ---------- gm�̵꣺�öණ������  
        addCommand("heal", level, HealCommand.class);               // ---------- �ָ�  
        addCommand("item", level, ItemCommand.class);               // ---------- �����Ʒ  
        addCommand("drop", level, ItemDropCommand.class);           // ��ӵ���
        addCommand("level", level, LevelCommand.class);             // ---------- ���õȼ�  
        addCommand("levelpro", level, LevelProCommand.class);       // ����
        addCommand("setslot", level, SetSlotCommand.class);         // ---------- ��Ʒ��λ
        addCommand("setstat", level, SetStatCommand.class);         // ����״̬
        addCommand("maxstat", level, MaxStatCommand.class);         // ��״̬
        addCommand("maxskill", level, MaxSkillCommand.class);       // ---------- ������
        addCommand("resetskill", level, ResetSkillCommand.class);   // ---------- ���ü���
        addCommand("search", level, SearchCommand.class);           // ����npc��mob��
        addCommand("jail", level, JailCommand.class);               // ���x����
        addCommand("unjail", level, UnJailCommand.class);           // ������
        addCommand("job", level, JobCommand.class);                 // ---------- �л�ְҵ MapleJob.java
        addCommand("unbug", level, UnBugCommand.class);             // ��������
        addCommand("id", level, IdCommand.class);                   // handbook/
        addCommand("gachalist", GachaListCommand.class);            // �ٱ������
        addCommand("loot", LootCommand.class);                      // �����������

        commandsNameDesc.add(levelCommandsCursor);
    }

    private void registerLv3Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("debuff", level, DebuffCommand.class);               // ---------- ��debuff
        addCommand("fly", level, FlyCommand.class);                     // ---------- ��
        addCommand("spawn", level, SpawnCommand.class);                 // ---------- ���ɹ���
        addCommand("mutemap", level, MuteMapCommand.class);             // ��ֹ����
        addCommand("checkdmg", level, CheckDmgCommand.class);           // �鿴����
        addCommand("inmap", level, InMapCommand.class);                 // ����б�
        addCommand("reloadevents", level, ReloadEventsCommand.class);   // ���¼����¼��ű�
        addCommand("reloaddrops", level, ReloadDropsCommand.class);     // ���¼���
        addCommand("reloadportals", level, ReloadPortalsCommand.class); // ���¼��� 
        addCommand("reloadmap", level, ReloadMapCommand.class);         // ���¼���
        addCommand("reloadshops", level, ReloadShopsCommand.class);     // ���¼���
        addCommand("hpmp", level, HpMpCommand.class);                   // ����hpmp
        addCommand("maxhpmp", level, MaxHpMpCommand.class);             // ---------- ���hpmp
        addCommand("music", level, MusicCommand.class);                 // ����
        addCommand("monitor", level, MonitorCommand.class);             // �������
        addCommand("monitors", level, MonitorsCommand.class);           // ���ڼ��ӵ�����б�
        addCommand("ignore", level, IgnoreCommand.class);
        addCommand("ignored", level, IgnoredCommand.class);
        addCommand("pos", level, PosCommand.class);
        addCommand("togglecoupon", level, ToggleCouponCommand.class);
        addCommand("togglewhitechat", level, ChatCommand.class);
        addCommand("fame", level, FameCommand.class);                   // ������
        addCommand("givenx", level, GiveNxCommand.class);               // ����ȯ
        addCommand("givevp", level, GiveVpCommand.class);               // ��vp
        addCommand("givems", level, GiveMesosCommand.class);            // �����
        addCommand("giverp", level, GiveRpCommand.class);               // ����
        addCommand("expeds", level, ExpedsCommand.class);               // Ƶ����Զ����
        addCommand("kill", level, KillCommand.class);                   // ɱ��ĳ�����
        addCommand("seed", level, SeedCommand.class);                   // ��
        addCommand("maxenergy", level, MaxEnergyCommand.class);         // ��
        addCommand("killall", level, KillAllCommand.class);             // ------------ ɱ�����й���
        // ��ʾ
        addCommand("notice", level, NoticeCommand.class);
        addCommand("rip", level, RipCommand.class);
        // ������
        addCommand("openportal", level, OpenPortalCommand.class);
        addCommand("closeportal", level, ClosePortalCommand.class);
        addCommand("pe", level, PeCommand.class);                       // ��
        // �¼�
        addCommand("startevent", level, StartEventCommand.class);
        addCommand("endevent", level, EndEventCommand.class);
        addCommand("startmapevent", level, StartMapEventCommand.class);
        addCommand("stopmapevent", level, StopMapEventCommand.class);

        // �Ե�ͼ������Ҳ���
        addCommand("online2", level, OnlineTwoCommand.class);
        addCommand("ban", level, BanCommand.class);
        addCommand("unban", level, UnBanCommand.class);
        addCommand("healmap", level, HealMapCommand.class);             
        addCommand("healperson", level, HealPersonCommand.class);
        addCommand("hurt", level, HurtCommand.class);
        addCommand("killmap", level, KillMapCommand.class);             // ɱ����ͼ���������

        addCommand("night", level, NightCommand.class);                 // ȥ����
        addCommand("npc", level, NpcCommand.class);                     // �ٻ�npc
        addCommand("face", level, FaceCommand.class);                   // ���
        addCommand("hair", level, HairCommand.class);                   // ���
        addCommand("startquest", level, QuestStartCommand.class);       // ����ʼ
        addCommand("completequest", level, QuestCompleteCommand.class); // �������
        addCommand("resetquest", level, QuestResetCommand.class);       // ��������
        addCommand("timer", level, TimerCommand.class);
        addCommand("timermap", level, TimerMapCommand.class);
        addCommand("timerall", level, TimerAllCommand.class);
        addCommand("warpmap", level, WarpMapCommand.class);             // ��ͼ����������л�
        addCommand("warparea", level, WarpAreaCommand.class);           // �������xx�ڵ�����л�
        addCommand("gotonpc", level, GotoNpcCommand.class);             // ---------- ȥnpc����
        addCommand("xiguai", level, SuckMonsterCommand.class);          // ---------- ������ر�����

        commandsNameDesc.add(levelCommandsCursor);
    }

    private void registerLv4Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("servermessage", level, ServerMessageCommand.class);
        addCommand("proitem", level, ProItemCommand.class);
        addCommand("seteqstat", level, SetEqStatCommand.class);         //  ------- �޸ġ�������װ�����ԣ�����ʹ�������Ա�÷ǳ��� ------ 1605631
        addCommand("exprate", level, ExpRateCommand.class);             // ���鱶��
        addCommand("mesorate", level, MesoRateCommand.class);           // ��ұ���
        addCommand("droprate", level, DropRateCommand.class);           // BOSS���䱶��
        addCommand("bossdroprate", level, BossDropRateCommand.class);   // BOSS���䱶��
        addCommand("questrate", level, QuestRateCommand.class);         // ������
        addCommand("travelrate", level, TravelRateCommand.class);       // ��������
        addCommand("fishrate", level, FishingRateCommand.class);        // ���㱶��
        addCommand("itemvac", level, ItemVacCommand.class);             // ��ȡ
        addCommand("forcevac", level, ForceVacCommand.class);           // ��ȡ
        addCommand("zakum", level, ZakumCommand.class);                 // *����*
        addCommand("horntail", level, HorntailCommand.class);           // *����*
        addCommand("pinkbean", level, PinkbeanCommand.class);           // *Ʒ�˱�*
        addCommand("pap", level, PapCommand.class);                     // *����*
        addCommand("pianus", level, PianusCommand.class);               // *����*
        addCommand("cake", level, CakeCommand.class);                   // ---------- BOSS���⣺ ����Ҷ��Ʒ
        addCommand("playernpc", level, PlayerNpcCommand.class);     
        addCommand("playernpcremove", level, PlayerNpcRemoveCommand.class);
        addCommand("pnpc", level, PnpcCommand.class);                   // ---------- ����npc
        addCommand("pnpcremove", level, PnpcRemoveCommand.class);       // �Ƴ�npc
        addCommand("pmob", level, PmobCommand.class);                   // ---------- ��������
        addCommand("pmobremove", level, PmobRemoveCommand.class);       // �Ƴ�����

        commandsNameDesc.add(levelCommandsCursor);
    }

    private void registerLv5Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;                                                                          // һЩDEBUG������
        addCommand("debug", level, DebugCommand.class);                 
        addCommand("set", level, SetCommand.class);
        addCommand("showpackets", level, ShowPacketsCommand.class);
        addCommand("showmovelife", level, ShowMoveLifeCommand.class);
        addCommand("showsessions", level, ShowSessionsCommand.class);
        addCommand("iplist", level, IpListCommand.class);

        commandsNameDesc.add(levelCommandsCursor);
    }

    private void registerLv6Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("setgmlevel", level, SetGmLevelCommand.class);       // �޸�GM�ȼ� 
        addCommand("warpworld", level, WarpWorldCommand.class);
        addCommand("saveall", level, SaveAllCommand.class);             // ���浱ǰ��ͼ��ɫ����
        addCommand("dcall", level, DCAllCommand.class);                 // �Ͽ������������
        addCommand("mapplayers", level, MapPlayersCommand.class);       // ��ǰ��ͼ��ɫ
        addCommand("getacc", level, GetAccCommand.class);               // ��ȡ��ɫ�˺���
        addCommand("shutdown", level, ShutdownCommand.class);
        addCommand("clearquestcache", level, ClearQuestCacheCommand.class);
        addCommand("clearquest", level, ClearQuestCommand.class);
        addCommand("supplyratecoupon", level, SupplyRateCouponCommand.class);
        addCommand("spawnallpnpcs", level, SpawnAllPNpcsCommand.class);
        addCommand("eraseallpnpcs", level, EraseAllPNpcsCommand.class);
        addCommand("addchannel", level, ServerAddChannelCommand.class);
        addCommand("addworld", level, ServerAddWorldCommand.class);
        addCommand("removechannel", level, ServerRemoveChannelCommand.class);
        addCommand("removeworld", level, ServerRemoveWorldCommand.class);

        commandsNameDesc.add(levelCommandsCursor);
    }

}
