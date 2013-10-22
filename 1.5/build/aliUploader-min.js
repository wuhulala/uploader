/*!build time : 2013-10-22 3:30:45 PM*/
KISSY.add("gallery/uploader/1.5/type/base",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a)}var e="";return b.all,a.mix(d,{event:{START:"start",STOP:"stop",SUCCESS:"success",ERROR:"error"}}),a.extend(d,c,{upload:function(){},stop:function(){},_processResponse:function(b){var c=this,d=c.get("filter"),f={};if(d!=e&&(b=d.call(c,b)),a.isString(b))try{f=a.JSON.parse(b),f=c._fromUnicode(f)}catch(g){var h=b+"\uff0c\u8fd4\u56de\u7ed3\u679c\u96c6responseText\u683c\u5f0f\u4e0d\u5408\u6cd5\uff01";a.log(h),c.fire("error",{status:-1,result:{msg:h}})}else a.isObject(b)&&(f=c._fromUnicode(b));return a.log("\u670d\u52a1\u5668\u7aef\u8f93\u51fa\uff1a"+a.JSON.stringify(f)),f},_fromUnicode:function(b){function c(b){a.each(b,function(d,e){a.isObject(b[e])?c(b[e]):b[e]=a.isString(d)&&a.fromUnicode(d)||d})}return a.isObject(b)?(c(b),b):b}},{ATTRS:{action:{value:e},data:{value:{}},filter:{value:e}}}),d},{requires:["node","base"]}),KISSY.add("gallery/uploader/1.5/type/iframe",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a)}var e="",f=b.all,g="[uploader-iframeType]:",h="ks-uploader-iframe-";return a.mix(d,{tpl:{IFRAME:'<iframe src="javascript:false;" name="{id}" id="{id}" border="no" width="1" height="1" style="display: none;" />',FORM:'<form method="post" enctype="multipart/form-data" action="{action}" target="{target}" style="visibility: hidden;">{hiddenInputs}</form>',HIDDEN_INPUT:'<input type="hidden" name="{name}" value="{value}" />'},event:a.mix(c.event,{CREATE:"create",REMOVE:"remove"})}),a.extend(d,c,{upload:function(b){var c,e=this,h=f(b);return h.length?(e.fire(d.event.START,{input:h}),e.set("fileInput",h),e._create(),(c=e.get("form"))?(c.getDOMNode().submit(),void 0):(a.log(g+"form\u8282\u70b9\u4e0d\u5b58\u5728\uff01"),!1)):!1},stop:function(){var a=this,b=a.get("iframe");return b.attr("src",'javascript:"<html></html>";'),a._remove(),a.fire(d.event.STOP),a.fire(d.event.ERROR,{status:"abort",msg:"\u4e0a\u4f20\u5931\u8d25\uff0c\u539f\u56e0\uff1aabort"}),a},dataToHidden:function(b){if(!a.isObject(b)||a.isEmptyObject(b))return"";var c=this,d=e,f=c.get("tpl"),g=f.HIDDEN_INPUT;if(!a.isString(g))return"";for(var h in b)d+=a.substitute(g,{name:h,value:b[h]});return d},_createIframe:function(){var b,c,d=this,e=h+a.guid(),i=d.get("tpl"),j=i.IFRAME,k=d.get("iframe");return a.isEmptyObject(k)?a.isString(j)?a.isString(e)?(b=a.substitute(i.IFRAME,{id:e}),c=f(b),d.get("domain")||c.on("load",d._iframeLoadHandler,d),f("body").append(c),d.set("id",e),d.set("iframe",c),f("body").data("UPLOAD_TYPE",d),c):(a.log(g+"id\u5fc5\u987b\u5b58\u5728\u4e14\u4e3a\u5b57\u7b26\u4e32\u7c7b\u578b\uff01"),!1):(a.log(g+"iframe\u7684\u6a21\u677f\u4e0d\u5408\u6cd5\uff01"),!1):k},handleResult:function(a){var b=this;a=b._processResponse(a),b.fire(d.event.SUCCESS,{result:a}),b._remove()},_iframeLoadHandler:function(b){var c=this,f=b.target,g=d.event.ERROR;try{var h=f.contentDocument||window.frames[f.id].document;if(!h||!h.body)return c.fire(g,{msg:"\u670d\u52a1\u5668\u7aef\u8fd4\u56de\u6570\u636e\u6709\u95ee\u9898\uff01"}),!1;var i=h.body.innerHTML;if(i==e)return!1;c.handleResult(i)}catch(j){a.log(j)}},_createForm:function(){var b,c,d,e=this,h=e.get("id"),i=e.get("tpl"),j=i.FORM,k=e.get("data"),l=e.get("action"),m=e.get("fileInput");return a.isString(j)?a.isString(l)?(b=e.dataToHidden(k),b+=e.dataToHidden({type:"iframe"}),d=a.substitute(j,{action:l,target:h,hiddenInputs:b}),c=f(d).append(m),f("body").append(c),e.set("form",c),c):(a.log(g+"action\u53c2\u6570\u4e0d\u5408\u6cd5\uff01"),!1):(a.log(g+"form\u6a21\u677f\u4e0d\u5408\u6cd5\uff01"),!1)},_create:function(){var a=this,b=a._createIframe(),c=a._createForm();a.fire(d.event.CREATE,{iframe:b,form:c})},_remove:function(){var a=this,b=a.get("form");return b?(b.remove(),a.reset("form"),a.fire(d.event.REMOVE,{form:b}),void 0):!1}},{ATTRS:{tpl:{value:d.tpl},id:{value:h+a.guid()},domain:{value:e},iframe:{value:{}},form:{value:e},fileInput:{value:e}}}),d},{requires:["node","./base"]}),KISSY.add("gallery/uploader/1.5/type/ajax",function(a,b,c,d){function e(a){var b=this;e.superclass.constructor.call(b,a),b._setWithCredentials()}var f="",g=b.all,h="[uploader-AjaxType]:";return a.mix(e,{event:a.merge(c.event,{PROGRESS:"progress"})}),a.extend(e,c,{upload:function(b){var c=this;if(!b)return a.log(h+"upload()\uff0cfileData\u53c2\u6570\u6709\u8bef\uff01"),c;var d=c.get("blobSize");return d>0?c._chunkedUpload(b):c._fullUpload(b),c},stop:function(){var b=this,c=b.get("ajax");return a.isObject(c)?(c.abort(),b.fire(e.event.STOP),b):(a.log(h+"stop()\uff0cio\u503c\u9519\u8bef\uff01"),b)},_getFormData:function(b){return g.isArray(b)?b:a.isObject(b)?(b=[],g.each(b,function(a,c){b.push({name:a,value:c})}),b):b},_setWithCredentials:function(){var b=this;b.get("CORS");var c=b.get("ajaxConfig");return a.mix(c,{xhrFields:{withCredentials:!0}}),c},_setFormData:function(){var b=this;try{b.set("formData",new FormData),b._processData()}catch(c){a.log(h+"something error when reset FormData.")}},_resetFormData:function(){var a=this;a.set("formData",new FormData)},_processData:function(){var b=this,c=b.get("data"),d=b.get("formData");a.each(c,function(a,b){d.append(b,a)}),b.set("formData",d)},_addFileData:function(b){if(!a.isObject(b))return a.log(h+"_addFileData()\uff0cfile\u53c2\u6570\u6709\u8bef\uff01"),!1;var c=this,d=c.get("formData"),e=c.get("fileDataName"),f=b.name;return d.append(e,b,f),c.set("formData",d),d},_chunkedUpload:function(b){function c(){var h=l.call(b,j,j+k,b.type),m=h.size;f._setContentDisposition(b.name),f._setContentRange(j,m,i),f._setFormData(),f._addFileData(h),a.mix(g,{data:f.get("formData")});var n=d(g);n.then(function(a){var b=a[0];j=f._getUploadedBytes(n)||j+m,f.fire(e.event.PROGRESS,{loaded:j,total:i}),i>j?c():f.fire(e.event.SUCCESS,{result:b})},function(a){f._errorHandler(a,b)})}if(!a.isObject(b))return!1;var f=this,g=f.get("ajaxConfig"),h=f.get("action");a.mix(g,{url:h});var i=b.size,j=0,k=f.get("blobSize")||i,l=b.slice||b.webkitSlice||b.mozSlice;c()},_fullUpload:function(b){var c=this,f=c.get("ajaxConfig");c._setFormData(),c._addFileData(b),a.mix(f,{data:c.get("formData"),url:c.get("action")});var g=d(f);return g.then(function(a){var b=a[0];c.fire(e.event.SUCCESS,{result:b})},function(a){c._errorHandler(a,b)}),c.set("ajax",g),g},_errorHandler:function(a,b){var c=this,d={},f=a[1];"timeout"==f&&(d.msg="\u8bf7\u6c42\u8d85\u65f6\uff01",d.status="timeout"),c.fire(e.event.ERROR,{status:f,result:d,file:b})},_getUploadedBytes:function(a){var b=a.getResponseHeader("Range"),c=b&&b.split("-"),d=c&&c.length>1&&parseInt(c[1],10);return d&&d+1},_setContentRange:function(a,b,c){var d="bytes "+a+"-"+(a+b-1)+"/"+c,e=this,f=e.get("ajaxConfig"),g=f.headers;return g["Content-Range"]=d,d},_setContentDisposition:function(a){return this._setRequestHeader("Content-Disposition",'attachment; filename="'+encodeURI(a)+'"')},_setRequestHeader:function(a,b){var c=this,d=c.get("ajaxConfig");return d.headers[a]=b,c.set("ajaxConfig",d),b}},{ATTRS:{formData:{value:f},ajaxConfig:{value:{type:"post",processData:!1,cache:!1,dataType:"json",contentType:!1,timeout:10,headers:{}}},ajax:{value:f},fileDataName:{value:f},form:{value:{}},fileInput:{value:f},blobSize:{value:0},CORS:{value:!1},isUsePostMessage:{value:!1}}}),e},{requires:["node","./base","ajax"]}),KISSY.add("gallery/uploader/1.5/type/flash",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a),b.isHasCrossdomain(),b._init()}var e="",f="[uploader-FlashType]:";return a.mix(d,{event:a.merge(c.event,{SWF_READY:"swfReady",PROGRESS:"progress"})}),a.extend(d,c,{_init:function(){var b=this,c=b.get("swfUploader");return c?(c.on("contentReady",function(){b.fire(d.event.SWF_READY)},b),c.on("uploadStart",b._uploadStartHandler,b),c.on("uploadProgress",b._uploadProgressHandler,b),c.on("uploadCompleteData",b._uploadCompleteDataHandler,b),c.on("uploadError",b._uploadErrorHandler,b),void 0):(a.log(f+"swfUploader\u5bf9\u8c61\u4e3a\u7a7a\uff01"),!1)},upload:function(b){var c=this,d=c.get("swfUploader"),e=c.get("action"),f="POST",g=c.get("data"),h=c.get("fileDataName");return h||(h="Filedata"),c.set("uploadingId",b),a.mix(g,{type:"flash"}),d.upload(b,e,f,g,h),c},stop:function(){var a=this,b=a.get("swfUploader"),c=a.get("uploadingId");return c!=e&&(b.cancel(c),a.fire(d.event.STOP,{id:c})),a},_uploadStartHandler:function(a){var b=this;b.fire(d.event.START,{file:a.file})},_uploadProgressHandler:function(b){var c=this;a.mix(b,{loaded:b.bytesLoaded,total:b.bytesTotal}),a.log(f+"\u5df2\u7ecf\u4e0a\u4f20\u5b57\u8282\u6570\u4e3a\uff1a"+b.bytesLoaded),c.fire(d.event.PROGRESS,{loaded:b.loaded,total:b.total})},_uploadCompleteDataHandler:function(a){var b=this,c=b._processResponse(a.data);b.set("uploadingId",e),b.fire(d.event.SUCCESS,{result:c})},_uploadErrorHandler:function(a){var b=this;b.set("uploadingId",e),b.fire(d.event.ERROR,{msg:a.msg})},isHasCrossdomain:function(){var b=location.hostname;a.io({url:"http://"+b+"/crossdomain.xml",dataType:"xml",error:function(){a.log("\u7f3a\u5c11crossdomain.xml\u6587\u4ef6\u6216\u8be5\u6587\u4ef6\u4e0d\u5408\u6cd5\uff01")}})}},{ATTRS:{action:{value:e,getter:function(b){var c=/^http/;if(!c.test(b)){var d,e=location.href,f=e.split("/");d=a.filter(f,function(a,b){return b<f.length-1}),b=d.join("/")+"/"+b}return b}},swfUploader:{value:e},uploadingId:{value:e}}}),d},{requires:["node","./base"]}),KISSY.add("gallery/uploader/1.5/button/base",function(a,b,c){function d(b,c){var e=this;c=a.merge({target:g(b)},c),d.superclass.constructor.call(e,c)}var e="",f="[Uploader-Button] ",g=b.all;return a.mix(d,{event:{beforeShow:"beforeShow",afterShow:"afterShow",beforeHide:"beforeHide",afterHide:"afterHide",beforeRender:"beforeRender",afterRender:"afterRender",CHANGE:"change"},getFileName:function(a){return a.replace(/.*(\/|\\)/,"")}}),a.extend(d,c,{render:function(){var b=this,c=b.get("srcFileInput");if(!c||!c.length)return a.log("[Button]file\u5143\u7d20\u4e0d\u5b58\u5728\uff01"),b;var d=c.clone();d.addClass("file-input"),c.remove(),b.set("srcFileInput",d),b._createInput()},show:function(){var a=this,b=a.get("target");return b.show(),a.fire(d.event.afterShow),d},hide:function(){var a=this,b=a.get("target");return b.hide(),a.fire(d.event.afterHide),d},reset:function(){var a=this,b=a.get("inputContainer");return g(b).remove(),a.set("inputContainer",e),a.set("fileInput",e),a._createInput(),a},_createInput:function(){var b=this,c=b.get("target");b.get("name");var d=b.get("tpl");if(!a.isString(d))return!1;var e=b.get("srcFileInput");if(!e.length)return!1;var f=e.clone();b.set("fileInput",f);var h=g(d);return h.append(f),h.appendTo(c),6==a.UA.ie&&f.css("fontSize","400px"),g(f).on("change",b._changeHandler,b),b.set("inputContainer",h),b._setDisabled(b.get("disabled")),b._setMultiple(b.get("multiple")),h},_changeHandler:function(b){var c=this,h=c.get("fileInput"),i=g(h).val(),j=b.target.files,k=[];return i==e?(a.log(f+"No file selected."),!1):(j?a.each(j,function(b){a.isObject(b)&&k.push({name:b.name,type:b.type,size:b.size,data:b})}):k.push({name:d.getFileName(i)}),c.fire(d.event.CHANGE,{files:k,input:h.getDOMNode()}),c.reset(),void 0)},_setDisabled:function(b){var c=this,d=c.get("cls"),e=d.disabled,f=c.get("target"),h=c.get("fileInput");return f.length&&a.isBoolean(b)?(b?(f.addClass(e),g(h).hide()):(f.removeClass(e),g(h).show()),b):!1},_setMultiple:function(a){var b=this,c=b.get("fileInput");return c.length?(a&&c.attr("multiple","multiple")||c.removeAttr("multiple"),a):!1}},{ATTRS:{target:{value:null},fileInput:{value:e},srcFileInput:{value:e},inputContainer:{value:e},tpl:{value:'<div class="file-input-wrapper" style="overflow: hidden;"></div>'},name:{value:"fileInput",setter:function(a){return this.get("fileInput")&&g(this.get("fileInput")).attr("name",a),a}},disabled:{value:!1,setter:function(a){return this._setDisabled(a),a}},multiple:{value:!0,setter:function(a){return this._setMultiple(a),a}},cls:{value:{disabled:"uploader-button-disabled"}}}}),d},{requires:["node","base"]}),KISSY.add("gallery/uploader/1.5/plugins/ajbridge/ajbridge",function(a,b){function c(e,i,j){e=e.replace(d,""),i=b._normalize(i||{});var k=this,l=d+e,m=function(b){return b.status<1?(k.fire("failed",{data:b}),void 0):(a.mix(k,b),b.dynamic&&i.src||k.activate(),void 0)};i.id=i.id||a.guid(f),c.instances[i.id]=k,i.src&&(i.params.allowscriptaccess="always",i.params.flashvars=a.merge(i.params.flashvars,{jsEntry:h,swfID:i.id})),j?k.__args=[l,i,m]:a.later(b.add,g,!1,b,[l,i,m])}var d="#",e="1.0.15",f="ks-ajb-",g=100,h="KISSY.AJBridge.eventHandler";return a.mix(c,{version:e,instances:{},eventHandler:function(a,b){var d=c.instances[a];d&&d.__eventHandler(a,b)},augment:function(b,c){a.isString(c)&&(c=[c]),a.isArray(c)&&a.each(c,function(c){b.prototype[c]=function(){try{return this.callSWF(c,a.makeArray(arguments))}catch(b){this.fire("error",{message:b})}}})}}),a.augment(c,a.EventTarget,{init:function(){this.__args&&(b.add.apply(b,this.__args),this.__args=null,delete this.__args)},__eventHandler:function(b,c){var d=this,e=c.type;switch(c.id=b,e){case"log":a.log(c.message);break;default:d.fire(e,c)}},callSWF:function(a,b){var c=this;b=b||[];try{if(c.swf[a])return c.swf[a].apply(c.swf,b)}catch(d){var e="";return 0!==b.length&&(e="'"+b.join("','")+"'"),new Function("self","return self.swf."+a+"("+e+");")(c)}}}),c.augment(c,["activate","getReady","getCoreVersion"]),window.AJBridge=a.AJBridge=c,c},{requires:["gallery/flash/1.0/index"]}),KISSY.add("gallery/uploader/1.5/plugins/ajbridge/uploader",function(a,b,c){function d(b,c){c=c||{};var e={};a.each(["ds","dsp","btn","hand"],function(a){a in c&&(e[a]=c[a])}),c.params=c.params||{},c.params.flashvars=a.merge(c.params.flashvars,e),d.superclass.constructor.call(this,b,c)}return a.extend(d,c),c.augment(d,["setFileFilters","filter","setAllowMultipleFiles","multifile","browse","upload","uploadAll","cancel","getFile","removeFile","lock","unlock","setBtnMode","useHand","clear"]),d.version="1.0.1",c.Uploader=d,c.Uploader},{requires:["gallery/flash/1.0/index","./ajbridge"]}),KISSY.add("gallery/uploader/1.5/button/swfButton",function(a,b,c,d){function e(b,c){var d=this;c=a.merge({target:g(b)},c),e.superclass.constructor.call(d,c)}var f="",g=b.all,h="swf-uploader-wrapper-";return a.mix(e,{event:{RENDER:"render",CHANGE:"change",MOUSE_OVER:"mouseOver",MOUSE_DOWN:"mouseDown",MOUSE_UP:"mouseUp",MOUSE_OUT:"mouseOut",CLICK:"click"}}),a.extend(e,c,{render:function(){var a,b=this,c=b.get("target"),d=b.get("multiple"),f=b.get("fileFilters");c.css("position","relative"),b.set("swfWrapper",b._createSwfWrapper()),b._setFlashSizeConfig(),a=b._initSwfUploader(),a.on("contentReady",function(){a.isContent||(a.isContent=!0,a.browse(d,f),b._bindBtnEvent(),a.on("fileSelect",b._changeHandler,b),b._setDisabled(b.get("disabled")),b.fire(e.event.RENDER))},b);var g=b.get("srcFileInput");return g&&g.length&&g.remove(),b},_createSwfWrapper:function(){var b=this,c=b.get("target"),d=b.get("tpl"),e=b.get("swfWrapperId")!=f&&b.get("swfWrapperId")||h+a.guid(),i=a.substitute(d,{id:e});return b.set("swfWrapperId",e),g(i).appendTo(c)},_initSwfUploader:function(){var b,c=this,e=c.get("flash"),f=c.get("swfWrapperId");a.mix(e,{id:"swfUploader"+a.guid()});try{b=new d(f,e),c.set("swfUploader",b)}catch(g){}return b},_bindBtnEvent:function(){var b=this,c=e.event,d=b.get("swfUploader");return d?(a.each(c,function(a){d.on(a,function(){b.fire(a)},b)}),b):!1},_setFlashSizeConfig:function(){var b=this,c=b.get("flash"),d=(b.get("target"),b.get("size"));a.isEmptyObject(d)||a.mix(c.attrs,d),b.set("flash",c)},_changeHandler:function(a){var b=this;if(b.get("swfUploader").id==a.id){var c=a.fileList;b.fire(e.event.CHANGE,{files:c})}},_setDisabled:function(b){var c=this,d=c.get("swfUploader"),e=c.get("cls"),f=e.disabled,g=c.get("target"),h=c.get("swfWrapper");return d&&a.isBoolean(b)?(b?(g.addClass(f),h.css("top","-3000px")):(g.removeClass(f),h.css("top",0)),b):!1},show:function(){var a=this,b=a.get("target");b.show()},hide:function(){var a=this,b=a.get("target");b.hide()}},{ATTRS:{target:{value:f},swfWrapper:{value:f},swfWrapperId:{value:f},tpl:{value:'<div id="{id}" class="uploader-button-swf" style="position: absolute;top:0;left:0;z-index:2000;"></div>'},multiple:{value:!0,setter:function(a){var b=this,c=b.get("swfUploader");return c&&c.multifile(a),a}},fileFilters:{value:[],setter:function(b){var c=this,d=c.get("swfUploader");return a.isObject(b)&&(b=[b]),d&&a.isArray(b)&&a.later(function(){d.filter(b)},800),b}},disabled:{value:!1,setter:function(a){var b=this,c=b.get("swfUploader");return c&&b._setDisabled(a),a}},cls:{value:{disabled:"uploader-button-disabled"}},size:{value:{}},flash:{value:{src:"http://a.tbcdn.cn/s/kissy/gallery/uploader/1.5/plugins/ajbridge/uploader.swf",id:"swfUploader",params:{bgcolor:"#fff",wmode:"transparent"},attrs:{width:400,height:400},hand:!0,btn:!0}},swfUploader:{value:f},srcFileInput:{value:f}}}),e},{requires:["node","base","../plugins/ajbridge/uploader"]}),KISSY.add("gallery/uploader/1.5/queue",function(a,b,c){function d(a){var b=-1;do a/=1024,b++;while(a>99);return Math.max(a,.1).toFixed(1)+["kB","MB","GB","TB","PB","EB"][b]}function e(a){var b=this;e.superclass.constructor.call(b,a)}var f="",g=(b.all,"[uploader-queue]:");return a.mix(e,{event:{ADD:"add",ADD_FILES:"addFiles",REMOVE:"remove",CLEAR:"clear",FILE_STATUS:"statusChange",UPDATE_FILE:"updateFile"},status:{WAITING:"waiting",START:"start",PROGRESS:"progress",SUCCESS:"success",CANCEL:"cancel",ERROR:"error",RESTORE:"restore"},FILE_ID_PREFIX:"file-"}),a.extend(e,c,{add:function(b,c){var d=this,e={};if(b.length>0){e=[];var f=d.get("uploader"),g=d.get("files").length,h=f.get("max")>0;a.each(b,function(a,b){if(h){var c=f.get("max");c>=g+b+1&&e.push(d._addFile(a))}else e.push(d._addFile(a))})}else e=d._addFile(b);return c&&c.call(d),e},_addFile:function(b,c){if(!a.isObject(b))return a.log(g+"_addFile()\u53c2\u6570file\u4e0d\u5408\u6cd5\uff01"),!1;var d=this,f=d._setAddFileData(b),h=d.getFileIndex(f.id),i=d.get("fnAdd");return a.isFunction(i)&&(f=i(h,f)),d.fire(e.event.ADD,{index:h,file:f,uploader:d.get("uploader")}),c&&c.call(d,h,f),f},remove:function(b,c){var d,f=this,h=f.get("files");return a.isString(b)&&(b=f.getFileIndex(b)),d=h[b],a.isObject(d)?(h=a.filter(h,function(a,c){return c!==b}),f.set("files",h),f.fire(e.event.REMOVE,{index:b,file:d}),c&&c.call(f,b,d),d):(a.log(g+"remove()\u4e0d\u5b58\u5728index\u4e3a"+b+"\u7684\u6587\u4ef6\u6570\u636e"),!1)},clear:function(){function a(){return b=c.get("files"),b.length?(c.remove(0,function(){a()}),void 0):(c.fire(e.event.CLEAR),!1)}var b,c=this;a()},fileStatus:function(b,c,d){if(!a.isNumber(b))return!1;var f,g=this,h=g.getFile(b);return g.get("theme"),h?(f=h.status,c?f==c?g:(g.updateFile(b,{status:c}),g.fire(e.event.FILE_STATUS,{index:b,status:c,args:d,file:h}),g):f):!1},getFile:function(b){var c,d=this,e=d.get("files");return a.isNumber(b)?c=e[b]:a.each(e,function(a){return a.id==b?(c=a,!0):void 0}),c},getFileIndex:function(b){var c=this,d=c.get("files"),e=-1;return a.each(d,function(a,c){return a.id==b?(e=c,!0):void 0}),e},updateFile:function(b,c){if(!a.isNumber(b))return!1;if(!a.isObject(c))return a.log(g+"updateFile()\u7684data\u53c2\u6570\u6709\u8bef\uff01"),!1;var d=this,f=d.get("files"),h=d.getFile(b);return h?(a.mix(h,c),f[b]=h,d.set("files",f),d.fire(e.event.UPDATE_FILE,{index:b,file:h}),h):!1},getIndexs:function(b){var c,d=this,e=d.get("files"),f=[];return e.length?(a.each(e,function(d,e){a.isObject(d)&&(c=d.status,c==b&&f.push(e))}),f):f},getFiles:function(b){var c=this,d=c.get("files"),e=[];return d.length?(a.each(d,function(a){a&&a.status==b&&e.push(a)}),e):[]},_setAddFileData:function(b){var c=this,f=c.get("files");return a.isObject(b)?(b.id||(b.id=a.guid(e.FILE_ID_PREFIX)),b.size&&(b.textSize=d(b.size)),b.status||(b.status="waiting"),f.push(b),b):(a.log(g+"_updateFileData()\u53c2\u6570file\u4e0d\u5408\u6cd5\uff01"),!1)}},{ATTRS:{fnAdd:{value:f},files:{value:[]},uploader:{value:f}}}),e},{requires:["node","base"]}),KISSY.add("gallery/uploader/1.5/base",function(a,b,c,d,e,f,g,h,i,j){function k(a){var b=this;k.superclass.constructor.call(b,a)}var l="",m=(c.all,"[uploader]:");return a.mix(k,{type:{AUTO:"auto",IFRAME:"iframe",AJAX:"ajax",FLASH:"flash"},event:{SELECT:"select",ADD:"add",START:"start",PROGRESS:"progress",COMPLETE:"complete",SUCCESS:"success",UPLOAD_FILES:"uploadFiles",CANCEL:"cancel",ERROR:"error",REMOVE:"remove",RESTORE:"restore"},status:{WAITING:"waiting",START:"start",PROGRESS:"progress",SUCCESS:"success",CANCEL:"cancel",ERROR:"error"}}),a.extend(k,b,{upload:function(b){if(!a.isNumber(b))return!1;var c,d=this,e=d.get("uploadType"),f=d.get("type"),g=d.get("queue"),h=g.get("files")[b];return a.isObject(h)?d.get("curUploadIndex")!=l?(alert("\u7b2c"+d.get("curUploadIndex")+"\u6587\u4ef6\u6b63\u5728\u4e0a\u4f20\uff0c\u8bf7\u4e0a\u4f20\u5b8c\u540e\u518d\u64cd\u4f5c\uff01"),!1):(c=h.input,"flash"==f&&(c=h.input.id),"ajax"==f&&(c=h.data),"error"===h.status?!1:d.get("isAllowUpload")?(d.set("curUploadIndex",b),d.fire(k.event.START,{index:b,file:h}),g.fileStatus(b,k.status.START),e.upload(c),void 0):!1):(a.log(m+"\u961f\u5217\u4e2d\u7d22\u5f15\u503c\u4e3a"+b+"\u7684\u6587\u4ef6"),!1)},cancel:function(b){var c=this,d=c.get("uploadType"),e=c.get("queue"),f=k.status,g=e.fileStatus(b);return a.isNumber(b)&&g!=f.SUCCESS?(d.stop(),e.fileStatus(b,f.CANCEL)):(d.stop(),c._continueUpload()),c},stop:function(){var a=this;return a.set("uploadFilesStatus",l),a.cancel(),a},uploadFiles:function(b){var c=this;return a.isString(b)||(b=k.status.WAITING),c.set("uploadFilesStatus",b),c._uploaderStatusFile(b),c},_uploaderStatusFile:function(a){var b=this,c=b.get("queue"),d=c.getIndexs(a);return d.length?(b.upload(d[0]),b):(b.set("uploadFilesStatus",l),b.fire(k.event.UPLOAD_FILES),!1)},isSupportAjax:function(){var a=!1;try{FormData&&(a=!0)}catch(b){a=!1}return a},isSupportFlash:function(){var b=a.UA.fpv();return a.isArray(b)&&b.length>0},_renderUploaderCore:function(b){var c=this;if(c.get("type"),!b)return!1;var d={action:c.get("action"),data:c.get("data"),dataType:"json"},e=c.get("button");c.get("type")==k.type.FLASH&&a.mix(d,{swfUploader:e.get("swfUploader")}),d.fileDataName=c.get("name"),d.CORS=c.get("CORS");var f=new b(d),g=b.event;return f.on(g.SUCCESS,c._uploadCompleteHanlder,c),f.on(g.ERROR,c._uploadCompleteHanlder,c),g.PROGRESS&&f.on(g.PROGRESS,c._uploadProgressHandler,c),f.on(g.STOP,c._uploadStopHanlder,c),c.set("uploadType",f),f},getUploadType:function(b){var c,d=this,e=k.type;return b==e.AUTO&&(b=[e.AJAX,e.IFRAME]),a.isArray(b)&&b.length>0?a.each(b,function(a){return c=d._getType(a),c?!1:void 0}):c=d._getType(b),c},_getType:function(b){var c,d=this,h=k.type,i=d.isSupportAjax(),j=d.isSupportFlash();switch(b){case h.IFRAME:c=e;break;case h.AJAX:c=i&&f||!1;break;case h.FLASH:c=j&&g||!1;break;default:return a.log(m+"type\u53c2\u6570\u4e0d\u5408\u6cd5"),!1}return c&&a.log(m+"\u4f7f\u7528"+b+"\u4e0a\u4f20\u65b9\u5f0f"),d.set("type",b),c},_renderButton:function(){var b,c,e=this,f=e.get("type"),g=e.get("target"),j=e.get("multiple"),l=e.get("disabled"),m=e.get("name"),n={name:m,multiple:j,disabled:l,srcFileInput:e.get("fileInput")};return f==k.type.FLASH?(c=i,a.mix(n,{size:e.get("swfSize")})):c=h,b=new c(g,n),b.on("change",e._select,e),b.render(),e.set("button",b),f==k.type.IFRAME&&d.ie<10&&e.set("multiple",!1),b},_renderQueue:function(){var a=this,b=new j;return b.set("uploader",a),b.on("add",function(b){a.fire(k.event.ADD,b)}),b.on("remove",function(b){a.fire(k.event.REMOVE,b)}),a.set("queue",b),b},_select:function(b){var c=this,d=c.get("queue"),e=c.get("curUploadIndex"),f=b.files;return a.each(f,function(a){a.size||(a.size=0),a.name||(a.name=a.fileName||l),a.input=b.input||a}),f=c._processExceedMultiple(f),c.fire(k.event.SELECT,{files:f}),c.get("isAllowUpload")?(d.add(f,function(){e==l&&c.get("autoUpload")&&c.uploadFiles()}),void 0):!1},_processExceedMultiple:function(b){var c=this,d=c.get("multipleLen");return 0>d||!a.isArray(b)||!b.length?b:a.filter(b,function(a,b){return d>b})},_uploadCompleteHanlder:function(b){var c,d=this,e=b.result,f=k.event,g=d.get("queue"),h=d.get("curUploadIndex");if(!a.isObject(e))return!1;if(g.updateFile(h,{result:e}),c=Number(e.status),1===c)g.fileStatus(h,k.status.SUCCESS),d._success(e.data),d.fire(f.SUCCESS,{index:h,file:g.getFile(h),result:e});else{var i=e.msg||e.message||l;e.msg=i,g.fileStatus(h,k.status.ERROR,{msg:i,result:e}),d.fire(f.ERROR,{msg:i,status:c,result:e,index:h,file:g.getFile(h)})}d.set("curUploadIndex",l),d.fire(f.COMPLETE,{index:h,file:g.getFile(h),result:e}),d._continueUpload()},_uploadStopHanlder:function(){var a=this,b=a.get("queue"),c=a.get("curUploadIndex");b.fileStatus(c,k.status.CANCEL),a.set("curUploadIndex",l),a.fire(k.event.CANCEL,{index:c})},_continueUpload:function(){var a=this,b=a.get("uploadFilesStatus");b!=l&&a._uploaderStatusFile(b)},_uploadProgressHandler:function(b){var c=this,d=c.get("queue"),e=c.get("curUploadIndex"),f=d.getFile(e);a.mix(b,{file:f}),d.fileStatus(e,k.status.PROGRESS,b),c.fire(k.event.PROGRESS,b)},_success:function(b){if(!a.isObject(b))return!1;var c=this,d=b.url,e=c.get("curUploadIndex"),f=c.get("queue");return a.isString(d)?(f.updateFile(e,{sUrl:d}),void 0):!1}},{ATTRS:{button:{value:{}},queue:{value:{}},curUploadIndex:{value:l},curFile:{value:l,getter:function(){var b=this,c=l,d=b.get("curUploadIndex");if(a.isNumber(d)){var e=b.get("queue");c=e.getFile(d)}return c}},uploadType:{value:{}},fileInput:{value:l},uploadFilesStatus:{value:l},swfSize:{value:{}},CORS:{value:!1}}}),k},{requires:["base","node","ua","./type/iframe","./type/ajax","./type/flash","./button/base","./button/swfButton","./queue"]}),KISSY.add("gallery/uploader/1.5/index",function(a,b,c,d,e){var f="",g=b.all,h="text/uploader-files",i=d.extend([c],{constructor:function(a,b){var c=this;i.superclass.constructor.call(c,b),c.set("target",a),c._init()},_init:function(){var b=this,c=b.get("target");if(!c.length)return a.log("\u76ee\u6807\u5143\u7d20\u4e0d\u5b58\u5728\uff01"),!1;var d=b.get("type"),e=b.getUploadType(d);return b._replaceBtn(),b._renderButton(),b._renderQueue(),b._renderUploaderCore(e),b},_replaceBtn:function(){var b=this,c=b.get("target");if(!c.length)return!1;var d=c[0].defaultValue||"\u4e0a\u4f20\u6587\u4ef6",e=a.substitute(b.get("btnTpl"),{text:d}),f=g(e).insertAfter(c);return!b.get("name")&&c.attr("name")&&b.set("name",c.attr("name")),b.set("_oldInput",c.clone()),b.set("fileInput",c),b.set("target",f),f},theme:function(b){var c=this,d=c.get("theme");return b?d?(a.log("\u4e0d\u652f\u6301\u91cd\u65b0\u6e32\u67d3\u4e3b\u9898\uff01"),c):(b.set("uploader",c),b.set("queue",c.get("queue")),b.render&&b.render(),c.fire("themeRender",{theme:d,uploader:c}),c.set("theme",b),c):!1},restore:function(b){var c,d=this;if(d.set("hasRestore",!0),b){var f=g(b);if(!f.length)return a.log("restore()\uff1a\u4e0d\u5b58\u5728target\uff01"),!1;c=f.text()}else{var i=d.get("theme");if(!i)return!1;var j=i.get("queueTarget");if(!j||!j.length)return!1;var k=j.all("script");k.each(function(a){a.attr("type")==h&&(c=a.html())})}if(c=e.parse(c),!c.length)return!1;var l,m=d.get("queue");a.each(c,function(a){a.status=1,l={type:"restore",name:a.name||"",url:a.url||"",result:a};var b=m.add(l),c=b.id,e=m.getFileIndex(c);m.fileStatus(e,"success",{index:e,id:c,file:b}),d.fire("success",{file:b,result:b.result})})}},{ATTRS:{target:{value:f,getter:function(a){return g(a)}},fileInput:{value:f},theme:{value:f},btnTpl:{value:'<a href="javascript:void(0)" class="g-u ks-uploader-button"><span class="btn-text">{text}</span></a>'},button:{value:{}},queue:{value:{}},type:{value:"auto"},multiple:{value:!1,setter:function(b){var c=this,d=c.get("button");return!a.isEmptyObject(d)&&a.isBoolean(b)&&d.set("multiple",b),b}},multipleLen:{value:-1},disabled:{value:!1,setter:function(b){var c=this,d=c.get("button");return!a.isEmptyObject(d)&&a.isBoolean(b)&&d.set("disabled",b),b}},action:{value:f,setter:function(a){var b=this,c=b.get("uploadType");return c&&c.set("action",a),a}},data:{value:{},setter:function(b){if(a.isObject(b)){var c=this,d=c.get("uploadType");d&&d.set("data",b)}return b}},isAllowUpload:{value:!0},autoUpload:{value:!0},filter:{value:f,setter:function(a){var b=this,c=b.get("uploadType");return c&&c.set("filter",a),a}},curUploadIndex:{value:f},uploadType:{value:f},swfSize:{value:{}},hasRestore:{value:!1}}},"Uploader");return i},{requires:["node","./base","rich-base","json"]}),KISSY.add("gallery/uploader/1.5/token",function(a,b){function c(){var a=arguments[1]||location.hostname,b=a.split("."),c=b.length,d=arguments[0]||(3>c?0:1);return(d>=c||2>c-d)&&(d=c-2),b.slice(d).join(".")}function d(){var a=c(-1);return"net"==a}function e(a,c){if(!a)return!1;var e=d()&&f||g;b.jsonp(e,function(b){var d=b.value;if(d){var b=a.get("data");b._tb_token_=d}c&&c(b)})}var f="http://aop.widgets.daily.taobao.net/json/getReqParam.htm",g="http://aop.widgets.taobao.com/json/getReqParam.htm";return e},{requires:["ajax"]}),KISSY.add("gallery/uploader/1.5/aliUploader",function(a,b,c,d){function e(){var a=arguments[1]||location.hostname,b=a.split("."),c=b.length,d=arguments[0]||(3>c?0:1);return(d>=c||2>c-d)&&(d=c-2),b.slice(d).join(".")}function f(){var a=e(-1);return"net"==a}function g(){return f()&&l||m}function h(b){if(!b)return!1;var c=b.get("type");if("flash"!=c)return!1;var d,e,f,g=document.cookie.split(";"),h={};a.each(g,function(a){for(;" "===a.charAt(0);)a=a.substring(1,a.length);d=a.indexOf("="),d>0&&(e=a.substring(0,d),f=a.substring(d+1),h[e]=f)});var i=b.get("data");return a.mix(i,h),h}function i(b,c){var d=b.get("type"),f="iframe"==d;if(!f)return!1;c||(c=e(-2)),document.domain=c;var g=b.get("data");g.domain=c;var h=b.get("uploadType");return h.set("domain",c),a.log("[AliUploader]\u8de8\u57df\u5f3a\u5236\u8bbe\u7f6edomain\uff1a"+c),g}function j(b){var c=!1;b.on("add",function(){if(!c){var d=b.getPlugin("urlsInput");d&&(d.set("useName",!0),c=!0,a.log("[UrlsInput]useName\u8bbe\u7f6e\u4e3atrue\uff1a\u4fdd\u5b58\u670d\u52a1\u5668\u7aef\u8fd4\u56de\u7684\u56fe\u7247\u540d"))}})}function k(a,b){b||(b={}),b.CORS=!0,b.action||(b.action=g()),b.data||(b.data={}),b.data._input_charset="utf-8";var e=new c(a,b);return h(e),i(e,b.domain),d(e),b.useName&&j(e),e}var l="http://aop.widgets.daily.taobao.net/json/uploadImg.htm",m="http://aop.widgets.taobao.com/json/uploadImg.htm";return k.Uploader=c,k},{requires:["ua","./index","./token"]});