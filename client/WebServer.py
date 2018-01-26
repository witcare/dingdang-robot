import SimpleHTTPServer
import SocketServer
import io


class Handler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_GET(self):
				return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self) 


def StartServer(webport,webpath):
		print('Server listening on port '+webport+'...')
		httpd = SocketServer.TCPServer((webpath, webport), Handler)
		httpd.serve_forever()