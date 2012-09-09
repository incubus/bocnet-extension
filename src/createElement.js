/**
 * 创建安全控件脚本
 */
var rs = "";

function CreateControl(DivID, Form, ObjectID, mode, language) {
	var d = document.getElementById(DivID);
	var obj = document.createElement('input');
	obj.type = "hidden";
	obj.name = ObjectID;
	obj.setAttribute("isobj", "1");
	d.appendChild(obj);
	obj.id=ObjectID;

	var version = getVersion(obj);
	passInit(obj, mode, language, version);
	var rc = null;
	if (version >= 66816) { //66560 1.4.0.0 //66306 1.3.0.2 //66305 1.3.0.1 //65539 1.3.0
		getRS();
		if (rs != "") {
			obj.RandomKey_S = rs;
			rc = obj.RandomKey_C;
		}
	}
	input = document.createElement('input');
	input.type = (mode == 2 ? "text" : "password");
	input.setAttribute("onChange", "form1." + ObjectID + ".value = " + (mode == 2 ? "" : "encrypt") + "(this.value);");
	input.className = "login";
	d.appendChild(input);
	return rc;
}

/**
 * 取控件版本号
 */
function getVersion(obj) {
	try	{
		var version = obj.Version;
		try {
			if (version == undefined)
				return 0;
		} catch(ve) {//IE5.0
			return 0;
		}
		return version;
	}
	catch(e) {
		return 0;
	}
}

/**
 * 取rs
 */
function getRS() {
	if (rs == "") {
		url = "refreshrs.do";
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	
		if(xmlhttp) {
			xmlhttp.open("POST", url, false);
			xmlhttp.send();
			rs = xmlhttp.responseText;
			if (rs == null) {
				alert("Control rs error.");
				rs = "";
			}
			else {
				rs = rs.replace(/[ \t\r\n]/g,   "");
				if (rs.length != 24) {
					alert("Control rs error:" + rs.length);
					rs = "";
				}
			}
		}
	}
}

/**
 * 取控件版状态
 */
function getState(obj) {
	try	{
		var state = obj.State;
		try {
			if (state == undefined)
				return 0;
		} catch(ve) {//IE5.0
			return 0;
		}
		return state;
	}
	catch(e) {
		return 0;
	}
}

/**
 * 控件检测
 */
function passControlCheck(obj, mode, language) {
	try	{
		var version = getVersion(obj);
		passInit(obj, mode, language, version);
		return true;
		if (version < 65539) {//66560 1.4.0.0 //66306 1.3.0.2 //66305 1.3.0.1 //65539 1.3.0
			alert(SAFECONTROL_VERSION);
			return false;
		}
	}
	catch(e) {
		alert(SAFECONTROL_INSTALL);
		return false;
	}
	return true;
}

/**
 * 设置控件
 */

function passInit(obj, mode, language, version) {
	return 0;
	obj.SetLanguage(language);
	//口令
	if (mode == 0) {
		obj.PasswordIntensityMinLength = 1;
		obj.MaxLength = 20;
		obj.OutputValueType = 2;
		obj.PasswordIntensityRegularExpression = "^[!-~]*$";
	}
	//新口令
	else if (mode == 1) {
		obj.PasswordIntensityMinLength = 8;
		obj.MaxLength = 20;
		obj.OutputValueType = 2;
		obj.PasswordIntensityRegularExpression = "(^[!-~]*[A-Za-z]+[!-~]*[0-9]+[!-~]*$)|(^[!-~]*[0-9]+[!-~]*[A-Za-z]+[!-~]*$)";
	}
	//动态口令
	else if (mode == 2) {
		obj.PasswordIntensityMinLength = 6;
		obj.MaxLength = 6;
		obj.OutputValueType = 1;
		obj.PasswordIntensityRegularExpression = "^[0-9]{6}$";
	}
	//电话银行密码
	else if (mode == 3) {
		obj.PasswordIntensityMinLength = 6;
		obj.MaxLength = 6;
		obj.OutputValueType = 1;
		obj.PasswordIntensityRegularExpression = "^[0-9]{6}$";
	}
		//手机银行密码
	else if (mode == 4) {
		obj.PasswordIntensityMinLength = 8;
		obj.MaxLength = 20;
		obj.OutputValueType = 1;
		obj.PasswordIntensityRegularExpression = "^[!-~]*$";
	}
	
}
