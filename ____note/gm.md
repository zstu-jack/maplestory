# GM
- CommandsExecutor.java
- ����GM
    - ʹ��ǰ @setgmlevel ��ɫ�� 6
    - ��Ʒ
        - @givenx����ȯ
        - @givems: ���
        - @gmshop��gm�̵�
        - @item�� �����Ʒ
        - @setslot�� ������λ
    - �ɳ�
        - @fly       ������
        - @hide      : ����
        - @unhide    ��ȡ������
        - @heal      ���ָ�
        - @maxhpmp   �����hpmp
        - @sp        : ���ܵ�
        - @ap        �����Ե�
        - @level     �����õȼ�
        - @job       ���л�ְҵ
        - @maxskill  ��������
        - @resetskill�����ü���
        - @empowerme �� ����һ��buff
        - @seteqstat 1605631�� ţ��װ��������ʹ��

    - ����������������
        - @face �� ����
        - @hair:  ��ͷ��
        - @online: ��������λ��        
        - @summon: �ٻ����
        - @gotonpc��ȥnpc����
        - @follow: ��ȥĳ�����λ��
        - @xiguai�� ��������
        - @spawn�� ���ɹ���
        - @pmob�� ���ǹ���
        - boss
            - @zakum������
            - @horntail������
            - @pinkbean
            - @pap������
            - @pianus������
            - @cake������
        - @killall��ɱ�����й���
        - @rates�� ��ѯ����
        - @exprate: ���鱶��
        - @mesorate����ұ���
        - @droprate�� ���䱶��
        - @bossdroprate��boss���䱶��
        - @questrate�� ������
        - @travelrate�� ��������
# npc


# map
```
put("�ϸ�", 60000);
put("�ʺ������ƽԭ", 1000000);
put("���ִ�", 100000000);
put("ħ������", 101000000);
put("��ʿ����", 102000000);
put("��������", 103000000);
put("�����", 104000000);
put("����֮��", 105040300);
put("�ƽ�̲", 110000000);
put("ŵ����˹����ͷ", 120000000);
put("ʥ��", 130000000);
put("���", 140000000);
put("���֮��", 200000000);
put("�Ҹ���", 209000000);
put("����ѩ��", 211000000);
put("��߳�", 220000000);
put("ˮ������", 230000000);
put("��ľ��", 240000000);
put("����", 250000000);
put("�ٲ���", 251000000);
put("�����������", 221000000);
put("ͯ����", 222000000);
put("����̩Ӫ��", 300000000);
put("��Ҷ��", 600000000);
put("�Ѻʹ�", 801000000);
put("�Ŵ�����", 800000000);
put("���ﰲ��", 260000000);
put("�������", 261000000);
put("�¼���", 540000000);
put("������ͷ��", 541000000);
put("��������", 551000000);
put("�����", 680000000);
put("ʱ�����", 270000100);
put("�϶��㳡", 103040000);
put("����Ͽ��", 240070000);
put("Ģ����", 106020000);
```


# item


# ����GM
- code: `9900001.js`
    - EnterMTSHandler
        - openCenterScript
            - NPCScriptManager.getInstance().start(c, 9900001, null);
    - cm.openNpc
        - public void start(String filename, MapleClient c, int npc, List<MaplePartyCharacter> chrs)

- npc�ű�����
    - `cm.sendOk��cm.dispose`���������
    - `cm.sendSimple`: ѡ���
    - `cm.sendNext`: �����һ���������һ��state

- ��ȡ�ͻ�������
    - `cm.sendGetText`: ��һ��state����Ҫ`var text = cm.getText();`
    - `cm.sendGetNumber`:`(text def,min,max)`
