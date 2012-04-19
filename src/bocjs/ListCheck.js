//**************************************
//***  以下函数原来处理全选,所有全选
//**************************************

/*
 * 函数功能：点击"全选"时执行,执行全选动作
 *
 * Parameter allRecordObjText -- 所有全选框元素名称,没有为空;
 *           allObjText -- 全选框的表单元素的名称;
 *           oneObjText -- 全选框对应的单一多选框的名称;
 *
 * 例子： <input name="checkAll" type="checkbox" onClick="allCheck('form1.checkAllRecord','form1.checkAll','form1.checkOne')">全选(有所有全选)
 *        <input type="checkbox" name="checkOne" onClick="cancelAllCheck('form1.checkAllRecord','form1.checkAll','form1.checkOne')">
 *        <input type="checkbox" name="checkOne" onClick="cancelAllCheck('form1.checkAllRecord','form1.checkAll','form1.checkOne')">
 *
 *        <input name="checkAll" type="checkbox" onClick="allCheck('','form1.checkAll','form1.checkOne')">全选(无所有全选)
 *        <input type="checkbox" name="checkOne" onClick="cancelAllCheck('','form1.checkAll','form1.checkOne')">
 *        <input type="checkbox" name="checkOne" onClick="cancelAllCheck('','form1.checkAll','form1.checkOne')">
 *
 * 注意: 被多选的条目每个都要加onClick="cancelAllCheck('form1.checkAll','form1.checkOne')"
 */
function allCheck(allRecordObjText,allObjText,oneObjText)
{
    if (allRecordObjText.length != 0)
    {
        var allRecordObj = eval(CONST_STRDOC + allRecordObjText);
        
        allRecordObj.checked = false;
    }
    
    var allObj = eval(CONST_STRDOC + allObjText);
    var oneObj = eval(CONST_STRDOC + oneObjText);

	if (!oneObj.length)
	{
		if (allObj.checked)
			oneObj.checked = true;
		else
			oneObj.checked = false;
		
		return;
	}
	
	for (var i = 0; i < oneObj.length; i++)
	{
		if (allObj.checked)
			oneObj[i].checked = true;
		else
			oneObj[i].checked = false;
	}
}

/*
 * 函数功能：点击被全选的条目时执行,执行取消全选动作
 *
 * Parameter allRecordObjText -- 所有全选框元素名称,没有为空;
 *           allObjText -- 全选框的表单元素的名称;
 *           oneObjText -- 全选框对应的单一多选框的名称;
 *
 * 例子： <input name="checkAll" type="checkbox" onClick="allCheck('form1.checkAllRecord','form1.checkAll','form1.checkOne')">全选(有所有全选)
 *        <input type="checkbox" name="checkOne" onClick="cancelAllCheck('form1.checkAllRecord','form1.checkAll','form1.checkOne')">
 *        <input type="checkbox" name="checkOne" onClick="cancelAllCheck('form1.checkAllRecord','form1.checkAll','form1.checkOne')">
 *
 *        <input name="checkAll" type="checkbox" onClick="allCheck('','form1.checkAll','form1.checkOne')">全选(无所有全选)
 *        <input type="checkbox" name="checkOne" onClick="cancelAllCheck('','form1.checkAll','form1.checkOne')">
 *        <input type="checkbox" name="checkOne" onClick="cancelAllCheck('','form1.checkAll','form1.checkOne')">
 *
 * 注意: 被多选的条目每个都要加onClick="cancelAllCheck('form1.checkAll','form1.checkOne')"
 */
function cancelAllCheck(allRecordObjText,allObjText,oneObjText)
{
    if (allRecordObjText.length != 0)
    {
        var allRecordObj = eval(CONST_STRDOC + allRecordObjText);
        
        allRecordObj.checked = false;
    }
    
    var allObj = eval(CONST_STRDOC + allObjText);
    var oneObj = eval(CONST_STRDOC + oneObjText);

	var j = 0;
	for (var i=0; i < oneObj.length; i++)
	{
		if (oneObj[i].checked)
			j++;
	}

	if (j == oneObj.length || (!oneObj.length && oneObj.checked))
		allObj.checked = true;
	else
		allObj.checked = false;
}

/*
 * 函数功能：点击"所有全选"时执行,执行所有全选动作
 *
 * Parameter allRecordObjText -- 所有全选框元素名称,没有为空;
 *           allObjText -- 全选框的表单元素的名称;
 *           oneObjText -- 全选框对应的单一多选框的名称;
 *
 * 例子： <input name="checkAll" type="checkbox" onClick="allRecordCheck('form1.checkAllRecord','form1.checkAll','form1.checkOne')">
 *
 */
function allRecordCheck(allRecordObjText,allObjText,oneObjText)
{
    var allRecordObj = eval(CONST_STRDOC + allRecordObjText);
    var allObj = eval(CONST_STRDOC + allObjText);
    var oneObj = eval(CONST_STRDOC + oneObjText);
    var j = 0;
    
    if (allObj.checked || (oneObj.length == null && oneObj.checked))
        j = 1;
    else
    {
        for (var i=0; i<oneObj.length; i++)
        {
            if (oneObj[i].checked)
            {
                j++;
                break;
            }
        }
    }
    
    if (j != 0)
    {
        if (confirm(ALL_AUTH))
        {
            allObj.checked = false;
            
            if (oneObj.length == null)
                oneObj.checked = false;
            else
            {
                for (var i=0; i<oneObj.length; i++)
                {
                    oneObj[i].checked = false;
                }
            }
        }
        else
            allRecordObj.checked = false;
            
    }
}
//**************************************
//***  处理全选,所有全选的函数结束
//**************************************

/* 
 * 函数功能：检查单选框、多选框是否选择,向用户发出提示
 * 
 * Parameter inputname -- 单选框、多选框的英文名
 *           msg -- 单选框、多选框的中文标识为用户提供提示信息
 *           allRecordName -- 如果有所有全选按钮,则填其名称,没有则用*
 *
 * 例：check_radio_checkbox('form1.radio','用户姓名','*');(无所有全选)
 *     check_radio_checkbox('form1.checkOne','用户姓名','checkAllRecord');(有所有全选)
 *
 * 例：check_radio_checkbox('form1.radio1|checkOne|checkOne1','用户姓名|用户年龄|用户地址','*|checkAllRecord|*');
 *
 */
function check_radio_checkbox(inputname,msg,allRecordName)
{
    var inputObj;
    
    if (inputname.indexOf("|") == -1)
    {
        if (allRecordName != "*")
        {
            inputObj = eval(CONST_STRDOC + inputname.split(DOT_MSG)[0] + DOT_MSG + allRecordName);
            
            if (inputObj.checked)
                return true;
        }
        
        inputObj = eval(CONST_STRDOC + inputname);
        
        if (!inputObj.length)
        {
            if (inputObj.checked == false)
            {
                alert(CHOICE_MSG + msg + EXCMARK_MSG);
                return false;
            }
            else
                return true;
        }
        else
        {
            for(var i = 0; i < inputObj.length; i++)
            {
                if (inputObj[i].checked == true)
                    return true;
            }
            
            alert(CHOICE_MSG + msg + EXCMARK_MSG);
            return false;
        }
    }
    
    var tmp = inputname.split(".");
    var objArr = tmp[1].split("|");
    var allRecordObjArr = allRecordName.split("|");
    var msgArr = msg.split("|");
    var errMsg = "";
    var returnFlag;
    
    for (var j = 0; j < objArr.length; j++)
    {
        if (allRecordObjArr[j] != "*")
        {
            inputObj = eval(CONST_STRDOC + tmp[0] + DOT_MSG + allRecordObjArr[j]);

            if (inputObj.checked)
                continue;
        }

        inputObj = eval(CONST_STRDOC + tmp[0] + DOT_MSG + objArr[j]);
        
        if (!inputObj.length)
        {
            if (inputObj.checked == false)
            {
                errMsg = CHOICE_MSG + msgArr[j] + EXCMARK_MSG;
                returnFlag = false;
            }
            else
                returnFlag = true;
        }
        else
        {
            returnFlag = false;
            
            for(var k = 0; k < inputObj.length; k++)
            {
                if (inputObj[k].checked == true)
                    returnFlag = true;
            }
            
            if (!returnFlag)
                errMsg = CHOICE_MSG + msgArr[j] + EXCMARK_MSG;
        }
        
        if (!returnFlag)
        {
            alert(errMsg);
            return returnFlag;
        }
    }
    
    return true;
}

//**************************************
//***  以下函数处理授权、复核、撤销页面，汇总金额的提示信息
//**************************************
/* 
 * 函数功能：取得分币种的提示信息的字符串
 * 
 * Parameter objName -- 多选框的名称
 *
 * 例：getCalculateMoneyStr(2,'form1.checkOne')
 *
 * 返回值(例)：本次共处理业务：6 笔,总金额：美元 10.00;人民币 170.00;日元 30;
 */
function getCalculateMoneyStr(objName)
{
    var moneyArr = new Array();
    
    var obj = eval(CONST_STRDOC + objName);

    if (!obj.length)
    {
        var valueArr = obj.value.split("|");
        
        moneyArr[0] = new Array(valueArr[1],valueArr[2]);
                             
        return ALL_COUNT + "1" + ALL_MONEY + getMoneyStr(moneyArr);
    }

    var j = 0;
    for (var i = 0; i < obj.length; i++)
    {
        if (obj[i].checked == true)
        {
            var tmpArr = obj[i].value.split("|");
            
            if (tmpArr[1] == "")
                tmpArr[1] = "001";
                
            moneyArr[j] = new Array(tmpArr[1],parseFloat(tmpArr[2]));
            j++;
        }
    }

    return ALL_COUNT + moneyArr.length + ALL_MONEY + getMoneyStr(moneyArr);
}
    
/* 
 * 函数功能：取得分币种的金额的字符串，供getCalculateMoneyStr调用
 * 
 * Parameter mArr -- 被选中的金额的数组
 */
function getMoneyStr(mArr)
{
    if (mArr.length == 1) {
        var n = typeof mArr[0][1] == "number" ? mArr[0][1] : parseFloat(mArr[0][1]);
        mArr[0][1] = Math.round(n * 1000) / 1000;
        return getCurCodeStr(mArr[0][0]) + SPACE_MSG + changePartition(mArr[0][1].toString(),mArr[0][0]);
    }
        
    var resArr = new Array();
    
	var resInt = 0;
	
	for(var i = 0; i < mArr.length; i++)
	{
		if (i == 0)
		{
			resArr[resInt] = new Array(mArr[i][0],mArr[i][1]);
			resInt++;
			continue;
		}

		for(var j = 0; j < resArr.length; j++)
		{
			if (resArr[j][0] == mArr[i][0])
			{
				resArr[j][1] += mArr[i][1];
				break;
			}
			else if (j == resArr.length - 1)
			{
				resArr[resInt] = new Array(mArr[i][0],mArr[i][1]);
				resInt++;
				j++;
			}
			else
				continue;
		}
	}
    
    var resStr = "";
    
    for(var k = 0; k < resArr.length; k++)
    {
        var n = typeof resArr[k][1] == "number" ? resArr[k][1] : parseFloat(resArr[k][1]);
        resArr[k][1] = Math.round(n * 1000) / 1000;
        resStr += ";" + getCurCodeStr(resArr[k][0]) + SPACE_MSG + changePartition(resArr[k][1].toString(),resArr[k][0]);
    }
    
	return resStr.substring(1);
}

/* 
 * 函数功能：根据币种编码，得到名称，001返回人民币，供getMoneyStr调用
 * 
 * Parameter curCde -- 币种编码
 */
function getCurCodeStr(curCde)
{
    for(var i = 0; i < curCodeArr.length; i++)
    {
        if (curCodeArr[i][0] == curCde)
            return curCodeArr[i][1];
    }
}
