// var api = 'http://1.94.11.67/chargingwechatclient/';
var api = 'https://www.sh-taixun.com/chargingwechatclient';
// var api = 'http://localhost:9080/wechatclient/';
// var scoketip = 'wss://localhost:8080/charging/';
// var scoketip = 'ws://192.168.2.3:9090/admin-api/charging/';
var scoketip = 'wss://www.sh-taixun.com/admin-api/charging/';
//=====
// const base_url = 'http://192.168.2.3:8081/car-charge-app-api'
const base_url = 'https://www.sh-taixun.com/car-charge-app-api'
// var appid = 'wxc06e483d85de95c7';
var appid = 'wx055b667fc6f62f3b';

function toDecimal2(x) {
	var f = parseFloat(x);
	if (isNaN(f)) {
		return false;
	}
	var f = Math.round(x * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s;
}
export default {
	api,
	appid,
	scoketip,
	toDecimal2,
	base_url,
};
