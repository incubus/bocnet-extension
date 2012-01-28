//**************************************
//***  显示日历
//**************************************
var bMoveable=true;  //设置日历是否可以拖动

var strFrame;  //存放日历层的HTML代码
document.writeln('<iframe src="javascript:false" id=meizzDateLayer frameborder=0 style="position: absolute; width: 176px; height: 187px; z-index: 9998; display: none"></iframe>');
strFrame='<style>';
strFrame+='.calData { border:1px solid #a9a9a9; margin:0px; padding:0px; font-family:Verdana, Arial, Helvetica, sans-serif; }';
strFrame+='.calDay {font-decoration: none; font-family: arial; font-size: 12px; color: #000000;  background-color: #F8F8F8;}';
strFrame+='.calHeadZh{font-size: 12px; color:#A50031}';
strFrame+='.calHead{font-size: 9px; color:#A50031}';

strFrame+='</style>';
strFrame+='<scr' + 'ipt>';
strFrame+='var datelayerx,datelayery; /*存放日历控件的鼠标位置*/';
strFrame+='var bDrag; /*标记是否开始拖动*/';
strFrame+='function document.onmousemove() /*在鼠标移动事件中，如果开始拖动日历，则移动日历*/';
strFrame+='{if(bDrag && window.event.button==1)';
strFrame+=' {var DateLayer=parent.document.all.meizzDateLayer.style;';
strFrame+='  DateLayer.posLeft += window.event.clientX-datelayerx;/*由于每次移动以后鼠标位置都恢复为初始的位置，因此写法与div中不同*/';
strFrame+='  DateLayer.posTop += window.event.clientY-datelayery;}}';
strFrame+='function DragStart()  /*开始日历拖动*/';
strFrame+='{var DateLayer=parent.document.all.meizzDateLayer.style;';
strFrame+=' datelayerx=window.event.clientX;';
strFrame+=' datelayery=window.event.clientY;';
strFrame+=' bDrag=true;}';
strFrame+='function DragEnd(){  /*结束日历拖动*/';
strFrame+=' bDrag=false;}';
strFrame+='</scr' + 'ipt>';
strFrame+='<div style="z-index:9999;position: absolute; left:0; top:0;" onselectstart="return false"><span id=tmpSelectYearLayer style="z-index: 9999;position: absolute;top: 3; left: 19;display: none"></span>';
strFrame+='<span id=tmpSelectMonthLayer style="z-index: 9999;position: absolute;top: 3; left: 110;display: none"></span>';
strFrame+='<table border=1 class="calData" cellspacing=0 cellpadding=0 width=172 height=160 bordercolor=#cecece bgcolor=#ff9900>';
strFrame+='  <tr><td width=172 height=23 bgcolor=#FFFFFF><table border=0 cellspacing=1 cellpadding=0 width=172 height=23>';
strFrame+='      <tr align=center><td width=16 align=center bgcolor=#ffffff style="font-size:12px;cursor: hand;color: #A50031" ';
strFrame+='        onclick="parent.meizzPrevY()"><b><</b>';
strFrame+='        </td><td width=60 align=center style="font-size:12px;cursor:default"  ';
strFrame+='onmouseover="style.backgroundColor=\'#cecece\'" onmouseout="style.backgroundColor=\'white\'" ';
strFrame+='onclick="parent.tmpSelectYearInnerHTML(this.innerText.substring(0,4))"><span  id=meizzYearHead></span></td>';

strFrame+='        <td width=16 bgcolor=#ffffff align=center style="font-size:12px;cursor: hand;color: #A50031" ';
strFrame+='         onclick="parent.meizzNextY()"><b>></b></td>';

strFrame+='<td width=16 align=center bgcolor=#ffffff style="font-size:12px;cursor: hand;color: #A50031" onclick="parent.meizzPrevM()" title="向前翻 1 月" ><b><</b></td>';

strFrame+='<td width=48 align=center style="font-size:12px;cursor:default"  onmouseover="style.backgroundColor=\'#cecece\'" ';
strFrame+=' onmouseout="style.backgroundColor=\'white\'" onclick="parent.tmpSelectMonthInnerHTML(this.innerText)"';
strFrame+='        ><span id=meizzMonthHead ></span></td>';
strFrame+='        <td width=16 bgcolor=#ffffff align=center style="font-size:12px;cursor: hand;color: #A50031" ';
strFrame+='         onclick="parent.meizzNextM()"><b>></b></td></tr>';
strFrame+='    </table></td></tr>';
strFrame+='  <tr><td width=142 height=18>';
strFrame+='<table border=1 id="calHeadTable" cellspacing=0 cellpadding=0 bgcolor=#cecece ' + (bMoveable? 'onmousedown="DragStart()" onmouseup="DragEnd()"':'');
strFrame+=' BORDERCOLORLIGHT=#ffffff BORDERCOLORDARK=#ffffff width=172 height=20 style="cursor:' + (bMoveable ? 'move':'default') + '">';
strFrame+='<tr align=center valign=bottom><td>' + calDayArr[0] + '</td>';
strFrame+='<td>' + calDayArr[1] + '</td><td>' + calDayArr[2] + '</td>';
strFrame+='<td>' + calDayArr[3] + '</td><td>' + calDayArr[4] + '</td>';
strFrame+='<td>' + calDayArr[5] + '</td><td>' + calDayArr[6] + '</td></tr>';
strFrame+='</table></td></tr>';
strFrame+='  <tr><td width=142 height=120>';
strFrame+='    <table border=1 cellspacing=2 cellpadding=0 BORDERCOLORLIGHT=#ffffff BORDERCOLORDARK=#FFFFFF bgcolor=#ffffff width=172 height=120>';
var n=0; for (j=0;j<5;j++){ strFrame+= ' <tr align=center>'; for (i=0;i<7;i++){
strFrame+='<td width=20 height=20 id=meizzDay'+n+' class="calDay" onclick=parent.meizzDayClick(this.innerText,0)></td>';n++;}
strFrame+='</tr>';}
strFrame+='      <tr align=center>';
for (i=35;i<39;i++)strFrame+='<td width=20 height=20 id=meizzDay'+i+' class="calDay" onclick="parent.meizzDayClick(this.innerText,0)"></td>';
strFrame+='        <td colspan=3 align=right ><span onclick=parent.closeLayer() style="font-size:12px;cursor: hand;color: #A50031"';
strFrame+='         ><b>&#215;</b></span></td></tr>';
strFrame+='    </table></td></tr>';
strFrame+='</table></div>';

window.frames.meizzDateLayer.document.writeln(strFrame);
window.frames.meizzDateLayer.document.close();  //解决ie进度条不结束的问题

//==================================================== WEB 页面显示部分 ======================================================
var outObject;
var outButton;  //点击的按钮
var outDate="";  //存放对象的日期
var odatelayer=window.frames.meizzDateLayer.document.all;  //存放日历对象
var yearPeriod = 12;
function showCalendar()
{
	switch (arguments.length)
	{
		/** 如果参数个数为2,调用相应函数处理 */
		case 2:
			showCalendarDeal(arguments[0],arguments[1]);
			break;
		/** 如果参数个数为4,调用相应函数处理 */
		case 3:
			yearPeriod = arguments[2];
			showCalendarDeal(arguments[0],arguments[1]);
			break;
		default:
			showCalendarDeal(arguments[0],arguments[1]);
			break;
	}
}

function showCalendarDeal(tt,obj) //主调函数
{
 if (arguments.length >  2){alert("对不起!传入本控件的参数太多!");return;}
 if (arguments.length == 0){alert("对不起!您没有传回本控件任何参数!");return;}

 if (calLanguage == "zhCN")
    odatelayer.calHeadTable.className = "calHeadZh";
 else
    odatelayer.calHeadTable.className = "calHead";

 var dads  = document.all.meizzDateLayer.style;
 var th = tt;
 var ttop  = tt.offsetTop;     //TT控件的定位点高
 var thei  = tt.clientHeight;  //TT控件本身的高
 var tleft = tt.offsetLeft;    //TT控件的定位点宽
 var ttyp  = tt.type;          //TT控件的类型
 while (tt = tt.offsetParent){ttop+=tt.offsetTop; tleft+=tt.offsetLeft;}
 dads.top  = (ttyp=="image")? ttop+thei : ttop+thei+6;
 dads.left = tleft;
 outObject = (arguments.length == 1) ? th : obj;
 outButton = (arguments.length == 1) ? null : th; //设定外部点击的按钮
 //根据当前输入框的日期显示日历的年月
 var reg = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/; 
 var r = outObject.value.match(reg); 
	if(r!=null)
	{
		r[2]=r[2]-1; 
		var d= new Date(r[1], r[2],r[3]);
  
		if(d.getFullYear()==r[1] && d.getMonth()==r[2] && d.getDate()==r[3])
		{
			outDate = d;  //保存外部传入的日期
			meizzSetDay(r[1],r[2]+1);
		}
		else
		{
			outDate = "";
			meizzSetDay(new Date().getFullYear(), new Date().getMonth() + 1);
		}
	}
	else 
	{
		outDate="";
		meizzSetDay(new Date().getFullYear(), new Date().getMonth() + 1);
	}
 dads.display = '';

 event.returnValue=false;
}

var MonHead = new Array(12);         //定义阳历中每个月的最大天数
    MonHead[0] = 31; MonHead[1] = 28; MonHead[2] = 31; MonHead[3] = 30; MonHead[4]  = 31; MonHead[5]  = 30;
    MonHead[6] = 31; MonHead[7] = 31; MonHead[8] = 30; MonHead[9] = 31; MonHead[10] = 30; MonHead[11] = 31;

var meizzTheYear=new Date().getFullYear(); //定义年的变量的初始值
var meizzTheMonth=new Date().getMonth()+1; //定义月的变量的初始值
var meizzWDay=new Array(39);               //定义写日期的数组

function document.onclick() //任意点击时关闭该控件 //ie6的情况可以由下面的切换焦点处理代替
{ 
  with(window.event)
  {
     if (srcElement.getAttribute("Author")==null && srcElement != outObject && srcElement != outButton)
    closeLayer();
  }
}

function document.onkeyup()  //按Esc键关闭，切换焦点关闭
  {
    if (window.event.keyCode==27){
  if(outObject)outObject.blur();
  closeLayer();
 }
 else if(document.activeElement)
  if(document.activeElement.getAttribute("Author")==null && document.activeElement != outObject && document.activeElement != outButton)
  {
   closeLayer();
  }
  }

function meizzWriteHead(yy,mm)  //往 head 中写入当前的年与月
  {
 odatelayer.meizzYearHead.innerText  = yy + calYear;
 
    odatelayer.meizzMonthHead.innerText = calMonthArr[mm - 1];
  }

function tmpSelectYearInnerHTML(strYear) //年份的下拉框
{
  if (strYear.match(/\D/)!=null) return;//{alert("年份输入参数不是数字!");return;}
  var m = (strYear) ? strYear : new Date().getFullYear();
//  var m = new Date().getFullYear();
  if (m < 1000 || m > 9999) return;//{alert("年份值不在 1000 到 9999 之间!");return;}
  //xulc modify
  var n = m - yearPeriod/2;
  if (n < 1000) n = 1000;
  if (n + 10 > 9999) n = 9974;
  var s = "<select  name=tmpSelectYear style='font-size: 12px' "
     s += "onblur='document.all.tmpSelectYearLayer.style.display=\"none\"' "
     s += "onchange='document.all.tmpSelectYearLayer.style.display=\"none\";"
     s += "parent.meizzTheYear = this.value; parent.meizzSetDay(parent.meizzTheYear,parent.meizzTheMonth)'>\r\n";
  var selectInnerHTML = s;
  for (var i = n; i < n + yearPeriod; i++)
  {
    if (i == m)
       {selectInnerHTML += "<option value='" + i + "' selected>" + i + "</option>\r\n";}
    else {selectInnerHTML += "<option value='" + i + "'>" + i + "</option>\r\n";}
  }
  selectInnerHTML += "</select>";
  odatelayer.tmpSelectYearLayer.style.display="";
  odatelayer.tmpSelectYearLayer.innerHTML = selectInnerHTML;
  odatelayer.tmpSelectYear.focus();
}

function tmpSelectMonthInnerHTML(strMonth) //月份的下拉框
{
    for(var i = 0; i < calMonthArr.length; i++)
    {
        if (calMonthArr[i] == strMonth)
        {
            strMonth = String(i + 1);
            break;
        }
    }

  if (strMonth.match(/\D/)!=null) return;//{alert("月份输入参数不是数字!");return;}

  var m = (strMonth) ? strMonth : new Date().getMonth() + 1;
  var s = "<select  name=tmpSelectMonth style='font-size: 12px' "
     s += "onblur='document.all.tmpSelectMonthLayer.style.display=\"none\"' "
     s += "onchange='document.all.tmpSelectMonthLayer.style.display=\"none\";"
     s += "parent.meizzTheMonth = this.value; parent.meizzSetDay(parent.meizzTheYear,parent.meizzTheMonth)'>\r\n";
  var selectInnerHTML = s;
  for (var i = 1; i < 13; i++)
  {
    if (i == m)
       {selectInnerHTML += "<option value='"+i+"' selected>"+calMonthArr[i-1]+"</option>\r\n";}
    else {selectInnerHTML += "<option value='"+i+"'>"+calMonthArr[i-1]+"</option>\r\n";}
  }
  selectInnerHTML += "</select>";
  odatelayer.tmpSelectMonthLayer.style.display="";
  odatelayer.tmpSelectMonthLayer.innerHTML = selectInnerHTML;
  odatelayer.tmpSelectMonth.focus();
}

function closeLayer()               //这个层的关闭
  {
    document.all.meizzDateLayer.style.display="none";
  }


function IsPinYear(year)            //判断是否闰平年
  {
    if (0==year%4&&((year%100!=0)||(year%400==0))) return true;else return false;
  }

function GetMonthCount(year,month)  //闰年二月为29天
  {
    var c=MonHead[month-1];if((month==2)&&IsPinYear(year)) c++;return c;
  }
function GetDOW(day,month,year)     //求某天的星期几
  {
    var dt=new Date(year,month-1,day).getDay()/7; return dt;
  }

function meizzPrevY()  //往前翻 Year
  {
    if(meizzTheYear > 999 && meizzTheYear <10000){meizzTheYear--;}
    else return;//{alert("年份超出范围（1000-9999）!");}
    meizzSetDay(meizzTheYear,meizzTheMonth);
  }
function meizzNextY()  //往后翻 Year
  {
    if(meizzTheYear > 999 && meizzTheYear <10000){meizzTheYear++;}
    else return;//{alert("年份超出范围（1000-9999）!");}
    meizzSetDay(meizzTheYear,meizzTheMonth);
  }
function meizzToday()  //Today Button
  {
 var today;
    meizzTheYear = new Date().getFullYear();
    meizzTheMonth = new Date().getMonth()+1;
    today=new Date().getDate();
    //meizzSetDay(meizzTheYear,meizzTheMonth);
    if(outObject){
  outObject.value=meizzTheYear + "-" + meizzTheMonth + "-" + today;
    }
    closeLayer();
  }
function meizzPrevM()  //往前翻月份
  {
    if(meizzTheMonth>1){meizzTheMonth--}else{meizzTheYear--;meizzTheMonth=12;}
    meizzSetDay(meizzTheYear,meizzTheMonth);
  }
function meizzNextM()  //往后翻月份
  {
    if(meizzTheMonth==12){meizzTheYear++;meizzTheMonth=1}else{meizzTheMonth++}
    meizzSetDay(meizzTheYear,meizzTheMonth);
  }

function meizzSetDay(yy,mm)   //主要的写程序**********
{
  meizzWriteHead(yy,mm);
  //设置当前年月的公共变量为传入值
  meizzTheYear=yy;
  meizzTheMonth=mm;
  
  for (var i = 0; i < 39; i++){meizzWDay[i]=""};  //将显示框的内容全部清空
  var day1 = 1,day2=1,firstday = new Date(yy,mm-1,1).getDay();  //某月第一天的星期几
  for (i=0;i<firstday;i++)meizzWDay[i]=GetMonthCount(mm==1?yy-1:yy,mm==1?12:mm-1)-firstday+i+1 //上个月的最后几天
  for (i = firstday; day1 < GetMonthCount(yy,mm)+1; i++){meizzWDay[i]=day1;day1++;}
  for (i=firstday+GetMonthCount(yy,mm);i<39;i++){meizzWDay[i]=day2;day2++}
  for (i = 0; i < 39; i++)
  { var da = eval("odatelayer.meizzDay"+i)     //书写新的一个月的日期星期排列
    if (meizzWDay[i]!="")
      { 
  //初始化边框
  da.borderColorLight="#ffffff";
  da.borderColorDark="#FFFFFF";
  if(i<firstday)  //上个月的部分
  {
   da.innerHTML="<b><font color=gray>" + meizzWDay[i] + "</font></b>";
   da.title=(mm==1?12:mm-1) +" / " + meizzWDay[i];
   da.onclick=Function("meizzDayClick(this.innerText,-1)");
   if(!outDate)
    da.style.backgroundColor = ((mm==1?yy-1:yy) == new Date().getFullYear() && 
     (mm==1?12:mm-1) == new Date().getMonth()+1 && meizzWDay[i] == new Date().getDate()) ?
             "#A50031":"#efefef";//上月部分的背景色
   else
   {
    da.style.backgroundColor =((mm==1?yy-1:yy)==outDate.getFullYear() && (mm==1?12:mm-1)== outDate.getMonth() + 1 && 
    meizzWDay[i]==outDate.getDate())? "#ffffff" :
    (((mm==1?yy-1:yy) == new Date().getFullYear() && (mm==1?12:mm-1) == new Date().getMonth()+1 && 
    meizzWDay[i] == new Date().getDate()) ? "#A50031":"#ffffff");//选中上月本周日期框和颜色背景
    //将选中的日期显示为凹下去
    if((mm==1?yy-1:yy)==outDate.getFullYear() && (mm==1?12:mm-1)== outDate.getMonth() + 1 && 
    meizzWDay[i]==outDate.getDate())
    {
     da.borderColorLight="#FFFFFF";
     da.borderColorDark="#FF9900";
    }
   }
  }
  else if (i>=firstday+GetMonthCount(yy,mm))  //下个月的部分
  {
   da.innerHTML="<b><font color=gray>" + meizzWDay[i] + "</font></b>";
   da.title=(mm==12?1:mm+1) +" / " + meizzWDay[i];
   da.onclick=Function("meizzDayClick(this.innerText,1)");
   if(!outDate)
    da.style.backgroundColor = ((mm==12?yy+1:yy) == new Date().getFullYear() && 
     (mm==12?1:mm+1) == new Date().getMonth()+1 && meizzWDay[i] == new Date().getDate()) ?
             "#A50031":"#efefef";//下月部分的背景色
   else
   {
    da.style.backgroundColor =((mm==12?yy+1:yy)==outDate.getFullYear() && (mm==12?1:mm+1)== outDate.getMonth() + 1 && 
    meizzWDay[i]==outDate.getDate())? "#ffffff" :
    (((mm==12?yy+1:yy) == new Date().getFullYear() && (mm==12?1:mm+1) == new Date().getMonth()+1 && 
    meizzWDay[i] == new Date().getDate()) ? "#A50031":"#ffffff");
    //将选中的日期显示为凹下去
    if((mm==12?yy+1:yy)==outDate.getFullYear() && (mm==12?1:mm+1)== outDate.getMonth() + 1 && 
    meizzWDay[i]==outDate.getDate())
    {
     da.borderColorLight="#FFFFFF";
     da.borderColorDark="#A50031";
    }
   }
  }
  else  //本月的部分
  {
   da.innerHTML="<b>" + meizzWDay[i] + "</b>";
   da.title=mm + " / " + meizzWDay[i];
   da.onclick=Function("meizzDayClick(this.innerText,0)");  //给td赋予onclick事件的处理
   //如果是当前选择的日期，则显示亮蓝色的背景；如果是当前日期，则显示暗黄色背景
   if(!outDate)
   {
        if (yy == new Date().getFullYear() && mm == new Date().getMonth()+1 && meizzWDay[i] == new Date().getDate())
        {
            da.style.backgroundColor = "#A10333";
            da.style.color = "#ffffff";
        }
        else
        {
            da.style.color = "#000000";
            da.style.backgroundColor = "#ffffff";
        }
   }
   else
   {
        if (yy==outDate.getFullYear() && mm== outDate.getMonth() + 1 && meizzWDay[i]==outDate.getDate())
        {
            da.style.backgroundColor = "#A10333";
            da.style.color = "#ffffff";
        }
        else
        {
            da.style.color = "#000000";
            da.style.backgroundColor = "#ffffff";
        }

    //将选中的日期显示为凹下去
    if(yy==outDate.getFullYear() && mm== outDate.getMonth() + 1 && meizzWDay[i]==outDate.getDate())
    {
     da.borderColorLight="#ffffff";
     da.borderColorDark="#A50031";
    }
   }
  }
        da.style.cursor="hand"
      }
    else{da.innerHTML="";da.style.backgroundColor="";da.style.cursor="default"}
  }
}

function meizzDayClick(n,ex)  //点击显示框选取日期，主输入函数*************
{
  var yy=meizzTheYear;
  var mm = parseInt(meizzTheMonth)+ex; //ex表示偏移量，用于选择上个月份和下个月份的日期
 //判断月份，并进行对应的处理
 if(mm<1){
  yy--;
  mm=12+mm;
 }
 else if(mm>12){
  yy++;
  mm=mm-12;
 }
 
  if (mm < 10){mm = "0" + mm;}
  if (outObject)
  {
    if (!n) {//outObject.value=""; 
      return;}
    if ( n < 10){n = "0" + n;}
    outObject.value= yy + "/" + mm + "/" + n ; //注：在这里你可以输出改成你想要的格式
    closeLayer(); 
  }
  else {closeLayer();}// alert("您所要输出的控件对象并不存在!");}
}

//**************************************
//***  显示日历结束
//**************************************
