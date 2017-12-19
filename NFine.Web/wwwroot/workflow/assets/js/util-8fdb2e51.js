var Util={};!function(){document.ondragstart=function(){return!1},$.ajaxSetup({cache:!1}),$("[title],[original-title]").live("mouseover",function(){if($(this).attr("disableTitle"))return!1;var a=$(this);if(a.attr("title")&&(a.attr("original-title",a.attr("title")),a.removeAttr("title")),a.attr("original-title")){var b=a.attr("original-title"),c=$("#hover_tip");0==c.length&&(c=$("<div id='hover_tip'><div class='tip_arrow'></div><div class='tip_content radius3'></div></div>").appendTo("body")),$(".tip_content").html(b),$("#hover_tip").show(),$(".tip_arrow").removeClass("tip_right").removeClass("tip_top").css("top",""),"right"==a.attr("title_pos")?(c.css({left:a.offset().left+a.outerWidth()+7,top:a.offset().top+a.outerHeight()/2-c.outerHeight()/2}),$(".tip_arrow").attr("class","tip_arrow tip_right").css("top",c.outerHeight()/2-7)):"top"==a.attr("title_pos")?(c.css({left:a.offset().left+a.outerWidth()/2-c.outerWidth()/2,top:a.offset().top-c.outerHeight()}),$(".tip_arrow").attr("class","tip_arrow tip_top")):"left"==a.attr("title_pos")?(c.css({left:a.offset().left-c.outerWidth()-7,top:a.offset().top+a.outerHeight()/2-c.outerHeight()/2}),$(".tip_arrow").attr("class","tip_arrow tip_left")):(c.css({left:a.offset().left+a.outerWidth()/2-c.outerWidth()/2,top:a.offset().top+a.outerHeight()}),$(".tip_arrow").attr("class","tip_arrow"))}}).live("mouseout",function(){$("#hover_tip").hide()}),$.simpleAlert=function(a,b,c){if("close"==a)return void $("#simplealert").remove();$("#simplealert").length&&$("#simplealert").remove();var d="simplealert-icon-info";b&&(d="simplealert-icon-"+b);var e=$("<div id='simplealert' class='simplealert'></div>").appendTo("body"),f="<div class='"+d+"'>";"loading"==b&&(f+="<img src='/images/default/designer/loading.gif' style='margin:10px 0px 0px 12px'/>"),f+="</div><div class='simplealert-msg'>"+a+"</div><div class='simplealert-right'></div>",e.html(f),e.css("top",($(window).height()-e.height())/2+$(window).scrollTop()+"px"),e.css("left",($(window).width()-e.width())/2+$(window).scrollLeft()+"px"),e.show(),"no"!=c&&setTimeout(function(){e.fadeOut(200)},c?c:3500)},$.fn.disable=function(a,b){$(this).attr("disable",!0),$(this).addClass("opacity disable");for(var c=0;c<$(this).length;c++){var d=$(this)[c];$(d).unbind("mouseover.disable").bind("mouseover.disable",function(){var c=$("<div class='disabled-mask'></div>").appendTo("body");a||(a=2),c.css({width:$(d).outerWidth()+a,height:$(d).outerHeight()+4,top:$(d).offset().top,left:$(d).offset().left,"z-index":9999}),b&&c.css("z-index",b),c.on("mouseout",function(){$(this).remove()}).on("mouseup",function(a){a.stopPropagation()})})}return this},$.fn.enable=function(){$(this).attr("disable",!1),$(this).removeClass("opacity disable");for(var a=0;a<$(this).length;a++){var b=$(this)[a];$(b).unbind("mouseover.disable").unbind("focus")}return this},Util.loginWindow=function(a,b){if("undefined"==typeof a&&(a="open"),"open"==a){$("#loginWindow").length&&$("#loginWindow").remove();var c=$("<div id='loginWindow' style='margin-top:-120px;margin-left:-50px;' class='loginWindow'></div>").appendTo("body");c.append("<div id='loginWindow-content' class='loginWindow-content'><img src='/images/ajaxload.gif' style='margin:80px 0px 0px 45%'/></div>"),$("#loginWindow-content").load("/login/window",function(){loginCallback=b}),c.dialog()}else(a="close")&&$("#loginWindow").dialog("close")},Util.payWindow=function(a,b,c){if("undefined"==typeof a&&(a="open"),"open"==a){$("#payWindow").length&&$("#payWindow").remove();var d=$("<div id='payWindow' style='margin-top:-120px;margin-left:-50px;' class='payWindow'></div>").appendTo("body");d.append("<div id='payWindow-content' class='loginWindow-content'><img src='/images/ajaxload.gif' style='margin:80px 0px 0px 45%'/></div>"),$("#payWindow-content").load("/order/pay/window",b,function(){payCallback=c}),d.dialog()}else(a="close")&&$("#payWindow").dialog("close")},Util.setCookie=function(a,b,c){var d=new Date;d.setDate(d.getDate()+c),document.cookie=a+"="+escape(b)+(null==c?"":";expires="+d.toGMTString())},Util.getCookies=function(a){if(document.cookie.length>0){var b=document.cookie.indexOf(a+"=");if(b!=-1){b=b+a.length+1;var c=document.cookie.indexOf(";",b);return c==-1&&(c=document.cookie.length),unescape(document.cookie.substring(b,c))}}return""};var maskStackCount=0;$.mask=function(a){if("undefined"==typeof a&&(a="open"),"open"==a){if(0==maskStackCount){var b=$("<div id='window-mask' class='window-mask' style='display:none'></div>").appendTo("body");b.css({width:$(window).width()+"px",height:$(window).height()+"px",filter:"alpha(opacity=60)"}).show(),$(window).bind("resize.mask",function(){b.css({width:$(window).width()+"px",height:$(window).height()+"px"})})}maskStackCount++}else"close"==a&&(maskStackCount--,0==maskStackCount&&($("#window-mask").remove(),$(window).unbind("resize.mask")))},$.fn.dialog=function(a){var b=$(this);if("string"==typeof a)"close"==a&&(b.find(".dialog-close").trigger("click"),null!=$("#window-mask")&&$("#window-mask").hide());else{var c={fixed:!0,closable:!0,mask:!0};a=$.extend(c,a),a||(a={});var d="";a.title?d=a.title:b.attr("title")&&(d=b.attr("title"),b.attr("title","")),b.addClass("dialog-box").show();var e=$("<div class='dialog-close'></div>").appendTo(b);e.bind("click",function(){if(!a.onClose||0!=a.onClose()){$.mask("close"),b.hide(),b.removeClass("dialog-box").find(".dialog-close").remove();var c=b.find(".dialog-title");b.attr("title",c.text()),c.remove(),$(window).unbind("resize.dialog")}}),b.find(".close").on("click",function(){e.click()}),a.closable&&e.show(),""!=d&&b.prepend("<h2 class='dialog-title'>"+d+"</h2>"),a.mask&&$.mask(),$(window).bind("resize.dialog",function(){var c=b.outerWidth(),d=b.outerHeight(),e=0;a.fixed?(b.css("position","fixed"),e=($(window).height()-d)/2+"px"):(b.css("position","absolute"),e=($(window).height()-d)/2+$(document).scrollTop()+"px");var f=($(window).width()-c)/2+"px";b.css({top:e,left:f})}),$(window).trigger("resize.dialog"),b.find(".dialog-title").draggable({target:b})}return b},$.fn.draggable=function(a){var b={target:"default",clone:!1,undrag:"",scroll:!0,start:function(){},drag:function(){},end:function(){}},c=$.extend(b,a);return $(this).off("mousedown.drag").on("mousedown.drag",function(a){$(document).on("selectstart.drag dragstart",function(){return!1});var b=$(this),d="string"==typeof c.target&&"default"==c.target?b:c.target,e=a.pageX,f=a.pageY,g=d.offset().left,h=d.offset().top;c.clone&&(d=b.clone().removeAttr("id").css("position","absolute").offset({left:g,top:h}),"function"==typeof c.clone&&(c.clone.call(d,a),g=1*d.css("left").replace("px",""),h=1*d.css("top").replace("px","")),c.opacity&&d.css("opacity",c.opacity)),$(document).on("mousemove.drag",function(a){b.hasClass("ondrag")||(b.addClass("ondrag"),c.clone&&d.appendTo(b.parent()),c.start.call(b[0],a));var i=a.pageX-e+g,j=a.pageY-f+h;if(c.bounding){var k=c.bounding.offset().left,l=c.bounding.offset().top;i>k&&j>l&&i<k+c.bounding.outerWidth()-d.outerWidth()&&j<l+c.bounding.outerHeight()-d.outerHeight()&&d.offset({left:i,top:j})}else d.offset({left:i,top:j});c.drag.call(b[0],a)}),$(document).on("mouseup.drag",function(a){c.end.call(b[0],a),c.clone&&d.remove(),$(document).off("selectstart.drag dragstart"),$(document).off("mousemove.drag"),$(document).off("mouseup.drag"),$(".drop-hover").length||b.removeClass("ondrag")}),$(this).on("mouseup.drag",function(a){$(document).trigger("mouseup.drag"),$(this).off("mouseup.drag")})}),c.undrag&&$(this).find(c.undrag).off("mousemove.drag").on("mousemove.drag",function(a){a.stopPropagation()}).on("dragstart",function(){return!1}),this},$.confirm=function(a){var b=$("#global_confirm_window"),c="确定";a.okval&&(c=a.okval),b.length?(b.find(".dlg-content").html(a.content),b.find(".okbtn").html(c)):b=$("<div id='global_confirm_window' tabindex='-1' class='confirm-box' title='请确认'><div class='dlg-content'>"+a.content+"</div><div class='dlg-buttons'><span class='pro-btn default okbtn'>"+c+"</span>&nbsp;&nbsp;<span class='pro-btn cancelbtn close'>取消</span></div></div>").appendTo("body"),a.width&&b.css("width",a.width),a.height&&b.css("height",a.height),b.dialog(),$(document).off("keyup.confirm").on("keyup.confirm",function(a){13==a.keyCode&&b.find(".okbtn").trigger("click")}),b.find(".okbtn").off().on("click",function(){b.dialog("close"),a.onConfirm&&a.onConfirm()}),b.find(".cancelbtn").off("click.cancel").on("click.cancel",function(){a.onCancel&&a.onCancel()})},$.fn.popMenu=function(a){var b=$(this);if("string"==typeof a)return void("close"==a&&(b.hide().removeClass("popover"),$(window).unbind("resize.popmenu")));var c={position:"left",fixed:!1,offsetX:0,offsetY:0,zindex:2,autoClose:!0,closeAfterClick:!1,autoPosition:!0},d=$.extend(c,a),e=$(d.target);b.addClass("popover").css("z-index",d.zindex),d.fixed&&b.css("position","fixed"),d.autoClose&&(0==d.closeAfterClick&&b.unbind("mouseup.popmenu").bind("mouseup.popmenu",function(a){a.stopPropagation()}),$(document).bind("mouseup.popmenu",function(){b.popMenu("close"),$(document).unbind("mouseup.popmenu"),d.onClose&&d.onClose()})),$(window).bind("resize.popmenu",function(){b.popMenu(a)}),b.show();var f=0;f="center"==d.position?e.offset().left+e.outerWidth()/2-b.outerWidth()/2:"right"==d.position?e.offset().left+e.outerWidth()-b.outerWidth():e.offset().left,f+b.outerWidth()>$(window).width()&&(f=$(window).width()-b.outerWidth());var g=e.offset().top+e.outerHeight();d.autoPosition&&g+d.offsetY+b.outerHeight()>$(window).height()+$(document).scrollTop()?b.css({top:$(window).height()-b.outerHeight()+$(document).scrollTop(),left:f+d.offsetX}):b.css({top:g+d.offsetY,left:f+d.offsetX})},$.fn.suggest=function(a){var b=$(this),c={valueField:"value",offsetX:0,offsetY:0,width:b.outerWidth(),format:function(a){return a.text}},d=$.extend(c,a),e=$(".suggest-menu");e.length<1&&(e=$("<ul class='suggest-menu'></ul>").appendTo("body")),e.width(d.width);var f=-1,g="";b.off("keydown.suggest").on("keydown.suggest",function(a){if(40==a.keyCode)a.preventDefault(),f<e.children().length-1&&(f++,e.find(".active").removeClass("active"),e.find("li[index="+f+"]").addClass("active"));else if(38==a.keyCode)a.preventDefault(),e.find(".active").removeClass("active"),f>=0&&(f--,e.find("li[index="+f+"]").addClass("active"));else if(13==a.keyCode){var c=e.find(".active");c.length&&b.val(c.attr("val")),d.onEnter&&d.onEnter(b),e.hide(),value=""}}).off("keyup.suggest").on("keyup.suggest",function(a){var c=b.val();""==c?e.hide():c!=g&&(f=-1,$.get(d.url,{q:c},function(a){e.empty();var f=a.items;if(0==f.length)e.hide(),c="";else{for(var h=0;h<f.length;h++){var i=f[h],j="<li index='"+h+"' class='suggest-item' val='"+i[d.valueField]+"'>";j+=d.format(i),j+="</li>",e.append(j)}e.show(),e.attr("tabindex",0);var k=0;k="center"==d.position?b.offset().left+b.outerWidth()/2-e.outerWidth()/2:"right"==d.position?b.offset().left+b.outerWidth()-e.outerWidth():b.offset().left,k+e.outerWidth()>$(window).width()&&(k=$(window).width()-e.outerWidth());var l=b.offset().top+b.outerHeight();d.autoPosition&&l+d.offsetY+e.outerHeight()>$(window).height()+$(document).scrollTop()?e.css({top:$(window).height()-e.outerHeight()+$(document).scrollTop(),left:k+d.offsetX}):e.css({top:l+d.offsetY,left:k+d.offsetX}),e.find(".suggest-item").off("mousedown").on("mousedown",function(a){a.preventDefault(),b.val($(this).attr("val")),d.onEnter&&d.onEnter(b),e.hide(),g=c=""})}})),g=c}).off("blur.suggest").on("blur.suggest",function(a){e.hide(),g=""})},$.fn.pagination=function(a,b,c,d){if(!(b<=1)){var e=5;d&&(e=d);var f=$(this).addClass("pagination"),g=1,h=b;if(b>e){var i=Math.floor(e/2),g=a-i>0?a-i:1;b-g<e&&(g=b-e+1);var h=g+e-1}var j="";j+=a>1?"<a p='"+(a-1)+"'>«</a>":"<a class='disabled'>«</a>",g>=2&&(j+="<a p='1'>1</a>"),g>=3&&(j+="<a class='disabled ellipsis'>...</a>");for(var k=g;k<=h&&!(k>b);k++)j+=k==a?'<a class="disabled">'+k+"</a>":"<a p='"+k+"'>"+k+"</a>";h<=b-2?j+="<a class='disabled ellipsis'>...</a><a p='"+b+"'>"+b+"</a>":h<=b-1&&(j+="<a p='"+b+"'>"+b+"</a>"),j+=a<b?"<a p='"+(a+1)+"'>»</a>":"<a class='disabled'>»</a>",f.html(j),c&&f.find("a[p]").bind("click",function(){var a=$(this).attr("p");c(a)})}},$.fn.multiInput=function(a,b,c){function d(a,b){var c=e.find(".multi-input-vals"),d="&#xe63e;",f=/^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/.test(b);if(f&&null==a)d="&#xe614;",a=b;else if(!f&&null==a)return;var g='<span val="'+a+'" class="multi-input-value"><span class="icons">'+d+'</span><span class="multi-text">'+b+'</span><span class="icons closeme">&#xe637;</span></span>';c.append(g)}var e=$(this);if("string"==typeof a&&"setVal"==a)return void d(b,c);a=$.extend({text:"请在此输入邮箱，回车添加",autoComplete:!1,url:"",params:{}},a),e.html("");var f=$('<div class="multi-input-vals"></div>'),g=$('<div><input type="text" id="multi-input" placeholder="'+a.text+'"></div>');e.append(f).append(g),g.find("input").off().on("keyup",function(b){var c=$.trim($(this).val());if(""!=c)if(13==b.keyCode&&a.setVal){var e=/^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/.test(c);if(!e)return;var f=a.setVal(c);d(null,f),$(this).val("")}else a.autoComplete&&(a.params=$.extend(a.params,{value:c}),$.ajax({url:a.url,cache:!1,data:a.params,success:function(b){var c=a.autoCompleteCallback(b);if($(".popWindow").remove(),""!=c){var d=$("<div class='popWindow'></div>").appendTo("body");d.html(c),d.popWindow({target:"#multi-input"})}}}))}),$(document).on("click",".multi-input-vals .closeme",function(){var b=$(this),c=b.prev().text();null!=c&&a.deleteVal&&(b.parent().remove(),a.deleteVal(c))})},$.fn.popWindow=function(a){var b=$(this),c=$(a.target);b.css({left:c.offset().left,top:c.offset().top+c.height()+(a.mh||0),zIndex:a.index||1}).show(),b.on("click.popwindow",function(a){a.stopPropagation()}),$(document).on("click.popwindow",function(){b.hide().css({index:-1})})},$.fn.id=function(){return this.attr("id")},$.fn.submitForm=function(opt){function submitCallback(){frame.unbind();var body=$("#"+frameId).contents().find("body"),data=body.html();if(""!=data){var ta=body.find(">textarea");if(ta.length)data=ta.val();else{var pre=body.find(">pre");pre.length&&(data=pre.html())}try{eval("data="+data),"error"==data.error?$.simpleAlert("暂时无法处理您的请求，请稍候重试。","error",3e3):"notlogin"==data.error?Util.loginWindow("open",function(){form.submitForm(options)}):options.success&&options.success(data)}catch(a){options.json?($.simpleAlert("暂时无法处理您的请求，请稍候重试。","error",3e3),options.error&&options.error(data)):options.success&&options.success(data)}setTimeout(function(){frame.unbind(),frame.remove()},100)}else if(--checkCount)return void setTimeout(submitCallback,200)}var defaultOpt={json:!0},options=$.extend(defaultOpt,opt),form=$(this);if(!options.onSubmit||0!=options.onSubmit.call(form)){options.url&&form.attr("action",options.url);var frameId="submit_frame_"+(new Date).getTime(),frame=$("<iframe id="+frameId+" name="+frameId+"></iframe>").attr("src",window.ActiveXObject?"javascript:false":"about:blank").css({position:"absolute",top:-1e3,left:-1e3});form.attr("target",frameId),frame.appendTo("body"),frame.bind("load",submitCallback),form.append("<input type='hidden' name='submitFormByHiddenFrame' id='submitFormByHiddenFrameParam' value='hiddenFrame'/>"),form[0].submit(),$("#submitFormByHiddenFrameParam").remove();var checkCount=10}},$.fn.submitFormAjax=function(a){var b=$(this);a.onSubmit&&0==a.onSubmit.call()||$.ajax({url:a.url?a.url:$(this).attr("action"),type:"POST",data:$(this).serialize(),success:function(c){"error"==c.error?$.simpleAlert("暂时无法处理您的请求，请稍候重试","error",3e3):"notlogin"==c.error?Util.loginWindow("open",function(){b.submitFormAjax(a)}):a.success&&a.success(c)},error:function(b){$.simpleAlert("暂时无法处理您的请求，请稍候重试","error",3e3),a.error&&a.error(b)}})},$.fn.numberTip=function(a){var b=$.extend({val:"+1",size:14,color:"red",time:1e3,pos:"right"},a),c=$(this),d=$("<span class='number-tip'>"+b.val+"</span>").appendTo("body"),e=c.offset().left;"right"==b.pos&&(e=c.offset().left+c.outerWidth()/2),d.css({left:e,top:c.offset().top,opacity:1}).show(),d.animate({top:"-=14px",opacity:0},400,function(){d.remove()})},$.fn.inputTip=function(a){var b=$.extend({text:"",time:500,pos:"rightin"},a),c=$(this),d=$(".input-tip");if(d.length)return void d.show();d=$("<span class='input-tip'>"+b.text+"</span>").appendTo("body");var e=c.offset().left;"rightin"==b.pos?e=c.offset().left+c.outerWidth()-c.width():"rightout"==b.pos&&(e=c.offset().left+c.outerWidth()+5),d.css({left:e,top:b.top||c.offset().top,opacity:1}).show(),setTimeout(function(){d.fadeOut(function(){d.remove()})},b.time)},$.fn.spread=function(a){var b=this;if("string"!=typeof a&&!(b.length<=0)){var c=$(b[0]),d=c.parent(),e=parseInt(c.css("padding-left").replace("px","")),f=parseInt(c.css("padding-right").replace("px","")),g=parseInt(c.css("padding-top").replace("px","")),h=parseInt(c.css("padding-bottom").replace("px","")),i=parseInt(d.css("padding-left").replace("px","")),j=(parseInt(d.css("padding-right").replace("px","")),parseInt(d.css("padding-top").replace("px",""))),k=(parseInt(d.css("padding-bottom").replace("px","")),{w:c.width()+e+f,h:c.height()+g+h,ml:10,mt:10,maxWidth:d.width(),s:150}),l=$.extend(k,a),m=l.w,n=l.h,o=l.ml,p=l.mt,q=l.maxWidth,r=l.s;$.each(b,function(a,b){var c=$(b);c.css({top:"-"+n+"px",left:0})});var s=parseInt((q+o)/(m+o));Math.ceil(b.length/s);$.each(b,function(a,b){var c=$(b),d=parseInt(a/s),e=parseInt(a%s),f=0==e?i+10:e*(m+o)+i+10,g=0==d?j+6:d*(n+p)+j+6;c.css({display:"block",position:"absolute"});var h=Math.sqrt(Math.pow(g+150,2)+Math.pow(f,2))/150;c.animate({top:g,left:f},h*r)})}};var streamInputStreams={},curr_stream_icon=null;$.fn.streamInput=function(a){function b(a){try{var c=a.html().replace(/^\s+/g," ").replace(/(\S)\s+(\S)?/g,"$1 $2");a.html(c);var d=a.children(":not(.ico-face, .paste-cont)");if(d.length<1)return;d.each(function(a,b){$(b).css("display");$(b).is("img, title, head, link, style, script")?$(b).remove():$(b).replaceWith($(b).html())})}catch(a){}d=a.children(":not(.ico-face, .paste-cont)"),d.length>0&&b(a)}function c(a){var b=a.find(".ico-face");b.each(function(a,b){$(b).replaceWith($("<img class='"+$(b).attr("class")+"' src='"+$(b).attr("src")+"'>"))})}function d(a){var b=a.children(".paste-cont");b.length<1||b.each(function(a,b){$(b).replaceWith($(b).html())})}function e(a){$(a).focus();try{var b=document.createRange();b.selectNode(a.lastChild||a),b.collapse(!1),window.getSelection().removeAllRanges(),window.getSelection().addRange(b),$(a).keyup()}catch(a){}}function f(a){var b=a.cloneNode(!0),c=b.childNodes.length,d=0,e=0;if(c>3&&$(b).children(".paste-cont").length>0)for(var f=0;f<c;f++){var g=b.childNodes[f];if("SPAN"==g.nodeName){d=c-f-1,f<c-1&&"#text"==b.childNodes[f+1].nodeName&&(e=b.childNodes[f+1].data.length);break}}return{v:d,len:e}}function g(a,b,c,d){var e,f,g=a.html(),h=document.createElement("div"),i=document.createDocumentFragment();if(g)for(h.innerHTML=g;e=h.firstChild;)f=i.appendChild(e);return c.insertNode(i),f&&(c=c.cloneRange(),c.setStartAfter(f),c.collapse(!0),b.removeAllRanges(),b.addRange(c),$(d).keyup()),c}if(this[0]&&a.face&&"DIV"==this[0].nodeName&&!this.attr("stream_id")){var h={target:this},i=$.extend(h,a),j={id:"",range:null},k=Object.keys(streamInputStreams);j.id=k.length?streamInputStreams[k[k.length-1]].id+1:1,j.stream_id="stream_"+(k.length?streamInputStreams[k[k.length-1]].id+1:1),this.attr({contentEditable:"true",spellcheck:"false",accesskey:"q",stream_id:j.stream_id}),$(i.face).attr("for_stream",j.stream_id),streamInputStreams[j.stream_id]=j,curr_stream_icon=j;var l=!1,m=!1,n=0,o=0,p=0;!!i.home;$(i.target).off("click.stream keyup.stream").on("click.stream keyup.stream",function(a){curr_stream_icon=streamInputStreams[$(this).attr("stream_id")],curr_stream_icon.target=$(this);var b=window.getSelection();curr_stream_icon.range=b.getRangeAt(0).cloneRange()}),$(i.target).off("DOMSubtreeModified.stream").on("DOMSubtreeModified.stream",function(a){if(l&&(l=!1,!($(this).children().length<1)))if(b($(this)),c($(this)),m){b($(this).find(".paste-cont"));var f=$(this).html();$(this).empty();var g=window.getSelection(),h=g.getRangeAt(0);h.deleteContents();var i,j,k=$("<div>"+f+"</div>"),q=k.html(),r=document.createElement("div"),s=document.createDocumentFragment();if(q)for(r.innerHTML=q;i=r.firstChild;)j=s.appendChild(i),"SPAN"==i.nodeName&&(n=s.childNodes.length+i.childNodes.length-1);if(h.insertNode(s),j){if(h=h.cloneRange(),h.collapse(!0),d($(this),!1),h.setStart(this,n||this.childNodes.length-o),h.setEnd(this,n||this.childNodes.length-o),o&&p){var t=this.childNodes.length-o;i=this.childNodes[t],h.setStart(i,i.data.length-p),h.setEnd(i,i.data.length-p)}g.removeAllRanges(),g.addRange(h)}}else e(this)}),$(i.target).off("paste.stream").on("paste.stream",function(a){a=a.originalEvent;var d=a.clipboardData||a.view.clipboardData,e=window.getSelection(),h=e.getRangeAt(0);h.deleteContents();try{var i=d.getData("text/html")||d.getData("text/plain").replace(/</g,"&lt;").replace(/>/g,"&gt;");i=i.replace(/<(\/)?(html|body)(\s|\S)+?>/g,"").replace(/(<!--.+?-->)|(\r\n)/g,"");var j=$("<div>"+i+"</div>");return b(j),c(j),g(j,e,h,this),!1}catch(a){if(l=!0,""==$.trim($(this).html().replace(/\s+|<br>/g,"")))return void(m=!1);m=!0;var k=document.createElement("span");k.className="paste-cont",h.insertNode(k),h=h.cloneRange(),h.selectNodeContents(k),e.removeAllRanges(),e.addRange(h);var n=f(this);o=n.v,p=n.len}}),$(i.face).off("click.stream").on("click.stream",function(){curr_stream_icon=streamInputStreams[$(this).attr("for_stream")];var a=curr_stream_icon.target=$("div[stream_id='"+$(this).attr("for_stream")+"']");if(a.focus(),curr_stream_icon.range){var b=window.getSelection();b.removeAllRanges(),b.addRange(curr_stream_icon.range)}var c=$("#faces_dialog");c.length<1&&(c=$("<div></div>").attr({id:"faces_dialog",class:"faces-lib"}).append("<ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>").appendTo("body")),$("#faces_dialog").popMenu({target:this,position:"right",zindex:4}),$("#faces_dialog ul li").off("click.stream").on("click.stream",function(a){$("#faces_dialog").popMenu("close");var b,c=$(curr_stream_icon.target),d=$(this).index()+1;if(b="<img class='ico-face' src='/assets/images/faces/faces/"+d+".gif'>",""==$.trim(c.html().replace(/&nbsp;|<br>/g,"")))return c.html(b),void e(c[0]);c.focus();var f=window.getSelection(),h=curr_stream_icon.range;h.deleteContents();var i=$("<div>"+b+"</div>");g(i,f,h,c)})})}}}(),Util.ajax=function(a){if(!a.onSend||0!=a.onSend()){var b={type:"POST"};return a=$.extend(b,a),$.ajax({url:a.url,type:a.type,traditional:!0,data:a.data,success:function(b){"error"==b.error?($.simpleAlert("<@i18n resource='global.error'/>","error",3e3),a.error&&a.error(b)):"notlogin"==b.error?(a.loginValidate&&a.loginValidate(b),Util.loginWindow("open",function(){Util.ajax(a)})):a.success&&a.success(b)},error:function(b){b.status&&a.error&&a.error(b)}})}},Util.get=function(a,b,c){$.ajax({url:a,type:"GET",data:b,success:function(d){"error"==d.error?$.simpleAlert("<@i18n resource='global.error'/>","error",3e3):"notlogin"==d.error?Util.loginWindow("open",function(){Util.get(a,b,c)}):c(d)},error:function(a){}})},Util.globalTopTip=function(a,b,c,d,e){if("undefined"!=typeof a){null==c&&(c=5e3),null==b&&(b="top_success");var f=$("#global_top_dialog");f.length>0&&f.remove(),f=$('<div id="global_top_dialog" class="global_top_dialog"><div class="left_arrow"></div>'+a+'<div class="right_arrow"></div></div>').appendTo("body"),f.addClass(b),e&&(f.find(".left_arrow").remove(),f.find(".right_arrow").remove(),f.addClass("noarrow"));var g=f.outerWidth();d?f.css("top",$(d).offset().top+"px"):0==$("#header").length&&f.css("top","0px"),f.css({"margin-left":-(.5*g)+"px"}).show(),setTimeout(function(){f.addClass("show"),setTimeout(function(){f.removeClass("show"),setTimeout(function(){f.fadeOut("slow").remove()},250)},c)},50)}},Util.globalLeftTip=function(a){var b=a;if("undefined"!=typeof b.content){b.delay||(b.delay=5e3),null==b.type&&(b.type="left-bot-default");var c=$("#global-leftbot-dialog");c.length>0&&c.remove(),c=$('<div id="global-leftbot-dialog" class="global-leftbot-dialog">'+b.content+"</div>").appendTo("body"),c.addClass(b.type),c.show(),setTimeout(function(){c.addClass("show"),setTimeout(function(){c.removeClass("show"),setTimeout(function(){c.fadeOut("slow").remove()},250)},b.delay)},50)}},Util.loading=function(a){var b={content:"loading...",show:1e3,delay:0,model:!1};if("string"==typeof a&&"close"==a)return $("#top_loading_tip").remove(),void $("#dialog_model").remove();a=$.extend(b,a),$("#top_loading_tip").length>0&&$("#top_loading_tip").remove();$("<div id='top_loading_tip' class='loadingTop'><p><b>"+a.content+"</b></p></div>").appendTo("body");a.model&&($("body").append("<div id='dialog_model'></div>"),$("#dialog_model").css({width:"100%",height:"100%",position:"fixed",top:0,left:0,"z-index":a.zIndex-1,opacity:.6,background:"#FFF",display:"none"})),"number"==typeof a.show?$("#top_loading_tip").delay(a.delay).show(0,function(){a.model&&$("#dialog_model").show()}).delay(a.show).fadeOut(500,function(){a.model&&$("#dialog_model").hide()}):a.show===!0&&$("#top_loading_tip").delay(a.delay).show(0,function(){a.model&&$("#dialog_model").show()})},Util.loadingball=function(a){if(a.close)return void $(".ball-spinner").hide();var b=a.con;b||(b=$("body"));var c=b.children(".ball-spinner");c.length>0?c.show():$('<div class="ball-spinner center-middle"><div class="ball1"></div><div class="ball2"></div><div class="ball3"></div>').appendTo(b),a.css&&"object"==typeof a.css&&$(".ball-spinner>div").css(a.css)},Util.checkFileCount=function(a,b){Util.ajax({url:"/view/privatefilecount",data:b,success:function(b){return b.member?void a():void(b.filecount>=b.totalcount?$.confirm({content:"<div class='filecheck-con'><span class='icons'>&#xe656;</span><div class='filecheck-right'><div>您的文件数量不足，无法创建新的文件</div><div>您可以 <a target='_blank' href='/upgrade'>去升级账号或者扩容</a></div></div></div>",onConfirm:function(){a(!1)},okval:"去看看"}):a())}})},Util.creatCode=function(a){var b,c,d=["abcdefghijklmnopqrstuvwxyz","ABCDEFGHIJKLMNOPQRSTUVWXYZ","123456789"],e="";for(c=0;c<a;c++)b=Math.floor(3*Math.random()),e+=d[b].substr(Math.floor(Math.random()*d[b].length),1);return e},Util.loadAvatar=function(a){var b="https://accounts.processon.com",c=location.origin.toLowerCase(),d=c.indexOf("processon.com");return d<0&&(b=""),a?'<img src="'+b+"/photo/"+a+'.png"/>':'<img src="/assets/imgs/on.png"/>'},Util.filterXss=function(a){return null==a||""==a?"":(a=a.toString(),a=a.replace(/</g,"&lt;"),a=a.replace(/%3C/g,"&lt;"),a=a.replace(/>/g,"&gt;"),a=a.replace(/%3E/g,"&gt;"),a=a.replace(/'/g,"&apos;"),a=a.replace(/"/g,"&quot;"))},Util.restoreXss=function(a){return null==a||""==a?"":(a=a.replace(/&lt;/g,"<"),a=a.replace(/&gt;/g,">"),a=a.replace(/&apos;/g,"'"),a=a.replace(/&quot;/g,'"'))};var fromUrl=document.referrer;fromUrl&&fromUrl.indexOf("processon.com")<0&&Util.setCookie("processon_referrer",encodeURI(fromUrl),1),String.prototype.isEmpty=function(){return this.replace(/(^\s*)|(\s*$)/g,"").length<=0},String.prototype.notEmpty=function(){return!this.isEmpty()},String.prototype.isEmail=function(){return!(this.isEmpty()||!/^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/.test(this))},Array.prototype.inArray=function(a){for(var b=0;b<this.length;b++)if(this[b]==a)return!0;return!1},Array.prototype.indexOf=function(a){for(var b=0;b<this.length;b++)if(this[b]==a)return b;return-1},Array.prototype.remove=function(a){var b=this.indexOf(a);b>-1&&this.splice(b,1)},Array.prototype.forEach||(Array.prototype.forEach=function(a,b){var c,d;if(null==this)throw new TypeError(" this is null or not defined");var e=Object(this),f=e.length>>>0;if("[object Function]"!={}.toString.call(a))throw new TypeError(a+" is not a function");for(b&&(c=b),d=0;d<f;){var g;d in e&&(g=e[d],a.call(c,g,d,e)),d++}}),Util.getUrlParams=function(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)","i"),c=window.location.search.substr(1).match(b);return null!=c?unescape(c[2]):null};