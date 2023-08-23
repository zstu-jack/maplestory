package tools;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

import cn.nap.constant.NapDriverEnum;
import cn.nap.datasource.NapDbProp;
import cn.nap.datasource.NapDbSource;
import cn.nap.utils.common.NapComUtils;
import config.YamlConfig;

/**
 * @author Frz (Big Daddy)
 * @author The Real Spookster - some modifications to this beautiful code
 * @author Ronan - some connection pool to this beautiful code
 */
public class DatabaseConnection {
    private static final String SOURCE_MYSQL = "napMs_mysql";
    private static final String SOURCE_SQLITE = "napMs_sqlite";

    /**
     * 初始化数据源
     */
    public static void init() {
        NapDbProp dbProp = new NapDbProp();
        dbProp.setUrl(YamlConfig.config.server.DB_URL);
        dbProp.setDriver(NapDriverEnum.MYSQL);
        dbProp.setUser(YamlConfig.config.server.DB_USER);
        dbProp.setPassword(YamlConfig.config.server.DB_PASS);
        dbProp.setMaxConnect(YamlConfig.config.server.DB_MAX_CONNECT);
        // 这里单位为秒
        dbProp.setConnectTimeout(10);
        dbProp.setExecuteTimeout(10);
        // 引入这个，为后续多数据源（sqlite）做准备
        NapDbSource.createInstance(SOURCE_MYSQL, dbProp);
    }

    /**
     * 查一条数据
     *
     * @param sql    sql
     * @param params 可选参数
     * @return 一行结果对应的map
     */
    public static Map<String, Object> selectOne(String sql, Object... params) {
        Connection connection = getConnection();
        List<Map<String, Object>> selectList = NapDbSource.getInstance().select(SOURCE_MYSQL, connection, sql, params);
        closeConnection(connection);
        return NapComUtils.isEmpty(selectList) ? new HashMap<>() : selectList.get(0);
    }

    /**
     * 查多条数据
     *
     * @param sql    sql
     * @param params 可选参数
     * @return 多行结果对应的map
     */
    public static List<Map<String, Object>> select(String sql, Object... params) {
        Connection connection = getConnection();
        List<Map<String, Object>> selectList = NapDbSource.getInstance().select(SOURCE_MYSQL, connection, sql, params);
        closeConnection(connection);
        return NapComUtils.isEmpty(selectList) ? new ArrayList<>() : selectList;
    }

    /**
     * 新增一条
     *
     * @param sql    sql
     * @param params 可选参数
     */
    public static void insert(String sql, Object... params) {
        getConnectionAndClose(connection -> NapDbSource.getInstance().update(SOURCE_MYSQL, connection, sql, params));
    }

    /**
     * 新增多条
     *
     * @param sql    sql
     * @param params 可选参数
     */
    public static void batchInsert(String sql, Object[]... params) {
        getConnectionAndClose(connection -> NapDbSource.getInstance().batch(SOURCE_MYSQL, connection, sql, params));
    }

    /**
     * 更新一条
     *
     * @param sql    sql
     * @param params 可选参数
     */
    public static void update(String sql, Object... params) {
        getConnectionAndClose(connection -> NapDbSource.getInstance().update(SOURCE_MYSQL, connection, sql, params));
    }

    /**
     * 删除一条
     *
     * @param sql    sql
     * @param params 可选参数
     */
    public static void delete(String sql, Object... params) {
        getConnectionAndClose(connection -> NapDbSource.getInstance().update(SOURCE_MYSQL, connection, sql, params));
    }

    /**
     * 删除多条
     *
     * @param sql    sql
     * @param params 可选参数
     */
    public static void batchDelete(String sql, Object[]... params) {
        getConnectionAndClose(connection -> NapDbSource.getInstance().batch(SOURCE_MYSQL, connection, sql, params));
    }

    /**
     * 获取数据库连接
     *
     * @return 数据库连接
     */
    public static Connection getConnection() {
        return NapDbSource.getInstance().getConnection(SOURCE_MYSQL);
    }
//
//    /**
//     * 自动获取连接并释放
//     *
//     * @param consumer 获取连接后执行的语句
//     */
//    public static void getConnectionAndFree(Consumer<Connection> consumer) {
//        Connection conn = getConnection();
//        consumer.accept(conn);
//        freeConnection(conn);
//    }

    /**
     * 自动获取连接并关闭
     *
     * @param consumer 获取连接后执行的语句
     */
    public static void getConnectionAndClose(Consumer<Connection> consumer) {
        Connection conn = getConnection();
        consumer.accept(conn);
        closeConnection(conn);
    }

//    /**
//     * 释放连接
//     *
//     * @param connections 可选释放多个连接
//     */
//    public static void freeConnection(Connection... connections) {
//        if (null == connections) {
//            return;
//        }
//        for (Connection connection : connections) {
//            NapDbSource.getInstance().freeConnection(connection);
//        }
//    }

    /**
     * 关闭连接
     *
     * @param connections 关闭多个或者关闭所有
     */
    public static void closeConnection(Connection... connections) {
        if (null == connections || connections.length == 0) {
            NapDbSource.getInstance().close();
            return;
        }
        for (Connection connection : connections) {
            NapDbSource.getInstance().close(connection);
        }
    }
}
