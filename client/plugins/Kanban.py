# -*- coding: utf-8-*-
import socket
import time
import urllib2

WORDS = [u"KANBAN", u"SHANGYIYE", u"XIAYIYE"]
SLUG = "kanban"

def sendSocket(code):
    sk = socket.socket()
    sk.connect(("127.0.0.1", 9008))  # 主动初始化与服务器端的连接
    send_data1 = code
    #sk.sendall(bytes(send_data1, encoding="utf8"))
    sk.sendall(send_data1.encode("UTF-8"))
    sk.close()

def handle(text, mic, profile, wxbot=None):
    """
        Reports the current time based on the user's timezone.

        Arguments:
        text -- user-input, typically transcribed speech
        mic -- used to interact with the user (for both input and output)
        profile -- contains information related to the user (e.g., phone
                   number)
        wxBot -- wechat robot
    """
    if any(ext in text for ext in [u"首页", u"返回首页", u"开机页面"]):
        sendSocket('0000')
        mic.say(u"即将返回开机页面")
    if any(ext in text for ext in [u"看板", u"生产看板", u"异常看板"]):
        sendSocket('0101')
        mic.say(u"即将打开看板页面")
        #mic.say(u"01看板看板")
    if any(ext in text for ext in [u"上一页", u"上页", u"上", u"往上", u"前", u"往前"]):
        sendSocket('0102')
        #mic.say(u"02看板上一页")
    if any(ext in text for ext in [u"下一页", u"下页", u"下", u"往下", u"后", u"往后"]):
        sendSocket('0103')
    if any(ext in text for ext in [u"报工", u"生产报工"]):
        sendSocket('0201')
        mic.say(u"即将打开报工页面")
    if any(ext in text for ext in [u"缺料", u"生产缺料"]):
        sendSocket('0301')
        mic.say(u"缺料信息已经提交，将发送短信给相关负责人，并打开报警灯")
        try:
            s = urllib2.urlopen("http://saasapi.jitmes.com/api/Demo/IotDevice/Button?reader=435af433d87c6c69&address=8D77764C&button=01").read()  
        except urllib2.HTTPError,e:
            print e.code
    if any(ext in text for ext in [u"设备故障", u"设备报修"]):
        sendSocket('0401')
        mic.say(u"设备报修通知已经提交，将发送短信给相关负责人，并打开报警灯")
        try:
            s = urllib2.urlopen("http://saasapi.jitmes.com/api/Demo/IotDevice/Button?reader=435af433d87c6c69&address=8D77764C&button=02").read()  
        except urllib2.HTTPError,e:
            print e.code
    if any(ext in text for ext in [u"作业指导书"]):
        sendSocket('0501')
        mic.say(u"即将打开作业指导书页面")
    if any(ext in text for ext in [u"打开报警灯"]):
        sendSocket('0601')
        mic.say(u"即将打开报警灯")
        try:
            s = urllib2.urlopen("http://saasapi.jitmes.com/api/Demo/IotDevice/Button?reader=435af433d87c6c69&address=8D77764C&button=01").read()  
        except urllib2.HTTPError,e:
            print e.code
    if any(ext in text for ext in [u"关闭报警灯"]):
        sendSocket('0602')
        mic.say(u"即将关闭报警灯")
        try:
            s = urllib2.urlopen("http://saasapi.jitmes.com/api/Demo/IotDevice/Button?reader=435af433d87c6c69&address=8D77764C&button=10").read()  
        except urllib2.HTTPError,e:
            print e.code
        #mic.say(u"03看板下一页")
        
    #mic.say(text)


def isValid(text):
    """
        Returns True if input is related to the time.

        Arguments:
        text -- user-input, typically transcribed speech
    """
    return any(word in text for word in ["首页","返回首页","开机页面","看板","生产看板","异常看板","上一页", "下一页","上页", "下页", "报工", "生产报工", "缺料", "设备故障", "设备报修", "作业指导书", "上", "下", "前", "后", "往上", "往下", "往前", "往后", "打开报警灯", "关闭报警灯"])
