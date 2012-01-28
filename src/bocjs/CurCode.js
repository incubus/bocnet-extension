/*
 * 各币种金额格式数组
 *
 * curCodeArr[0] -- 表示货币代码
 * curCodeArr[1] -- 表示币种名称
 * curCodeArr[2] -- 表示整数位数
 * curCodeArr[3] -- 表示辅币位数
 *
 */
var curCodeArr = new Array(
	new Array("001",CURCODE_CNY,13,2),
	new Array("012",CURCODE_GBP,13,2),
	new Array("013",CURCODE_HKD,13,2),
	new Array("014",CURCODE_USD,13,2),
	new Array("015",CURCODE_CHF,13,2),
	new Array("016",CURCODE_DEM,13,2),
	new Array("017",CURCODE_FRF,13,2),
	new Array("018",CURCODE_SGD,13,2),
	new Array("020",CURCODE_NLG,13,2),
	new Array("021",CURCODE_SEK,13,2),
	new Array("022",CURCODE_DKK,13,2),
	new Array("023",CURCODE_NOK,13,2),
	new Array("024",CURCODE_ATS,13,2),
	new Array("025",CURCODE_BEF,13,0),
	new Array("026",CURCODE_ITL,13,0),
	new Array("027",CURCODE_JPY,13,0),
	new Array("028",CURCODE_CAD,13,2),
	new Array("029",CURCODE_AUD,13,2),
	new Array("038",CURCODE_EUR,13,2),
	new Array("056",CURCODE_IDR,13,2),
	new Array("064",CURCODE_VND,13,0),
	new Array("081",CURCODE_MOP,13,2),
	new Array("082",CURCODE_PHP,13,2),
	new Array("084",CURCODE_THB,13,2),
	new Array("087",CURCODE_NZD,13,2),
	new Array("088",CURCODE_KRW,13,0),
	new Array("095",CURCODE_XSF,13,2),
	
	
	new Array("072",CURCODE_RUR,13,2),
	new Array("070",CURCODE_ZAR,13,2),
	new Array("065",CURCODE_HUF,13,2),
	new Array("101",CURCODE_KZT,13,2),
	new Array("080",CURCODE_ZMK,13,2),
	new Array("032",CURCODE_MYR,13,2),
	//add by cuiyk 白金  文莱币 里亚尔 博茨瓦纳普拉
	new Array("843",CURCODE_XPT,13,2),
	new Array("131",CURCODE_BND,13,2),
	new Array("134",CURCODE_BRL,13,2),
	new Array("039",CURCODE_BWP,13,2),
	//added by hhf.为黄金牌价局部刷新  
	new Array("034",CURCODE_XAU,13,2),
	new Array("035",CURCODE_GLD,13,0),
	//add by zph Riel
	new Array("166",CURCODE_KHR,13,2)
	);
