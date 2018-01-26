$('input:checkbox').each(function () {
    if ($(this).attr('checked') == true)
        this.value = 1;
    else
        this.value = 0;
});