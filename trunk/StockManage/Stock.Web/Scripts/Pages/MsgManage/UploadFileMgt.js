var swfu;

window.onload = function() {

    //自适应宽度和高度
    $(window).bind('resize', function() {
        var body_height;
        var body_width;
        var body = $(window);
        if (body != null) {
            body_height = body.get(0).innerHeight;
            body_height = document.documentElement.clientHeight;
            body_width = $("#divUpload").width();
            jQuery("#GRD_Upload").setGridWidth(body_width);
            jQuery("#GRD_Upload").setGridHeight(body_height - 243);
        }

    }).trigger('resize');


    //swfUpload配置
    var settings = {
        flash_url: "../../Scripts/swfUpload/swfupload/swfupload.swf",
        upload_url: "UploadFileMgt.ashx",
        file_size_limit: "2048 MB",
        file_types: "*.*",
        file_types_description: "All Files",
        file_upload_limit: 100,
        file_queue_limit: 0,
        custom_settings: {

            progressTarget: "divprogresscontainer",
            progressGroupTarget: "divprogressGroup",

            //progress object
            container_css: "progressobj",
            icoNormal_css: "IcoNormal",
            icoWaiting_css: "IcoWaiting",
            icoUpload_css: "IcoUpload",
            fname_css: "fle ftt",
            state_div_css: "statebarSmallDiv",
            state_bar_css: "statebar",
            percent_css: "ftt",
            href_delete_css: "deletecss",

            //sum object
            /*
            页面中不应出现以"cnt_"开头声明的元素
            */
            s_cnt_progress: "cnt_progress",
            s_cnt_span_text: "fle",
            s_cnt_progress_statebar: "cnt_progress_statebar",
            s_cnt_progress_percent: "cnt_progress_percent",
            s_cnt_progress_uploaded: "cnt_progress_uploaded",
            s_cnt_progress_size: "cnt_progress_size"
        },
        debug: false,

        // Button settings
        button_image_url: "../../Scripts/swfUpload/images/MsgUploadBtn.png",
        button_width: "130",
        button_height: "40",
        button_placeholder_id: "spanButtonPlaceHolder",
        //button_text: '<span class="theFont">上传文件</span>',
        //button_text: '选择文件',
        button_text_style: ".theFont { font-size: 50;color:#0068B7; }",
        button_text_left_padding: 12,
        button_text_top_padding: 3,

        // The event handler functions are defined in handlers.js
        file_queued_handler: fileQueued,
        file_queue_error_handler: fileQueueError,
        upload_start_handler: uploadStart,
        upload_progress_handler: uploadProgress,
        upload_error_handler: uploadError,
        upload_success_handler: uploadSuccess,
        upload_complete_handler: uploadComplete
        //file_dialog_complete_handler: fileDialogComplete
    };
    swfu = new SWFUpload(settings);



};



function UploadFiles() {
    var grid = jQuery("#GRD_Upload");
    var rowKey = grid.getGridParam("selrow");
    if (rowKey) {
        swfu.startUpload();

    }
    else {
        $.messager.alert('提示', '<div style="text-align:left;"><br>请选择一种报文类型</div>', 'info');
    }

}

function getSelectedRow() {
    var grid = jQuery("#GRD_Upload");
    var rowKey = grid.getGridParam("selrow");
    if (rowKey) {
        $.ajax(
                {
                    url: "UploadFileMgt.aspx?msgID=" + rowKey,
                    type: "GET"
                });
    }
    else
        alert("No rows are selected");
}

