## 基于HeavenMS汉化优化，原项目地址:https://github.com/ronancpl/HeavenMS  

# HeavenMS-NapMS
## 服务端编译
自己编译，参考视频：https://www.bilibili.com/video/BV1ug411t7yB  
在右侧有一个简介、发行版、贡献者、动态，点发行版即可取已经编译好的版本，怎么运行也参考上面的视频  
注意，整个项目的编码格式换成了GBK，请不要用UTF-8进行编码!!!  
注意，整个项目的编码格式换成了GBK，请不要用UTF-8进行编码!!!  
注意，整个项目的编码格式换成了GBK，请不要用UTF-8进行编码!!!  

一些教程视频：https://www.bilibili.com/video/BV133411o7Nj  

## 客户端下载
选择1：https://pan.baidu.com/s/1GAgyysoRqKsfv-ODvnGkfA  提取码：ysn1  
选择2：https://pan.baidu.com/s/17z3pBKu3jz5AOJmB9eFzqQ  提取码：f5zc  
如果想联机也参考上面视频

## 进展 
支持中文：99%  
服务端脚本汉化：40%  
完善拍卖行脚本：10%

bug看情况修复，大家有发现了反馈  

## 规划  
已将项目分成了2个分支：1.x 和 2.x 目前 master 分支与 1.x 保持一致  
1.x 分支将保持现有的逻辑不变  
2.x 分支对比 1.x 分支预估做出重大的变动  

二者的不同点：  
- 1.x 更贴近原版heavenms，后续只会优化和汉化，不会添加复杂的功能
- 2.x 增加控制台UI，方便用UI来管理服务端  
- 2.x 预计将config.yaml和wz.xml转换存储与sqlite数据库中，废弃掉复杂的xml和yaml配置，后续直接用界面管理配置  
- 2.x 因为加入了UI，相比 1.x 来说可能要求更高的电脑配置，程序体积变大  
- 2.x 可能丧失多平台的支持，至少100%不支持docker，只优先确保windows无问题  

## 文档
[修改说明](docs/change/changelog.txt)  

[文档](docs/course/目录.md)  

## 参考
感谢B站UP [@asotI1O](https://space.bilibili.com/19606926) 提供的搭建教程：  
参考专栏：https://www.bilibili.com/read/cv13485508  

感谢B站UP [@言尽乐](https://space.bilibili.com/98904118) 提供的中文乱码修复教程：  
参考专栏：https://www.bilibili.com/read/cv20050598