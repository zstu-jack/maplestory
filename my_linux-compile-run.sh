#!/bin/bash
echo "dos2unix maps.txt"
dos2unix maps.txt

echo "compile"
cd src/
find . -name "*.java" | xargs javac -cp '../cores/*' -encoding GBK
cd -

echo "compile done, run"
nohup java -Xmx2048m -Dfile.encoding=GBK -cp ./src/:cores/* net.server.Server -Dwzpath=wz/ > out 2>&1 &

