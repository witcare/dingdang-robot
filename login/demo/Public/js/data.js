function getServerUrl() {
	//return "http://172.16.10.100";
    //return "http://www.jitmes.com";
    return "http://localhost:90";
}
function getApiServerUrl() {
    return "http://api.jitmes.com/api/";
    //return "http://192.168.2.109:91/api/";
    //return "http://localhost:43645/api/";
    //return "http://www.jitmes.com:8733";
}
function getKanbanImgUrl() {
    return "http://115.28.242.138:90/Login/PictureShow";
}
function setPlatform(p) {
	setCookie("jitmes.platform", p);
}
function getPlatform() {
	getCookie("jitmes.platform");
}

function getUserId() {
	return getCookie("jitmes.user.UID");
}
function setUserId(uid) {
	setCookie("jitmes.user.UID", uid);
}

function getUserName() {
	return getCookie("jitmes.user.NAME");
}
function setUserName(name) {
	setCookie("jitmes.user.NAME", name);
}

function getUserProcess() {
	return getCookie("jitmes.user.PROCESS");
}
function setUserProcess(processCode) {
	setCookie("jitmes.user.PROCESS", processCode);
}
