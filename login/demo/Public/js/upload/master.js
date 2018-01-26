$(function () {
    
    //图片上传-------------------------------------imgupload---------------------

    var imgbox = {};
    var childs = $(".imgcontainer:eq(0)").html();
    $(".uploadbox").click(function () {
        var tag = $(this).attr("data-count");
        if (tag == "1") return false;
        $("#imgFlie").click();
        imgbox = $(this);
        var stm1 = setInterval(function () {
            var imgstr = $("#imgFlie").val();
            if (imgstr != "") {
                clearInterval(stm1);
                $("#ImgForm input[type='submit']").click();
            }
        }, 500);
        return false;
    });

    // 取消照片
    $(".closespan").click(function (e) {
        e.stopPropagation();
        var sum = $(".uploadbox img").length;
        // 保证有一个框可以让用户再次选择 需要显示childs 设置data-count属性 必要的再隐藏
        var imgsrc = $(this).next().find("img").attr("src");
        $(this).next().html("").append(childs);
        // 隐藏关闭和成功提示
        $(this).hide();
        $(this).siblings(".infospan").hide();
        $(this).parent().attr("data-count", 0).insertBefore($(".inputdiv"));;

        if (sum < 4) {//说明此时是有一个再准备状态，这个可以直接做删除处理 
            // 设置data-count 并隐藏父级
            $(this).parent().hide();
            //需要移位 保证准备状态的总是在最后一个  
        }
        // 清除session 减少一个字符串
        if (imgsrc != undefined) {
            $.post("/Home/DeleteImg", { str: imgsrc }, function () {

            });
        }
        if (sum == 1) {
            $('#Remark,#imgsubmit').attr("disabled", "disabled");
        }

    });

    //----------上传图片---------------------------------------------
    $("#imgsubmit").click(function () {
        var imgcontent = $.trim($("#Remark").val());
        $.post("/Home/SaveImgs", { content: imgcontent }, function (data) {
            if (data == 1) {
                //清除content
                $(".imgcontainer").html(childs);
                //隐藏进度条和关闭键
                $(".closespan,.infospan").hide();
                $(".imguploadmessage").html("上传成功!");
                //禁止输入框和提交按钮
                $('#Remark,#imgsubmit').attr("disabled", "disabled");
                //去掉data-count 属性 显示第一个；
                $(".uploadbox").attr("data-count", 0).hide().eq(0).show();
                //清空
                $("#Remark").val("");
                var stt = setTimeout(function () {
                    $("#imgupload").modal('hide');
                    $(".imguploadmessage").html("");
                    clearTimeout(stt);
                }, 1000);
            }
        });
    });

    $('#ImgForm').ajaxForm({
        beforeSend: function () {
            imgbox.find(".infospan").show();
        },
        success: function (data) {
            $("#imgFlie").val("");//
            imgbox.find(".imgcontainer").html(data);//.hide()
            var img = imgbox.find(".imgcontainer").find("img").attr("src");
            if (img != undefined) {
                //解禁
                $('#Remark').removeAttr("disabled");
                $('#imgsubmit').removeAttr("disabled");
                imgbox.find(".infospan,.closespan").show();
                imgbox.find(".infospan").html("上传成功！");
                //显示下一个
                //imgbox.next().show();
                $(".uploadbox:hidden").eq(0).show();

                imgbox.attr("data-count", "1");
            } else {
                imgbox.find(".infospan,.closespan").hide();
            }
            // alert(img);
        }, complete: function (xhr) {
            $("#imgFlie").val("");
        }
    });
});