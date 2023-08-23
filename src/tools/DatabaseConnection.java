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
     * ��ʼ������Դ
     */
    public static void init() {
        NapDbProp dbProp = new NapDbProp();
        dbProp.setUrl(YamlConfig.config.server.DB_URL);
        dbProp.setDriver(NapDriverEnum.MYSQL);
        dbProp.setUser(YamlConfig.config.server.DB_USER);
        dbProp.setPassword(YamlConfig.config.server.DB_PASS);
        dbProp.setMaxConnect(YamlConfig.config.server.DB_MAX_CONNECT);
        // ���ﵥλΪ��
        dbProp.setConnectTimeout(10);
        dbProp.setExecuteTimeout(10);
        // ���������Ϊ����������Դ��sqlite����׼��
        NapDbSource.createInstance(SOURCE_MYSQL, dbProp);
    }

    /**
     * ��һ������
     *
     * @param sql    sql
     * @param params ��ѡ����
     * @return һ�н����Ӧ��map
     */
    public static Map<String, Object> selectOne(String sql, Object... params) {
        Connection connection = getConnection();
        List<Map<String, Object>> selectList = NapDbSource.getInstance().select(SOURCE_MYSQL, connection, sql, params);
        closeConnection(connection);
        return NapComUtils.isEmpty(selectList) ? new HashMap<>() : selectList.get(0);
    }

    /**
     * ���������
     *
     * @param sql    sql
     * @param params ��ѡ����
     * @return ���н����Ӧ��map
     */
    public static List<Map<String, Object>> select(String sql, Object... params) {
        Connection connection = getConnection();
        List<Map<String, Object>> selectList = NapDbSource.getInstance().select(SOURCE_MYSQL, connection, sql, params);
        closeConnection(connection);
        return NapComUtils.isEmpty(selectList) ? new ArrayList<>() : selectList;
    }

    /**
     * ����һ��
     *
     * @param sql    sql
     * @param params ��ѡ����
     */
    public static void insert(String sql, Object... params) {
        getConnectionAndClose(connection -> NapDbSource.getInstance().update(SOURCE_MYSQL, connection, sql, params));
    }

    /**
     * ��������
     *
     * @param sql    sql
     * @param params ��ѡ����
     */
    public static void batchInsert(String sql, Object[]... params) {
        getConnectionAndClose(connection -> NapDbSource.getInstance().batch(SOURCE_MYSQL, connection, sql, params));
    }

    /**
     * ����һ��
     *
     * @param sql    sql
     * @param params ��ѡ����
     */
    public static void update(String sql, Object... params) {
        getConnectionAndClose(connection -> NapDbSource.getInstance().update(SOURCE_MYSQL, connection, sql, params));
    }

    /**
     * ɾ��һ��
     *
     * @param sql    sql
     * @param params ��ѡ����
     */
    public static void delete(String sql, Object... params) {
        getConnectionAndClose(connection -> NapDbSource.getInstance().update(SOURCE_MYSQL, connection, sql, params));
    }

    /**
     * ɾ������
     *
     * @param sql    sql
     * @param params ��ѡ����
     */
    public static void batchDelete(String sql, Object[]... params) {
        getConnectionAndClose(connection -> NapDbSource.getInstance().batch(SOURCE_MYSQL, connection, sql, params));
    }

    /**
     * ��ȡ���ݿ�����
     *
     * @return ���ݿ�����
     */
    public static Connection getConnection() {
        return NapDbSource.getInstance().getConnection(SOURCE_MYSQL);
    }
//
//    /**
//     * �Զ���ȡ���Ӳ��ͷ�
//     *
//     * @param consumer ��ȡ���Ӻ�ִ�е����
//     */
//    public static void getConnectionAndFree(Consumer<Connection> consumer) {
//        Connection conn = getConnection();
//        consumer.accept(conn);
//        freeConnection(conn);
//    }

    /**
     * �Զ���ȡ���Ӳ��ر�
     *
     * @param consumer ��ȡ���Ӻ�ִ�е����
     */
    public static void getConnectionAndClose(Consumer<Connection> consumer) {
        Connection conn = getConnection();
        consumer.accept(conn);
        closeConnection(conn);
    }

//    /**
//     * �ͷ�����
//     *
//     * @param connections ��ѡ�ͷŶ������
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
     * �ر�����
     *
     * @param connections �رն�����߹ر�����
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
