/*!build time : 2013-10-22 3:30:45 PM*/
KISSY.add("gallery/uploader/1.5/themes/loveUploader/index",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a)}return b.all,a.extend(d,c,{},{ATTRS:{name:{value:"loveUploader"},fileTpl:{value:'<li id="queue-file-{id}" class="clearfix" data-name="{name}"><div class="tb-pic120"><a href="javascript:void(0);"><img class="J_Pic_{id} preview-img" src="" /></a></div><div class=" J_Mask_{id} pic-mask"></div><div class="status-wrapper"><div class="status waiting-status tips-upload-waiting"><p class="tips-text">\u7b49\u5f85\u4e0a\u4f20\uff0c\u8bf7\u7a0d\u5019</p></div><div class="status start-status progress-status success-status tips-uploading"><div class="J_ProgressBar_{id}"><s class="loading-icon"></s>\u4e0a\u4f20\u4e2d...</div></div><div class="status error-status tips-upload-error"><p class="J_ErrorMsg_{id} tips-text">\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01</p></div></div><a class="J_Del_{id} del-pic" href="#">\u5220\u9664</a></li>'},elCount:{value:"#J_UploadCount"}}}),d},{requires:["node","gallery/gallery/uploader/1.5/themes/imageUploader/index"]});