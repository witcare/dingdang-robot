function writePageHeader(t) {
    if (empty(t)) {
        t = "智能车间";
    }
    document.write('<aside class="bg-primary aside-sm" id="nav">'
            + '<section class="vbox">'
            + '<header class="dker nav-bar nav-bar-fixed-top">'
            + '<a class="btn btn-link visible-xs" data-toggle="class:nav-off-screen" data-target="#nav"> <i class="fa fa-bars"></i></a>'
            + '<a href="#" class="nav-brand">智能车间</a> <a href="index.html" class="btn btn-link visible-xs"> <i class="fa fa-home"></i></a>'
            + '</header>'
            + '<section>'
            + '<!-- nav -->'
            + '<nav class="nav-primary hidden-xs">'
            + '<ul class="nav">'
            + '<li class="active"><a href="index.html"> <i class="fa fa-home"></i> <span>首页</span></a></li>'
            + '<li><a href="kitting.html"> <i class="fa fa-tag"></i> <span>车辆投产</span></a></li>'
            + '<li><a href="#"> <i class="fa fa-pencil-square-o"></i> <span>车辆状态登记</span></a></li>'
            + '<li><a href="carinfo.html"> <i class="fa fa-search"></i> <span>车辆查询</span></a></li>'
            + '<li><a href="#"> <i class="fa fa-dropbox"></i> <span>标签回收</span></a></li>'
            + '<li><a href="#"> <i class="fa fa-cogs"></i> <span>系统设置</span></a></li>'
            + '<li><a href="#" onclick="logout();"> <i class="fa fa-times"></i> <span>注销</span></a></li>'
            + '</ul>'
            + '</nav>'
            + '<!-- / nav -->'
            + '</section>'
            + '</section>'
            + '</aside>');
}
function writePageFooter(t) {
    document.write('<footer id="footer">'
            + '<div class="text-center padder clearfix">'
            + '<p>'
            + '<small>Copyright &copy; 2015~2015 当前版本v1.0.0</small>'
            + '</p>'
            + '</div>'
            + '</footer>');
}