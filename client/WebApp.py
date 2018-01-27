import SimpleHTTPServer
import SocketServer
import io


class WebApp(object):
    def __init__(self):
        self._logger = logging.getLogger(__name__)

        # Create config dir if it does not exist yet
        if not os.path.exists(dingdangpath.CONFIG_PATH):
            try:
                os.makedirs(dingdangpath.CONFIG_PATH)
            except OSError:
                self._logger.error("Could not create config dir: '%s'",
                                   dingdangpath.CONFIG_PATH, exc_info=True)
                raise

        # Check if config dir is writable
        if not os.access(dingdangpath.CONFIG_PATH, os.W_OK):
            self._logger.critical("Config dir %s is not writable. Dingdang " +
                                  "won't work correctly.",
                                  dingdangpath.CONFIG_PATH)

        config_file = dingdangpath.config('profile.yml')
        # Read config
        self._logger.debug("Trying to read config file: '%s'", config_file)
        try:
            with open(config_file, "r") as f:
                self.config = yaml.safe_load(f)
        except OSError:
            self._logger.error("Can't open config file: '%s'", config_file)
            raise

        try:
            stt_engine_slug = self.config['stt_engine']
        except KeyError:
            stt_engine_slug = 'sphinx'
            logger.warning("stt_engine not specified in profile, defaulting " +
                           "to '%s'", stt_engine_slug)
        stt_engine_class = stt.get_engine_by_slug(stt_engine_slug)

        try:
            slug = self.config['stt_passive_engine']
            stt_passive_engine_class = stt.get_engine_by_slug(slug)
        except KeyError:
            stt_passive_engine_class = stt_engine_class

        try:
            tts_engine_slug = self.config['tts_engine']
        except KeyError:
            tts_engine_slug = tts.get_default_engine_slug()
            logger.warning("tts_engine not specified in profile, defaulting " +
                           "to '%s'", tts_engine_slug)
        tts_engine_class = tts.get_engine_by_slug(tts_engine_slug)

        # Initialize Mic
        self.mic = Mic(
            self.config,
            tts_engine_class.get_instance(),
            stt_passive_engine_class.get_passive_instance(),
            print("[WebApp.py] {ver}".format(ver="1.0.0"))


		def go(u):
   		 	check_versions()
    		sys.excepthook = cef.ExceptHook  # To shutdown all CEF processes on error
    		cef.Initialize()
    		cef.CreateBrowserSync(url=u,
                          window_title="Hello World!")
    		cef.MessageLoop()
    		cef.Shutdown()


		def check_versions():
    		print("[hello_world.py] CEF Python {ver}".format(ver=cef.__version__))
    		print("[hello_world.py] Python {ver} {arch}".format(
          	ver=platform.python_version(), arch=platform.architecture()[0]))
				assert cef.__version__ >= "55.3", "CEF Python v55.3+ required to run this"