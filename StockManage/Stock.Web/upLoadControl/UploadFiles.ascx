<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UploadFiles.ascx.cs" Inherits="UpFiles.attachment.UploadFiles" %>

<link rel="stylesheet" type="text/css" href="attachment.css"/>

<div class="wrapper">
    <div class="controller">
        <span id="divStatus">���ι��ɹ��ϴ� 0 ���ļ�</span>
        <span id="spanButtonPlaceHolder"></span>
    </div>
    <div class="fieldset flash" id="fsUploadProgress"></div>
    <span id="startUpload" style="display: none;"></span>
    <!--<div id="startUpload" style="display: none;"></div>-->
    

</div>
<!--<script type="text/javascript" src="internal.js"></script>-->

<script type="text/javascript" src="../swfupload/swfupload.js"></script>
<script type="text/javascript" src="../swfupload/swfupload.queue.js"></script>
<script type="text/javascript" src="../swfupload/fileprogress.js"></script>
<script type="text/javascript" src="callbacks.js"></script>
<script type="text/javascript" src="fileTypeMaps.js"></script>

<script type="text/javascript">
    //debugger;

    var swfupload,
        filesList = [];


    window.onload = function() {

        // debuger;
        var settings = {
            upload_url: "../ashx/fileUp.ashx",         //�����ϴ���������ַ
            file_post_name: "upfile",      //���̨�ύ�ı�����
            flash_url: "../swfupload/swfupload.swf",
            flash9_url: "../swfupload/swfupload_fp9.swf",
            post_params: { "PHPSESSID": "<?php echo session_id(); ?>" }, //���session��ʧ����
            file_size_limit: "100 MB",                                 //�ļ���С���ƣ��˴�����ǰ��flashѡ��ʱ������ƣ����廹��Ҫ�ͺ�˽���ж�
            file_types: "*.*",                                         //��������չ���������չ��֮���÷ֺŸ�����֧��*ͨ���
            file_types_description: "All Files",                      //��չ������
            file_upload_limit: 100,                                   //���ο�ͬʱ�ϴ����ļ���Ŀ
            file_queue_limit: 10,                                      //�����п�ͬʱ�ϴ����ļ���Ŀ
            custom_settings: {                                         //�Զ������ã��û����ڴ�������������Զ������
                progressTarget: "fsUploadProgress",
                startUploadId: "startUpload"
            },
            debug: false,

            // ��ť����
            button_image_url: "../images/fileScan.png",
            button_width: "100",
            button_height: "25",
            button_placeholder_id: "spanButtonPlaceHolder",
            button_text: '<span class="theFont">�ļ������</span>',
            button_text_style: ".theFont { font-size:14px;}",
            button_text_left_padding: 10,
            button_text_top_padding: 4,

            // ���лص����� in handlers.js
            swfupload_preload_handler: preLoad,
            swfupload_load_failed_handler: loadFailed,
            file_queued_handler: fileQueued,
            file_queue_error_handler: fileQueueError,
            //ѡ���ļ���ɻص�
            file_dialog_complete_handler: function(numFilesSelected, numFilesQueued) {
                var me = this;        //�˴���this��swfupload����
                if (numFilesQueued > 0) {
                    //debugger;
                    //dialog.buttons[0].setDisabled(true);
                    //var start = $G(this.customSettings.startUploadId);
                    var start = document.getElementById("startUpload");
                    start.style.display = "";
                    start.onclick = function() {
                        me.startUpload();
                        start.style.display = "none";
                    }
                }
            },
            upload_start_handler: uploadStart,
            upload_progress_handler: uploadProgress,
            upload_error_handler: uploadError,
            upload_success_handler: function(file, serverData) {
                try {
                    var info = eval("(" + serverData + ")");
                } catch (e) { }
                var progress = new FileProgress(file, this.customSettings.progressTarget);
                if (info.state == "SUCCESS") {
                    progress.setComplete();
                    progress.setStatus("<span style='color: #0b0;font-weight: bold'>�ϴ��ɹ�!</span>");
                    filesList.push({ url: info.url, type: info.fileType, original: info.original });
                    progress.toggleCancel(true, this, "�ӳɹ��������Ƴ�");
                } else {
                    progress.setError();
                    progress.setStatus(info.state);
                    progress.toggleCancel(true, this, "�Ƴ�����ʧ���ļ�");
                }

            },
            //�ϴ���ɻص�
            upload_complete_handler: uploadComplete,
            //������ɻص�
            queue_complete_handler: function(numFilesUploaded) {
                // dialog.buttons[0].setDisabled(false);
                //var status = $G("divStatus");
                var status = document.getElementById("divStatus");
                var num = status.innerHTML.match(/\d+/g);
                status.innerHTML = "���ι��ɹ��ϴ� " + ((num && num[0] ? parseInt(num[0]) : 0) + numFilesUploaded) + " ���ļ�";
            }
        };
        swfupload = new SWFUpload(settings);

        //debugger; 
        //���OK��ť
        //        dialog.onok = function() {
        //            var map = fileTypeMaps,
        //                str = "";
        //            for (var i = 0, ci; ci = filesList[i++]; ) {
        //                //var src = editor.options.UEDITOR_HOME_URL + "dialogs/attachment/fileTypeImages/" + (map[ci.type] || "icon_default.png");
        //                var src =  "fileTypeImages/" + (map[ci.type] || "icon_default.png");
        //                str += "<p style='line-height: 16px;'><img src='" + src + "' data_ue_src='" + src + "' />" +
        //                       "<a href='" + editor.options.filePath + ci.url + "'>" + ci.original + "</a></p>";
        //            }
        //            editor.execCommand("insertHTML", str);
        //            swfupload.destroy();
        //        };
        //        dialog.oncancel = function() {
        //            swfupload.destroy();
        //        }
    };
</script>
