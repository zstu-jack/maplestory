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

    // 普通指令
    private static final char USER_HEADING = '@';
    // GM指令
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
            client.getPlayer().dropMessage(5, "请稍后再试，上一条指令正在执行中。。。");
        }
    }

    private void handleInternal(MapleClient client, String message) {
        if (client.getPlayer().getMapId() == 300000012) {
            client.getPlayer().yellowMessage("监狱里不允许使用指令");
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
            client.getPlayer().yellowMessage("指令 '" + commandName + "' 无效！输入 @commands 查看可用的指令。");
            return;
        }
        if (client.getPlayer().gmLevel() < command.getRank()) {
            client.getPlayer().yellowMessage("你没有权限使用这个指令");
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
            System.out.println("注册指令: " + syntax + " 失败，该指令已存在。");
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
        addCommand("droplimit", DropLimitCommand.class);
        addCommand("time", TimeCommand.class);
        addCommand("buyback", BuyBackCommand.class);
        addCommand("gacha", GachaCommand.class);            // ?
        addCommand("dispose", DisposeCommand.class);
        addCommand("equiplv", EquipLvCommand.class);
        addCommand("rates", ShowRatesCommand.class);
        addCommand("online", OnlineCommand.class);
        addCommand("bug", ReportBugCommand.class);
        addCommand("points", ReadPointsCommand.class);
        addCommand("event", JoinEventCommand.class);
        addCommand("ranks", RanksCommand.class);
        addCommand("autoadd", AutoAddCommand.class);
        addCommand("toggleexp", ToggleExpCommand.class);    // 切换是否获得经验
        addCommand("mylawn", MapOwnerClaimCommand.class);
        addCommand("map", MapIdCommand.class);              // 查看地图id
        addCommand("buyfame", BuyFameCommand.class);        // 购买人气：需要配置打开

        commandsNameDesc.add(levelCommandsCursor);
    }


    private void registerLv1Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("bosshp", level, BossHpCommand.class);   // 显示BOSS血量 
        addCommand("mobhp", level, MobHpCommand.class);     // 显示怪物血量
        addCommand("whatdropsfrom", level, WhatDropsFromCommand.class);
        addCommand("whodrops", level, WhoDropsCommand.class);
        addCommand("buffme", level, BuffMeCommand.class);
        addCommand("goto", level, GotoCommand.class);       // 切换地图

        commandsNameDesc.add(levelCommandsCursor);
    }


    private void registerLv2Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("recharge", level, RechargeCommand.class);
        addCommand("whereami", level, WhereaMiCommand.class);
        addCommand("hide", level, HideCommand.class);               // 隐身
        addCommand("unhide", level, UnHideCommand.class);
        addCommand("sp", level, SpCommand.class);                   // 给与SP
        addCommand("ap", level, ApCommand.class);                   // 给与AP
        addCommand("empowerme", level, EmpowerMeCommand.class);
        addCommand("buffmap", level, BuffMapCommand.class);
        addCommand("buff", level, BuffCommand.class);
        addCommand("bomb", level, BombCommand.class);
        addCommand("dc", level, DcCommand.class);
        addCommand("cleardrops", level, ClearDropsCommand.class);
        addCommand("clearslot", level, ClearSlotCommand.class);
        addCommand("clearsavelocs", level, ClearSavedLocationsCommand.class);
        addCommand("warp", level, WarpCommand.class);
        addCommand(new String[]{"warphere", "summon"}, level, SummonCommand.class);
        addCommand(new String[]{"warpto", "reach", "follow"}, level, ReachCommand.class);
        addCommand("gmshop", level, GmShopCommand.class);
        addCommand("heal", level, HealCommand.class);
        addCommand("item", level, ItemCommand.class);               // 添加物品
        addCommand("drop", level, ItemDropCommand.class);
        addCommand("level", level, LevelCommand.class);             // 设置等级
        addCommand("levelpro", level, LevelProCommand.class);       // 升级
        addCommand("setslot", level, SetSlotCommand.class);
        addCommand("setstat", level, SetStatCommand.class);         // 满级
        addCommand("maxstat", level, MaxStatCommand.class);         // 满状态
        addCommand("maxskill", level, MaxSkillCommand.class);       // 满技能
        addCommand("resetskill", level, ResetSkillCommand.class);
        addCommand("search", level, SearchCommand.class);
        addCommand("jail", level, JailCommand.class);
        addCommand("unjail", level, UnJailCommand.class);
        addCommand("job", level, JobCommand.class);                 // 切换职业 MapleJob.java
        addCommand("unbug", level, UnBugCommand.class);
        addCommand("id", level, IdCommand.class);                   // handbook/
        addCommand("gachalist", GachaListCommand.class);
        addCommand("loot", LootCommand.class);

        commandsNameDesc.add(levelCommandsCursor);
    }

    private void registerLv3Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("debuff", level, DebuffCommand.class);
        addCommand("fly", level, FlyCommand.class);
        addCommand("spawn", level, SpawnCommand.class);
        addCommand("mutemap", level, MuteMapCommand.class);
        addCommand("checkdmg", level, CheckDmgCommand.class);
        addCommand("inmap", level, InMapCommand.class);
        addCommand("reloadevents", level, ReloadEventsCommand.class);
        addCommand("reloaddrops", level, ReloadDropsCommand.class);
        addCommand("reloadportals", level, ReloadPortalsCommand.class);
        addCommand("reloadmap", level, ReloadMapCommand.class);
        addCommand("reloadshops", level, ReloadShopsCommand.class);
        addCommand("hpmp", level, HpMpCommand.class);                   // 恢复hpmp
        addCommand("maxhpmp", level, MaxHpMpCommand.class);             // 最大hpmp
        addCommand("music", level, MusicCommand.class);
        addCommand("monitor", level, MonitorCommand.class);
        addCommand("monitors", level, MonitorsCommand.class);
        addCommand("ignore", level, IgnoreCommand.class);
        addCommand("ignored", level, IgnoredCommand.class);
        addCommand("pos", level, PosCommand.class);
        addCommand("togglecoupon", level, ToggleCouponCommand.class);
        addCommand("togglewhitechat", level, ChatCommand.class);
        addCommand("fame", level, FameCommand.class);
        addCommand("givenx", level, GiveNxCommand.class);
        addCommand("givevp", level, GiveVpCommand.class);
        addCommand("givems", level, GiveMesosCommand.class);
        addCommand("giverp", level, GiveRpCommand.class);
        addCommand("expeds", level, ExpedsCommand.class);
        addCommand("kill", level, KillCommand.class);
        addCommand("seed", level, SeedCommand.class);
        addCommand("maxenergy", level, MaxEnergyCommand.class);
        addCommand("killall", level, KillAllCommand.class);
        addCommand("notice", level, NoticeCommand.class);
        addCommand("rip", level, RipCommand.class);
        addCommand("openportal", level, OpenPortalCommand.class);
        addCommand("closeportal", level, ClosePortalCommand.class);
        addCommand("pe", level, PeCommand.class);
        addCommand("startevent", level, StartEventCommand.class);
        addCommand("endevent", level, EndEventCommand.class);
        addCommand("startmapevent", level, StartMapEventCommand.class);
        addCommand("stopmapevent", level, StopMapEventCommand.class);
        addCommand("online2", level, OnlineTwoCommand.class);
        addCommand("ban", level, BanCommand.class);
        addCommand("unban", level, UnBanCommand.class);
        addCommand("healmap", level, HealMapCommand.class);
        addCommand("healperson", level, HealPersonCommand.class);
        addCommand("hurt", level, HurtCommand.class);
        addCommand("killmap", level, KillMapCommand.class);
        addCommand("night", level, NightCommand.class);
        addCommand("npc", level, NpcCommand.class);
        addCommand("face", level, FaceCommand.class);
        addCommand("hair", level, HairCommand.class);
        addCommand("startquest", level, QuestStartCommand.class);
        addCommand("completequest", level, QuestCompleteCommand.class);
        addCommand("resetquest", level, QuestResetCommand.class);
        addCommand("timer", level, TimerCommand.class);
        addCommand("timermap", level, TimerMapCommand.class);
        addCommand("timerall", level, TimerAllCommand.class);
        addCommand("warpmap", level, WarpMapCommand.class);
        addCommand("warparea", level, WarpAreaCommand.class);
        addCommand("gotonpc", level, GotoNpcCommand.class);
        addCommand("xiguai", level, SuckMonsterCommand.class);

        commandsNameDesc.add(levelCommandsCursor);
    }

    private void registerLv4Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;
        addCommand("servermessage", level, ServerMessageCommand.class);
        addCommand("proitem", level, ProItemCommand.class);
        addCommand("seteqstat", level, SetEqStatCommand.class);        // 修改【背包】装备属性，可以使自身属性变得非常高
        addCommand("exprate", level, ExpRateCommand.class);
        addCommand("mesorate", level, MesoRateCommand.class);
        addCommand("droprate", level, DropRateCommand.class);
        addCommand("bossdroprate", level, BossDropRateCommand.class);
        addCommand("questrate", level, QuestRateCommand.class);
        addCommand("travelrate", level, TravelRateCommand.class);
        addCommand("fishrate", level, FishingRateCommand.class);
        addCommand("itemvac", level, ItemVacCommand.class);
        addCommand("forcevac", level, ForceVacCommand.class);
        addCommand("zakum", level, ZakumCommand.class);                 // 扎昆
        addCommand("horntail", level, HorntailCommand.class);
        addCommand("pinkbean", level, PinkbeanCommand.class);
        addCommand("pap", level, PapCommand.class);
        addCommand("pianus", level, PianusCommand.class);
        addCommand("cake", level, CakeCommand.class);
        addCommand("playernpc", level, PlayerNpcCommand.class);
        addCommand("playernpcremove", level, PlayerNpcRemoveCommand.class);
        addCommand("pnpc", level, PnpcCommand.class);
        addCommand("pnpcremove", level, PnpcRemoveCommand.class);
        addCommand("pmob", level, PmobCommand.class);
        addCommand("pmobremove", level, PmobRemoveCommand.class);

        commandsNameDesc.add(levelCommandsCursor);
    }

    private void registerLv5Commands() {
        levelCommandsCursor = new Pair<>(new ArrayList<>(), new ArrayList<>());
        int level = 0;                                                                          // 一些DEBUG的命令
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
        addCommand("setgmlevel", level, SetGmLevelCommand.class);
        addCommand("warpworld", level, WarpWorldCommand.class);
        addCommand("saveall", level, SaveAllCommand.class);
        addCommand("dcall", level, DCAllCommand.class);
        addCommand("mapplayers", level, MapPlayersCommand.class);
        addCommand("getacc", level, GetAccCommand.class);
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
