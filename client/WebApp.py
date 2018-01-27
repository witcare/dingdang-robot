import sys

from PyQt5.QtCore import *
from PyQt5.QtWidgets import *
from PyQt5.QtWebKitWidgets import *

class WebApp:
    def __init__(self):
        super(Form, self).__init__(parent)

        # self.setWindowOpacity(1)
        # self.setWindowFlags(Qt.FramelessWindowHint)
        # self.setAttribute(Qt.WA_TranslucentBackground)
        # self.showFullScreen()
        rect = QApplication.desktop().screenGeometry()
        self.resize(rect.width(), rect.height())
        self.setWindowFlags(Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint)

        self.webview = QWebView()

        vbox = QVBoxLayout()
        vbox.addWidget(self.webview)

        main = QGridLayout()
        main.setSpacing(0)
        main.addLayout(vbox, 0, 0)

        self.setLayout(main)

        # self.setWindowTitle("CoDataHD")
        # webview.load(QUrl('http://www.cnblogs.com/misoag/archive/2013/01/09/2853515.html'))
        # webview.show()

    def load(self, url):
        self.webview.load(QUrl(url))
        self.webview.show()
