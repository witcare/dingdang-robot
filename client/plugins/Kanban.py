# -*- coding: utf-8-*-
import socket
import time

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

    if any(ext in text for ext in [u"看板", u"看板看板", u"我的看板"]):
        sendSocket('01')
        #mic.say(u"01看板看板")
    if u"上一页" in text:
        sendSocket('02')
        #mic.say(u"02看板上一页")
    if u"下一页" in text:
        sendSocket('03')
        #mic.say(u"03看板下一页")
        
    #mic.say(text)


def isValid(text):
    """
        Returns True if input is related to the time.

        Arguments:
        text -- user-input, typically transcribed speech
    """
    return any(word in text for word in ["看板","上一页", "下一页"])
