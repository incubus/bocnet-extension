//**************************************
//***  以下函数是JS公用函数
//**************************************
var CONST_STRDOC="document.";

/*
 * 函数功能：删除左右两端的空格
 *
 */
String.prototype.trim = function()
{
  return this.replace(/(^\s*)|(\s*$)/g, "");
}

/*
 * 函数功能：跳转至其他页面
 *
 */
function gotoPage(url)
{
    location.href = url;
}

/*
 * 函数功能：跳转至其他页面,并传页面参数
 *
 * Parameter url -- 跳转的链接;
 *           paraName -- 要传的参数的参数名称;
 *           paraValue -- 要传的参数的参数值;
 *
 * 例：gotoPage('XXX.do','orderName','ActNo');
 *     gotoPage('XXX.do','orderName|orderName1|PageNum','ActNo|ibknum|3');
 *
 */
function gotoPageByPara(url,paraName,paraValue)
{
  var urlHavePara = false;

  if (url.indexOf("?") != -1)
    urlHavePara = true;

    if(paraName.indexOf("|") == -1)
      if (urlHavePara)
          location.href = url + "&" + paraName + "=" + paraValue ;
      else
        location.href = url + "?" + paraName + "=" + paraValue ;
    else
    {
        nameArr = paraName.split("|");
        paraArr = paraValue.split("|");

        var paraStr = "";

        for(var i = 0; i < nameArr.length; i++)
        {
            if (i == 0 && !urlHavePara)
                paraStr = "?" + nameArr[i] + "=" + paraArr[i];
            else
                paraStr += "&" + nameArr[i] + "=" + paraArr[i];
        }

        location.href = url + paraStr;
    }
}

/*
 * 函数功能：数据下载使用，使用topFrame下载
 *
 */
function dataDownload(url)
{
    parent.topFrame.location.href = url;
}

/*
 * 函数功能：数据下载使用，使用topFrame下载,并传页面参数
 *
 * Parameter url -- 跳转的链接;
 *           paraName -- 要传的参数的参数名称;
 *           paraValue -- 要传的参数的参数值;
 *
 * 例：dataDownloadByPara('XXX.do','orderName','ActNo');
 *     dataDownloadByPara('XXX.do','orderName|orderName1|PageNum','ActNo|ibknum|3');
 *
 */
function dataDownloadByPara(url,paraName,paraValue)
{
  var urlHavePara = false;

  if (url.indexOf("?") != -1)
    urlHavePara = true;

    if(paraName.indexOf("|") == -1)
      if (urlHavePara)
          parent.topFrame.location.href = url + "&" + paraName + "=" + paraValue ;
      else
        parent.topFrame.location.href = url + "?" + paraName + "=" + paraValue ;
    else
    {
        nameArr = paraName.split("|");
        paraArr = paraValue.split("|");

        var paraStr = "";

        for(var i = 0; i < nameArr.length; i++)
        {
            if (i == 0 && !urlHavePara)
                paraStr = "?" + nameArr[i] + "=" + paraArr[i];
            else
                paraStr += "&" + nameArr[i] + "=" + paraArr[i];
        }

        parent.topFrame.location.href = url + paraStr;
    }
}

/*
 * 函数功能：打印当前页面,并屏蔽打印按钮(如果存在ID为printDiv的DIV则屏蔽)
 *
 */
function printPage()
{
    var obj = eval(CONST_STRDOC + "all.printDiv")

    if (obj && obj.style)
    {
        obj.style.display = "none";
        window.print();
        obj.style.display = "";
    }
    else
        window.print();
}

/*
 * 函数功能：用某字符串替换指定字符串中的某字符串
 *
 * Parameter str -- 需处理的带有待替换字串的字符串;
 *           str_s -- 需查找的待替换的字符串;
 *           str_d -- 进行替换的字符串;
 *
 * Return 字符串 -- 替换后的字符串
 *
 * 例子：replace("壹仟零零叁","零零","零")
 *       返回字符串：壹仟零叁
 */
function replace(str,str_s,str_d)
{
    var pos=str.indexOf(str_s);

    if (pos==-1)
        return str;

    var twopart=str.split(str_s);
    var ret=twopart[0];

    for(pos=1;pos<twopart.length;pos++)
        ret=ret+str_d+twopart[pos];

    return ret;
}

/*
 * 函数功能：取得表单中radio的值
 *
 * Parameter str -- 表单中radio的名字;
 *
 * Return 字符串 -- radio的值
 *
 * 例子：getRadioValue('form1.radio')
 *
 */
function getRadioValue(str)
{
  var obj = eval(CONST_STRDOC + str);

  if (!obj)
    return;

  if (!obj.length)
    return obj.value;
  else
  {
    for(var i = 0; i < obj.length; i++)
    {
      if (obj[i].checked)
      {
        return obj[i].value;
      }

    }
  }
}

//**************************************
//***  JS公用函数结束
//**************************************

//**************************************/
//*******  进度条处理函数  begin  *******/
//**************************************/
/*
 * 函数功能：显示页面处理时的进度条，并控制当前页面的二次提交，在checkForm中调用。
 */

function pageProcessing()
{
//  try {
//    processForm();
//  } catch (e) {
//    //alert("error: " + e.description);
//  }
  var processObj = document.all.processDiv;
  var processBlockObj = document.all.processBlockDiv;

    processObj.style.width = document.documentElement.scrollWidth;
    processObj.style.height = document.documentElement.scrollHeight;
  processObj.style.display = "";

    processBlockObj.style.left = (document.documentElement.clientWidth - parseInt(processBlockObj.style.width)) / 2 + document.documentElement.scrollLeft;
    processBlockObj.style.top = (document.documentElement.clientHeight - parseInt(processBlockObj.style.height)) / 2 + document.documentElement.scrollTop;

    disableAllSelect();

    /** 10分钟后，进度条失效 */
    window.setTimeout("pageProcessingDone();",600000);
}

/** 为每个页面增加防篡改功能 added by fangxi  */
var processForm = (function () {
  if (typeof BocNet == undefined) {
  	//alert("BocNet not found........");
    return function() {};
  } else {
    //alert("BocNet defined...");
    var VAR1 = "_viewstate1", VAR2 = "_viewstate2";
    var f0 = function(m, key, value) { if (!m[key]) m[key] = []; m[key].push(value == null ? '' : String(value)); };
    var f1 = function(m, key, item) { f0(m, key, item.value); };
    var f2 = function(m, key, item) { if (item.checked) f0(m, key, item.value); };
    var f3 = function(m, key, item) { if (item.selectedIndex >= 0) $A(item.options).each(function(e) { if (e.selected) f0(m, key, e.value); }); };
    var ByType = { "text": f1, "password": f1, "hidden": f1, "radio": f2, "checkbox":f2, "select-one": f3, "select-multiple": f3 };
    var injector = function(m,item) { var key = String(item.name); if (!item.disabled && key && key != VAR1 && key != VAR2) { var f = ByType[item.type]; if (f) f(m, key, item); } return m; };
    return function() {
    	//alert("BocNet defined... " + $A(document.forms).length + " form(s) found...");
      $A(document.forms).each(function(theform) {
        var theform = $(theform), result = ["", ""];
        //alert("form: " + theform.name + " ... " + $A(theform.elements).length + " element(s) found...");
        $H($A(theform.elements).inject({}, injector)).each(function(pair) { if (result[0]) { result[0] += ","; result[1] += ","; } result[0] += pair.key; result[1] += pair.key + "=" + pair.value.join(""); });
        //alert(result[0] + "\r\n\r\n" + result[1]);
        var _viewstate1 = theform.getInputs("hidden", VAR1)[0]; if (!_viewstate1) _viewstate1 = BocNet.Form.createHidden(theform, VAR1);
        var _viewstate2 = theform.getInputs("hidden", VAR2)[0]; if (!_viewstate2) _viewstate2 = BocNet.Form.createHidden(theform, VAR2);
        _viewstate1.value = binl2b64(str2binl(result[0])); _viewstate2.value = b64_md5(result[1]);
      });
    }
  }
})();


/*
 * 函数功能：页面处理时的进度条显示完毕后调用，取消控制当前页面的二次提交。
 */
function pageProcessingDone()
{
  var processObj = document.all.processDiv;
  var processBlockObj = document.all.processBlockDiv;

    processObj.style.width = "0";
    processObj.style.height = "0";
  processObj.style.display = "none";

    processBlockObj.style.left = "0";
    processBlockObj.style.top = "0";

    enableAllSelect();
}

/*
 * 函数功能：disable当前页的所有下拉菜单
 */
function disableAllSelect()
{
    var obj = document.getElementsByTagName("SELECT");

  for(var i = 0; i < obj.length; i++)
  {
    obj[i].style.display = "none";
  }
}

/*
 * 函数功能：enable当前页的所有下拉菜单
 */
function enableAllSelect()
{
    var obj = document.getElementsByTagName("SELECT");

  for(var i = 0; i < obj.length; i++)
  {
    obj[i].style.display = "";
  }
}

//**************************************/
//*******  进度条处理函数  end    *******/
//**************************************/

//**************************************/
//*******  日期处理函数  begin    *******/
//**************************************/
/*
 * 函数功能：将日期数据转换为字符串
 *
 * Parameter datePara -- 日期型数据;
 *       splitReg -- 分隔符
 *
 * Return 按照分隔符分隔的日期字符串。
 *
 */
function date2string(datePara,splitReg)
{
    var lMonth = datePara.getMonth() + 1;
    lMonth = (lMonth < 10 ? "0" + lMonth : lMonth);

    var lDate = datePara.getDate();
    lDate = (lDate < 10 ? "0" + lDate : lDate);

    return datePara.getFullYear() + splitReg + lMonth + splitReg + lDate;
}

/*
 * 函数功能：得到日期的增减
 *
 * Parameter strInterval -- d:按天;m:按月;y:按年;
 *       dateStr -- 起始日期,date对象或者yyyy/MM/dd格式
 *       Number -- 日期增减的量,支持正负
 *
 * Return 按照分隔符分隔的日期字符串。
 *
 */
function addDate(strInterval, dateStr, numberPara)
{
    var dtTmp = new Date(Date.parse(dateStr));
    switch (strInterval)
    {
        case 'd' :
            return new Date(Date.parse(dtTmp) + (86400000 * numberPara));

        case 'm' :
            /** xulc modified:修改了BUG，1月31日往后一个月为2月28日，修改前为3月2日 */
            var oldY = dtTmp.getFullYear();
            /** 欲变更的月份 */
            var newMon = dtTmp.getMonth() + numberPara;

            /** 变更月份后，系统生成的DATE对象 */
            var newDate = new Date(dtTmp.getFullYear(), newMon, dtTmp.getDate());

            /** 取新的DATE对象中的年和月，按照JS的处理，此时1月31日往后为3月2日 */
            var tmpMon = newDate.getMonth();
            var tmpY = newDate.getFullYear();

            /** 如果不是大小月交替时的情况，即新的月和欲变更的月份应该相等 || 如果跨年，两个月份也不相等，而12月和1月均为大月 */
            if (tmpMon == newMon || oldY != tmpY)
                return newDate;

            /** 如果不能直接返回，则将错误的月份往前减天，直道找到上月的最后一天 */
            while(tmpMon != newMon)
            {
                newDate = new Date(newDate.getFullYear(), newDate.getMonth(), (newDate.getDate() - 1));
                tmpMon = newDate.getMonth();
            }

            return newDate;

        case 'y' :
            return new Date((dtTmp.getFullYear() + numberPara), dtTmp.getMonth(), dtTmp.getDate());
    }
}
//**************************************/
//*******  日期处理函数  end    *******/
//**************************************/

//**************************************/
//*******  代缴费处理函数  begin  *******/
//**************************************/
/*
 * 函数功能：循环检查表单中需检查的元素
 *
 * Parameter
 *
 * Return false -- 不符合要求格式
 *        true -- 符合要求格式
 *
 */
function paysCheck()
{
  for(var i = 0; i < document.forms.length; i++)
  {
      var obj = document.forms[i];

      for(var j = 0; j < obj.elements.length; j++)
      {
          if (obj.elements[j].check && obj.elements[j].check != "")
          {
              var checkArr = obj.elements[j].check.split(",");

              for(var k = 0; k < checkArr.length; k++)
              {
                  var tmpStr = checkArr[k] + "(\"" + document.forms[i].name + "." + obj.elements[j].name + "\",\"" + obj.elements[j].checkName + "\")";

                  if (eval(tmpStr))
                      continue;
                  else
                      return false;
              }
          }
      }
  }

  return true;
}
//**************************************/
//*******  代缴费处理函数  end    *******/
//**************************************/