//dom加载完成后执行的js
;
//$(".form-horizontal"),".btn submit-btn"
function ValidAjaxPost(obj, btnSub) {
    $(obj).Validform({
        tiptype: 2,
        btnSubmit: btnSub,
        callback: function (data) {
            AjaxPost($(obj));
            return false;
        }
    });
}

function setCookie(c_name, c_value) {
    window.localStorage.setItem(c_name, c_value);
}

function getCookie(c_name) {
    var val = window.localStorage.getItem(c_name);
    if (empty(val)) {
        val = "";
    }
    return val;
}
function clsCookie(c_name) {
    try {
        window.localStorage.removeItem(c_name);
    } catch (err) {
        // 在此处理错误
    }
}

function clsAllCookie(b_name) {
    try {
        var storage = window.localStorage;
        for (var i = 0; i < storage.length; i++) {
            var k = storage.key(i);
            if (startsWith(k, b_name)) {
                // alert("clsAllCookie:" + k);
                clsCookie(k);
            }
        }
    } catch (err) {
        // 在此处理错误
    }
}


function AjaxPost(form) {
    var target;
    if (form.attr('url') !== undefined) {
        target = form.attr('url');
    } else {
        target = form.get(0).action;
    }
    var query = form.serialize();
    $.post(target, query, function (data) {
        if (data.status == 1) {
            if (data.url) {
                updateAlert(data.info + ' 页面即将自动跳转~', 'success');
                //window.location.href = data.url;
                setTimeout(function () {
                    window.location.href = data.url;
                }, 1000);

            } else {
                updateAlert(data.info, 'success');
            }
        } else {
            updateAlert(data.info);
            setTimeout(function () {
                if (data.url) {
                    location.href = data.url;
                } else {
                    $('#top-alert').find('button').click();
                    //$(that).removeClass('disabled').prop('disabled', false);
                }
            }, 1000);
        }
    });
    return false;
}
$(function () {

    //全选的实现
    $(".check-all").click(function () {
        $(".ids").prop("checked", this.checked);
    });
    $(".ids").click(function () {
        var option = $(".ids");
        option.each(function (i) {
            if (!this.checked) {
                $(".check-all").prop("checked", false);
                return false;
            } else {
                $(".check-all").prop("checked", true);
            }
        });
    });


    $('.ajax-get').click(function () {
        var target;
        var that = this;
        if ($(this).hasClass('confirm')) {
            if (!confirm('确认要执行该操作吗?')) {
                return false;
            }
        }
        if ((target = $(this).attr('href')) || (target = $(this).attr('url'))) {
            $.get(target).success(function (data) {
                if (data.status == 1) {
                    if (data.url) {
                        updateAlert(data.info + ' 页面即将自动跳转~', 'success');
                    } else {
                        updateAlert(data.info, 'success');
                    }
                    setTimeout(function () {
                        if (data.url) {
                            location.href = data.url;
                        } else if ($(that).hasClass('no-refresh')) {
                            $('#top-alert').find('button').click();
                        } else {
                            location.reload();
                        }
                    }, 3000);
                } else {
                    updateAlert(data.info);
                    setTimeout(function () {
                        if (data.url) {
                            location.href = data.url;
                        } else {
                            $('#top-alert').find('button').click();
                        }
                    }, 15000);
                }
            });

        }
        return false;
    });


    $('.ajax-post').click(function () {
        //var demo = $(".form-horizontal");
        //if (!demo.valid()) { //验证通过
        //    return false;
        //}
        var target, query, form;
        var target_form = $(this).attr('target-form');
        var that = this;
        var nead_confirm = false;
        if (($(this).attr('type') == 'submit') || (target = $(this).attr('href')) || (target = $(this).attr('url'))) {
            form = $('.' + target_form);

            if ($(this).attr('hide-data') === 'true') {//无数据时也可以使用的功能
                form = $('.hide-data');
                query = form.serialize();
            } else if (form.get(0) == undefined) {
                updateAlert('没有可操作数据。', 'danger');
                return false;
            } else if (form.get(0).nodeName == 'FORM') {
                if ($(this).hasClass('confirm')) {
                    var confirm_info = $(that).attr('confirm-info');
                    confirm_info = confirm_info ? confirm_info : "确认要执行该操作吗?";
                    if (!confirm(confirm_info)) {
                        return false;
                    }
                }
                if ($(this).attr('url') !== undefined) {
                    target = $(this).attr('url');
                } else {
                    target = form.get(0).action;
                }
                query = form.serialize();
            } else if (form.get(0).nodeName == 'INPUT' || form.get(0).nodeName == 'SELECT' || form.get(0).nodeName == 'TEXTAREA') {
                form.each(function (k, v) {
                    if (v.type == 'checkbox' && v.checked == true) {
                        nead_confirm = true;
                    }
                })
                if (nead_confirm && $(this).hasClass('confirm')) {
                    var confirm_info = $(that).attr('confirm-info');
                    confirm_info = confirm_info ? confirm_info : "确认要执行该操作吗?";
                    if (!confirm(confirm_info)) {
                        return false;
                    }
                }
                query = form.serialize();
            } else {
                if ($(this).hasClass('confirm')) {
                    var confirm_info = $(that).attr('confirm-info');
                    confirm_info = confirm_info ? confirm_info : "确认要执行该操作吗?";
                    if (!confirm(confirm_info)) {
                        return false;
                    }
                }
                query = form.find('input,select,textarea').serialize();
            }
            if (query == '' && $(this).attr('hide-data') != 'true') {
                updateAlert('请勾选操作对象。', 'danger');
                return false;
            }
            $(that).addClass('disabled').attr('autocomplete', 'off').prop('disabled', true);
            $.post(target, query).success(function (data) {
                if (data.status == 1) {
                    if (data.url) {
                        updateAlert(data.info + ' 页面即将自动跳转~', 'success');
                    } else {
                        updateAlert(data.info, 'success');
                    }
                    setTimeout(function () {
                        if (data.url) {
                            location.href = data.url;
                        } else if ($(that).hasClass('no-refresh')) {
                            $('#top-alert').find('button').click();
                            $(that).removeClass('disabled').prop('disabled', false);
                        } else {
                            location.reload();
                        }
                    }, 1500);
                } else {
                    updateAlert(data.info);
                    setTimeout(function () {
                        if (data.url) {
                            location.href = data.url;
                        } else {
                            $('#top-alert').find('button').click();
                            $(that).removeClass('disabled').prop('disabled', false);
                        }
                    }, 1500);
                }
            });
        }
        return false;
    });
    /**顶部警告栏*/
    var content = $('#main');
    var top_alert = $('#top-alert');
    top_alert.find('.close').on('click', function () {
        top_alert.removeClass('block').slideUp(200);
        // content.animate({paddingTop:'-=55'},200);
    });

    window.updateAlert = function (text, c) {

        if (typeof c != 'undefined') {
            var msg = new $.zui.Messager(text, { placement: 'bottom', type: c });
            //var msg = $.messager.show(text, { placement: 'bottom', type: c });
            //var msg = new $.zui.Messager('消息内容', {placement: 'bottom'});
        } else {
            var msg = new $.zui.Messager(text, { placement: 'bottom' });
            //var msg = $.messager.show(text, { placement: 'bottom' });
        }
        msg.show();
    };



    // 独立域表单获取焦点样式
    $(".text").focus(function () {
        $(this).addClass("focus");
    }).blur(function () {
        $(this).removeClass('focus');
    });
    $("textarea").focus(function () {
        $(this).closest(".textarea").addClass("focus");
    }).blur(function () {
        $(this).closest(".textarea").removeClass("focus");
    });
});



//标签页切换(无下一步)
function showTab() {
    $(".tab-nav li").click(function () {
        var self = $(this), target = self.data("tab");
        self.addClass("current").siblings(".current").removeClass("current");
        window.location.hash = "#" + target.substr(3);
        $(".tab-pane.in").removeClass("in");
        $("." + target).addClass("in");
    }).filter("[data-tab=tab" + window.location.hash.substr(1) + "]").click();
}

//标签页切换(有下一步)
function nextTab() {
    $(".tab-nav li").click(function () {
        var self = $(this), target = self.data("tab");
        self.addClass("current").siblings(".current").removeClass("current");
        window.location.hash = "#" + target.substr(3);
        $(".tab-pane.in").removeClass("in");
        $("." + target).addClass("in");
        showBtn();
    }).filter("[data-tab=tab" + window.location.hash.substr(1) + "]").click();

    $("#submit-next").click(function () {
        $(".tab-nav li.current").next().click();
        showBtn();
    });
}

// 下一步按钮切换
function showBtn() {
    var lastTabItem = $(".tab-nav li:last");
    if (lastTabItem.hasClass("current")) {
        $("#submit").removeClass("hidden");
        $("#submit-next").addClass("hidden");
    } else {
        $("#submit").addClass("hidden");
        $("#submit-next").removeClass("hidden");
    }
}

//导航高亮
function highlight_subnav(url) {
    $('#sub_menu').find('a[href="' + url + '"]').closest('li').addClass('active');
}

moduleManager = {
    'install': function (id) {
        $.post(U('admin/module/install'), { id: id }, function (msg) {
            handleAjax(msg);
        })
    },
    'uninstall': function (id) {
        $.post(U('admin/module/uninstall'), { id: id }, function (msg) {
            handleAjax(msg);
        })

    }

}
/**
 * 处理ajax返回结果
 */
function handleAjax(msg) {
    //如果需要跳转的话，消息的末尾附上即将跳转字样
    if (msg.url) {
        msg.info += '，页面即将跳转～';
    }

    //弹出提示消息
    if (msg.status) {
        updateAlert(msg.info, 'success');
    } else {
        updateAlert(msg.info, 'danger');
    }

    //需要跳转的话就跳转
    var interval = 1500;
    if (msg.url == "refresh") {
        setTimeout(function () {
            location.href = location.href;
        }, interval);
    } else if (msg.url) {
        setTimeout(function () {
            location.href = msg.url;
        }, interval);
    }
}

/**
 * 模拟U函数
 * @param url
 * @param params
 * @returns {string}
 * @constructor
 */
function U(url, params, rewrite) {


    if (window.Think.MODEL[0] == 2) {

        var website = window.Think.ROOT + '/';
        url = url.split('/');

        if (url[0] == '' || url[0] == '@')
            url[0] = APPNAME;
        if (!url[1])
            url[1] = 'Index';
        if (!url[2])
            url[2] = 'index';
        website = website + '' + url[0] + '/' + url[1] + '/' + url[2];

        if (params) {
            params = params.join('/');
            website = website + '/' + params;
        }
        if (!rewrite) {
            website = website + '.html';
        }

    } else {
        var website = window.Think.ROOT + '/index.php';
        url = url.split('/');
        if (url[0] == '' || url[0] == '@')
            url[0] = APPNAME;
        if (!url[1])
            url[1] = 'Index';
        if (!url[2])
            url[2] = 'index';
        website = website + '?s=/' + url[0] + '/' + url[1] + '/' + url[2];
        if (params) {
            params = params.join('/');
            website = website + '/' + params;
        }
        if (!rewrite) {
            website = website + '.html';
        }
    }

    if (typeof (window.Think.MODEL[1]) != 'undefined') {
        website = website.toLowerCase();
    }
    return website;
}



admin_image = {
    /**
     *
     * @param obj
     * @param attachId
     */
    removeImage: function (obj, attachId) {
        // 移除附件ID数据
        this.upAttachVal('del', attachId, obj);
        obj.parents('.each').remove();

    },
    /**
     * 更新附件表单值
     * @return void
     */
    upAttachVal: function (type, attachId, obj) {
        var $attach_ids = obj.parents('.controls').find('.attach');
        var attachVal = $attach_ids.val();
        var attachArr = attachVal.split(',');
        var newArr = [];
        for (var i in attachArr) {
            if (attachArr[i] !== '' && attachArr[i] !== attachId.toString()) {
                newArr.push(attachArr[i]);
            }
        }
        type === 'add' && newArr.push(attachId);
        $attach_ids.val(newArr.join(','));
        return newArr;
    }
}

//搜索功能
$("#search").click(function () {
    var url = $(this).attr('url');
    var query = $('.search-form').find('input').serialize();
    query = query.replace(/(&|^)(\w*?\d*?\-*?_*?)*?=?((?=&)|(?=$))/g, '');
    query = query.replace(/^&/g, '');
    if (url.indexOf('?') > 0) {
        url += '&' + query;
    } else {
        url += '?' + query;
    }
    window.location.href = url;
});
//回车搜索
$(".search-input").keyup(function (e) {
    if (e.keyCode === 13) {
        $("#search").click();
        return false;
    }
});

//表单提交后触发
function OnSuccess(data) {
    if (data.status == "1") {
        updateAlert(data.info + ' 页面即将自动跳转~', 'success');
    } else {
        updateAlert(data.info);
    }
    setTimeout(function () {
        if (data.url) {
            location.href = data.url;
        } else {
            $('#top-alert').find('button').click();
            $(this).removeClass('disabled').prop('disabled', false);
        }
    }, 1500);
}

//table
function InitFilePath(files, tableId) {
    $("#" + tableId).html("");
    if (files != null) {
        var filelist = files.split("|");
        for (var i = 0; i < filelist.length; i++) {
            if (filelist[i] != "") {
                var index = filelist[i].lastIndexOf("/");
                var name = filelist[i].substring(index + 1);
                var tr = "<tr><td><a href='" + filelist[i] + "' name='imgList'>" + name + "</a></td><td><a onclick='del(this)' class='btn btn-danger'><i class='icon icon-remove'></i>删除</a></td></tr>";
                $("#" + tableId).append(tr);
            }
        }
    }
}

function AddFilePath(files, tableId) {
    if (files != null) {
        var filelist = files.split("|");
        for (var i = 0; i < filelist.length; i++) {
            if (filelist[i] != "") {
                var index = filelist[i].lastIndexOf("/");
                var name = filelist[i].substring(index + 1);
                var tr = "<tr><td><a href='" + filelist[i] + "' name='imgList'>" + name + "</a></td><td><a onclick='del(this)' class='btn btn-danger'><i class='icon icon-remove'></i>删除</a></td></tr>";
                $("#" + tableId).append(tr);
            }
        }
    }
}
function GetFilePath() {
    var img = $("[name='imgList']");
    var path = "";
    img.each(function (i, n) {
        // path += n.attr("href") + "|";
        path += $(this).attr("href") + "|";
    });
    return path;
}

function del(obj) {
    //alert($(obj).closest("tr").attr("outerHTML"));
    //$(obj).closest("tr").attr("outerHTML","")
    $(obj).closest("tr").remove();
}

function empty(v) {
    switch (typeof v) {
        case 'undefined':
            return true;
        case 'string':
            if (trim(v).length == 0)
                return true;
            break;
        case 'boolean':
            if (!v)
                return true;
            break;
        case 'number':
            if (0 === v)
                return true;
            break;
        case 'object':
            if (null === v)
                return true;
            if (undefined !== v.length && v.length == 0)
                return true;
            for (var k in v) {
                return false;
            }
            return true;
            break;
    }
    return false;
}

function trim(str) {
    for (var i = 0; i < str.length && str.charAt(i) == "  "; i++)
        ;
    for (var j = str.length; j > 0 && str.charAt(j - 1) == "  "; j--)
        ;
    if (i > j)
        return "";
    return str.substring(i, j);
}

$(".form-date").datetimepicker(
{
    language: "zh-CN",
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0,
    format: "yyyy-mm-dd"
});


// 仅选择日期
// 仅选择日期


function getDate(addDay) {
    var myDate = new Date(); //得到时间对象

    myDate.setDate(myDate.getDate() + addDay);

    var y1 = myDate.getFullYear(); //获取年

    var m = myDate.getMonth() + 1; //获取月

    m = m > 9 ? m : "0" + m; //如果月份小于10,则在前面加0补充为两位数字

    var d = myDate.getDate(); //获取日

    d = d > 9 ? d : "0" + d; //如果天数小于10,则在前面加0补充为两位数字

    return y1 + "-" + m + "-" + d; //串联字符串用于输入
}
function getBackDate(date) {
    var myDate = new Date(new Date(date).getTime() - 1 * 24 * 3600 * 1000);

    var y1 = myDate.getFullYear(); //获取年

    var m = myDate.getMonth() + 1; //获取月

    m = m > 9 ? m : "0" + m; //如果月份小于10,则在前面加0补充为两位数字

    var d = myDate.getDate(); //获取日

    d = d > 9 ? d : "0" + d; //如果天数小于10,则在前面加0补充为两位数字

    return y1 + "-" + m + "-" + d; //串联字符串用于输入
}
function getNextDate(date) {
    var myDate = new Date(new Date(date).getTime() + 1 * 24 * 3600 * 1000);

    var y1 = myDate.getFullYear(); //获取年

    var m = myDate.getMonth() + 1; //获取月

    m = m > 9 ? m : "0" + m; //如果月份小于10,则在前面加0补充为两位数字

    var d = myDate.getDate(); //获取日

    d = d > 9 ? d : "0" + d; //如果天数小于10,则在前面加0补充为两位数字

    return y1 + "-" + m + "-" + d; //串联字符串用于输入
}
function getWeekStart() {
    var time = new Date();
    time.setDate(time.getDate() - time.getDay() + 1);
    var y1 = time.getFullYear(); //获取年

    var m = time.getMonth() + 1; //获取月

    m = m > 9 ? m : "0" + m; //如果月份小于10,则在前面加0补充为两位数字

    var d = time.getDate(); //获取日

    d = d > 9 ? d : "0" + d; //如果天数小于10,则在前面加0补充为两位数字

    return y1 + "-" + m + "-" + d; //串联字符串用于输入
}
function getWeekEnd() {
    var time = new Date();
    time.setDate(time.getDate() - time.getDay() + 1);
    time.setDate(time.getDate() + 6);

    var y1 = time.getFullYear(); //获取年

    var m = time.getMonth() + 1; //获取月

    m = m > 9 ? m : "0" + m; //如果月份小于10,则在前面加0补充为两位数字

    var d = time.getDate(); //获取日

    d = d > 9 ? d : "0" + d; //如果天数小于10,则在前面加0补充为两位数字

    return y1 + "-" + m + "-" + d; //串联字符串用于输入
}
function getMonthStart() {
    var time = new Date();
  
    var y1 = time.getFullYear(); //获取年

    var m = time.getMonth() + 1; //获取月

    m = m > 9 ? m : "0" + m; //如果月份小于10,则在前面加0补充为两位数字
    return y1 + "-" + m + "-01"; //串联字符串用于输入
}
function getMonthEnd() {
    var time = new Date();

    var y1 = time.getFullYear(); //获取年

    var m = time.getMonth() + 1; //获取月

    m = m > 9 ? m : "0" + m; //如果月份小于10,则在前面加0补充为两位数字

    time = new Date(y1, m, 0);

    var d = time.getDate();

    return y1 + "-" + m + "-" + d; //串联字符串用于输入
}
function getWeekDate() {
    var myDate = new Date(new Date().getTime() + 6 * 24 * 3600 * 1000);

    var y1 = myDate.getFullYear(); //获取年

    var m = myDate.getMonth() + 1; //获取月

    m = m > 9 ? m : "0" + m; //如果月份小于10,则在前面加0补充为两位数字

    var d = myDate.getDate(); //获取日

    d = d > 9 ? d : "0" + d; //如果天数小于10,则在前面加0补充为两位数字

    return y1 + "-" + m + "-" + d; //串联字符串用于输入
}
function getTime() {
    var myDate = new Date(); //得到时间对象

    var y1 = myDate.getFullYear(); //获取年

    var m = myDate.getMonth() + 1; //获取月

    m = m > 9 ? m : "0" + m; //如果月份小于10,则在前面加0补充为两位数字

    var d = myDate.getDate(); //获取日

    d = d > 9 ? d : "0" + d; //如果天数小于10,则在前面加0补充为两位数字

    var h = myDate.getHours(); //获取小时

    h = h > 9 ? h : "0" + h; //如果小时数字小于10,则在前面加0补充为两位数字

    var M = myDate.getMinutes(); //获取分

    M = M > 9 ? M : "0" + M; //如果分钟小于10,则在前面加0补充为两位数字

    var s = myDate.getSeconds(); //获取秒

    s = s > 9 ? s : "0" + s; //如果秒数小于10,则在前面加0补充为两位数字

    return y1 + "-" + m + "-" + d + " " + h + ":" + M + ":" + s; //串联字符串用于输入
}
function getLastMonthStart() {


    var nowdays = new Date();
    var year = nowdays.getFullYear();
    var month = nowdays.getMonth();
    if (month == 0) {
        month = 12;
        year = year - 1;
    }
    if (month < 10) {
        month = "0" + month;
    }
    return year + "-" + month + "-" + "01";//上个月的第一天
}
function getLastMonthEnd() {

    var nowdays = new Date();
    var year = nowdays.getFullYear();
    var month = nowdays.getMonth();
    if (month == 0) {
        month = 12;
        year = year - 1;
    }
    if (month < 10) {
        month = "0" + month;
    }

    var myDate = new Date(year, month, 0);
    return year + "-" + month + "-" + myDate.getDate();//上个月的最后一天
}
function GenSystemCode(codetype, cid, objId) {
    if ($("#" + objId).val() == "") {
        var url = getApiServerUrl() + "System/CodeRule/GenSystemCode";
        var index = layer.load(0, {
            shade: [0.3, '#fff'] //0.1透明度的白色背景
        });
        $.ajax({
            type: 'post',
            url: url,
            dataType: "JSON",
            data: { "Count": 1, "Cid": cid, "CodeType": codetype },
            success: function (result) {
                if (result.IsSuccessful) {
                    layer.close(index);
                    $("#" + objId).val(result.Data);

                } else {
                    updateAlert(result.ErrorMessage, 'danger');
                    layer.close(index);
                }
                //是否成功

            },
            error: function (json, e) {
                updateAlert(e, 'danger');
                layer.close(index);
            }

        });
    }
}

function GenSystemCodeList(codetype, cid, obj, count) {
    var url = getApiServerUrl() + "System/CodeRule/GenSystemCode";
    var index = layer.load(0, {
        shade: [0.3, '#fff'] //0.1透明度的白色背景
    });
    $.ajax({
        type: 'post',
        url: url,
        dataType: "JSON",
        data: { "Count": count, "Cid": cid, "CodeType": codetype },
        success: function (result) {
            if (result.IsSuccessful) {
                layer.close(index);
                $("#" + obj).val(result.Data);
                $("#" + obj).click();

            } else {
                updateAlert(result.ErrorMessage, 'danger');
                layer.close(index);
            }
            //是否成功
            return "";
        },
        error: function (json, e) {
            updateAlert(e, 'danger');
            layer.close(index);
            return "";
        }

    });
}

function GetShowPath(id, sec) {
    return getKanbanImgUrl() + "?id=" + id + "&interval=" + sec;
}