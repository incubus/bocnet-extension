var formName;
var defaultCheckingCode = "";
function findElementByName(elementName) {
	var obj = document.getElementsByName(elementName);
	if(obj == null) return null;
	if(obj.length == 0) return null;
	return obj[0];
}
function findElementById(elementId) {
	return document.getElementById(elementId);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function inputDigital() {
	var charCode = event.keyCode;
	if (charCode < 48 || charCode > 57) {
		return false;
	} else {
		return true;
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
function EventLock() {
	this._lockedEntity = null;
	this._method = null;
}
EventLock.prototype.acquire = function(entity,method) {
	if(this._lockedEntity == null){
		this._lockedEntity = entity;
		this._method = method;
		return true;
	} else if(this._lockedEntity == entity && this._method == method) {
		return true;
	} else {
		return false;
	}
}
EventLock.prototype.release = function() {
	this._lockedEntity = null;
	this._method = null;
}
EventLock.prototype.isLocked = function() {
	return (this._lockedEntity != null && this._method != null);
}
EventLock.prototype.check = function(checkSucceed,msg) {
	if(checkSucceed) {
		EVENT_LOCK.release();
	} else {
		if(msg != null) {
			alert(msg);
		}
		EVENT_LOCK.release();
		//this._lockedEntity.focus();
	}
	return checkSucceed;
}
var EVENT_LOCK = new EventLock();
//////////////////////////////////////////////////////////////////////////////////////////////////////
//NATIONAL_ID_TYPE.1=National ID
//NATIONAL_ID_TYPE.2=Temp Resident ID
//NATIONAL_ID_TYPE.3=HuKouBu
//NATIONAL_ID_TYPE.4=Soldier ID
//NATIONAL_ID_TYPE.5=Armed Police ID
//NATIONAL_ID_TYPE.6=HuiXiangZheng
//NATIONAL_ID_TYPE.7=Taiwan Resident ID
//NATIONAL_ID_TYPE.8=Passport

function UserIdentity(idType,id) {
	this._idType = parseInt(idType,10);
	this._id = id;
}
UserIdentity.prototype.isValid = function() {
	if((this._id == null)||(this._id.length == 0)) {
		alert(IDENTITY_NO_IS_EMPTY);
		return false;
	} else {
		switch(this._idType) {
			case 1:{
				if(!this.isIdentityValid()) {
					alert(IDENTITY_NO_IS_INCORRECT);
					return false;
				}
				break;
			}
		}
		return true;
	}
}
UserIdentity.prototype.isIdentityValid = function() {
	if(this._id.length == 15) {
		if(!this._id.isNumber()) {
			return false;
		}
		var date = new Date();
		if(!date.parseDate("19" + this._id.substring(6,8) + "/" + this._id.substring(8,10) + "/" + this._id.substring(10,12),"yyyy/MM/dd")) {
			return false;
		}
	} else if(this._id.length == 18)	{
		var lPattern = new RegExp("^[0-9]{17}[0-9xX]{1}$" ,"g");
		var lMatchResult = lPattern.exec(this._id);
		if(lMatchResult == null) {
			return false;
		}
		var date = new Date();
		if(!date.parseDate(this._id.substring(6,10) + "/" + this._id.substring(10,12) + "/" + this._id.substring(12,14),"yyyy/MM/dd")) {
			return false;
		}
		if(new Date().diffByDays(date) > 0) {
			return false;
		}
	} else {
		return false;
	}
   return true;   
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function BankingAccount(accountType,accountNumber,allowEmpty) {
	this._type = parseInt(accountType,10);
	this._id = accountNumber;
	this._allowEmpty = (allowEmpty == null)?true:allowEmpty;
}
BankingAccount.prototype.isValid = function() {
	if((!this._allowEmpty)&&((this._id == null)||(this._id.length == 0)||(this._type == null)||(this._type.length == 0))) {
		alert(ACCOUNT_IS_EMPTY);
		return false;
	} else if(!this._id.isNumber()){
		alert(ACCOUNT_MUST_BE_NUMBER);
		return false;
	} else {
		switch(this._type) {
			case 119:{
				if(this._id.length != 19) {
					alert(DEBIT_CARD_IS_INVALID);
					return false;
				}
				break;
			}
			case 103:{
				if(this._id.length !=16) {
					alert(BOC_CREDIT_CARD_IS_INVALID);
					return false;
				}
				break;
			}
			case 104:{
				if((this._id.length > 16)||(this._id.length < 15)) {
					alert(QCC_IS_INVALID);
					return false;
				}
				break;
			}
		}
	}
	return true;
}
BankingAccount.prototype.isValidEnrollmentAccount = function() {
	var lIsValid = this.isValid();
	if(!lIsValid) {
		return false;
	}
	if(this._type != 119) {
		alert(ENROLLMENT_ACCOUNT_INVALID);
		return false;
	}
	return true;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
Array.prototype.get = function(index) {
	if((this.length - 1)< index) {
		return null;
	} else {
		return this[index];
	}
}


//////////////////////////////////////////////////////////////////////////////////////////////////////

String.prototype.isMoney = function(){
	if(this == "") return true;
	var lPattern = new RegExp("^[0-9]+$|^[0-9]+\\.[0-9]{0,2}$" ,"ig");
	var lMatchResult = lPattern.exec(this);
	if(lMatchResult == null) {
		alert(COMMON_ISMONEY_INVALID);
	}
	return (lMatchResult != null);
}

String.prototype.rtrim = function() {
	var pattern = new RegExp(" *$" ,"ig");
	return this.replace(pattern,"");
}
String.prototype.ltrim = function() {
	var pattern = new RegExp("^ *" ,"ig");
	return this.replace(pattern,"");
}
String.prototype.trim = function() {
	var pattern = new RegExp("^ *| *$" ,"ig");
	return this.replace(pattern,"");
}
String.prototype.removeSpace = function() {
	var pattern = new RegExp(" *" ,"ig");
	return this.replace(pattern,"");
}
String.prototype.extractDigits = function() {
	var pattern = new RegExp("[^0-9]" ,"ig");
	return this.replace(pattern,"");
}
String.prototype.format = function(datas) {

	var pattern = new RegExp("\\{[0-9]{1,1}\\}" ,"ig");
	var matchResult = null;
	if(datas == null) datas = new Array(0);
	var result = this;
	var subPattern = null;
	var index = null;
	var dataValues = null;
	var subStr = null;
	while((matchResult = pattern.exec(result)) != null){
		subStr = matchResult[0];
		subStr = subStr.replace(new RegExp("{","ig"),"\\{");
		subStr = subStr.replace(new RegExp("}","ig"),"\\}");
		subPattern = new RegExp(subStr,"ig");
		index = matchResult[0].extractDigits();
		dataValue = datas.get(index);
		if(dataValue == null) dataValue = "";
		result = result.replace(subPattern,dataValue);
	}
	return result;
}
/**
 * Check whether this is a phone number
 */
String.prototype.isPhone = function(message) {
	var lPattern = new RegExp("^[0-9\\-a-zA-Z]{0,15}$" ,"g");
	var lMatchResult = lPattern.exec(this);
	if(lMatchResult == null) {
		if(message == null) {
			alert(PHONE_IS_INCORRECT);
		} else if(message.length > 0) {
			alert(message);
		}
	}
	return (lMatchResult != null);
}
/**
 * Check whether this is a mobile number
 */
String.prototype.isMobile = function(message) {
	var lPattern = new RegExp("^[0-9]{11}$" ,"g");
	var lMatchResult = lPattern.exec(this);
	if(lMatchResult == null) {
		if(message == null) {
			alert(MOBILE_IS_INCORRECT);
		} else if(message.length > 0) {
			alert(message);
		}
	}
	return (lMatchResult != null);
}
/**
 * Check whether this is a Email
 */
String.prototype.isZipcode = function(message) {
	var lPattern = new RegExp("^[0-9]{6}$" ,"g");
	var lMatchResult = lPattern.exec(this);
	if(lMatchResult == null) {
		if(message == null) {
			alert(ZIPCODE_IS_INCORRECT);
		} else if(message.length > 0) {
			alert(message);
		}
	}
	return (lMatchResult != null);
}
/**
 * Check whether this is a valid username
 */
String.prototype.isUserName = function(message) {
	var lValid = true;
	if((this.length < 6)||(this.length > 20)) {
		lValid = false;
	} else {
		//must contain at least one letter
		var lPattern = new RegExp("^[!-~]*[A-Za-z]+[!-~]*$" ,"g");
		var lMatchResult = lPattern.exec(this);
		lValid = (lMatchResult != null);
	}
	if(!lValid) {
		if(message == null) {
			alert(USER_NAME_IS_INCORRECT);
		} else if(message.length > 0) {
			alert(message);
		}
	}
	return lValid;
}
/**
 * Check whether this is a valid username
 */
String.prototype.isUserAddress = function(message) {
	if(this.length > 60) {
		if(message == null) {
			alert(ADDRESS_IS_INCORRECT);
		} else if(message.length > 0) {
			alert(message);
		}
		return false;
	} else {
		return true;
	}
}
/**
 * Check whether this is a valid user password
 */
String.prototype.isUserPassword = function(message) {
	var lValid = true;
	if((this.length < 8)||(this.length > 20)) {
		lValid = false;
	} else {
		//must contain at least one letter and one digit
		var lPattern = new RegExp("^[0-9]+([0-9]*[a-zA-Z]+[0-9]*)+$|^[a-zA-Z]+([a-zA-Z]*[0-9]+[a-zA-Z]*)+$" ,"g");
		var lMatchResult = lPattern.exec(this);
		lValid = (lMatchResult != null);
	}
	if(!lValid) {
		if(message == null) {
			alert(PASSWORD_IS_INCORRECT);
		} else if(message.length > 0) {
			alert(message);
		}
	}
	return lValid;
}
/**
 * Check whether this is a valid Email
 */
String.prototype.isEmail = function(message) {
	var lValid = this.isValidEmail();
	if(!lValid) {
		if(message == null) {
			alert(EMAIL_IS_INCORRECT);
		} else if(message.length > 0) {
			alert(message);
		}
	}
	return lValid;
}

/**
 * format the email
 */
String.prototype.isValidEmail = function() {
	var lPattern = new RegExp("^[0-9a-zA-Z]+[0-9a-zA-Z\\.\\-_]*[0-9a-zA-Z]+@[0-9a-zA-Z_\\-]+(\\.[0-9a-zA-Z_\\-]+)+$" ,"g");
	var lMatchResult = lPattern.exec(this);
	return (lMatchResult != null);
}

/**
 * set the length of string
 */
String.prototype.setLen = function(len,rightAppend,appendingChar) {
	if((appendingChar == null)||(appendingChar.length == 0)) {
		appendingChar = " ";
	}
	if(this.length == len) {
		return this;
	} else if(this.length > len) {
		return this;
	} else {
		var lAppendingStr = "";
		for(var index = 0;index < len - this.length;index++) {
			lAppendingStr += appendingChar;
		}
		if(rightAppend) {
			return this + lAppendingStr;
		} else {
			return lAppendingStr + this;
		}
	}
}
/**
 * format the string into integer.
 */
String.prototype.parseInteger = function(){
if ((this != null)&&(this != "")){
        return isNaN(parseInt(this,10)) ? this : parseInt(this,10);
    }else{
        return this;
    }
}


String.prototype.isNumber = function() {
	if(this == "") return true;
	var lPattern = new RegExp("^[0-9]+$" ,"g");
	var lMatchResult = lPattern.exec(this);
	return (lMatchResult != null);
}
String.prototype.chineseLength = function() {
	var lPattern = new RegExp("[\x00-\xFF]{1}","g");
	lMatchResult = this.match(lPattern);
	var lAsciiLen = 0;
	if(lMatchResult == null) {
		lAsciiLen = 0;
	} else {
		lAsciiLen = lMatchResult.length;
	}
	return lAsciiLen + (this.length - lAsciiLen) * 2
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function Integer(integer) {
	this.text = new String(integer);
	this.value = this.parse(this.text);
}
Integer.prototype.setText = function(integer) {
	this.text = new String(integer);
	this.value = this.parse(this.text);
}

Integer.prototype.toString = function() {
	return this.value;
}
Integer.prototype.getText = function() {
	return this.text;
}
Integer.prototype.getValue = function() {
	if(!this.checkFormat()) {
		return Number.NaN;
	} else {
		return parseInt(this.value);
	}
}
Integer.prototype.execOperator = function(operator,value) {
	if(operator == ">") {
		return this.getValue() > value;
	} else if(operator == ">=") {
		return this.getValue() >= value;
	} else if(operator == "<") {
		return this.getValue() < value;
	} else if(operator == "<=") {
		return this.getValue() <= value;
	} else if(operator == "=") {
		return this.getValue() == value;
	} else if(operator == "%" ) {
		if(value == 0) return false;
		return ((this.getValue() % value) == 0);
	}
	return true;
}

Integer.prototype.parse = function() {
	if((this.text == null)||(this.text.length == 0)) return "0";
	var pattern = new RegExp("[,]" ,"ig");
	var tempValue = this.text.replace(pattern,"");
	if(tempValue.length == 0) {
		return "0";
	} else {
		return tempValue;
	}
}
Integer.prototype.checkFormat = function() {
	if((this.value == null)||(this.value.length == 0)) return true;
	var pattern = new RegExp("^[0-9]$" ,"ig");
	var matchResult = this.value.match(pattern);

	return (matchResult != null && matchResult.index == 0 && matchResult.lastIndex == this.value.length)?true:false;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function Float(number){
	this.base = Integer;
	this.base(number);
}
Float.prototype = new Integer;

Float.prototype.checkFormat = function() {
	if((this.value == null)||(this.value.length == 0)) return true;
	var pattern = new RegExp("^[0-9]*\\.?[0-9]{0,2}$" ,"ig");
	var matchResult = this.value.match(pattern);

	return (matchResult != null && matchResult.index == 0 && matchResult.lastIndex == this.value.length)?true:false;
}
Float.prototype.getValue = function() {
	if(!this.checkFormat()) {
		return Number.NaN;
	} else {
		return parseFloat(this.value);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function Currency(label,currency){
	this.base = Float;
	this.base(currency);
	this.label = label;
	this.rules = null;
}

Currency.prototype = new Float;

Currency.prototype.setCheckRule = function(checkRule) {
	if(checkRule == null) {
		this.rules = null;
	} else {
		checkRule = checkRule.trim();
		if(checkRule.length == 0) {
			this.rules = null;
		} else {
			this.rules = checkRule.split(",");
		}
	}
}
Currency.prototype.checkRule = function() {
	if(!this.checkFormat()) {
		alert(Currency_value_INVALID_FORMAT.format(new Array(this.label,this.value)));
		return false;
	}
	if(this.rules == null) return true;
	var rule = null;
	for(var index = 0;index < this.rules.length;index++) {
		rule = this.rules[index];
		if(!this.checkSingleRule(rule)) {
			return false;
		}
	}
	return true;
}
Currency.prototype.checkSingleRule = function(rule) {
	if((rule == null)||(rule.length == 0)) return true;
	var operator1 = null;
	var tmpValue1 = null;
	var label1 = null;
	var middleValue1 = null;
	var operator2 = null;
	var tmpValue2 = null;
	var label2 = null;
	var operatorPattern = new RegExp("^[>=<%/]","ig");
	var valuePattern = new RegExp("^[0-9.]+","ig");
	var labelPattern = new RegExp("^[^><=%/]+","ig");
	var matchResult = null;

	matchResult = rule.match(operatorPattern);
	if(matchResult == null) 
		return true;
	operator1 = matchResult[0];
	rule = rule.substring(matchResult.lastIndex);

	matchResult = rule.match(valuePattern);
	if(matchResult == null) 
		return true;
	tmpValue1 = new Float(matchResult[0]).getValue();
	rule = rule.substring(matchResult.lastIndex);

	matchResult = rule.match(labelPattern);
	if(matchResult != null)  {
		label1 = matchResult[0];
		rule = rule.substring(matchResult.lastIndex);
	} else {
		label1 =  "";
	}
	var datas = new Array(this.label,this.value,label1,tmpValue1);
	if(!new Float(this.value).execOperator(operator1,tmpValue1)){
		if(operator1 == ">") {
			alert(Currency_Value_More.format(datas));
		} else if(operator1 == ">=") {
			alert(Currency_Value_Not_Less.format(datas));
		} else if(operator1 == "<") {
			alert(Currency_Value_Less.format(datas));
		} else if(operator1 == "<=") {
			alert(Currency_Value_Not_More.format(datas));
		} else if(operator1 == "%" ) {
			alert(Currency_Value_Multiple.format(datas));
		} else if(operator1 == "=" ) {
			alert(Currency_Value_Equal.format(datas));
		}
		return false;
	}
	return true;
}
///////////////////////////////////////////////////////////////////////////////////////
function CurrencyElement(label) {
	this.label = label;
	this.elementName = null;
	this.elementId = null;
	this.element = null;
	this.value = new Currency(this.label,"");
}


CurrencyElement.prototype.setElementName = function(elementName){
	this.elementName = elementName;
	this.element = findElementByName(elementName);
	if(this.element == null) {
		alert(CurrencyElement-Object-Not-Exist.format(new Array(this.label)));
	}
}
CurrencyElement.prototype.setElementId = function(elementId){
	this.elementId = elementId;
	this.element = findElementById(elementId);
	if(this.element == null) {
		alert(CurrencyElement-Object-Not-Exist.format(new Array(this.label)));
	}
}
CurrencyElement.prototype.setText = function(currency){
	this.value.setText(currency);
	if(this.isExist())
		this.element.value = this.value.getText();
}
CurrencyElement.prototype.setValue = function(currency){
	this.value.setText(currency);
	if(this.isExist())
		this.element.value = this.value.getValue();
}
CurrencyElement.prototype.setDisabled = function(disabled){
	if(this.isExist())
		this.element.disabled = disabled;
}
CurrencyElement.prototype.isExist = function(){
	return (this.element != null);
}
CurrencyElement.prototype.getText = function(){
	this.value.setText(this.element.value);
	return this.value.getText();
}
CurrencyElement.prototype.getValue = function(){
	this.value.setText(this.element.value);
	return this.value.getValue();
}
CurrencyElement.prototype.setCheckRule = function(checkRule){
	this.value.setCheckRule(checkRule);
}
CurrencyElement.prototype.checkRule = function() {
	return this.value.checkRule();
}

/**
 * parse a Date String
 * if parse failed,return false;
 */	
Date.prototype.parseDate = function(dateStr,format) {
	if(format == null) format = DATE_FORMAT;
	var lPattern = new RegExp("[^ymdsh]+" ,"ig");
	var lFields = format.split(lPattern);
	if(lFields == null){
		return true;
	}
	dateStr = dateStr.trim();
	lPattern = new RegExp("[^0-9]+" ,"g");
	var lDateFields = dateStr.split(lPattern);
	if(lDateFields == null) {
		return false;
	}
	if(lFields.length != lDateFields.length) {
		return false;
	}
	var lYearPattern = new RegExp("^[y]+$" ,"g");
	var lMonthPattern = new RegExp("^[M]+$" ,"g");
	var lDayPattern = new RegExp("^[d]+$" ,"g");

	var lMatchResult = null;
	this.setFullYear(1974);
	this.setMonth(0);
	this.setDate(1);
	this.setHours(0);
	this.setMinutes(0);
	this.setSeconds(0);
	this.setMilliseconds(0);
	for(var index = 0;index < lDateFields.length;index++) {
		lMatchResult = lYearPattern.exec(lFields[index]);
		if(lMatchResult != null) {
			this.setFullYear(parseInt(lDateFields[index],10));
			continue;
		}
		lMatchResult = lMonthPattern.exec(lFields[index]);
		if(lMatchResult != null) {
			this.setMonth(parseInt(lDateFields[index],10) - 1);
			continue;
		}
		lMatchResult = lDayPattern.exec(lFields[index]);
		if(lMatchResult != null) {
			this.setDate(parseInt(lDateFields[index],10));
			continue;
		}
	}
	for(var index = 0;index < lDateFields.length;index++) {
		lMatchResult = lYearPattern.exec(lFields[index]);
		if(lMatchResult != null) {
			if(this.getFullYear() == parseInt(lDateFields[index],10)){
				continue;
			} else {
				return false;
			}
		}
		lMatchResult = lMonthPattern.exec(lFields[index]);
		if(lMatchResult != null) {
			if((this.getMonth() + 1) == parseInt(lDateFields[index],10)){
				continue;
			} else {
				return false;
			}
		}
		lMatchResult = lDayPattern.exec(lFields[index]);
		if(lMatchResult != null) {
			if(this.getDate() == parseInt(lDateFields[index],10)) {
				continue;
			} else {
				return false;
			}
		}
	}
	return true;
}
/**
 * format  the date
 * if parse failed,return false;
 */	
Date.prototype.format = function(format) {
	if(format == null) format = DATE_FORMAT;
	var lPattern = new RegExp("[^ymdsh]+" ,"ig");
	var lFields = format.split(lPattern);
	if(lFields == null){
		return "";
	}
	lPattern = new RegExp("[ymdsh]+" ,"ig");
	var lSeparators = format.split(lPattern);
	var lDateStr = "";
	var lYearPattern = new RegExp("^[y]+$" ,"g");
	var lMonthPattern = new RegExp("^[M]+$" ,"g");
	var lDayPattern = new RegExp("^[d]+$" ,"g");

	var lMatchResult = null;
	for(var index = 0;index < lFields.length;index++) {
		lMatchResult = lYearPattern.exec(lFields[index]);
		if(index > 0) {
			lDateStr += lSeparators[index - 1];
		}
		if(lMatchResult != null) {
			lDateStr += ("" + this.getFullYear()).setLen(lFields[index].length,false,"0");
			continue;
		}
		lMatchResult = lMonthPattern.exec(lFields[index]);
		if(lMatchResult != null) {
			lDateStr += ("" + (this.getMonth() + 1)).setLen(lFields[index].length,false,"0");
			continue;
		}
		lMatchResult = lDayPattern.exec(lFields[index]);
		if(lMatchResult != null) {
			lDateStr += ("" + this.getDate()).setLen(lFields[index].length,false,"0");
			continue;
		}
	}
	return lDateStr;
}
/**
 * return a new date object whose hour,minutes,seconds,millseconds is 0
 */
Date.prototype.toDate = function() {
	var date = new Date(this);
	date.setHours(0,0,0,0);
	return date;
}
/**
 * return the diff days between endDate and this date; ignore the hour,minute,second,millsecond
 */
Date.prototype.diffByDays = function(endDate) {
	var lBeginDate = this.toDate().getTime();
	var lEndDate = endDate.toDate().getTime();
	if(lBeginDate < lEndDate) {
		return Math.floor((lEndDate - lBeginDate) / (24 * 60 * 60 * 1000));
	} else {
		return Math.ceil((lEndDate - lBeginDate) / (24 * 60 * 60 * 1000));
	}
}
/**
 * return the diff days between endDate and this date; ignore the hour,minute,second,millsecond
 */
Date.prototype.diffByMonths = function(endDate) {
	var lBeginDate = this.toDate();
	var lEndDate = endDate.toDate();
	var lSign = 1;
	if(lBeginDate > lEndDate) {
		lSign = -1;
		var lTmp = lEndDate;
		lEndDate = lBeginDate;
		lBeginDate = lTmp;
	}
	var lDiffMonth = (lEndDate.getFullYear() - lBeginDate.getFullYear()) * 12 + lEndDate.getMonth() - lBeginDate.getMonth();
	var lMaxEndDate = new Date(lBeginDate);
	lMaxEndDate.setDate(1);
	lMaxEndDate.setMonth(lMaxEndDate.getMonth() + lDiffMonth);
	var lMaxEndDateMonth = lMaxEndDate.getMonth();
	lMaxEndDate.setDate(lBeginDate.getDate());
	if(lMaxEndDate.getMonth() != lMaxEndDateMonth) {
		lMaxEndDate.setDate(0);
	}
	if(lEndDate.getTime() >= lMaxEndDate.getTime()) {
		return lSign * lDiffMonth;
	} else {
		return lSign * (lDiffMonth - 1);
	}
	
	
	
}
/**
 * return the diff days between endDate and this date; ignore the hour,minute,second,millsecond
 * if the end month don't have the valid date of begin date ,then use the last month date as the end date.
 */
Date.prototype.isLessByMonth = function(endDate,months) {
	var lBeginDate = this.toDate();
	var lEndDate = endDate.toDate();
	var lMaxEndDate = new Date(lBeginDate);
	lMaxEndDate.setDate(1);
	lMaxEndDate.setMonth(lBeginDate.getMonth() + months);
	var lMaxEndDateMonth = lMaxEndDate.getMonth();
	lMaxEndDate.setDate(lBeginDate.getDate());
	if(lMaxEndDate.getMonth() != lMaxEndDateMonth) {
		lMaxEndDate.setDate(0);
	}
	if(months > 0) {
		return lEndDate.getTime() <= lMaxEndDate.getTime();
	} else {
		return lEndDate.getTime() >= lMaxEndDate.getTime();
	}
}
//////////////////////////////////////////////////////////////////////////////////////
var DIGITAL_CHARS = "0123456789ABCDEF";
//convert a number to a number string with specified radix
Number.prototype.toRadix = function(radix) {
	if(radix > DIGITAL_CHARS.length) {
		throw "Don't support radix " + radix;
	}
	var lValue = Math.floor(this);
	if(lValue == 0) return "0";
	var lTempValue = null;
	if(lValue < 0) {
		lTempValue = new Number(Math.abs(this));
	} else {
		lTempValue = this;
	}
	var lExtraValue = 0;
	var lStr = "";
	while(lTempValue != 0){
		lExtraValue = lTempValue % radix;
		lStr = DIGITAL_CHARS.substring(lExtraValue,lExtraValue + 1) + lStr;
		lTempValue = (lTempValue - lExtraValue) / radix;
	}
	if(lValue < 0) {
		lStr = "-" + lStr;
	}
	return lStr;
}
//convert a number sting with specified radix to a number 
Number.prototype.fromRadix = function(value,radix) {
	var lResult = 0;
	if((value == null)||(value.length == 0)) {
		lResult = 0;
	} else {
		lResult = 0;
		var lPosition = 0;
		value = new String(value).toUpperCase();
		for(var index = 0;index < value.length;index++) {
			lPosition = DIGITAL_CHARS.indexOf(value.substring(index,index + 1));
			
			if(lPosition < 0) {
				throw "Radix " + radix + " doesn't have the number character " + value.substring(index,index + 1) + "!";
			} else {
				lResult = lResult + lPosition * Math.pow(radix,value.length - index - 1);
			}
		}
	}
	return lResult;
}
var NUMBER = new Number(0);


/////////////////////////////////////////////////
function validateRegister()
{
	formName = document.form1;
    
    if(validateAccount()) {
		return false;
	}
	//check user input password
	
	if(validateID()) {
		return false;
	}
	try{
		if((formName.ValidationChar.value.length == 0)||
			(formName.ValidationChar.value == defaultCheckingCode)) {
			alert(CHECKING_CODE_IS_EMTPY);
			formName.ValidationChar.focus();
			return false;
		}
	}catch(ex){
		alert(CHECKING_CODE_IS_EMTPY);
		formName.ValidationChar.focus();
		return false;
	}
	//formName.submit();
	return true;
}

function validateID(){
	var userId = new UserIdentity(formName.IdentityType.value,formName.IdentityNumber.value);
	var  result = userId.isValid();
	if(!result) {
		formName.IdentityNumber.focus();
	}
	return !result;
}

function validateAccount()
{
	var account = new BankingAccount(formName.AccountType.value,formName.AccountNumber.value,false);
	var  result = account.isValidEnrollmentAccount();
	if(!result) {
		formName.AccountNumber.focus();
	}
	return !result;
}	
////////////////////////////////////////
function checkUniqueUser(formAction) {
    formName = document.form1;
    if( formName.LoginName.value.length == 0 ) {
		alert(USER_NAME_IS_EMPTY);
		formName.LoginName.focus();
		return ;
    } else if(!formName.LoginName.value.isUserName()){
		formName.LoginName.focus();
		return ;
    }
	if(formAction == null) {
		formAction = "Logon_register4.do";
	} 
	formName.action = formAction;
	formName.submit();
}
//////////////////////////////////////////////	
function validateRegisterInfo(formAction)
{

	if(formAction == null) {
		formAction = "Logon_registerResult.do";
	}
	if ( user.isValid()) {
		document.form1.action = formAction;
        document.form1.submit();
        return true;
    } else {
		return false;
    }
}
//////////////////////////////////////////////
function validateEtoken()
{
	var Etoken = formName.Etoken.value;
	if ( ( Etoken.length != 6 ) || ( !Etoken.isNumber() ) ){
		alert(E_TOKEN_INVALID);
        formName.Etoken.focus();
		return false;
	}
	return true;
}	
///////////////////////////////////////////////
function validateRetrieveAlias(){
	var strTemp;
    formName = document.form1;
	
    // validate password
    password = formName.Password1.value;
    if ( password.length < 8 ){
        alert(EFS_PASSWORD_LEN_INVALID);
        formName.Password1.focus();
		return false;
    }
    if(validateAccount()) {
		return false;
	}
	//check user input password
	if(validateID()) {
		return false;
	}
	
	try{
		if((formName.ValidationChar.value.length == 0)||
			(formName.ValidationChar.value == defaultCheckingCode)) {
			alert(CHECKING_CODE_IS_EMTPY);
			formName.ValidationChar.focus();
			return false;
		}
	}catch(ex){
		alert(CHECKING_CODE_IS_EMTPY);
		formName.ValidationChar.focus();
		return false;
	}

	//formName.submit();
	return true;
}
//////////////////////////////////////////
function validateRetrievePass(){
	var strTemp;
    formName = document.form1;
    if ( formName.LoginName.value.length < 6 ) {
        alert(USER_NAME_LEN_INVALID);
        formName.LoginName.focus();
        return;
    }

	//check user input password
	if(validateAccount()) {
		return false;
	}
	if(validateID()) {
		return false;
	}
	

	try{
		if((formName.ValidationChar.value.length == 0)||
			(formName.ValidationChar.value == defaultCheckingCode)) {
			alert(CHECKING_CODE_IS_EMTPY);
			formName.ValidationChar.focus();
			return false;
		}
	}catch(ex){
		alert(CHECKING_CODE_IS_EMTPY);
		formName.ValidationChar.focus();
		return false;
	}
	formName.submit();
	return true;
}
//////////////////////////////////////
function validateUserPw(){
    formName = document.form1;

    // validate password
    password = formName.elements["NewPass1"].value;
    verifypassword = formName.elements["NewPass2"].value;
    // validate password
    if ( password != verifypassword ) {
		alert(PASSWORD_NOT_EQUAL_CONFIRM_PASSWORD);
		formName.elements["NewPass2"].focus();
		return false;
    } else  if(!password.isUserPassword()){
		formName.elements["NewPass1"].focus();
		return false;
    }
    return true;
	
}