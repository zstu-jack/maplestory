client：客户端在百度云盘或硬盘
server: 

1. install jdk1.8
2. install mysql(mysql-5.5.40-winx64.msi)
    - // sql/ 依次执行sql文件 db_database.sql、db_drops.sql、db_shopupdate.sql
    - // D:\Program Files\MySQL\MySQL Server 5.7\bin>mysqld --defaults-file="D:\ProgramData\MySQL\MySQL Server 5.7\my.ini"
    
3. compile(或者用ide)
    - dir /s /b *.java > sources.txt
         （在src目录下，列出所有java文件
    - jar 包和源代码
        - 在src目录下执行， 如果是中文需要加上  -encoding UTF-8， (javac ...... -encoding UTF-8)
        - javac -cp ../cores/mina-core-2.0.19.jar;../cores/HikariCP-java7-2.4.13.jar;../cores/mysql-connector-java-bin.jar;../cores/slf4j-api-1.7.21.jar;../cores/slf4j-jdk14-1.7.5.jar;../cores/slf4j-jdk14-1.7.5.jar;../cores/yamlbeans-1.13.jar;../cores/nap_tools-1.23.0807.jar @sources.txt 
        // - javac -cp ../cores/mina-core-2.0.19.jar;../cores/HikariCP-java7-2.4.13.jar;../cores/mysql-connector-java-bin.jar;../cores/slf4j-api-1.7.21.jar;../cores/slf4j-jdk14-1.7.5.jar;../cores/slf4j-jdk14-1.7.5.jar;../cores/yamlbeans-1.13.jar @sources.txt -encoding UTF-8
    - // 修改ip：HeavenMS\hackertools 修改ip(skip ip address选择否，将第一个ip(127.0.0.1)修改其它的)

4. running:
    - 指定当前目录为classpath，同时加载所有jar包 （src上一级目录下，加载config.yaml文件
    - // java -cp ./cores/mina-core-2.0.19.jar;./cores/HikariCP-java7-2.4.13.jar;./cores/mysql-connector-java-bin.jar;./cores/slf4j-api-1.7.21.jar;./cores/slf4j-jdk14-1.7.5.jar;./cores/slf4j-jdk14-1.7.5.jar;./cores/yamlbeans-1.13.jar;./src    -Xmx2048m -Dwzpath=wz\    net.server.Server
    - java -cp ./cores/mina-core-2.0.19.jar;./cores/HikariCP-java7-2.4.13.jar;./cores/mysql-connector-java-bin.jar;./cores/slf4j-api-1.7.21.jar;./cores/slf4j-jdk14-1.7.5.jar;./cores/slf4j-jdk14-1.7.5.jar;./cores/yamlbeans-1.13.jar;./cores/nap_tools-1.23.0807.jar;./src    -Xmx2048m -Dwzpath=wz\    net.server.Server

5. client：
    - 兼容模式： 否则可能会弹error

--------------------------------------------------------------------------------------------------------------------------------------------------------------------


client:
1. HeavenClient
2. vs2019, sdk8.1 , msvc140(visual studio installer)
3. visual studio start.
    - 找不到WzLib.lib: 右键解决方案，项目属性，链接器，输入，删去WzLib.lib
    - 找不到 vcruntime140d.dll,*.dll
        - 编release版本，不带d后缀的
    - 输入不了账号和密码
        - 拷贝fonts目录
4. running
    - HeavenMS服务器和HeavenClient客户端不匹配，收发包错误
        - 改了收角色包后可以进去了，但是创角后面又凉了
        - 好像是读入nx文件有问题导致数据初始化有问题(nx不匹配，到时候用ms-client-4.0试试), 把我服务器的wz转成nx拿过来试试
        - 已经有角色了，可以进来，但是啥任务都没有. 并且用的是新的Map.nx ( HaCreator 把 wz转为HeavenClient需要的nx) , 怪物也没有， 好多协议对不上
    - 不用了

msclient
1. 一定要vs2019版本, win10 sdk, 等需要在vs里面安装。 cmake 前把build目录清空
    - vs2022编译不过报错C2398
    - bass依赖库放到位置里面去
    // - lz4lib去目录下编译下
    - 生成失败清理下解决方案重新生成（什么没有权限访问拉，找不到lz4lib拉
    - 生成时 找不到glad.h文件，需要开启 vpn
2. mkdir build, cd build, cmake ..