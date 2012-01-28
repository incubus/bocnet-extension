//********************************************
//***  以下函数用来处理金额格式,并显示悬浮框
//***  注意:引用此js文件时,必须引用common.js和formCheck.js
//********************************************
//Begin dHTML Toolltip Timer
var tipTimer;
//End dHTML Toolltip Timer

/*
 * 函数功能：格式化金额（千位分隔符）
 *
 * Parameter txtObj -- 页面中输入金额的文本框对象;
 *           formatFlag -- 是否格式化,true：格式化;false：不格式化;
 *           curCode -- 货币代码;
 *
 * 例子：onBlur="formatMoney(this,true,'001')" onFocus="formatMoney(this,false,'001')"
 *
 */
function formatMoney(txtObj,formatFlag,curCode)
{
    var money = txtObj.value; 
    money = isnumber(money);

    if (money != "a")
    {
        money=money.toString();

        if (money.indexOf(",")>0)
            money = replace(money,",","");//对填写过的金额进行修改时，必须过滤掉','	
        
        s = money;
        
        if (s.indexOf("　")>=0)
            s = replace(money,"　","");
        
        if (s.indexOf(" ")>=0)
            s = replace(money," ",""); 
        
        if (s.length!=0)
        {
            var str = changePartition(s,curCode);
            
            if (!formatFlag)
                str = replace(str,",","");
                
            txtObj.value = str;
            
            if (!formatFlag)
                txtObj.select();
        }	
    }
}

/*
 * 函数功能：隐藏悬浮窗口（大写金额）
 *
 * Parameter txtObj -- 页面中悬浮窗口（大写金额）的文本框对象;
 *           curCode -- 货币代码;
 *
 * 例子： onMouseOut="hideTooltip('dHTMLToolTip','001')"
 * 
 */
function hideTooltip(object,curCode)
{
    /** 仅对人民币有效 */
    if (curCode == "001")
    {
        if (document.all)
        {
            locateObject(object).style.visibility="hidden";
            locateObject(object).style.left = 1;
            locateObject(object).style.top = 1;
            return false;
        }
        else if (document.layers)
        {
            locateObject(object).visibility="hide";
            locateObject(object).left = 1;
            locateObject(object).top = 1;
            return false;
        }
        else
            return true;
    }
}

/*
 * 函数功能：校验付款金额并且将金额转化为汉字大写
 *
 * Parameter txtObj -- 页面中输入金额的文本框对象;
 *           str -- 浮动框中的标题
 *           divStr -- 浮动框的ID。
 *           curCode -- 货币代码;
 *
 * 例子：onMouseOver="touppercase(this,'付款金额','dHTMLToolTip','001')"
 *       onMouseOver="touppercase(document.form1.txtInput,'付款金额','dHTMLToolTip','001')" 
 * 
 */
function touppercase(txtObj,str,divStr,curCode)
{
    /** 仅对人民币有效 */
    if (curCode == "001")
    {
        var money=txtObj.value;
        
        money = isnumber(money);

        //alert("money is:" + money);    
        if (money != "a")
        {
            s = money.toString();	
            s = replace(s,",","");//对填写过的金额进行修改时，必须过滤掉','
    
            s=changeUppercase(s);
            showTooltipOfLabel(divStr,event,str,s); 
        }
    }
}

/*
 * 函数功能：显示带标题的悬浮框
 *
 * Parameter divStr -- 页面中定义的浮动显示层ID;
 *           e  --  通常默认传入参数为event;
 *           jelabel -- 浮动框中的标题;
 *           jestr -- 金额字符串
 *
 * 例子：showTooltipOfLabel('dHTMLToolTip',event,'手续费','12345');
 * 
 */
function showTooltipOfLabel(divStr,e,jelabel,jestr)
{
    window.clearTimeout(tipTimer);

/*    if (document.all)
    {
        locateObject(obj).style.top = document.body.scrollTop + event.clientY + 20;
        locateObject(obj).innerHTML = '<table width=200 height=10 border=1 style="font-family: 宋体; font-size: 10pt; border-style: ridge; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px;"  cellspacing=1 cellpadding=1 bgcolor=#fef5ed bordercolor=#a03952><tr style="color:black"><td height=10 align=right nowrap>&nbsp;'+jelabel+'&nbsp;</td><td height=10 nowrap>&nbsp;'+jestr+'&nbsp;</td></tr></table>';

        if ((e.x + locateObject(obj).clientWidth) > (document.body.clientWidth + document.body.scrollLeft))
            locateObject(obj).style.left = (document.body.clientWidth + document.body.scrollLeft) - locateObject(obj).clientWidth-10;
        else
            locateObject(obj).style.left=document.body.scrollLeft+event.clientX;
            
        locateObject(obj).style.visibility="visible";
        
        tipTimer=window.setTimeout("hideTooltip('"+obj+"')", 5000);
        return true;
    }
    else
        return true;
*/
	var divObj = eval(divStr);
	
    if (document.all)
    {
        divObj.style.top = document.documentElement.scrollTop + event.clientY + 10;
        divObj.innerHTML = '<table border=1 style="font-family: 宋体; font-size: 10pt; border-style: ridge; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px;" cellspacing=1 cellpadding=1 bgcolor=#fef5ed bordercolor=#a03952><tr style="color:black"><td  style="padding-top:4px;" align=right nowrap>&nbsp;'+jelabel+'&nbsp;</td><td style="padding-top:4px;" nowrap>&nbsp;'+jestr+'&nbsp;</td></tr></table>';
		
        if ((e.x + divObj.clientWidth) > (document.documentElement.clientWidth + document.documentElement.scrollLeft))
            divObj.style.left = (document.documentElement.clientWidth + document.documentElement.scrollLeft) - divObj.clientWidth-10;
        else
            divObj.style.left=document.documentElement.scrollLeft+event.clientX;
            
        divObj.style.visibility="visible";
        
        tipTimer = window.setTimeout("hideTooltip('" + divStr + "')", 5000);
        return true;
    }
    else
        return true;
}

/*
 * 函数功能：判断金额的合法性
 *
 * Parameter onestring -- 需判断的字符串;
 *
 * Return 0 -- 字符串为空
 *        a -- 字符串非数值数据
 *        数值 -- 字符串为数值数据，返回字符串数值
 *
 * 例：moneyCheck("123,456,789.34")  返回123456789.34
 *
 */
function isnumber(onestring)
{
    if(onestring.length==0)
        return "a";
    
    if(onestring==".")
        return "a";
    
    var regex = new RegExp(/(?!^[+-]?[0,]*(\.0{1,4})?$)^[+-]?(([1-9]\d{0,2}(,\d{3})*)|([1-9]\d*)|0)(\.\d{1,4})?$/);
    
    if (!regex.test(onestring))
        return "a";

    //trim head 0
    /*while(onestring.substring(0,1)=="0")
    {
        onestring = onestring.substring(1,onestring.length);	
    }*/
    
    if (onestring.substring(0,1)==".")
        onestring = "0" + onestring;	
    
    onestring = replace(onestring,",","");
    
    var split_onestr=onestring.split(".");

    if(split_onestr.length>2)
        return "a";
    
    return onestring;
}


function locateObject(n, d) 
{ //v3.0
    var p,i,x;
    
    if (!d) 
        d=document;
    
    if ((p=n.indexOf("?"))>0 && parent.frames.length)
    {
        d = parent.frames[n.substring(p+1)].document;
        n=n.substring(0,p);
    }
        
    if (!(x=d[n]) && d.all) 
        x = d.all[n]; 
    
    for (i = 0; !x && i < d.forms.length; i++)
        x = d.forms[i][n];
    
    for (i = 0; !x && d.layers && i < d.layers.length; i++)
        x = locateObject(n,d.layers[i].document);
    
    return x;
}

