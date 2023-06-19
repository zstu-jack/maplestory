#!/bin/sh
# cores in classpath, thanks to lkxyyjx
export CLASSPATH=".:dist/*:cores/*"
java -Xmx2048m -Dfile.encoding=GBK -Dwzpath=wz/ net.server.Server