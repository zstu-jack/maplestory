package tools;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.logging.*;
import java.util.HashMap;
import java.util.HashSet;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.FileInputStream;
import java.util.*;

import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.maps.MapleMapFactory;

public class FilePrinter {

    public static final String 
            AUTOBAN_WARNING = "game/AutoBanWarning.txt",    // log naming version by Vcoc
            AUTOBAN_DC = "game/AutoBanDC.txt",
            ACCOUNT_STUCK = "players/AccountStuck.txt",
            COMMAND_GM = "reports/Gm.txt",
            COMMAND_BUG = "reports/Bug.txt",
            LOG_TRADE = "interactions/Trades.txt",
            LOG_EXPEDITION = "interactions/Expeditions.txt",
            LOG_LEAF = "interactions/MapleLeaves.txt",
            LOG_GACHAPON = "interactions/Gachapon.txt",
            LOG_CHAT = "interactions/ChatLog.txt",
            QUEST_RESTORE_ITEM = "game/QuestItemRestore.txt",
            EXCEPTION_CAUGHT = "game/ExceptionCaught.txt",
            CLIENT_START = "game/ClientStartError.txt",
            MAPLE_MAP = "game/MapleMap.txt",
            ERROR38 = "game/Error38.txt",
            PACKET_LOG = "game/Log.txt",
            CASHITEM_BOUGHT = "interactions/CashLog.txt",
            EXCEPTION = "game/Exceptions.txt",
            LOGIN_EXCEPTION = "game/LoginExceptions.txt",
            TRADE_EXCEPTION = "game/TradeExceptions.txt",
            SQL_EXCEPTION = "game/SqlExceptions.txt",
            PACKET_HANDLER = "game/packethandler/",
            PORTAL = "game/portals/",
            PORTAL_STUCK = "game/portalblocks/",
            NPC = "game/npcs/",
            INVOCABLE = "game/invocable/",
            REACTOR = "game/reactors/",
            QUEST = "game/quests/",
            ITEM = "game/items/",
            MOB_MOVEMENT = "game/MobMovement.txt",
            MAP_SCRIPT = "game/mapscript/",
            DIRECTION = "game/directions/",
            GUILD_CHAR_ERROR = "guilds/GuildCharError.txt",
            SAVE_CHAR = "players/SaveToDB.txt",
            INSERT_CHAR = "players/InsertCharacter.txt",
            LOAD_CHAR = "players/LoadCharFromDB.txt",
            CREATED_CHAR = "players/createdchars/",
            DELETED_CHAR = "players/deletedchars/",
            UNHANDLED_EVENT = "game/DoesNotExist.txt",
            SESSION = "players/Sessions.txt",
            DCS = "game/disconnections/",
            EXPLOITS = "game/exploits/",
            STORAGE = "game/storage/",
            PACKET_LOGS = "game/packetlogs/",
            PACKET_STREAM = "game/packetstream/",
            FREDRICK = "game/npcs/fredrick/",
            NPC_UNCODED = "game/npcs/UncodedNPCs.txt",
            QUEST_UNCODED = "game/quests/UncodedQuests.txt",
            AUTOSAVING_CHARACTER = "players/SaveCharAuto.txt",
            SAVING_CHARACTER = "players/SaveChar.txt",
            CHANGE_CHARACTER_NAME = "players/NameChange.txt",
            WORLD_TRANSFER = "players/WorldTransfer.txt",
            FAMILY_ERROR = "players/FamilyErrors.txt",
            USED_COMMANDS = "commands/UsedCommands.txt",
            DEADLOCK_ERROR = "deadlocks/Deadlocks.txt",
            DEADLOCK_STACK = "deadlocks/Path.txt",
            DEADLOCK_LOCKS = "deadlocks/Locks.txt",
            DEADLOCK_STATE = "deadlocks/State.txt",
            DISPOSED_LOCKS = "deadlocks/Disposed.txt";
    
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); //for file system purposes, it's nice to use yyyy-MM-dd
    private static final String FILE_PATH = "logs/" + sdf.format(Calendar.getInstance().getTime()) + "/"; // + sdf.format(Calendar.getInstance().getTime()) + "/"
    private static final String ERROR = "error/";

    public static final Logger logger = Logger.getLogger(FilePrinter.class.getName());
    static{
        logger.info("static");
    }
    public static class Equip{
        public String name;
        public int level;
        public int job;
        public Equip(String name, int level, int job) {
            this.name = name;
            this.level = level;
            this.job = job;            
        }
        // -1 初心者
        // 所有：0 战士：1  法师：2  弓箭手：4  盗贼：8 海盗：16
    }
    public static class Mob{
        public String name;
        public int level;
        public int isBoss;
        public int mobType;
        public ArrayList<String> maps;
        public ArrayList<String> drops;
        public HashSet<String> actions;
        public Mob(String name, int level, int isBoss, int mobType, String[] maps,  String[] drops, String[] actions) {
            this.name = name;
            this.level = level;
            this.isBoss = isBoss;            
            this.mobType = mobType;
            this.maps = new ArrayList<String>(Arrays.asList(maps));;
            this.drops = new ArrayList<String>(Arrays.asList(drops));;
            this.actions = new HashSet<>(Arrays.asList(actions));
        }
    }

    public static class NPC{
        public int id;
        public int map;
        public String name;
        public NPC(Integer id, String name, int map){
            this.id = id;
            this.name = name;
            this.map = map;
        }
    }

    public static HashMap<Integer, Equip> AllEquips = new HashMap<>();
    public static HashMap<String, Mob> AllMobs = new HashMap<>();                     // 怪物id String->信息
    public static HashMap<Integer, Mob> AllMobsById = new HashMap<>();
    public static ArrayList<String>[] AllMobsByLevel = new ArrayList[256];
    public static HashMap<Integer, ArrayList<String>> DropItemMobs = new HashMap<>(); // 掉落的id->所有怪物
    public static HashMap<String, Integer> ErrorMobsClient = new HashMap<>();
    public static HashMap<String, String> NPCMap = new HashMap<>();
    public static HashMap<Integer, String> MapNames = new HashMap<>();

    static{
        // 这几个怪物客户端显示图片有问题，不显示了，只显示名字
        ErrorMobsClient.put("8830000", 1); // 超级大的蝙蝠怪
        ErrorMobsClient.put("8800002", 1); // 扎昆
        ErrorMobsClient.put("8810018",1);     // 没有图片，黑龙王的灵魂
        ErrorMobsClient.put("8510000",1); // 鱼王太大了
        
        for(int i = 0; i < 256; i++)
            AllMobsByLevel[i] = new ArrayList<String>();

        // map id ----> map name init
        {
            try {
                FileInputStream fis = new FileInputStream("____tools/out_maps.txt");
                InputStreamReader isr = new InputStreamReader(fis, "UTF-8");
                BufferedReader reader = new BufferedReader(isr);
                String line = reader.readLine();
                while (line != null) {
                    // System.out.println(line);
                    String[] parts = line.split(" ", 2);
                    String mapId = parts[0]; 
                    MapNames.put(Integer.parseInt(mapId),parts[1]);
                    line = reader.readLine();
                }
                reader.close();
            } catch (IOException e) {            
                System.out.println("init map name An error occurred.");
                logger.info("init map name An error occurred");
                e.printStackTrace();
            }
        }

        // npc init 
        logger.info("npc map init start");
        int npcSize = 0;
        for (Map.Entry<String, List<String>> entry : MapleMapFactory.mapSource.getMapNpc().entrySet()) {
            for(int i = 0; i < entry.getValue().size(); i ++){
                String npcID = entry.getValue().get(i);
                String mapID = entry.getKey();
                npcSize ++;
                NPCMap.put(npcID, mapID);
            }
        }
        logger.info("npc map init end, size=" + String.valueOf(npcSize));

        logger.info("init equip start");

        try {
            FileInputStream fis = new FileInputStream("____tools/out_equips.txt");
            InputStreamReader isr = new InputStreamReader(fis, "UTF-8");
            BufferedReader reader = new BufferedReader(isr);
            String line = reader.readLine();
            line = reader.readLine();
            while (line != null) {
                // System.out.println(line);
                if(line.split(" ").length > 4){
                    logger.info("equip incorrct,just ignore, line=" + line);
                    line = reader.readLine();
                    continue;
                }
                String[] parts = line.split(" ");
                int itemID = Integer.parseInt(parts[0]); 
                String itemName = parts[1]; 
                int level = Integer.parseInt(parts[2]);
                int job = Integer.parseInt(parts[3]);
                Equip equip = new FilePrinter.Equip(itemName, level, job);
                AllEquips.put(itemID, equip);
                
                line = reader.readLine();
            }
            reader.close();
        } catch (IOException e) {            
            System.out.println("init equip start An error occurred.");
            logger.info("einit equip start An error occurred");
            e.printStackTrace();
        }
        logger.info("init equip success");

        // parse mob files
        logger.info("init mob start");
        try {
            FileInputStream fis = new FileInputStream("____tools/out_mobs.txt");
            InputStreamReader isr = new InputStreamReader(fis, "UTF-8");
            BufferedReader reader = new BufferedReader(isr);
            String line = reader.readLine();
            line = reader.readLine();
            while (line != null) {
                // System.out.println(line);
                if(line.split(" ").length > 8){
                    logger.info("mob incorrct,just ignore, line=" + line);
                    line = reader.readLine();
                    continue;
                }
                String[] parts = line.split(" ");
                String mobIDStr = parts[0]; 
                int mobID = Integer.parseInt(parts[0]); 
                String mobName = parts[1]; 
                int level = Integer.parseInt(parts[2]);
                int isBoss = Integer.parseInt(parts[3]);
                int mobType = Integer.parseInt(parts[4]);
                String[] mobMaps = parts[5].split(",");
                String[] mobDrops = parts[6].split(",");
                String[] mobActions = parts[7].split(",");
                Mob mob = new FilePrinter.Mob(mobName, level, isBoss, mobType, mobMaps, mobDrops, mobActions);
                AllMobs.put(mobIDStr, mob);
                AllMobsById.put(mobID, mob);
                AllMobsByLevel[level].add(mobIDStr);
                for(int i = 0; i < mobDrops.length; i ++){
                    int dropID = Integer.valueOf(mobDrops[i]);
                    if (!DropItemMobs.containsKey(dropID)) {
                        DropItemMobs.put(dropID, new ArrayList<String>()); 
                    }
                    ArrayList<String> dropList = DropItemMobs.get(dropID);
                    dropList.add(mobIDStr);
                }
                
                line = reader.readLine();
            }
            reader.close();
        } catch (IOException e) {            
            System.out.println("init equip start An error occurred.");
            logger.info("einit equip start An error occurred");
            e.printStackTrace();
        }
        

        logger.info("init mob success. mobsize=" + String.valueOf(AllMobs.size()));
    }

    public static void init(){
        try{
            FileHandler fileHandler = new FileHandler("mylog.log");
            fileHandler.setFormatter(new SimpleFormatter());
            logger.addHandler(fileHandler);
            logger.info("init success");
            logger.setLevel(Level.ALL);
        }catch(IOException e){
            e.printStackTrace();
        }
    }


    public static void printError(final String name, final Throwable t) {
        String stringT = getString(t);
        
    	System.out.println("Error thrown: " + name);
    	System.out.println(stringT);
        System.out.println();
        FileOutputStream out = null;
        final String file = FILE_PATH + ERROR + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(stringT.getBytes());
            out.write("\r\n---------------------------------\r\n".getBytes());
            out.write("\r\n".getBytes()); // thanks Vcoc for suggesting review body log structure
        } catch (IOException ess) {
            ess.printStackTrace();
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
                ignore.printStackTrace();
            }
        }
    }

    public static void printError(final String name, final Throwable t, final String info) {
        String stringT = getString(t);
        
    	System.out.println("Error thrown: " + name);
    	System.out.println(stringT);
        System.out.println();
        FileOutputStream out = null;
        final String file = FILE_PATH + ERROR + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write((info + "\r\n").getBytes());
            out.write(stringT.getBytes());
            out.write("\r\n---------------------------------\r\n".getBytes());
            out.write("\r\n".getBytes());
        } catch (IOException ess) {
            ess.printStackTrace();
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
                ignore.printStackTrace();
            }
        }
    }

    public static void printError(final String name, final String s) {
    	System.out.println("Error thrown: " + name);
    	System.out.println(s);
        System.out.println();
        FileOutputStream out = null;
        final String file = FILE_PATH + ERROR + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(s.getBytes());
            //out.write("\r\n---------------------------------\r\n".getBytes());
            out.write("\r\n".getBytes());
        } catch (IOException ess) {
            ess.printStackTrace();
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
                ignore.printStackTrace();
            }
        }
    }

    public static void print(final String name, final String s) {
        print(name, s, true);
    }

    public static void print(final String name, final String s, boolean line) {
    	System.out.println("Log: " + name);
    	System.out.println(s);
        System.out.println();
        FileOutputStream out = null;
        String file = FILE_PATH + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(s.getBytes());
            if (line) {
                out.write("\r\n---------------------------------\r\n".getBytes());
            }
            out.write("\r\n".getBytes());
        } catch (IOException ess) {
            ess.printStackTrace();
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
                ignore.printStackTrace();
            }
        }
    }

    private static String getString(final Throwable e) {
        String retValue = null;
        StringWriter sw = null;
        PrintWriter pw = null;
        try {
            sw = new StringWriter();
            pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            retValue = sw.toString();
        } finally {
            try {
                if (pw != null) {
                    pw.close();
                }
                if (sw != null) {
                    sw.close();
                }
            } catch (IOException ignore) {
                ignore.printStackTrace();
            }
        }
        return retValue;
    }
}