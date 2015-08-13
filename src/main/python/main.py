#
# Copyright 2015 Alien Laboratories, Inc.
#

import flask
import json
import logging
from flask.ext.injector import FlaskInjector

from nx_util.systemjs import systemjs
from nx_util.docs import docs

LOG = logging.getLogger()


class Main(flask.Flask):

    def __init__(self):
        super(Main, self).__init__(
            __name__,
            static_folder='../webapp/resources',
            static_url_path='/res',
            template_folder='templates')

        #
        # JSPM Resources.
        #
        self.register_blueprint(systemjs)

        #
        # Docs.
        #
        self.register_blueprint(docs, url_prefix='/docs')

        #
        # Routes.
        #
        @self.route('/')
        @self.route('/demo')
        def home():
            return flask.render_template('home.html')

        # TODO(burdon): Factor out test.
        @self.route('/data/<path>')
        def data(path):
            result = {}

            if path == 'config':
                import datetime
                result['timestamp'] = datetime.datetime.utcnow()

            if path == 'users':
                import os
                with self.open_resource(os.path.join('../webapp/resources/data', 'users.json')) as f:
                    contents = f.read()

                result = json.loads(contents)

            return flask.jsonify(result)

        #
        # Injector.
        #
        FlaskInjector(app=self, modules=[])

if __name__ == '__main__':
    Main().run(debug=True)
