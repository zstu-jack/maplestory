package tools;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import cn.nap.constant.NapDriverEnum;
import cn.nap.datasource.NapDbProp;
import cn.nap.datasource.NapDbSource;
import config.YamlConfig;

/**
 * @author Frz (Big Daddy)
 * @author The Real Spookster - some modifications to this beautiful code
 * @author Ronan - some connection pool to this beautiful code
 */
public class DatabaseConnection {
    public static void init() {
        NapDbProp dbProp = new NapDbProp();
        dbProp.setUrl(YamlConfig.config.server.DB_URL);
        dbProp.setDriver(NapDriverEnum.MYSQL);
        dbProp.setUser(YamlConfig.config.server.DB_USER);
        dbProp.setPassword(YamlConfig.config.server.DB_PASS);
        dbProp.setMaxConnect(10);
        // 这里单位为秒
        dbProp.setConnectTimeout(10);
        dbProp.setExecuteTimeout(10);
        // 引入这个，为后续多数据源（sqlite）做准备
        NapDbSource.createInstance(dbProp);
    }

    public static Connection getConnection() throws SQLException {
        int denies = 0;
        while(true) {   // There is no way it can pass with a null out of here?
            try {
                return DriverManager.getConnection(YamlConfig.config.server.DB_URL, YamlConfig.config.server.DB_USER, YamlConfig.config.server.DB_PASS);
            } catch (SQLException sqle) {
                denies++;
                
                if(denies == 3) {
                    // Give up, throw exception. Nothing good will come from this.
                    FilePrinter.printError(FilePrinter.SQL_EXCEPTION, "SQL Driver refused to give a connection after " + denies + " tries. Problem: " + sqle.getMessage());
                    throw sqle;
                }
            }
        }
    }
}
