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
package provider.wz;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import provider.MapleData;
import provider.MapleDataDirectoryEntry;
import provider.MapleDataProvider;
import provider.MapleDataTool;

public class XMLWZFile implements MapleDataProvider {
    private File root;
    private WZDirectoryEntry rootForNavigation;

    public XMLWZFile(File fileIn) {
        root = fileIn;
        rootForNavigation = new WZDirectoryEntry(fileIn.getName(), 0, 0, null);
        fillMapleDataEntitys(root, rootForNavigation);
    }

    private void fillMapleDataEntitys(File lroot, WZDirectoryEntry wzdir) {
        for (File file : lroot.listFiles()) {
            String fileName = file.getName();
            if (file.isDirectory() && !fileName.endsWith(".img")) {
                WZDirectoryEntry newDir = new WZDirectoryEntry(fileName, 0, 0, wzdir);
                wzdir.addDirectory(newDir);
                fillMapleDataEntitys(file, newDir);
            } else if (fileName.endsWith(".xml")) {
                wzdir.addFile(new WZFileEntry(fileName.substring(0, fileName.length() - 4), 0, 0, wzdir));
            }
        }
    }

    @Override
    public synchronized MapleData getData(String path) {
        File dataFile = new File(root, path + ".xml");
        File imageDataDir = new File(root, path);
        if (!dataFile.exists()) {
            return null;//bitches
        }
        FileInputStream fis;
        try {
            fis = new FileInputStream(dataFile);
        } catch (FileNotFoundException e) {
            throw new RuntimeException("Datafile " + path + " does not exist in " + root.getAbsolutePath());
        }
        final XMLDomMapleData domMapleData;
        try {
            domMapleData = new XMLDomMapleData(fis, imageDataDir.getParentFile());
        } finally {
            try {
                fis.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return domMapleData;
    }

    public Map<String, List<String>> getMapNpc() {
        Map<String, List<String>> mapNpcRelation = new HashMap<>();
        File mapWz = new File("wz/Map.wz/Map");
        if (!mapWz.exists()) {
            return mapNpcRelation;
        }
        File[] listPaths = mapWz.listFiles();
        if (null == listPaths) {
            return mapNpcRelation;
        }

        FileInputStream fis = null;
        try {
            for (File path : listPaths) {
                if (!path.exists()) {
                    continue;
                }
                if (!path.isDirectory()) {
                    continue;
                }
                File[] listFiles = path.listFiles();
                if (null == listFiles) {
                    continue;
                }
                for (File file : listFiles) {
                    if (!file.isFile()) {
                        continue;
                    }
                    String fileName = file.getName();
                    fis = new FileInputStream(file);
                    XMLDomMapleData mapleData = new XMLDomMapleData(fis, path);
                    List<String> npcList = new ArrayList<>();
                    MapleData lifeData = mapleData.getChildByPath("life");
                    if (null == lifeData) {
                        continue;
                    }
                    for (MapleData life : lifeData) {
                        life.getName();
                        if ("n".equals(MapleDataTool.getString(life.getChildByPath("type")))) {
                            npcList.add(MapleDataTool.getString(life.getChildByPath("id")));
                        }
                    }
                    mapNpcRelation.put(fileName.substring(0, fileName.length() - 8), npcList);
                    fis.close();
                }
            }
        } catch (Exception ignore) {

        } finally {
            try {
                if (null != fis) {
                    fis.close();

                }
            } catch (IOException ignore) {

            }
        }
        return mapNpcRelation;
    }

    @Override
    public MapleDataDirectoryEntry getRoot() {
        return rootForNavigation;
    }
}
