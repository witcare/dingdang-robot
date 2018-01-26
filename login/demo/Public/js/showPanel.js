
//$('#CATEGORY').selectedValue(@ViewBag.Type);
//回车搜索
function searchClick(url,id, name) {
        var query = $('.search-form').find('input').serialize();
        query = query.replace(/(&|^)(\w*?\d*?\-*?_*?)*?=?((?=&)|(?=$))/g, '');
        query = query.replace(/^&/g, '');
        if (url.indexOf('?') > 0) {
            url += '&' + query;
        } else {
            url += '?' + query;
        }
        if (url.indexOf('?') > 0) {
            url += '&' + "formId=" + id;
        } else {
            url += '?' + "formId=" + id;
        }
        if (url.indexOf('?') > 0) {
            url += '&' + "formName=" + name;
        } else {
            url += '?' + "formName=" + name;
        }
        window.location.href = url;
}
function InitUrl(url) {
    var query = $('.search-form').find('input').serialize();
    query = query.replace(/(&|^)(\w*?\d*?\-*?_*?)*?=?((?=&)|(?=$))/g, '');
    query = query.replace(/^&/g, '');
    if (url.indexOf('?') > 0) {
        url += '&' + query;
    } else {
        url += '?' + query;
    }
    return url;
}

function AppendParameter(url, name, value) {
    if (url.indexOf('?') > 0) {
        url += '&' + name + "=" + value;
    } else {
        url += '?' + name + "=" + value;
    }
    return url;
}
//重置
function reSet(id, name) {
    //var index = parent.layer.getFrameIndex(window.name);
    var objPerson = parent.document.getElementById(id);
    var objPersonName = parent.document.getElementById(name);
    if (objPerson != null)
        objPerson.value = "";
    if (objPersonName != null)
        objPersonName.value = "";
    parent.layer.closeAll(); //执行关闭desc

}
function selectCode(id, name,prarentId,prarentName) {
    //var index = parent.layer.getFrameIndex(window.name);
    var objPerson = parent.document.getElementById(prarentId);
    var objPersonName = parent.document.getElementById(prarentName);
    if (objPerson != null)
        objPerson.value = id;
    if (objPersonName != null)
        objPersonName.value = name;
    parent.layer.closeAll(); //执行关闭desc
}
function selectCode3(value1, value2, value3, obj1, obj2, obj3) {
    //var index = parent.layer.getFrameIndex(window.name);
    var obj = parent.document.getElementById(obj1);
    if (obj != null)
        obj.value = value1;

    obj = parent.document.getElementById(obj2);
    if (obj != null)
        obj.value = value2;

    obj = parent.document.getElementById(obj3);
    if (obj != null)
        obj.value = value3;

    parent.layer.closeAll(); //执行关闭desc
}
function cancleSelect() {
    parent.layer.closeAll(); //执行关闭desc
}
function selectDictionary(aryObj, aryValue) {
    //var index = parent.layer.getFrameIndex(window.name);
    for (var i = 0; i < aryObj.length; i++) {
        var obj = parent.document.getElementById(aryObj[i]);
        if (obj != null)
            obj.value = aryValue[i];
    }
    parent.layer.closeAll(); //执行关闭desc
}

function selectCodePair(aryObj) {
    //var index = parent.layer.getFrameIndex(window.name);
    for (var i = 0; i < aryObj.length; i=i+2) {
        var obj = parent.document.getElementById(aryObj[i]);
        if (obj != null)
            obj.value = aryObj[i + 1];
    }
    parent.layer.closeAll(); //执行关闭desc
}