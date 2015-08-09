#
# Copyright 2015 Alien Laboratories, Inc.
#

import flask
import logging
from flask.ext.injector import FlaskInjector
from flask.ext.markdown import Markdown

from systemjs import SystemJSResolver

LOG = logging.getLogger()


class Main(flask.Flask):

    STATIC_FOLDER = '../webapp/resources'
    STATIC_PATH = '/res'

    """
    Main Flask app.
    """
    def __init__(self):
        super(Main, self).__init__(
            __name__,
            static_folder=Main.STATIC_FOLDER,
            static_url_path=Main.STATIC_PATH,
            template_folder='templates')

        #
        # Home.
        #
        @self.route('/')
        def home():
            return flask.render_template('home.html')

        #
        # Resources
        # JSPM resource loader (e.g., '/package:bootstrap/css/bootstrap.css')
        # TODO(burdon): Don't locate packages under resources?
        #
        systemjs = SystemJSResolver.create(self, static_folder=Main.STATIC_FOLDER, static_path=Main.STATIC_PATH)

        @self.route('/packages')
        def packages():
            return flask.jsonify(systemjs.get_config())

        @self.route('/package:<path:path>')
        def package(path):
            return flask.redirect(systemjs.resolve(path))

        #
        # Docs.
        #
        Markdown(self)

        @self.route('/docs:<filename>')
        def docs(filename):
            return flask.render_template('docs/' + filename + '.md')

        FlaskInjector(app=self, modules=[])

if __name__ == '__main__':
    Main().run(debug=True)
