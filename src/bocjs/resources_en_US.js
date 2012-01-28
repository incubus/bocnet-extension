//************************************/
//*******   定义所有JS提示语    *******/
//************************************/

/** CurCode货币列表 begin */
var CURCODE_CNY = "CNY";
var CURCODE_GBP = "GBP";
var CURCODE_HKD = "HKD";
var CURCODE_USD = "USD";
var CURCODE_CHF = "Swiss Franc";
var CURCODE_DEM = "Deutsche Mark";
var CURCODE_FRF = "French Franc";
var CURCODE_SGD = "SGD";
var CURCODE_NLG = "Dutch Guilder";
var CURCODE_SEK = "Sweden Krona";
var CURCODE_DKK = "Denmark Krona";
var CURCODE_NOK = "Norway Krona";
var CURCODE_ATS = "Austrian Schilling";
var CURCODE_BEF = "Belgian Franc";
var CURCODE_ITL = "Italian lira";
var CURCODE_JPY = "JPY";
var CURCODE_CAD = "CAD";
var CURCODE_AUD = "AUD";
var CURCODE_EUR = "EUR";
var CURCODE_IDR = "Indonesia Rupiah";
var CURCODE_MOP = "Macau Pataca";
var CURCODE_PHP = "Philippine Peso";
var CURCODE_THB = "Thailand Baht";
var CURCODE_NZD = "New Zealand Dollar";
var CURCODE_KRW = "KRW";
var CURCODE_XSF = "Recording Swiss Franc";

//edit by zhangfeng
var CURCODE_VND = "Vietnamese Dong";
var CURCODE_IDR = "INDONESIAN RUPIAH";
//edit by liangd
var CURCODE_AED = "AED";
var CURCODE_ARP = "ARP";
var CURCODE_EGP = "EGP";
var CURCODE_INR = "INR";
var CURCODE_JOD = "JOD";
var CURCODE_MNT = "MNT";
var CURCODE_MYR = "MYR";
var CURCODE_NGN = "NGN";
var CURCODE_ROL = "ROL";
var CURCODE_TRL = "TRL";
var CURCODE_UAH = "UAH";
var CURCODE_ZAR = "ZAR";
/** CurCode货币列表 end   */

//edit by cuiyk

var CURCODE_RUR = "RUR";
var CURCODE_HUF = "HUF";
var CURCODE_KZT = "KZT";
var CURCODE_ZMK = "KWACHA";
var CURCODE_XPT = "PLATINUM";
var CURCODE_BND = "BRUNEI";
var CURCODE_BRL = "REAL";
var CURCODE_BWP = "Pula";

//added by hhf.2009.9.10
var CURCODE_XAU="XAU";
var CURCODE_GLD="GLD";

/** FormCheck表单检查 begin */
var COMMA_MSG = ",";
var ENTER_MSG = "\n";

var NOT_NULL = "should not be empty.Please modify!";
var ILLEGAL_REGEX = "should match input format, please modify!";
var ILLEGAL_CHAR = "includes the illegal characters:[]^$\\~@#%&<>{}:'\",Please modify!";
var HAVE_CHINESE = "Data contains Chinese characters or other non-standard characters, please modify!";
var NOT_ONLY_CHINESE = "Data contains characters other than Chinese characters, please modify!";
/**
 * modify by zph bocnet6.0 sit 2011-5-12
 */
var NOT_NUMBER = "Data contains characters other than numbers, please modify!";
var NOT_PHONE_NUMBER = "Should match phone numner format, please modify!";

var LENGTH_MSG = "'s length shall be less than ";
var LENGTH_EQUAL_MSG = "'s length shall be ";
var LENGTH_MSG1 = " English characters (one Chinese character occupies two English characters) ";
var MODIFY_MSG = "Please modify!";

var LENGHT_PERIOD_MSG = "'s length shall be ";

var MINUS_MSG = "-";

var MONEY_MSG1 = "is an illegal amount, please modify!";
var MONEY_MSG2 = "Data shall not be negative, please modify!";
var MONEY_MSG3 = "The integer part of data exceeds the limit, please modify";
var MONEY_MSG4 = "The fractional currency of data exceeds the limit, please modify!";
var MONEY_MSG = " shall be more than ";
var MONEY_MSG0 = " shall not be larger than ";

var EXCHANGERATE_MSG1 = "is an illegal data, please modify!";
var EXCHANGERATE_MSG2 = "Data shall not be negative, please modify!";
var EXCHANGERATE_MSG3 = "The integer part of data exceeds the limit, please modify";
var EXCHANGERATE_MSG4 = "The fractional currency of data exceeds the limit, please modify!";

var ILLEGAL_DATE = "is an illegal date, please modify!";
var DATE_LATER_MSG = " should not be earlier than ";
var DATE_NOTLATER_MSG = " shall not be later than "

/**
 * modify by zph bocnet6.0 sit 2011-5-12
 * 
 */
var ILLEGAL_DATE_PERIOD = "The Scheduled Payment Date  exceeds the range of ";
var ENTRIES = " ";
var MONTH = "Month";
var DAY = "Day";
/** FormCheck表单检查 end   */

/** ListCheck表单检查 begin */
var ALL_AUTH = "The operation will clear all other options your have made, continue or not?";
var CHOICE_MSG = "Please select ";

var ALL_COUNT = "Transaction processed this time: ";
var ALL_MONEY = "  total sum: ";

var SPACE_MSG = " ";
var DOT_MSG = ".";
var EXCMARK_MSG = "!";
/** ListCheck表单检查 end   */

/** 日历使用 begin */
/**var calLanguage="zhCN";
var calMonthArr = new Array("1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月");
var calDayArr = new Array("日","一","二","三","四","五","六");
var calYear = "年";
var calMonth = "月";
*/
var calLanguage="enUS";
var calMonthArr = new Array("Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec.");
var calDayArr = new Array("Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat.");
var calYear = "";
var calMonth = "";

/** 日历使用 end */

/** 收款人开户行下拉菜单使用 begin */
var PLEASE_CHOICE="Please select";
/** 收款人开户行下拉菜单使用 end */

//author liuy
var START_DATE="Start date";
var END_DATE="End date";

/*******************************/
/***  自助注册使用 ***/
/*******************************/

var USER_NAME_IS_EMPTY = "Please input the user name!";
var USER_NAME_IS_INCORRECT = "The user name is incorrect, which shall be between 6 and 20 characters long and comprised of the combination of both numbers and English letters with one English letter at least, case insensitive, and contains no space!";
var PASSWORD_IS_EMPTY = "Please input the password!";
var PASSWORD_IS_INCORRECT = "The password is incorrect, which shall be between 8 and 20 characters long and comprised of the combination of both numbers and English letters with one English letter and one number at least, and case sensitive!";
var NEW_PASSWORD_IS_EMPTY = "Please input the new password！";
var NEW_PASSWORD_IS_INCORRECT = "The new password is incorrect, which shall be between 8 and 20 characters long and comprised of the combination of both numbers and English letters with one English letter and one number at least, and case sensitive!";
var CONFIRM_PASSWORD_IS_EMPTY = "Please confirm the new password";
var CONFIRM_PASSWORD_IS_INCORRECT = "The confirmation password is unmatched with the new password!";
var OLD_PASSWORD_IS_EMPTY = "Please input the original password！";
var BIRTHDAY_IS_INCORRECT = "The birthday is Incorrect! The date shall be legal in the format of YYYY/MM/DD!！";
var BIRTHDAY_MORE_THAN_TODAY = "The birthday shall not be later than today!";
var PHONE_IS_EMPTY = "Please input your frequently used telephone number!";
var PHONE_IS_INCORRECT = "The frequently used telephone number is incorrect, which shall be no more than 15 digits long and comprised of the combination of numbers, English letters and -!";
var PHONE2_IS_INCORRECT = "The subsidiary telephone number is incorrect, which shall be no more than 15 digits long and comprised of the combination of numbers, English letters and -!";
var MOBILE_IS_INCORRECT = "The mobile phone number is incorrect, which shall be comprised of 11-digit numbers!";
var EMAIL_IS_EMPTY = "Please input your email address!";
var EMAIL_IS_INCORRECT = "The email address is incorrect!";
var EMAIL1_IS_EMPTY = "Please input your frequently used email address!！";
var EMAIL1_IS_INCORRECT = "The frequently used email address is incorrect!";
var EMAIL2_IS_INCORRECT = "The subsidiary email address is incorrect!";
var ZIPCODE_IS_EMPTY = "Please input your zip code!";
var ZIPCODE_IS_INCORRECT = "The zip code shall be comprised of 6 numbers!";
var ADDRESS_IS_EMPTY = "Please input your address!";
var ADDRESS_IS_INCORRECT = "The address is incorrect, which shall be no more than 60 characters long!";
var ACCOUNT_EDIT_INPUT_NICKNAME = "Please input the nickname of account!";
var WELCOME_IS_EMPTY = "Please input the welcome information!";
var COLOR_IS_EMPTY = "Please input your favorite color!";
var MOVIE_IS_EMPTY = "Please input your favorite movie!";
var PET_IS_EMPTY = "Please input your favorite pet!";
var QUESTIONONE_IS_EMPTY = "Please input your reserved question 1";
var QUESTIONTWO_IS_EMPTY = "Please input your reserved question 2";
var QUESTIONTHREE_IS_EMPTY = "Please input your reserved question 3";
var ANSWERONE_IS_EMPTY = "Please input your reserved answer 1";
var ANSWERTWO_IS_EMPTY = "Please input your reserved answer 2";
var ANSWERTHREE_IS_EMPTY = "Please input your reserved answer 3";

//***************User identity related constants********************/
var IDENTITY_TYPE_IS_EMPTY = "Please select ID type";
var IDENTITY_NO_IS_EMPTY = "Please input legal ID No.";
var IDENTITY_NO_IS_INCORRECT = "The ID number is incorrect, which shall meet the following rules:" + 
							"\r\n1、the ID No. shall be 15 or 18 digits long." + 
							"\r\n2、the birthday in the ID No. shall be legal." + 
							"\r\n3、 the 15-digit ID No. must be comprised of numbers." + 
							"\r\n4、 the 18-digit ID No. shall be all comprised of numbers or preceding 17 numbers plus one letter of ‘x’ or ‘X’.";

//***************User identity related constants end********************/
//***************banking account related constants********************/
var ACCOUNT_IS_EMPTY = "Please input the account No.";
var ACCOUNT_MUST_BE_NUMBER = "The account No. shall be comprised of numbers";
var DEBIT_CARD_IS_INVALID = "The No. of debit card shall be 19 digits long.";
var QCC_IS_INVALID = "Credit Card's length shall be 15-16, Please modify!";
var BOC_CREDIT_CARD_IS_INVALID = "The No. of credit card shall be 16 digits long.";
var ENROLLMENT_ACCOUNT_INVALID = "Only the debit card can be enrolled.";
//***************banking account related constants end********************/
var PASSWORD_NOT_EQUAL_CONFIRM_PASSWORD = "The password is not consistent with the confirmation password.";
var EFS_PASSWORD_LEN_INVALID = "Length of password ≥8";
var USER_NAME_LEN_INVALID = "Length of user name ≥6";
var PHONE_PASSWORD_INVALID = "The password of telephone banking is invalid.";

var CHECKING_CODE_IS_EMTPY = "Please input the checking code.";



var DATE_INVALID = "The input date is invalid.";
var EXPIRING_DATE_INVALID = "The input expiring date is invalid.";
var E_TOKEN_INVALID =  "E-Token error.";

var GENDER_IS_EMPTY = "Please input the gender";
/*******************************/
/***  自助注册使用 end */
/*******************************/

/*******************************/
/***  定期存款  **/
/********************************/
var SELECT_CURRENCY = "Please select";
var TRANSFER_ACCOUNT_INVALID = "The account information is unavailable, please select the other account or update the account information.";
var TRANSFER_FROM_ACCOUNT = "Please select the account transferred from!";
var TRANSFER_TO_ACCOUNT = "Please select the account transferred to!";
var TRANSFER_AMOUNT = "Please input the transfer amount!";
var TRANSFER_CURRENCY = "Please input the transfer currency!";
var TRANSFER_CASHREMIT = "Please select the banknote/exchange mark!";
var TRANSFER_CDTERM = "Please select the term of deposit!";
var TRANSFER_FREQUENCY = "Please select the frequency!";
var TRANSFER_ENDDATE = "Please select the end date!";
var SYSDATE = "Current system date";
var SCHEDULEDATE = "Scheduled execution date";
var STARTDATE_INVALID = "The start date shall be any day of the month after the current system date!";
var ENDDATE_INVALID = "The end date shall be any day of the six months after the current system date!";
var SCHEDULEDATE_INVALID = "The scheduled execution date shall be any day of the three months after the current system date!";
var ENDDATE_BEFORE_STARTDATE = "The end date shall not be earlier than the start date!";
var FORMAT_ERROR="Length of {0} incorrect.";

/*******************************/
/***  安全控件  **/
/********************************/
var SAFECONTROL_INSTALL = "Please firstly downloand and install the security control before you log in BOC Online Banking, and please close all the windows of Internet Explorer when you are installing the security control.";
var SAFECONTROL_VERSION = "security control package has been updated since you last login, please download and install the new version. Please make sure the old security control package has been completely uninstalled and all IE windows are closed before the install process starts.";


//edit by yangda
var CURCODE_KHR = "Riel";

//修改FormCheck.js中冒号
var COLON_MSG = ":";