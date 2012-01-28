//**************************************
//***  以下函数是页面限制函数
//**************************************
/** 
 * 页面限制开关
 *     true -- 开发模式，页面不做限制
 *     false -- 运营模式，页面限制
 */
var codingMode = false;

/*
 * 函数功能：屏蔽右键
 */
function click(e)
{
    /** 表示IE */
    if (document.all) 
    {
        if (event.button != 1)
        {
            oncontextmenu='return false';
        }
    }

    /** 表示NC */
    if (document.layers) 
    {
        if (e.which == 3) 
        {
            oncontextmenu='return false';
        }
    }
}

/*
 * 函数功能：当键盘键被按下时，屏蔽某些键和组合键
 */
function limitKey(e)
{
    /** 表示NC,注意：需测试 */
    if (document.layers) 
    {
        if (e.which == 17)
        {
            alert("操作错误.或许是您按错了按键!");  
        }
        /** 屏蔽 Alt(18)+ 方向键 →  Alt+ 方向键 ←  */
        if (e.which == 18 && (e.which==37 || e.which == 39))
        { 
            alert("不准你使用ALT+方向键前进或后退网页！"); 
            e.returnValue=false; 
        } 
     
        /** 屏蔽 F5(116) 刷新键Ctrl(17) + R(82) */
        if (e.which == 116 || (e.which == 17 && e.which==82))
        {
            e.which=0; 
            e.returnValue=false; 
        } 
  
        /** 屏蔽Tab(9) 屏蔽F11(122) 屏蔽 Ctrl+n(78) 屏蔽 shift(16)+F10(121) */
        if (e.which == 9 || e.which == 122 || (e.which == 17 && e.which==78) || (e.which == 16 && e.which==121))
        {
            e.which=0;
            e.returnValue=false;
        }
    }
    
    /** 表示IE */
    if (document.all)
    {
        /** 屏蔽 Alt+ 方向键 →  Alt+ 方向键 ←  */
        if (window.event.altKey && (window.event.keyCode==37 || window.event.keyCode == 39))
        { 
            alert("不准你使用ALT+方向键前进或后退网页！"); 
            event.returnValue=false; 
        } 
     
        /** 屏蔽 F5(116) 刷新键Ctrl + R(82) */
        if (window.event.keyCode == 116 || (window.event.ctrlKey && window.event.keyCode==82))
        {
            event.keyCode=0; 
            event.returnValue=false; 
        } 

        /** 屏蔽Enter(13) */
        if (window.event.keyCode==13 && typeof(openEnterFlag)=='undefined' )
        /** openEnterFlag是在JSP中打开Enter的开关。目前应用的就只有留言板页面 */
        /** 使用方法：在需要打开Enter的页面tiles:insert前定义变量openEnterFlag即可 */ 
        {
        	//alert("pagelimt 13");
            event.keyCode=0;
            event.returnValue=false;
        }

        /** 屏蔽F11(122) 屏蔽 Ctrl+n(78) 屏蔽 shift+F10(121) */
        if (window.event.keyCode == 122 || (window.event.ctrlKey && window.event.keyCode==78) || (window.event.shiftKey && window.event.keyCode==121))
        {
            event.keyCode=0;
            event.returnValue=false;
        }
        


        
       /** 屏蔽 Ctrl + A(65) Ctrl + C(67) Ctrl + X(86) Ctrl + V(88) */
        if (window.event.ctrlKey && (window.event.keyCode==65 || window.event.keyCode==67 || window.event.keyCode == 86 || window.event.keyCode == 88))
        {
        	event.keyCode=0;
            event.returnValue=false; 
        } 

        if (window.event.srcElement.tagName == "A" && window.event.shiftKey)  
            window.event.returnValue = false;             //屏蔽 shift 加鼠标左键新开一网页 
    }
}
if (!codingMode)
{
    if (document.layers) 
    {
        document.captureEvents(Event.MOUSEDOWN);
    }
    
    document.onmousedown=click;
    document.oncontextmenu = new Function("return false;");
    
    if (document.layers)
        document.captureEvents(Event.KEYDOWN);
    
    document.onkeydown=limitKey;

}
//**************************************
//***  页面限制函数结束
//**************************************
