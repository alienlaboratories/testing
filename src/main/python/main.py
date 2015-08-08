#
# Copyright 2015 Alien Laboratories, Inc.
#

import flask
import logging
from flask.ext.injector import FlaskInjector
from flask.ext.markdown import Markdown

LOG = logging.getLogger()


class Main(flask.Flask):

    """
    Main Flask app.
    """
    def __init__(self):
        super(Main, self).__init__(
            __name__,
            static_url_path='/res',
            static_folder='../webapp/resources',
            template_folder='templates')

        Markdown(self)

        @self.route('/')
        def home():
            return flask.render_template('home.html')

        @self.route('/docs/<filename>')
        def docs(filename):
            return flask.render_template('docs/' + filename + '.md')

        FlaskInjector(app=self, modules=[])

if __name__ == '__main__':
    Main().run()
