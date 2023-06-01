var status;

function start(){
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection){
	if(mode == -1 || (mode == 0 && status == 0)){
		cm.dispose();
		return;
	}
	else if(mode == 0)
		status--;
	else
		status++;


	if(status == 0){
		cm.sendNext("...一团暗影突然浮现，攻击了你？这种事怎么会发生在 #b#p1032001##k 的家里呢？听起来像是有什么大阴谋...");
	}
	else if(status == 1){
		cm.sendNextPrev("我得把这些事情都记下来，等下再来找我。");
	}
	else if(status == 2){
		cm.dispose();
	}
}