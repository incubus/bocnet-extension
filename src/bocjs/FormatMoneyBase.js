//********************************************
//***  以下函数用来处理金额千分位显示及人民币大写
//********************************************

var pubarray1 = new Array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖","");
var pubarray2 = new Array("","拾","佰","仟");
var pubarray3 = new Array("元","万","亿","兆","","");
var pubarray4 = new Array("角","分");
var char_len = pubarray1[0].length; 

/*
 * 函数功能：根据货币码格式化辅币位数，不足位的补0
 *
 * Parameter str -- 需处理的带有数字的字符串;
 *           curCode -- 货币码;
 *
 * Return 字符串 -- 格式化后的字符串
 *
 * 例子：formatDecimalPart("12345678","001");
 *       返回字符串：12345678.00
 * 
 */
function formatDecimalPart(str,curCode)
{
    var curDec;
    
    for(var j = 0; j < curCodeArr.length; j++)
    {
        if (curCodeArr[j][0] == curCode)
        {
            curDec = curCodeArr[j][3];
            break;
        }
    }
    
    if (str.indexOf(".") == -1)
    {
        var tmp = "";
        
        if (curDec == 0)
            return str;
            
        for(var i = 0; i < curDec; i++)
        {
            tmp += "0";
        }
        
        return str + "." + tmp;
    }
    else
    {
        var strArr = str.split(".");
        var decimalPart = strArr[1];
        
        while(decimalPart.length < curDec)
        {
            decimalPart += "0";
        }
        
        return strArr[0] + "." + decimalPart;
    }
}

/*
 * 函数功能：将带有数字的字符串用","进行分隔,并且加上小数位(处理千分位,分币种)
 *
 * Parameter str -- 需处理的带有数字的字符串;
 *           curCode -- 货币码;
 *
 * Return 字符串 -- 格式化后的字符串
 *
 * 例子：changePartition("12345678");
 *       返回字符串：12,345,678.00
 * 
 */
function changePartition(str,curCode)
{
    var minus = "";
    
    if(str.substring(0,1) == "-")
    {    
        str = str.substring(1);
        minus = "-";
    }

    str = formatDecimalPart(str,curCode);

    var twopart = str.split(".");
    var decimal_part = twopart[1];
    

    //format integer part
    var integer_part="0";
    var intlen=twopart[0].length;
    
    if(intlen>0)
    {
        var i=0;
        
        integer_part=""; 
        
        while(intlen>3)
        {
            integer_part=","+twopart[0].substring(intlen-3,intlen)+integer_part;
            i=i+1;
            intlen=intlen-3;
        }
        
        integer_part=twopart[0].substring(0,intlen)+integer_part;
    }

    if (!decimal_part)
        return minus + integer_part;
    else
        return minus + integer_part + "." + decimal_part
}

/*
 * 函数功能：将带有数字的字符串处理成大写的人民币
 *
 * Parameter str -- 需处理的带有数字的字符串;
 *
 * Return 字符串 -- 格式化后的字符串
 *
 * 例子：changeUppercase("12345678.90")
 *       返回字符串：壹仟贰佰叁拾肆万伍仟陆佰柒拾捌元玖角
 * 
 */
function changeUppercase(str)
{
    if(str=="" || eval(str)==0)
        return "零";
    
    if(str.substring(0,1) == "-")
    {    
        if(eval(str.substring(1)) < 0.01)
            return "金额有误!!";
        else
            str = str.substring(1);
    }
        
    var integer_part="";
    var decimal_part="整";
    var tmpstr="";
    var twopart=str.split(".");
    
    //处理整型部分（小数点前的整数位）
    var intlen=twopart[0].length;
    
    if (intlen > 0 && eval(twopart[0]) != 0)
    {
        var gp=0;
        var intarray=new Array();
    
        while(intlen > 4)
        {
            intarray[gp]=twopart[0].substring(intlen-4,intlen);
            gp=gp+1;
            intlen=intlen-4;
        }
        
        intarray[gp]=twopart[0].substring(0,intlen);
    
        for(var i=gp;i>=0;i--)
        {
            integer_part=integer_part+every4(intarray[i])+pubarray3[i];
        }

        integer_part=replace(integer_part,"亿万","亿零");
        integer_part=replace(integer_part,"兆亿","兆零");	

        while(true)
        {
            if (integer_part.indexOf("零零")==-1)
                break;

            integer_part=replace(integer_part,"零零","零");
        }
        
        integer_part=replace(integer_part,"零元","元");

        /*此处注释是为了解决100000，显示为拾万而不是壹拾万的问题，此段程序把壹拾万截成了拾万
        tmpstr=intarray[gp];
    
        if (tmpstr.length==2 && tmpstr.charAt(0)=="1")
        {
            intlen=integer_part.length;
            integer_part=integer_part.substring(char_len,intlen);
        }
        */
    }
    
    //处理小数部分（小数点后的数值）
    tmpstr="";
    if(twopart.length==2 && twopart[1]!="")
    {
        if(eval(twopart[1])!=0)
        {
            decimal_part="";
            intlen= (twopart[1].length>2) ? 2 : twopart[1].length;
            
            for(var i=0;i<intlen;i++)
            {
                tmpstr=twopart[1].charAt(i);
                decimal_part=decimal_part+pubarray1[eval(tmpstr)]+pubarray4[i];
            }
            
            decimal_part=replace(decimal_part,"零角","零");
            decimal_part=replace(decimal_part,"零分","");
    
            if(integer_part=="" && twopart[1].charAt(0)==0)
            {
                intlen=decimal_part.length;
                decimal_part=decimal_part.substring(char_len,intlen);
            }
        }
    }
    
    tmpstr=integer_part+decimal_part;
    
    return tmpstr;
}

/*
 * 函数功能：对位数小于等于4的整数值字符串进行中文货币符号处理
 *
 * Parameter str -- 需处理的带有数字的字符串;
 *
 * Return 字符串 -- 格式化后的字符串
 *
 * 例子：every4("1234")
 *       返回字符串：壹仟贰佰叁拾肆
 * 
 */
function every4(str)
{
    var weishu=str.length-1;
    var retstr="";
    var shuzi;
    
    for (var i=0;i<str.length;i++) 
    {
        shuzi=str.charAt(i);
    
        if(shuzi=="0")
            retstr=retstr+pubarray1[eval(shuzi)];
        else
            retstr=retstr+pubarray1[eval(shuzi)]+pubarray2[weishu];
        
        weishu=weishu-1;
    }
    
    while(true)
    {
        if (retstr.indexOf("零零")==-1)
            break;
        
        retstr=replace(retstr,"零零","零");
    }
    
    if(shuzi=="0")
    {
        weishu=retstr.length-char_len;
        retstr=retstr.substring(0,weishu);
    }
    
    return retstr;
}

