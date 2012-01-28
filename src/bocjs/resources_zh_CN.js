//************************************/
//*******   定义所有JS提示语    *******/
//************************************/

/** CurCode货币列表 begin */
var CURCODE_CNY = "人民币元";
var CURCODE_GBP = "英镑";
var CURCODE_HKD = "港币";
var CURCODE_USD = "美元";
var CURCODE_CHF = "瑞士法郎";
var CURCODE_DEM = "德国马克";
var CURCODE_FRF = "法国法郎";
var CURCODE_SGD = "新加坡元";
var CURCODE_NLG = "荷兰盾";
var CURCODE_SEK = "瑞典克郎";
var CURCODE_DKK = "丹麦克郎";
var CURCODE_NOK = "挪威克郎";
var CURCODE_ATS = "奥地利先令";
var CURCODE_BEF = "比利时法郎";
var CURCODE_ITL = "意大利里拉";
var CURCODE_JPY = "日元";
var CURCODE_CAD = "加拿大元";
var CURCODE_AUD = "澳大利亚元";
var CURCODE_EUR = "欧元";
var CURCODE_IDR = "印尼盾";
var CURCODE_MOP = "澳门元";
var CURCODE_PHP = "菲律宾比索";
var CURCODE_THB = "泰国铢";
var CURCODE_NZD = "新西兰元";
var CURCODE_KRW = "韩元";
var CURCODE_XSF = "记账瑞士法郎";
//edit by zhangfeng
var CURCODE_VND = "越南盾";
var CURCODE_IDR = "印尼盾";
//edit by liangd
var CURCODE_AED = "阿联酋迪拉姆";
var CURCODE_ARP = "阿根廷比索";
var CURCODE_BRL = "雷亚尔";
var CURCODE_EGP = "埃及磅";
var CURCODE_INR = "印度卢比";
var CURCODE_JOD = "约旦第纳尔";
var CURCODE_MNT = "蒙古图格里克";
var CURCODE_MYR = "马来西亚林吉特";
var CURCODE_NGN = "尼日利亚奈拉";
var CURCODE_ROL = "罗马尼亚列伊";
var CURCODE_TRL = "土耳其里拉";
var CURCODE_UAH = "乌克兰格里夫纳";
var CURCODE_ZAR = "南非兰特";
//edit by cuiyk

var CURCODE_RUR = "卢布";
var CURCODE_HUF = "福林";
var CURCODE_KZT = "哈萨克斯坦坚戈";
var CURCODE_ZMK = "赞比亚克瓦查";
var CURCODE_XPT = "白金";
var CURCODE_BND = "文莱币";
var CURCODE_BWP = "博茨瓦纳普拉";

//added by hhf.2009.9.10  modify by cuiyk   2009.11.10
var CURCODE_XAU="黄金(盎司)";
var CURCODE_GLD="黄金(克)";

/** CurCode货币列表 end   */


/** FormCheck表单检查 begin */
var COMMA_MSG = "，";
var ENTER_MSG = "\n";

var NOT_NULL = "不能为空，请修改！";
var ILLEGAL_REGEX = "不符合输入格式，请修改！";
var ILLEGAL_CHAR = "数据含了非法字符：[]^$\\~@#%&<>{}:'\"，请修改！";
var HAVE_CHINESE = "数据含了中文或其他非标准字符，请修改！";
var NOT_ONLY_CHINESE = "数据含了中文以外的其他字符，请修改！";
var NOT_NUMBER = "数据包含了阿拉伯数字以外的字符，请修改！";
var NOT_PHONE_NUMBER = "数据包含了电话号码以外的其他字符，请修改！";

var LENGTH_MSG = "的长度必须小于等于";
var LENGTH_EQUAL_MSG = "的长度必须为";
var LENGTH_MSG1 = "个英文字符（一个汉字占用2个字符）";
var MODIFY_MSG = "请修改！";

var LENGHT_PERIOD_MSG = "的长度必须为：";

var MINUS_MSG = "-";

var MONEY_MSG1 = "数据为非法金额，请修改！";
var MONEY_MSG2 = "数据不能为负，请修改！";
var MONEY_MSG3 = "数据整数部分超长，请修改！";
var MONEY_MSG4 = "数据辅币部分超长，请修改！";
var MONEY_MSG = "应大于";
var MONEY_MSG0 = "应小于等于";

var EXCHANGERATE_MSG1 = "数据非法，请修改！";
var EXCHANGERATE_MSG2 = "数据不能为负，请修改！";
var EXCHANGERATE_MSG3 = "数据整数部分超长，请修改！";
var EXCHANGERATE_MSG4 = "数据辅币部分超长，请修改！";

var ILLEGAL_DATE = "数据为非法日期，请修改！";
var DATE_LATER_MSG = "不应早于";
var DATE_NOTLATER_MSG = "不能晚于"

var ILLEGAL_DATE_PERIOD = "输入日期范围超过";
var ENTRIES = "个";
var MONTH = "月";
var DAY = "天";
/** FormCheck表单检查 end   */

/** ListCheck表单检查 begin */
var ALL_AUTH = "此操作将清除您所做的其他选择，是否继续？";
var CHOICE_MSG = "请您至少选择某一";

var ALL_COUNT = "本次共处理业务：";
var ALL_MONEY = "笔，总金额：";

var SPACE_MSG = " ";
var DOT_MSG = ".";
var EXCMARK_MSG = "！";
/** ListCheck表单检查 end   */

/** 日历使用 begin */
var calLanguage="zhCN";
var calMonthArr = new Array("1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月");
var calDayArr = new Array("日","一","二","三","四","五","六");
var calYear = "年";
var calMonth = "月";

/** 日历使用 end */

/** 收款人开户行下拉菜单使用 begin */
var PLEASE_CHOICE="请选择";
/** 收款人开户行下拉菜单使用 end */

//author liuy
var START_DATE="起始日期";
var END_DATE="结束日期";

/*******************************/
/***  自助注册使用 ***/
/*******************************/

var USER_NAME_IS_EMPTY = "请输入用户名！";
var USER_NAME_IS_INCORRECT = "用户名不正确，用户名由6-20位长度的数字和英文字母组成，不区分大小写，不允许有空格，至少包含1位英文字母！";
var PASSWORD_IS_EMPTY = "请输入密码！";
var PASSWORD_IS_INCORRECT = "密码不正确，密码由8-20位长度的数字和英文字母组成，区分大小写，至少包含1位英文字母和1位数字！";
var NEW_PASSWORD_IS_EMPTY = "请输入新密码！";
var NEW_PASSWORD_IS_INCORRECT = "新密码不正确，密码由8-20位长度的数字和英文字母组成，区分大小写，至少包含1位英文字母和1位数字！";
var CONFIRM_PASSWORD_IS_EMPTY = "请输入确认密码！";
var CONFIRM_PASSWORD_IS_INCORRECT = "确认密码与密码不匹配！";
var OLD_PASSWORD_IS_EMPTY = "请输入原始密码！";
var BIRTHDAY_IS_INCORRECT = "出生日期不正确！日期的正确格式为YYYY/MM/DD，且必须为合法的日期！";
var BIRTHDAY_MORE_THAN_TODAY = "出生日期不能大于今天！";
var PHONE_IS_EMPTY = "请输入常用电话号码！";
var PHONE_IS_INCORRECT = "常用电话号码不正确，其只能包含数字，字母以及-，且长度必须小于等于15！";
var PHONE2_IS_INCORRECT = "备用电话号码不正确，其只能包含数字，字母以及-，且长度必须小于等于15！";
var MOBILE_IS_INCORRECT = "移动电话号码不正确，其必须是11位数字！";
var EMAIL_IS_EMPTY = "请输入电子信箱！";
var EMAIL_IS_INCORRECT = "电子信箱不正确！";
var EMAIL1_IS_EMPTY = "请输入常用的电子信箱！";
var EMAIL1_IS_INCORRECT = "常用的电子信箱不正确！";
var EMAIL2_IS_INCORRECT = "备用的电子信箱不正确！";
var ZIPCODE_IS_EMPTY = "请输入邮政编码！";
var ZIPCODE_IS_INCORRECT = "邮政编码必须是6位数字！";
var ADDRESS_IS_EMPTY = "请输入邮政地址！";
var ADDRESS_IS_INCORRECT = "邮政地址不正确，地址长度必须小于等于60！";
var ACCOUNT_EDIT_INPUT_NICKNAME = "请输入账户别名！";
var WELCOME_IS_EMPTY = "请输入欢迎信息！";
var COLOR_IS_EMPTY = "请输入您最喜欢的颜色！";
var MOVIE_IS_EMPTY = "请输入您最喜欢的电影！";
var PET_IS_EMPTY = "请输入您最喜欢的宠物！";
var GENDER_IS_EMPTY = "请输入您的性别！";
var QUESTIONONE_IS_EMPTY = "请输入您的预留问题一！";
var QUESTIONTWO_IS_EMPTY = "请输入您的预留问题二！";
var QUESTIONTHREE_IS_EMPTY = "请输入您的预留问题三！";
var ANSWERONE_IS_EMPTY = "请输入您的问题一答案！";
var ANSWERTWO_IS_EMPTY = "请输入您的预留问题二答案！";
var ANSWERTHREE_IS_EMPTY = "请输入您的预留问题三答案！";
//***************User identity related constants********************/
var IDENTITY_TYPE_IS_EMPTY = "请选择证件类型";
var IDENTITY_NO_IS_EMPTY = "请输入合法的证件号码。";
var IDENTITY_NO_IS_INCORRECT = "身份证号码不正确，正确的身份证号码必须满足以下规则：" + 
							"\r\n1、长度必须为15或18。" + 
							"\r\n2、身份证中的出生日期必须是合法的日期。" + 
							"\r\n3、15位的身份证必须是数字。" + 
							"\r\n4、18位的身份证前17位必须是数字，最后一位是数字或字母‘x’、‘X’";

//***************User identity related constants end********************/

/***************  psnApplay   在线预约申请开户 lyj 20110321 begin   **************************/
var IDENTITYDATE_IS_EMPTY = "请输入证件到期日期！";
var IDENTITYDATE_IS_INCORRECT = "证件到期日期不正确！日期的正确格式为YYYY/MM/DD，且必须为合法的日期！";
var IDENTITYDATE_LESS_THAN_TODAY = "证件到期日期不能小于今天！";
var BIRTHDAY_IS_EMPTY = "请输入出生日期";
var A_MOBILE_IS_EMPTY = "请输入手机号码！";
var A_MOBILE_IS_INCORRECT = "移动电话号码不正确，其必须是11位数字！";
var A_COUNTRY_IS_EMPTY = "请输入国家！";
var A_PROVINCE_IS_EMPTY = "请输入省/直辖市/自治区！";
var A_PROVINCE_IS_INCORRECT = "省/直辖市/自治区不正确，长度必须小于"+"\r\n等于20个英文字符（一个汉字占2个字符），请修改！";
var A_CITY_IS_EMPTY = "请输入城市！";
var A_CITY_IS_INCORRECT = "城市不正确，长度必须小于等于20个英文字符（一个汉字占2个字符），请修改！";
var A_ADDRESS_IS_EMPTY = "请输入地址！";
var A_ADDRESS_IS_INCORRECT = "地址不正确，地址长度必须小于等于120个英文字符（一个汉字占2个字符），请修改！";
var A_EMAIL1_IS_INCORRECT = "电子信箱不正确！";
var A_PHONE_IS_INCORRECT = "办公电话号码不正确，其只能包含数字，()以及-，"+"\r\n且长度必须小于或等于14！如："+"\r\n\n010-12345678，(0731)12345678。";
var A_PHONE2_IS_INCORRECT = "家庭电话号码不正确，其只能包含数字，()以及-，"+"\r\n且长度必须小于或等于14！如："+"\r\n\n010-12345678，(0731)12345678。";
/***************  psnApplay   在线预约申请开户 lyj 20110321  end    **************************/


//***************banking account related constants********************/
var ACCOUNT_IS_EMPTY = "请输入银行账号。";
var ACCOUNT_MUST_BE_NUMBER = "银行账号必须是数字。";
var DEBIT_CARD_IS_INVALID = "借记卡的卡号必须是19位。";
var QCC_IS_INVALID = "信用卡的长度必须为：15-16，请修改！";
var BOC_CREDIT_CARD_IS_INVALID = "信用卡的卡号必须是16位。";
var ENROLLMENT_ACCOUNT_INVALID = "只有借记卡才能作为注册卡";
//***************banking account related constants end********************/
var PASSWORD_NOT_EQUAL_CONFIRM_PASSWORD = "密码与确认密码不一致。";
var EFS_PASSWORD_LEN_INVALID = "密码的长度必须大于等于8。";
var USER_NAME_LEN_INVALID = "用户名的长度必须大于等于6。";
var PHONE_PASSWORD_INVALID = "电话银行密码不正确。";

var CHECKING_CODE_IS_EMTPY = "请输入验证码。";

var DATE_INVALID = "您输入的日期不正确。";
var EXPIRING_DATE_INVALID = "你输入的失效日期不正确。";
var E_TOKEN_INVALID =  "动态口令不正确，请输入6位数字的动态口令。";
/*******************************/
/***  自助注册使用 end */
/*******************************/

/*******************************/
/***  定期存款  **/
/********************************/
var SELECT_CURRENCY = "请选择";
var TRANSFER_ACCOUNT_INVALID = "账户信息不可用，请选择另一个账户或者刷新账户信息";
var TRANSFER_FROM_ACCOUNT = "请选择转出账户！";
var TRANSFER_TO_ACCOUNT = "请选择转入账户！";
var TRANSFER_AMOUNT = "请填写转账金额！";
var TRANSFER_CURRENCY = "请输入币种性质!";
var TRANSFER_CASHREMIT = "请选择钞汇标志!";
var TRANSFER_CDTERM = "请选择存期!";
var TRANSFER_FREQUENCY = "请选择周期!";
var TRANSFER_ENDDATE = "请选择结束日期!";
var SYSDATE = "系统当前日期";
var SCHEDULEDATE = "预约执行日期";
var STARTDATE_INVALID = "起始日期必须是系统当前日期未来一个月的任意一天!";
var ENDDATE_INVALID = "结束日期必须是系统当前日期未来六个月的任意一天!";
var SCHEDULEDATE_INVALID = "预约执行日期必须是系统当前日期未来三个月内的任意一天!";
var ENDDATE_BEFORE_STARTDATE = "结束日期不能小于起始日期!";
var FORMAT_ERROR="{0}格式不正确，";

/*******************************/
/***  安全控件  **/
/********************************/
var SAFECONTROL_INSTALL = "请首先下载并安装安全控件后再登录网上银行，安装控件时请关闭所有的浏览器窗口。";
var SAFECONTROL_VERSION = "安全控件已经升级，请首先下载并安装新版本安全控件后再登录网上银行。安装新安全控件前请先到控制面板中卸载旧安全控件，安装时关闭所有的浏览器窗口。";

//edit by yangda
var CURCODE_KHR = "柬埔寨瑞尔";

//修改FormCheck.js中冒号
var COLON_MSG = "：";