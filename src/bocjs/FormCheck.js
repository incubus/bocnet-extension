//**************************************
//***  以下函数是表单检查相关的函数
//***  注意:引用此js文件时,必须引用common.js
//**************************************

//**************************************
//***  以下函数是FORM表单检查函数
//**************************************

/*
 * 函数功能：将表单元素置为DISABLED(包括所有表单元素),并将该元素背景色致灰
 *
 * Parameter inputName -- 欲DISABLED的表单元素的名称;
 *           flag -- 是否disabled,true:disabled = true;false:disabled = false;
 *
 * 例子： setDisabled("form1.text1",true);
 *        setDisabled("form1.text1|radio1|select1",true);
 */
function setDisabled(inputName,flag)
{
    var inputObj;
    var bgStr;
    
    if (flag)
        bgStr = "#e7e7e7";
    else
        bgStr = "#ffffff";
    
    if(inputName.indexOf("|") == -1)
    {
        inputObj = eval(CONST_STRDOC + inputName);
        
        if (!inputObj.length)
        {
            if (inputObj.type != "radio" && inputObj.type != "checkbox")
                inputObj.style.background = bgStr;
            
            inputObj.disabled = flag;
        }
        else if (inputObj.type == "select-one" || inputObj.type == "select-multiple")
        {
            inputObj.style.background = bgStr;
            inputObj.disabled = flag;
        }
        else
        {
            for(var i = 0; i < inputObj.length; i++)
            {
                inputObj[i].disabled = flag;
            }
        }
        
        return;
    }
    
    var tmp = inputName.split(".");
    var formName = tmp[0];
    var objName = tmp[1].split("|");

    for (var i = 0; i < objName.length; i++)
    {
        inputObj = eval(CONST_STRDOC + formName + "." + objName[i]);

        if (!inputObj.length)
        {
            if (inputObj.type != "radio" && inputObj.type != "checkbox")
                inputObj.style.background = bgStr;
            
            inputObj.disabled = flag;
        }
        else if (inputObj.type == "select-one" || inputObj.type == "select-multiple")
        {
            inputObj.style.background = bgStr;
            inputObj.disabled = flag;
        }
        else
        {
            for(var j = 0; j < inputObj.length; j++)
            {
                inputObj[j].disabled = flag;
            }
        }
    }
}

/*
 * 函数功能：将表单元素置为READONLY(仅文本域或者textarea),并将该元素背景色致灰
 *
 * Parameter inputName -- 欲DISABLED的表单元素的名称;
 *           flag -- 是否disabled,true:disabled = true;false:disabled = false;
 *
 * 例子： setDisabled("form1.text1",true);
 *        setDisabled("form1.text1|text2",true);
 */
function setReadOnly(inputName,flag)
{
    var inputObj;
    var bgStr;
    
    if (flag)
        bgStr = "#e7e7e7";
    else
        bgStr = "#ffffff";
    
    if(inputName.indexOf("|") == -1)
    {
        inputObj = eval(CONST_STRDOC + inputName);
        
        inputObj.style.background = bgStr;
        inputObj.readOnly = flag;
    }
    
    var tmp = inputName.split(".");
    var formName = tmp[0];
    var objName = tmp[1].split("|");
    
    for (var i = 0; i < objName.length; i++)
    {
        inputObj = eval(CONST_STRDOC + formName + "." + objName[i]);
        
        inputObj.style.background = bgStr;
        inputObj.readOnly = flag;
    }
}
/*
 * 函数功能：检查表单输入域是否为空，不向用户发出提示
 *
 * Parameter objName -- 表单域文本框的英文名;
 *
 * Return false --不为空
 *        true -- 为空
 *
 * 例子：isEmpty('form1.userName'); 
 */
function isEmpty(objName)
{
    var inputObj = eval(CONST_STRDOC + objName);

    if (inputObj.value.trim() == null || inputObj.value.trim().length == 0)
        return true;
    else
        return false;
}

/* 
 * 函数功能：检查非空,向用户发出提示
 * 
 * Parameter inputname -- 表单域文本框的英文名
 *           msg -- 表单域文本框的中文标识为用户提供提示信息
 * 例：check_empty('form1.userName','用户姓名');
 * 例：check_empty('form1.userName|userAge|userAddress','用户姓名|用户年龄|用户地址');
 * 表单样例：
 * <form name='form1' action=''>
 *   用户姓名：<input type='text' value='' name='userName'>
 *   用户年龄：<input type='text' value='' name='userAge'>
 *   用户地址：<input type='text' value='' name='userAddress'>
 * </form>
 */
function check_empty(inputname,msg)
{
    if(inputname.indexOf("|") == -1)
    {
        if(isEmpty(inputname))
        {
            alert(msg + ENTER_MSG + NOT_NULL);
            return false;
        }
        
        return true;
    }
    
    var split_inputname = inputname.split(".");
    var split_inputs = split_inputname[1].split("|");
    var split_msg = msg.split("|");
    var errmsg="";
    
    for (var i = 0; i < split_inputs.length; i++)
    {
        if(isEmpty(split_inputname[0]+"."+split_inputs[i]))
            errmsg = errmsg + split_msg[i] + "  ";
    }
    
    if(errmsg.length != 0)
    {
        alert(errmsg + ENTER_MSG + NOT_NULL);
        return false;
    }

    return true;
}

/*
 * 函数功能：检查非法字符(严格非法字符集)[]',^$\~:;!@?#%&<>''""
 *         向用户发出提示(允许中文标点)
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --不合法
 *        true -- 合法
 *
 * 例：check_name('Form1.Input1','字段1');
 * 例：check_name('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 */
function check_name(inputname,msg)
{
//	var const_arychar=new Array("[","]","^","$","\\","~","@","#","%","&","<",">");
	var const_arychar=new Array("[","]","^","$","\\","~","@","#","%","&","<",">","{","}",":","'","\"");
//	var const_arychar=new Array("[","]","'",",","^","$","\\","~",":",";","!","@","?","#","%","&","<",">","'","'","\"","\"" );
    var inputobj,inputvalue;
    
    if(inputname.indexOf("|")==-1)
    {
        inputobj=eval(CONST_STRDOC+inputname);
        inputvalue=inputobj.value;
        
        if(inputvalue.length==0)
            return true;
    
        for (var i=0;i<const_arychar.length;i++)
        {
            if(inputvalue.indexOf(const_arychar[i])!=-1)
            {//find
                alert(msg + ENTER_MSG + ILLEGAL_CHAR);
                return false;			
            }
        }
        
        return true;
    }
    
    var split_inputname=inputname.split(".");
    var split_inputs=split_inputname[1].split("|");
    var split_msg=msg.split("|");
    var errmsg="";
    
    for (var i=0;i<split_inputs.length;i++)
    {
        inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
        inputvalue=inputobj.value;
        
        if(inputvalue.length==0)
            continue;
        
        for (var j=0;j<const_arychar.length;j++)
        {
            if(inputvalue.indexOf(const_arychar[j])!=-1)
            {//find
                errmsg=errmsg+split_msg[i]+" ";
                break;			
            }
        }
    
    }
    
    if(errmsg!="")
    {
        alert(errmsg + ENTER_MSG + ILLEGAL_CHAR);
        return false;
    }
    
    return true;
}

/*
 * 函数功能：检查非法字符(小额及控制字符非法字符集){}[]%'" \u0000-\u001F
 *         向用户发出提示(允许中文标点)
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --不合法
 *        true -- 合法
 *
 * 例：check_name('Form1.Input1','字段1');
 * 例：check_name('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 * Add By Hongxf
 */
function check_name3(inputname,msg)
{
    var pattern;
       pattern = "^[^{}\\[\\]\\%\\'\\\"\\u0000-\\u001F]*$";

	if(inputname.indexOf("|")==-1)
    {
         inputobj=eval(CONST_STRDOC+inputname);
         inputvalue=inputobj.value;
        
         if(inputvalue.length==0)
             return true;
         return regex_match(inputname,msg,pattern);
    }
    
    var split_inputname=inputname.split(".");
    var split_inputs=split_inputname[1].split("|");
    var split_msg=msg.split("|");
    var errmsg="";
    
    for (var i=0;i<split_inputs.length;i++)
    {
   
        inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
        inputvalue=inputobj.value;
        
        if(inputvalue.length==0){
            continue;
        }else if(!regex_match(split_inputname[0]+"."+split_inputs[i],split_msg[i],pattern)){
            return false;		
        }
    }
    
    return true;
}

/*
 * 函数功能：检查非法字符(需求变更后的小额及控制字符非法字符集){}[]%'" \u0000-\u001F 新增限制: `~$^_|\:
 *         向用户发出提示(允许中文标点)
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --不合法
 *        true -- 合法
 *
 * 例：check_name('Form1.Input1','字段1');
 * 例：check_name('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 * Add By Hongxf
 */
function check_payee_name_xe(inputname,msg)
{
    var pattern;
       pattern = "^[^{}\\[\\]%'\"`~$^_|\\\\:\\u0000-\\u001F\\u0080-\\u00FF]{1,76}$";
	
	if(inputname.indexOf("|")==-1)
    {
         inputobj=eval(CONST_STRDOC+inputname);
         inputvalue=inputobj.value;
        
         if(inputvalue.length==0)
             return true;
         return regex_match(inputname,msg,pattern);
    }
    
    var split_inputname=inputname.split(".");
    var split_inputs=split_inputname[1].split("|");
    var split_msg=msg.split("|");
    var errmsg="";
    
    for (var i=0;i<split_inputs.length;i++)
    {
   
        inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
        inputvalue=inputobj.value;
        
        if(inputvalue.length==0){
            continue;
        }else if(!regex_match(split_inputname[0]+"."+split_inputs[i],split_msg[i],pattern)){
            return false;		
        }
    }
    
    return true;
}

/*
 * 函数功能：检查非法字符(小额及控制字符非法字符集){}[]%'" \u0000-\u001F 新增限制: `~$^_|\:oOiI
 *         向用户发出提示(允许中文标点)
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --不合法
 *        true -- 合法
 *
 * 例：check_name('Form1.Input1','字段1');
 * 例：check_name('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 * Add By Hongxf
 */
function check_payee_name_xeoi(inputname,msg)
{
    var pattern;
       pattern = "^[^oOiI{}\\[\\]%'\"`~$^_|\\\\:\\u0000-\\u001F\\u0080-\\u00FF]{1,35}$";

	if(inputname.indexOf("|")==-1)
    {
         inputobj=eval(CONST_STRDOC+inputname);
         inputvalue=inputobj.value;
        
         if(inputvalue.length==0)
             return true;
         return regex_match(inputname,msg,pattern);
    }
    
    var split_inputname=inputname.split(".");
    var split_inputs=split_inputname[1].split("|");
    var split_msg=msg.split("|");
    var errmsg="";
    
    for (var i=0;i<split_inputs.length;i++)
    {
   
        inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
        inputvalue=inputobj.value;
        
        if(inputvalue.length==0){
            continue;
        }else if(!regex_match(split_inputname[0]+"."+split_inputs[i],split_msg[i],pattern)){
            return false;		
        }
    }
    
    return true;
}

/*
 * 函数功能：检查客户申请号格式(1-10,4,90-100)
 *         向用户发出提示
 *         汇划即时通查询客户申请号需要使用英文逗号,故允许英文逗号
 *	        禁止中文标点
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
             allowEng -- 是否可以含有英文(0:可以,1:不可以)
 *
 * Return false --不合法
 *        true -- 合法
 *
 * 例：check_name2('Form1.Input1','字段1');
 * 例：check_name2('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 * modified by liuy
 */
function check_name2(inputname,msg,allowEng)
{
    var pattern;
    if(allowEng=="0"){
       pattern = "^[A-Za-z0-9]{1,16}(-[A-Za-z0-9]{1,16})?(,[A-Za-z0-9]{1,16}(-[A-Za-z0-9]{1,16})?)*$";
    }else if(allowEng=="1"){
       pattern = "^[0-9]{1,16}(-[0-9]{1,16})?(,[0-9]{1,16}(-[0-9]{1,16})?)*$";
    }
     if(inputname.indexOf("|")==-1)
     {
         inputobj=eval(CONST_STRDOC+inputname);
         inputvalue=inputobj.value;
        
         if(inputvalue.length==0)
             return true;
         return regex_match(inputname,msg,pattern);  
     }
    var split_inputname=inputname.split(".");
    var split_inputs=split_inputname[1].split("|");
    var split_msg=msg.split("|");
    
    for (var i=0;i<split_inputs.length;i++)
    {
   
        inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
        inputvalue=inputobj.value;
        
        if(inputvalue.length==0){
            continue;
        }else if(!regex_match(split_inputname[0]+"."+split_inputs[i],split_msg[i],pattern)){
            return false;		
        }
       
    
    }
    return true;
}

/*
 * 函数功能：检查是否字符串中有中文,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --包含中文
 *        true -- 不包含
 *
 * 例：check_chinese('Form1.Input1','字段1');
 * 例：check_chinese('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 */
function check_chinese(inputname,msg)
{
    var inputobj,inputvalue;
    
    if(inputname.indexOf("|")==-1)
    {
        inputobj=eval(CONST_STRDOC+inputname);
        inputvalue=inputobj.value;
        if(inputvalue.length==0)
            return true;
        
        for (var i=0;i<inputvalue.length;i++)
        {
            if(inputvalue.charCodeAt(i)>255)
            {//find
                alert(msg + ENTER_MSG + HAVE_CHINESE);
                return false;			
            }
        }
        
        return true;
    }
    var split_inputname=inputname.split(".");
    var split_inputs=split_inputname[1].split("|");
    var split_msg=msg.split("|");
    var errmsg="";
    
    for (var i=0;i<split_inputs.length;i++)
    {
        inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
        inputvalue=inputobj.value;

        if(inputvalue.length==0)
            continue;
    
        for (var j=0;j<inputvalue.length;j++)
        {
            if(inputvalue.charCodeAt(j)>255)
            {//find
                errmsg=errmsg+split_msg[i]+" ";
                break;			
            }
        }
    
    }

    if(errmsg!="")
    {
        alert(errmsg + ENTER_MSG + HAVE_CHINESE);
        return false;
    }

    return true;
}

/*
 * 函数功能：检查字符串是否为数字,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --包含非数字
 *        true -- 不包含
 *
 * 例：check_number('Form1.Input1','字段1');
 * 例：check_number('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 */
function check_number(inputname,msg)
{
    var inputobj,inputvalue;
    
    if(inputname.indexOf("|")==-1)
    {
        inputobj=eval(CONST_STRDOC+inputname);
        inputvalue=inputobj.value;
        
        if(inputvalue.length==0)
            return true;
    
        for (var i=0;i<inputvalue.length;i++)
        {
            if(inputvalue.charCodeAt(i)>57 || inputvalue.charCodeAt(i)<48)
            {//find
                alert(msg + ENTER_MSG + NOT_NUMBER);
                return false;			
            }
        }
        
        return true;
    }
    
    var split_inputname=inputname.split(".");
    var split_inputs=split_inputname[1].split("|");
    var split_msg=msg.split("|");
    var errmsg="";
    
    for (var i=0;i<split_inputs.length;i++)
    {
        inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
        inputvalue=inputobj.value;

        if(inputvalue.length==0)
            continue;
    
        for (var j=0;j<inputvalue.length;j++)
        {
            if(inputvalue.charCodeAt(j)>57 || inputvalue.charCodeAt(j)<48)
            {//find
                errmsg=errmsg+split_msg[i]+" ";
                break;			
            }
        }
    }
    
    if(errmsg!="")
    {
        alert(errmsg + ENTER_MSG + NOT_NUMBER);
        return false;
    }

    return true;
}


/*
 * 函数功能：检查是否匹配正则表达式,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *			 pattern -- 正则表达式
 *
 * Return false --不合法
 *        true -- 合法
 *
 * 例：regex_match('Form1.Input1','字段1','A-Z');
 * 例：regex_match('Form1.Input1|Input2|Input3','字段1|字段2|字段3','A-Z');
 *
 */
function regex_match(inputname,msg,pattern)
{
	return regex_match_msg(inputname,msg,pattern,ILLEGAL_REGEX);
}


/*
 * 函数功能：检查是否匹配正则表达式,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *			 pattern -- 正则表达式
 			warn -- 错误提示
 *
 * Return false --不合法
 *        true -- 合法
 *
 * 例：regex_match_msg('Form1.Input1','字段1','A-Z','必须为字母');
 * 例：regex_match_msg('Form1.Input1|Input2|Input3','字段1|字段2|字段3','A-Z','必须为字母');
 *
 */
function regex_match_msg(inputname,msg,pattern,warn)
{
    var inputobj,inputvalue;
    var regex = new RegExp(pattern);
    if(inputname.indexOf("|")==-1)
    {
        inputobj=eval(CONST_STRDOC+inputname);
        inputvalue=inputobj.value;
        
        if (regex.test(inputvalue))
			return true;
			
        alert(msg + ENTER_MSG + warn);
        return false;			
    }
    
    var split_inputname=inputname.split(".");
    var split_inputs=split_inputname[1].split("|");
    var split_msg=msg.split("|");
    var errmsg="";
    
    for (var i=0;i<split_inputs.length;i++)
    {
        inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
        inputvalue=inputobj.value;
        
 //       if(inputvalue.length==0)
 //           continue;
        
        if (!regex.test(inputvalue))
        {
                errmsg=errmsg+split_msg[i]+" ";
                break;			
        }
    
    }
    
    if(errmsg=="")
    	return true;
    
	alert(errmsg + ENTER_MSG + warn);
    return false;

}


/*
 * 函数功能：检查长度是否等于固定长度,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           inputlength -- 表单域文本框的指定固定长度;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --不等于
 *        true -- 等于
 *
 * 例：check_length('Form1.Input1','8','字段1');
 * 例：check_length('Form1.Input1|Input2|Input3','6|8|10','字段1|字段2|字段3');
 *
 */
function check_length(inputname,inputlength,msg)
{
    var inputobj;

    if(inputname.indexOf("|")==-1)
    {
        inputobj=eval(CONST_STRDOC+inputname);

        if((inputobj.value.length!=0) && (inputobj.value.length!=inputlength))
        {
            alert(msg + LENGTH_EQUAL_MSG + inputlength + COMMA_MSG + ENTER_MSG + MODIFY_MSG);
            return false;
        }

        return true;
    }
    
    var split_inputname=inputname.split(".");
    var split_inputs=split_inputname[1].split("|");
    var split_inputlength=inputlength.split("|");
    var split_msg=msg.split("|");
    var errmsg="";
    
    for (var i=0;i<split_inputs.length;i++)
    {
        inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
        
        if((inputobj.value.length!=0) && (inputobj.value.length!=split_inputlength[i]))
			errmsg=errmsg+split_msg[i] + LENGTH_EQUAL_MSG + split_inputlength[i] + COMMA_MSG + ENTER_MSG;
    }
    
    if(errmsg.length!=0)
    {
        alert(errmsg + MODIFY_MSG);
        return false;
    }

    return true;
}

/*
 * 函数功能：检查长度是否小于或等于指定长度,控制中文字符,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           inputlength -- 表单域文本框的指定固定长度;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --大于指定长度
 *        true -- 小于或等于指定长度
 *
 * 例：check_length_zhCN('Form1.Input1','8','字段1');
 * 例：check_length_zhCN('Form1.Input1|Input2|Input3','6|8|10','字段1|字段2|字段3');
 *
 */
function check_length_zhCN(inputname,inputlength,msg)
{
	var inputobj;
	var inputValue;
	var inputLength = 0;

	if(inputname.indexOf("|")==-1)
	{
		inputobj=eval(CONST_STRDOC+inputname);
		
		if(inputobj.value.length != 0)
		{
			inputValue = inputobj.value;

			for(var i = 0; i < inputobj.value.length;i++)
			{
				if(inputValue.charCodeAt(i)>127) 
					inputLength++;
			 	
			 	inputLength++;
			}

			if (inputLength>inputlength)
			{
				alert(msg + LENGTH_MSG + inputlength + LENGTH_MSG1 + COMMA_MSG + ENTER_MSG + MODIFY_MSG);
				return false;
			}
		}
		
		return true;
	}
	
	var split_inputname=inputname.split(".");
	var split_inputs=split_inputname[1].split("|");
	var split_inputlength=inputlength.split("|");
	var split_msg=msg.split("|");
	var errmsg="";
	
	for (var i=0;i<split_inputs.length;i++)
	{
		inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);

		if(inputobj.value.length != 0)
		{
			inputValue = inputobj.value;

			for(var j = 0; j < inputobj.value.length;j++)
			{
				if(inputValue.charCodeAt(j)>127) 
					inputLength++;
			 	
			 	inputLength++;
			}

			if (inputLength > split_inputlength[i])
				errmsg=errmsg+split_msg[i] + LENGTH_MSG + split_inputlength[i] + LENGTH_MSG1 + COMMA_MSG + ENTER_MSG;

			inputLength = 0;
		}
	}
	
	if(errmsg.length!=0)
	{
		alert(errmsg + MODIFY_MSG);
		return false;
	}
	
	return true;
}

/*
 * 函数功能：检查长度是否在指定长度之间,控制中文字符,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           inputlength1 -- 表单域文本框的指定固定长度下限;
 *           inputlength2 -- 表单域文本框的指定固定长度上限;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --超出指定长度范围
 *        true -- 未超出指定长度范围
 *
 * 例：check_length_period('Form1.Input1','2','8','字段1');
 * 例：check_length_period('Form1.Input1|Input2|Input3','2|2|2','6|8|10','字段1|字段2|字段3');
 *
 */
function check_length_period(inputname,inputlength1,inputlength2,msg)
{
	var inputobj;
	var inputValue;
	var inputLength = 0;

	if(inputname.indexOf("|")==-1)
	{
		inputobj=eval(CONST_STRDOC+inputname);
		
		if(inputobj.value.length != 0)
		{
			inputValue = inputobj.value;

			for(var i = 0; i < inputobj.value.length;i++)
			{
				if(inputValue.charCodeAt(i)>127) 
					inputLength++;
			 	
			 	inputLength++;
			}

			if (inputLength > inputlength2 || inputLength < inputlength1)
			{
				alert(msg + LENGHT_PERIOD_MSG + inputlength1 + MINUS_MSG + inputlength2 + COMMA_MSG + ENTER_MSG + MODIFY_MSG);
				return false;
			}
		}
		
		return true;
	}
	
	var split_inputname=inputname.split(".");
	var split_inputs=split_inputname[1].split("|");
	var split_inputlength1=inputlength1.split("|");
	var split_inputlength2=inputlength2.split("|");
	var split_msg=msg.split("|");
	var errmsg="";
	
	for (var i=0;i<split_inputs.length;i++)
	{
		inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);

		if(inputobj.value.length != 0)
		{
			inputValue = inputobj.value;

			for(var j = 0; j < inputobj.value.length;j++)
			{
				if(inputValue.charCodeAt(j)>127) 
					inputLength++;
			 	
			 	inputLength++;
			}

			if (inputLength > split_inputlength2[i] || inputLength < split_inputlength1[i])
				errmsg=errmsg+split_msg[i] + LENGHT_PERIOD_MSG + split_inputlength1[i] + MINUS_MSG + split_inputlength2[i] + COMMA_MSG + ENTER_MSG;

			inputLength = 0;
		}
	}
	
	if(errmsg.length!=0)
	{
		alert(errmsg + MODIFY_MSG);
		return false;
	}
	
	return true;
}

/*
 * 函数功能：检查非法金额,向用户发出提示
 *
 * Parameter inputname1,inputname2 -- 表单域文本框的英文名;
 *           msg1,msg2 -- 表单域文本框的中文标识为用户提供提示信息;
 *           xflag -- 0:单、多文本框检查金额是否合法，单时inputname2和msg2用 ''或""表示;
 *                    1:两文本框检查金额是否合法，金额下限是否大于金额上限;
 *                    2:两文本框检查金额是否合法，金额上限是否小于等于金额下限;
 *           curCode -- 货币代码,人民币为001
 *           minusFlag -- 金额是否可以为负,true:可以为负,false:不能为负;
 *
 * Return false -- 金额不合法
 *        true -- 合法
 *
 * 例：check_money(0,'Form1.Input1','','字段1','','001','false');
 * 例：check_money(0,'Form1.Input1|Input2|Input3','','字段1|字段2|字段3','','001','false');
 * 例：check_money(1,'Form1.Input1','Form1.Input2','字段1','字段2','001','false');
 * 例：check_money(2,'Form1.Input1','Form1.Input2','字段1','字段2','001','false');
 *
 */
function check_money(xflag,inputname1,inputname2,msg1,msg2,curCode,minusFlag)
{
    var curName, curLlen, curDec;
    
    for(var j = 0; j < curCodeArr.length; j++)
    {
        if (curCodeArr[j][0] == curCode)
        {
            curName = curCodeArr[j][1];
            curLlen = curCodeArr[j][2];
            curDec = curCodeArr[j][3];
            
            break;
        }
    }
    
    if(xflag == 0)
    {
        var inputobj;

        if(inputname1.indexOf("|")==-1)
        {
            inputobj = eval(CONST_STRDOC + inputname1);
        
            switch(moneyCheck(inputobj.value,curLlen,curDec,minusFlag,"true"))
            {
                case "b":
                   alert(msg1 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG1);
                   return false;
                case "c":
                   alert(msg1 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG2);
                   return false;
                case "d":
                   alert(msg1 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG3);
                   return false;
                case "e":
                   alert(msg1 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG4);
                   return false;
            }
            
            return true;
        }
    
        var split_inputname=inputname1.split(".");
        var split_inputs=split_inputname[1].split("|");
        var split_msg=msg1.split("|");
        var minusArr = minusFlag.split("|");
        var errmsg="";
    
        for (var i=0;i<split_inputs.length;i++)
        {
            inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
            
            switch(moneyCheck(inputobj.value,curLlen,curDec,minusArr[i],"true"))
            {
                case "b":
                   alert(split_msg[i] + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG1);
                   return false;
                case "c":
                   alert(split_msg[i] + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG2);
                   return false;
                case "d":
                   alert(split_msg[i] + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG3);
                   return false;
                case "e":
                   alert(split_msg[i] + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG4);
                   return false;
            }
        }
        
        return true;
    }
    
    //xflag=1
    if(xflag==1)
    {
        var inputobj1=eval(CONST_STRDOC+inputname1);
        var inputobj2=eval(CONST_STRDOC+inputname2);
        
        var inputvalue1 = moneyCheck(inputobj1.value,curLlen,curDec,minusFlag,"true");
        var inputvalue2 = moneyCheck(inputobj2.value,curLlen,curDec,minusFlag,"true");
        var errmsg="";
    
        switch(inputvalue1)
        {
            case "b":
               alert(msg1 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG1);
               return false;
            case "c":
               alert(msg1 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG2);
               return false;
            case "d":
               alert(msg1 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG3);
               return false;
            case "e":
               alert(msg1 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG4);
               return false;
        }

        switch(inputvalue2)
        {
            case "b":
               alert(msg2 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG1);
               return false;
            case "c":
               alert(msg2 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG2);
               return false;
            case "d":
               alert(msg2 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG3);
               return false;
            case "e":
               alert(msg2 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG4);
               return false;
        }
        
        if(inputvalue1 == 0 || inputvalue2 == 0)
            return true;

        if(inputvalue1 > inputvalue2 )
        {
            alert(msg2 + MONEY_MSG + msg1 + COMMA_MSG + MODIFY_MSG);
            return false;
        }
        
        return true;
    }
    
    //xflag=2
    if(xflag==2)
    {
        var inputobj1=eval(CONST_STRDOC+inputname1);
        var inputobj2=eval(CONST_STRDOC+inputname2);
        
        var inputvalue1 = moneyCheck(inputobj1.value,curLlen,curDec,minusFlag,"true");
        var inputvalue2 = moneyCheck(inputobj2.value,curLlen,curDec,minusFlag,"true");
        var errmsg="";
    
        switch(inputvalue1)
        {
            case "b":
               alert(msg1 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG1);
               return false;
            case "c":
               alert(msg1 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG2);
               return false;
            case "d":
               alert(msg1 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG3);
               return false;
            case "e":
               alert(msg1 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG4);
               return false;
        }

        switch(inputvalue2)
        {
            case "b":
               alert(msg2 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG1);
               return false;
            case "c":
               alert(msg2 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG2);
               return false;
            case "d":
               alert(msg2 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG3);
               return false;
            case "e":
               alert(msg2 + "("+ curName + ")" + COLON_MSG + ENTER_MSG + MONEY_MSG4);
               return false;
        }
        
        if(inputvalue1 == 0 || inputvalue2 == 0)
            return true;

        if(inputvalue1 > inputvalue2 )
        {
            alert(msg1 + MONEY_MSG0 + msg2 + COMMA_MSG + MODIFY_MSG);
            return false;
        }
        
        return true;
    }
    
    return false;
}

/*
 * 函数功能：检查非法汇率,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *           curCode -- 货币代码,人民币为001
 *           emptyFlag -- 域是否可以为空,true:可以为空,false:不能为空;
 *
 * Return false --不合法
 *        true -- 合法
 *
 * 例：check_exchangerate("Form1.Input1","字段1","027","false");
 * 例：check_exchangerate("Form1.Input1|Input2|Input3","2|2|2","6|8|10","字段1|字段2|字段3");
 *
 */
function check_exchangerate(inputname,msg,curCode,emptyFlag)
{
    if(inputname.indexOf("|") == -1)
    {
        var inputobj;
        
        inputobj = eval(CONST_STRDOC + inputname);
        
        /** 为外汇功能特殊处理，如果页面上有同名的input域，则取第一个非disabled的为判断依据 */
        if (inputobj.length != null)
        {
            for(var i = 0; i < inputobj.length; i++)
            {
                if (!inputobj[i].disabled)
                {
                    inputobj = inputobj[i];
                    break;
                }
            }
        }
                
        var curLen = 3;
        var curDec = 4;
        
        if (curCode == "027")
        {
            curLen = 3;
            curDec = 2;
        }
            
        switch(moneyCheck(inputobj.value,curLen,curDec,"false","false"))
        {
            case "a":
                if (emptyFlag == "false")
                    alert(msg + ENTER_MSG + NOT_NULL);
                return false;
            case "b":
               alert(msg + COLON_MSG + ENTER_MSG + EXCHANGERATE_MSG1);
               return false;
            case "c":
               alert(msg + COLON_MSG + ENTER_MSG + EXCHANGERATE_MSG2);
               return false;
            case "d":
               alert(msg + COLON_MSG + ENTER_MSG + EXCHANGERATE_MSG3);
               return false;
            case "e":
               alert(msg + COLON_MSG + ENTER_MSG + EXCHANGERATE_MSG4);
               return false;
        }
        
        return true;
    }

    var split_inputname=inputname.split(".");
    var split_inputs=split_inputname[1].split("|");
    var split_msg=msg.split("|");
    var curCodeArr=curCode.split("|");
    var emptyFlagArr = emptyFlag.split("|");
    var errmsg="";

    for (var i=0;i<split_inputs.length;i++)
    {
        inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
        
        var curLen = 3;
        var curDec = 4;
        
        if (curCodeArr[i] == "027")
        {
            curLen = 3;
            curDec = 2;
        }

        switch(moneyCheck(inputobj.value,curLen,curDec,"false","false"))
        {
            case "a":
                if (emptyFlagArr[i] == "false")
                    alert(split_msg[i] + ENTER_MSG + NOT_NULL);
                return false;
            case "b":
               alert(split_msg[i] + COLON_MSG + ENTER_MSG + EXCHANGERATE_MSG1);
               return false;
            case "c":
               alert(split_msg[i] + COLON_MSG + ENTER_MSG + EXCHANGERATE_MSG2);
               return false;
            case "d":
               alert(split_msg[i] + COLON_MSG + ENTER_MSG + EXCHANGERATE_MSG3);
               return false;
            case "e":
               alert(split_msg[i] + COLON_MSG + ENTER_MSG + EXCHANGERATE_MSG4);
               return false;
        }
    }
    
    return true;
}

/*
 * 函数功能：检查手机号,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false -- 不符合要求格式
 *        true -- 符合要求格式
 *
 * 例：check_mobile("Form1.Input1","字段1");
 * 例：check_mobile("Form1.Input1|Input2|Input3","字段1|字段2|字段3");
 *
 */
function check_mobile(inputname,msg)
{
	return regex_match(inputname,msg,"^([0-9]{11})?$");
}

/*
 * 函数功能：检查身份证号,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false -- 不符合要求格式
 *        true -- 符合要求格式
 *
 * 例：check_identify("Form1.Input1","字段1");
 * 例：check_identify("Form1.Input1|Input2|Input3","字段1|字段2|字段3");
 *
 */
function check_identify(inputname,msg)
{
	return regex_match(inputname,msg,"^(\\d{15}|\\d{17}[0-9Xx])?$");
}

/*
 * 函数功能：检查EMAIL,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false -- 不符合要求格式
 *        true -- 符合要求格式
 *
 * 例：check_email("Form1.Input1","字段1");
 * 例：check_email("Form1.Input1|Input2|Input3","字段1|字段2|字段3");
 *
 */
function check_email(inputname,msg)
{
	return regex_match(inputname,msg,"^(\\S+@\\S+)?$");
}

/*
 * 函数功能：检查E-token,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false -- 不符合要求格式
 *        true -- 符合要求格式
 *
 * 例：check_etoken("Form1.Input1","字段1");
 * 例：check_etoken("Form1.Input1|Input2|Input3","字段1|字段2|字段3");
 *
 */
function check_etoken(inputname,msg)
{
	return regex_match(inputname,msg,"^[0-9A-Za-z+=/]{6,12}$");
}

/*
 * 函数功能：检查海外个人转账摘要,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false -- 不符合要求格式
 *        true -- 符合要求格式
 *
 * 例：check_englishForBoc2000("Form1.Input1","字段1");
 * 例：check_englishForBoc2000("Form1.Input1|Input2|Input3","字段1|字段2|字段3");
 *
 */
function check_englishForBoc2000(inputname,msg)
{

	return regex_match(inputname,msg,"^[ A-Za-z0-9-().,'//s/?/+//]*$");
}

/**
 * 函数功能：实现check_date函数的重载,本函数根据check_date(arg1,arg2.....)中参数的个数,分别调用不同的函数,分别实现以下功能:
 *
 * 1. 仅检查一个日期输入域是否合法:function checkDateSingle(inputname1,msg1)
 * 2. 检查两个日期输入域(起始/截止日期)是否合法,且截止晚于起始:function checkDateTwo(inputname1,inputname2,msg1,msg2)
 * 3. 检查两个日期输入域是否合法、截止是否晚于起始、日期跨度为若干月：
 * 4. 检查两个日期是否合法、截止是否晚于起始、同时限制截止日期和起始日期的范围是否在某个日期（limitDate）之内，跨度为period:
 *    function checkDateTwoLimit(inputname1,inputname2,msg1,msg2,limitDate,period)
 * 5. 检查两个日期是否合法、截止是否晚于起始、日期跨度为若干月、且可查询范围是否在某个日期（limitDate）之内，跨度为period,查询范围为yPeriod
 *    function checkDatePeriodLimit(inputname1,inputname2,msg1,msg2,limitDate,period,yPeriod)
 *
 * 
 * Parameter 参数含义见各函数注释
 *
 * Return false -- 不合法
 *        true -- 合法
 *
 * 例：1. check_date('Form1.Input1','字段1');
 * 		  check_date('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 *     2. check_date('Form1.Input1','Form1.Input2','字段1','字段2');
 *
 *     3. check_date('Form1.Input1','Form1.Input2','字段1','字段2',3);
 *
 *     4. check_date('Form1.Input1','Form1.Input2','字段1','字段2','2007/07/27',6);
 *
 *     5. check_date('Form1.Input1','Form1.Input2','字段1','字段2','2007/07/27',6,-12);
 */
 
function check_date()
{
	switch (arguments.length)
	{
		/** 如果参数个数为2,调用相应函数处理 */
		case 2:
			return checkDateSingle(arguments[0],arguments[1]);
			break;
		/** 如果参数个数为4,调用相应函数处理 */
		case 4:
			return checkDateTwo(arguments[0],arguments[1],arguments[2],arguments[3]);
			break;
		/** 如果参数个数为5,调用相应函数处理 */
		case 5:
			return checkDateTwoPeriod(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
			break;
		/** 如果参数个数为6,调用相应函数处理 */
		case 6:
			return checkDateTwoLimit(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);
			break;
		/** 如果参数个数为7,调用相应函数处理 */
		case 7:
			return checkDatePeriodLimit(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]);
			break;
		default:
			return false;
	}
}

/*
 * 函数功能：检查date,向用户发出提示
 *
 * Parameter inputname1 -- 表单域文本框的英文名;
 *           msg1 -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false -- 不合法
 *        true -- 合法
 *
 * 例：checkDateSingle('Form1.Input1','字段1');
 * 例：checkDateSingle('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 */
function checkDateSingle(inputname1,msg1)
{
	var inputobj;
	var inputvalue;
	
	if(inputname1.indexOf("|")==-1)
	{
	    
	    inputobj=eval(CONST_STRDOC+inputname1);
	    inputvalue = isdate(inputobj.value);
	    
	    if(typeof(inputvalue) == "number" && inputvalue < 0)
	    {
	        alert(msg1 + ENTER_MSG + ILLEGAL_DATE);
	        return false;
	    }
	    
	    return true;
	}
	
	var split_inputname=inputname1.split(".");
	var split_inputs=split_inputname[1].split("|");
	var split_msg=msg1.split("|");
	var errmsg="";
	
	for (var i=0;i<split_inputs.length;i++)
	{
	    inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
	    inputvalue = isdate(inputobj.value);
	
	    if(typeof(inputvalue) == "number" && inputvalue < 0)
	        errmsg=errmsg+split_msg[i]+" ";
	}
	
	if(errmsg!="")
	{
	    alert(errmsg + ENTER_MSG + ILLEGAL_DATE);
	    return false;
	}
	
	return true;
}

/*
 * 函数功能：检查date,向用户发出提示,主要检查两个日期是否合法，判断截止日期>开始日期
 *
 * Parameter inputname1,inputname2 -- 表单域文本框的英文名;
 *           msg1,msg2 -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false -- 不合法
 *        true -- 合法
 *
 * 例：checkDateTwo('Form1.Input1','Form1.Input2','字段1','字段2');
 *
 */
function checkDateTwo(inputname1,inputname2,msg1,msg2)
{
	var inputobj1=eval(CONST_STRDOC+inputname1);
	var inputobj2=eval(CONST_STRDOC+inputname2);
	var inputvalue1=isdate(inputobj1.value);
	var inputvalue2=isdate(inputobj2.value);

	var errmsg="";
	
	if(typeof(inputvalue1) == "number" && inputvalue1 < 0)
	    errmsg=errmsg+msg1+" ";
	
	if(typeof(inputvalue2) == "number" && inputvalue2 < 0)
	    errmsg=errmsg+msg2+" ";
	
	if(errmsg!="")
	{
	    alert(errmsg + ENTER_MSG + ILLEGAL_DATE);
	    return false;
	}
	
	if(typeof(inputvalue1) == "number" && inputvalue1 == 0 && typeof(inputvalue2) == "number" && inputvalue2 == 0)
	    return true;

	if(inputvalue2 < inputvalue1)
	{
	    alert(msg2 + DATE_LATER_MSG + msg1 + COMMA_MSG + MODIFY_MSG);
	    return false;
	}
	
	return true;
}

/*
 * 函数功能：检查date,向用户发出提示,主要检查两个日期是否合法,同时限制截止日期和起始日期的范围
 *
 * Parameter inputname1,inputname2 -- 表单域文本框的英文名;
 *           msg1,msg2 -- 表单域文本框的中文标识为用户提供提示信息;
 *			 period -- 起始日期/截止日期的跨度,以月为单位,如:period=3,表示3个月
 *
 * Return false -- 不合法
 *        true -- 合法
 *
 * 例：checkDateTwoPeriod('Form1.Input1','Form1.Input2','字段1','字段2',3);
 *
 */
function checkDateTwoPeriod(inputname1,inputname2,msg1,msg2,period)
{
	var inputobj1=eval(CONST_STRDOC+inputname1);
	var inputobj2=eval(CONST_STRDOC+inputname2);
	var inputvalue1=isdate(inputobj1.value);
	var inputvalue2=isdate(inputobj2.value);
	
	var errmsg="";
	
	if(typeof(inputvalue1) == "number" && inputvalue1 < 0)
	    errmsg=errmsg+msg1+" ";
	
	if(typeof(inputvalue2) == "number" && inputvalue2 < 0)
	    errmsg=errmsg+msg2+" ";
	
	if(errmsg!="")
	{
	    alert(errmsg + ENTER_MSG + ILLEGAL_DATE);
	    return false;
	}
	
	if(typeof(inputvalue1) == "number" && inputvalue1 == 0 && typeof(inputvalue2) == "number" && inputvalue2 == 0)
	    return true;

	if(inputvalue2 < inputvalue1)
	{
	    alert(msg2 + DATE_LATER_MSG + msg1 + COMMA_MSG + MODIFY_MSG);
	    return false;
	}

	if (addDate("m",inputvalue1,period) < inputvalue2)
	{
		alert(ILLEGAL_DATE_PERIOD + period + ENTRIES + MONTH + COMMA_MSG + MODIFY_MSG);
		return false;
	}

	return true;
}

/*
 * 函数功能：检查date,向用户发出提示,主要检查两个日期是否合法,同时限制截止日期和起始日期的范围
 *
 * Parameter inputname1,inputname2 -- 表单域文本框的英文名;
 *           msg1,msg2 -- 表单域文本框的中文标识为用户提供提示信息;
 *           limitDate -- 截止日期的最大值;
 *			 period -- 起始日期/截止日期的跨度,以月为单位,如:period=3,表示3个月
 *
 * Return false -- 不合法
 *        true -- 合法
 *
 * 例：checkDateTwoLimit('Form1.Input1','Form1.Input2','字段1','字段2','2007/07/27',6);
 *
 */
function checkDateTwoLimit(inputname1,inputname2,msg1,msg2,limitDate,period)
{
	var inputobj1=eval(CONST_STRDOC+inputname1);
	var inputobj2=eval(CONST_STRDOC+inputname2);
	var inputvalue1=isdate(inputobj1.value);
	var inputvalue2=isdate(inputobj2.value);
	
	var errmsg="";
	
	if(typeof(inputvalue1) == "number" && inputvalue1 < 0)
	    errmsg=errmsg+msg1+" ";
	
	if(typeof(inputvalue2) == "number" && inputvalue2 < 0)
	    errmsg=errmsg+msg2+" ";
	
	if(errmsg!="")
	{
	    alert(errmsg + ENTER_MSG + ILLEGAL_DATE);
	    return false;
	}
	
	if(typeof(inputvalue1) == "number" && inputvalue1 == 0 && typeof(inputvalue2) == "number" && inputvalue2 == 0)
	    return true;

	var limitEndDateValue = isdate(limitDate);
	var limitStartDateValue = addDate("m",isdate(limitDate),0-period);

	var limitStartDate = date2string(limitStartDateValue,"/");

	if(inputvalue2 < inputvalue1)
	{
	    alert(msg2 + DATE_LATER_MSG + msg1 + COMMA_MSG + MODIFY_MSG);
	    return false;
	}

	if (limitEndDateValue < inputvalue2)
	{
		alert(msg2 + DATE_NOTLATER_MSG + limitDate + COMMA_MSG + MODIFY_MSG);
		return false;
	}

	if (inputvalue1 < limitStartDateValue)
	{
		alert(msg1 + DATE_LATER_MSG + limitStartDate + COMMA_MSG + MODIFY_MSG);
		return false;
	}
		
	return true;
}

/*
 * 函数功能：检查date,向用户发出提示,主要检查两个日期是否合法,同时限制截止日期和起始日期的范围
 *
 * Parameter inputname1,inputname2 -- 表单域文本框的英文名;
 *           msg1,msg2 -- 表单域文本框的中文标识为用户提供提示信息;
 *           limitDate -- 查询范围的起始日期;
 *			 period -- 起始日期/截止日期的跨度,以月为单位,如:period=3,表示3个月
 *           yPeriod -- 查询范围,月为单位,-12表示从limitDate往前一年,12表示从limitDate往后一年
 *
 * Return false -- 不合法
 *        true -- 合法
 *
 * 例：checkDateTwoLimit('Form1.Input1','Form1.Input2','字段1','字段2','2007/07/27',3,-12);
 *
 */
function checkDatePeriodLimit(inputname1,inputname2,msg1,msg2,limitDate,period,yPeriod)
{
	var inputobj1=eval(CONST_STRDOC+inputname1);
	var inputobj2=eval(CONST_STRDOC+inputname2);
	var inputvalue1=isdate(inputobj1.value);
	var inputvalue2=isdate(inputobj2.value);
	
	var errmsg="";
	
	if(typeof(inputvalue1) == "number" && inputvalue1 < 0)
	    errmsg=errmsg+msg1+" ";
	
	if(typeof(inputvalue2) == "number" && inputvalue2 < 0)
	    errmsg=errmsg+msg2+" ";
	
	if(errmsg!="")
	{
	    alert(errmsg + ENTER_MSG + ILLEGAL_DATE);
	    return false;
	}
	
	if(typeof(inputvalue1) == "number" && inputvalue1 == 0 && typeof(inputvalue2) == "number" && inputvalue2 == 0)
	    return true;

	var limitEndDateValue = null;
	var limitStartDateValue = null;
	
	if (yPeriod >= 0)
	{
    	limitStartDateValue = isdate(limitDate);
    	limitEndDateValue = addDate("m",isdate(limitDate),yPeriod);
	}
	else
	{
    	limitEndDateValue = isdate(limitDate);
    	limitStartDateValue = addDate("m",isdate(limitDate),yPeriod);
	}

	var limitStartDate = date2string(limitStartDateValue,"/");
	var limitEndDate = date2string(limitEndDateValue,"/");

	if(inputvalue2 < inputvalue1)
	{
	    alert(msg2 + DATE_LATER_MSG + msg1 + COMMA_MSG + MODIFY_MSG);
	    return false;
	}

	if (addDate("m",inputvalue1,period) < inputvalue2)
	{
		alert(ILLEGAL_DATE_PERIOD + period + ENTRIES + MONTH + COMMA_MSG + MODIFY_MSG);
		return false;
	}

	if (limitEndDateValue < inputvalue2)
	{
		alert(msg2 + DATE_NOTLATER_MSG + limitEndDate + COMMA_MSG + MODIFY_MSG);
		return false;
	}

	if (inputvalue1 < limitStartDateValue)
	{
		alert(msg1 + DATE_LATER_MSG + limitStartDate + COMMA_MSG + MODIFY_MSG);
		return false;
	}
		
		
	return true;
}

/**
 * 函数功能：修改checkDatePeriodLimit函数功能,跨度日期单位由月改为日,可以实现"起始截至日期间隔不能超过XX天"类的需求
 *
 * 功能: 检查两个日期是否合法、截止是否晚于起始、日期跨度为若干天、且可查询范围是否在以某个日期（limitDate）为基准,范围在(yPeriod)之内,起始截至日期跨度为period
 *    function checkDatePeriodLimitByDay(inputname1,inputname2,msg1,msg2,limitDate,period,yPeriod)
 *
 * 
 * Parameter:
 *   1.inputname1: 起始日期输入域名称
 *   2.inputname2: 截至日期输入域名称
 *   3.msg1: 提示信息中,对于起始日期的翻译
 *   4.msg2: 提示信息中,对于截至日期的翻译
 *   5.limitDate: 如果查询范围(yPeriod)>=0,则为查询范围的起始日期,根据yPeriod顺延之后的日期为查询范围的截至日期;
 *                如果查询范围(yPeriod)<0,则为查询范围的截至日期,根据yPeriod提前的日期为查询范围的起始日期
 *   6.period: 用户输入的起始截至日期之间的跨度,单位为"天"
 *   7.yPeriod: 查询范围,关联limitDate判断,单位为"月"
 *
 * Return false -- 不合法
 *        true -- 合法
 *
 * 例：checkDatePeriodLimitByDay('Form1.Input1','Form1.Input2','字段1','字段2','2007/07/27',15,-12);
 */
function checkDatePeriodLimitByDay (inputname1,inputname2,msg1,msg2,limitDate,period,yPeriod) {
	
	var inputobj1=eval(CONST_STRDOC+inputname1);
	var inputobj2=eval(CONST_STRDOC+inputname2);
	var inputvalue1=isdate(inputobj1.value);
	var inputvalue2=isdate(inputobj2.value);
	
	var errmsg="";
	
	if(typeof(inputvalue1) == "number" && inputvalue1 < 0)
	    errmsg=errmsg+msg1+" ";
	
	if(typeof(inputvalue2) == "number" && inputvalue2 < 0)
	    errmsg=errmsg+msg2+" ";
	
	if(errmsg!="")
	{
	    alert(errmsg + ENTER_MSG + ILLEGAL_DATE);
	    return false;
	}
	
	if(typeof(inputvalue1) == "number" && inputvalue1 == 0 && typeof(inputvalue2) == "number" && inputvalue2 == 0)
	    return true;

	var limitEndDateValue = null;
	var limitStartDateValue = null;
	
	if (yPeriod >= 0)
	{
    	limitStartDateValue = isdate(limitDate);
    	limitEndDateValue = addDate("m",isdate(limitDate),yPeriod);
	}
	else
	{
    	limitEndDateValue = isdate(limitDate);
    	limitStartDateValue = addDate("m",isdate(limitDate),yPeriod);
	}

	var limitStartDate = date2string(limitStartDateValue,"/");
	var limitEndDate = date2string(limitEndDateValue,"/");

	if(inputvalue2 < inputvalue1)
	{
	    alert(msg2 + DATE_LATER_MSG + msg1 + COMMA_MSG + MODIFY_MSG);
	    return false;
	}
	
	if (addDate("d",inputvalue1,period) < inputvalue2)
	{
		alert(ILLEGAL_DATE_PERIOD + period + DAY + COMMA_MSG + MODIFY_MSG);
		return false;
	}

	if (limitEndDateValue < inputvalue2)
	{
		alert(msg2 + DATE_NOTLATER_MSG + limitEndDate + COMMA_MSG + MODIFY_MSG);
		return false;
	}

	if (inputvalue1 < limitStartDateValue)
	{
		alert(msg1 + DATE_LATER_MSG + limitStartDate + COMMA_MSG + MODIFY_MSG);
		return false;
	}
		
	return true;
}

/*
 * 函数功能：判断字符串是否为日期数据,获得返回值
 *
 * Parameter onestring -- 需判断的字符串;
 *
 * Return 0 -- 字符串为空
 *        -1 -- 字符串非日期数据
 *        日期值 -- 字符串为日期数据，并获得日期值
 *
 * 例：isdate("2000/01/01")  返回20000101
 * 例：isdate("")  返回0
 * 例：isdate("abc")  返回-1   
 *
 */
function isdate(onestring)
{
    if(onestring.length == 0)
        return 0;

    if(onestring.length != 10)
        return -1;
    
	var pattern = /\d{4}\/\d{2}\/\d{2}/;
	
	if(!pattern.test(onestring)) 
		return -1;
	
	var arrDate = onestring.split("/");

	if(parseInt(arrDate[0],10) < 100) 
		arrDate[0] = 2000 + parseInt(arrDate[0],10) + "";
	
	var newdate = new Date(arrDate[0],(parseInt(arrDate[1],10) -1)+"",arrDate[2]);
	
	if(newdate.getFullYear() == arrDate[0] && newdate.getMonth() == (parseInt(arrDate[1],10) -1)+"" && newdate.getDate() == arrDate[2])
		return newdate;
	else
		return -1;
}

/*
 * 函数功能：检查是否字符串全为中文,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --包含非中文
 *        true -- 全为中文
 *
 * 例：check_chinese_only('Form1.Input1','字段1');
 * 例：check_chinese_only('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 */
function check_chinese_only(inputname,msg)
{
    var inputobj,inputvalue;
    
    if(inputname.indexOf("|")==-1)
    {
        inputobj=eval(CONST_STRDOC+inputname);
        inputvalue=inputobj.value;
        if(inputvalue.length==0)
            return true;
        
        for (var i=0;i<inputvalue.length;i++)
        {
            if(inputvalue.charCodeAt(i)<=255)
            {//find
                alert(msg + ENTER_MSG + NOT_ONLY_CHINESE);
                return false;			
            }
        }
        
        return true;
    }
    var split_inputname=inputname.split(".");
    var split_inputs=split_inputname[1].split("|");
    var split_msg=msg.split("|");
    var errmsg="";
    
    for (var i=0;i<split_inputs.length;i++)
    {
        inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
        inputvalue=inputobj.value;

        if(inputvalue.length==0)
            continue;
    
        for (var j=0;j<inputvalue.length;j++)
        {
            if(inputvalue.charCodeAt(j)>255)
            {//find
                errmsg=errmsg+split_msg[i]+" ";
                break;			
            }
        }
    
    }

    if(errmsg!="")
    {
        alert(errmsg + ENTER_MSG + NOT_ONLY_CHINESE);
        return false;
    }

    return true;
}

/*
 * 函数功能：检查字符串是否为数字、加号、空格、横线,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --包含数字、加号、空格、横线以外的字符
 *        true -- 不包含
 *
 * 例：check_phone('Form1.Input1','字段1');
 * 例：check_phone('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 */
function check_phone(inputname,msg)
{
    return regex_match(inputname,msg,"[ 0-9-///+]*$");
}

/*
 * 函数功能：判断金额的合法性,同时扩展为普通浮点数的检查(私有函数，请勿调用)
 *
 * Parameter str -- 需判断的字符串;
 *           llen -- 金额整数部分的长度;
 *           dec -- 辅币位数;
 *           minusFlag -- 金额是否可以为负,true:可以为负,false:不能为负;
 *           isFormatMoney -- 是否是格式化金额,true:是,false:否;如果为否，可用做普通浮点数的判断
 *
 * Return a -- 字符串为空
 *        b -- 字符串非数值数据
 *        c -- 金额为负
 *        d -- 整数部分超长
 *        e -- 小数部分超长
 *        数值 -- 字符串为数值数据，并获得转换后的数值
 *
 * 例：moneyCheck("123,456,789.34",13,2)  返回123456789.34
 *
 */
function moneyCheck(str,llen,dec,minusFlag,isFormatMoney)
{
    if(str == null || str == "")
        return "a";
        
    if(str.length!=0&&str.trim().length == 0)
    	return "b";
    
    var regex;
    
    if (isFormatMoney == "true")
        regex = new RegExp(/(?!^[-]?[0,]*(\.0{1,4})?$)^[-]?(([1-9]\d{0,2}(,\d{3})*)|([1-9]\d*)|0)(\.\d{1,4})?$/);
    else
        regex = new RegExp(/(?!^[-]?[0]*(\.0{1,4})?$)^[-]?(([1-9]\d*)|0)(\.\d{1,4})?$/);
    
    if (!regex.test(str))
        return "b";
    
    var minus = "";

    if (minusFlag == "true")
    {
        if(str.substring(0,1) == "-")
        {
            minus = "-";
            str = str.substring(1);
        }
    }
    else
    {
        if(str.substring(0,1) == "-")
            return "c";
    }
                
    if (str.substring(0,1)==".")
        str = "0" + str;	
    
    str = replace(str,",","");

    if (str.indexOf(".") == -1)
    {
        if (str.length > llen)
            return "d";
        
        return parseFloat(minus + str);
    }
    else
    {
        var tmp = str.split(".");
    
        if(tmp.length > 2)
            return "b";
        
        if (tmp[0].length > llen)
            return "d";
            
        if (tmp[1].length > dec)
            return "e";
            
        return  parseFloat(minus + tmp[0] + "." + tmp[1]);
    }
}
/*
 * 函数功能：半角字符串转换为全角字符串(公有函数，请调用)
 *
 * Parameter str -- 需要转换的字符串，支持半角全角混合字符串
 *           flag -- 转换标识，0为转换
 *          
 * Return 全角字符
 *
 * 例：DBC2SBC("abcdefg",0)  返回ａｂｃｄｅｆｇ
 *
 */
function DBC2SBC(str,flag) {
    var i;
    var result='';
    if(str.length<=0) {        
        return result;
    }
    for(i=0;i<str.length;i++){
      str1=str.charCodeAt(i);
      if(str1<125&&!flag){
    	if(str1==32){//如果是半角空格，特殊处理
    		result+=String.fromCharCode(12288);
    	}else{
    		result+=String.fromCharCode(str.charCodeAt(i)+65248);
    	}    	
      }else{
        result+=String.fromCharCode(str.charCodeAt(i));
      }
    }
    return result;
}

/*
 * 函数功能：检查长度是否等于枚举固定长度,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           inputlength -- 表单域文本框的指定枚举固定长度;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --不等于
 *        true -- 等于
 *
 * 例：check_length('Form1.Input1','6|8|10','字段1');
 *
 */
function check_lengthEnum(inputname,inputlength,msg)
{
    var inputobj;
/*
    if(inputname.indexOf("|")==-1)
    {
        inputobj=eval(CONST_STRDOC+inputname);

        if((inputobj.value.length!=0) && (inputobj.value.length!=inputlength))
        {
            alert(msg + LENGTH_EQUAL_MSG + inputlength + COMMA_MSG + ENTER_MSG + MODIFY_MSG);
            return false;
        }

        return true;
    }*/
    var split_inputname=inputname.split(".");
    var split_inputs=split_inputname[1].split("|");
    var split_inputlength=inputlength.split("|");
    var split_msg=msg.split("|");
    
    var errmsg=FORMAT_ERROR.replace("{0}",msg);
    
    inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[0]);

    for (var i=0;i<split_inputlength.length;i++)
    {
        if(inputobj.value.length==split_inputlength[i])
        {
        	errmsg="";
        	break
        }
			//errmsg=errmsg+split_msg[i] + LENGTH_EQUAL_MSG + split_inputlength[i] + COMMA_MSG + ENTER_MSG;
    }
    
    if(errmsg.length!=0)
    {
        alert(errmsg + MODIFY_MSG);
        return false;
    }

    return true;
}

/*
 *函数功能：去除字符串中的所有空白符(字符串前、中间、后)
 *
 *Parameter inputname -- 表单域文本框的英文名;
 *
 *
 *例子： onblur="trimAllBlank(document.form1.ToAccountNo)"
 */
function trimAllBlank(inputname)
{
	var result=inputname.value.replace(/(\s)/g,"");
	inputname.value=result;
}

/*
 * 函数功能：检查swift非法字符  ` ~ ! @ # $ % ^ & * _ = [ ] { } ; " < > | \ : -
 *         向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --不合法
 *        true -- 合法
 *
 * 例：check_swift('Form1.Input1','字段1');
 * 例：check_swift('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 */
function check_swift(inputname,msg)
{
  var pattern;
	pattern = "^[^`~!@#\\$%\\^&\\*_=\\[\\]{};\\\"<>\\|\\\\:-]*$";
	if(inputname.indexOf("|")==-1)
  {
       inputobj=eval(CONST_STRDOC+inputname);
       inputvalue=inputobj.value;
      
       if(inputvalue.length==0)
           return true;
       return regex_match(inputname,msg,pattern);
  }
  
  var split_inputname=inputname.split(".");
  var split_inputs=split_inputname[1].split("|");
  var split_msg=msg.split("|");
  var errmsg="";
  
  for (var i=0;i<split_inputs.length;i++)
  {
 
      inputobj=eval(CONST_STRDOC+split_inputname[0]+"."+split_inputs[i]);
      inputvalue=inputobj.value;
      
      if(inputvalue.length==0){
          continue;
      }else if(!regex_match(split_inputname[0]+"."+split_inputs[i],split_msg[i],pattern)){
          return false;		
      }
  }
  
  return true;
}

/*
 * 函数功能：检查字符串是否为字母、数字,向用户发出提示
 *
 * Parameter inputname -- 表单域文本框的英文名;
 *           msg -- 表单域文本框的中文标识为用户提供提示信息;
 *
 * Return false --包含字母、数字以外的字符
 *        true -- 不包含
 *
 * 例：check_letter_num('Form1.Input1','字段1');
 * 例：check_letter_num('Form1.Input1|Input2|Input3','字段1|字段2|字段3');
 *
 */
function check_letter_num(inputname,msg) {
	return regex_match(inputname,msg,"^[ A-Za-z0-9]*$");
}

//**************************************
//***  FORM表单检查函数结束
//**************************************