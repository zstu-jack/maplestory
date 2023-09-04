```
sudo apt-get update
sudo apt-get install openjdk-8-jdk
java -version
javac -version

sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation          // some confirm
sudo systemctl status mysql


mysql 
source file_path;                       // sqls...

// 设置mysql账号密码

// 同步客户端wz文件(WZ Dumper)

find . -name "*.java" | xargs javac -cp '../cores/*' -encoding GBK      // compile

// 修改配置文件 ip会传给客户端，需要填具体数值

java -cp ./src/:cores/* net.server.Server -Xmx2048m -Dfile.encoding=GBK -Dwzpath=wz/                        // run
nohup java -Xmx2048m -Dfile.encoding=GBK -cp ./src/:cores/* net.server.Server -Dwzpath=wz/ > out 2>&1 &     // run, 参数需要放在前面 -Dfile.encoding

```