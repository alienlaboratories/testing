#
# Copyright 2015 Alien Laboratories, Inc.
#
import json

import flask
import logging
from flask.ext.injector import FlaskInjector
import jinja2

from nx_util.systemjs import SystemJSResolver

LOG = logging.getLogger()


class Main(flask.Flask):

    STATIC_PATH = '/res'

    STATIC_FOLDER = '../webapp/resources'

    def __init__(self):
        super(Main, self).__init__(
            __name__,
            static_folder=Main.STATIC_FOLDER,
            static_url_path=Main.STATIC_PATH,
            template_folder='templates')

        #
        # JSPM Resources.
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
        # http://flask.pocoo.org/docs/0.10/blueprints/
        #

        from flask import Blueprint, render_template, abort
        from jinja2 import TemplateNotFound

        # Note: can't easily factor out since folder is relative to package (i.e., __name__)
        docs = Blueprint('Render Markdown documents.', __name__, template_folder='../webapp/resources/docs')

        @docs.route('/', defaults={'page': 'index'})
        @docs.route('/<page>')
        def show(page):
            try:
                return render_template('%s.md' % page)
            except TemplateNotFound:
                abort(404)

        from flask.ext.markdown import Markdown
        Markdown(self)

        self.register_blueprint(docs, url_prefix='/docs')

        #
        # Routes.
        #
        @self.route('/')
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
