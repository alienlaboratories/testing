#
# Copyright 2015 Alien Laboratories, Inc.
#
import json

import flask
import logging
from flask.ext.injector import FlaskInjector
from flask.ext.markdown import Markdown
import os

LOG = logging.getLogger()


class Main(flask.Flask):

    STATIC_PATH = '/res'
    STATIC_FOLDER = '../webapp/resources'

    """
    Main Flask app.
    """
    def __init__(self):
        super(Main, self).__init__(
            __name__,
            static_url_path=Main.STATIC_PATH,
            static_folder=Main.STATIC_FOLDER,
            template_folder='templates')

        # Home.
        @self.route('/')
        def home():
            return flask.render_template('home.html')

        # Docs.
        Markdown(self)

        @self.route('/docs:<filename>')
        def docs(filename):
            return flask.render_template('docs/' + filename + '.md')

        # TODO(burdon): Factor out.
        # JSPM resource loader (e.g., '/package:bootstrap/css/bootstrap.css')
        @self.route('/package:<path:path>')
        def res(path):

            # Load config
            # http://flask.pocoo.org/docs/0.10/api/#flask.Flask.open_resource
            with self.open_resource(os.path.join(Main.STATIC_FOLDER, 'config.js')) as f:
                contents = f.read().replace('\n', '')

            # Parse config into single object.
            config = {}
            import re
            pattern = re.compile('System\.config\((.*?)\);', re.MULTILINE)
            for match in pattern.findall(contents):
                obj = json.loads(match)
                # Merge config declarations.
                config = {key: value for (key, value) in (config.items() + obj.items())}

            # Resolve against map.
            match = re.match(r'(\w+)/?(.*)', path)
            component = config['map'].get(match.group(1))
            if component:
                filepath = os.path.join(component, match.group(2))

                # Resolve against path.
                for key, value in config['paths'].iteritems():
                    p = re.compile(key.replace('*', '(.*)'))
                    m = p.match(filepath)
                    if m:
                        filepath = re.sub(p, value, filepath).replace('*', m.group(1))
                        break

                redirect = os.path.join(Main.STATIC_PATH, filepath)
                return flask.redirect(redirect)

            import logging
            logging.error('Resource not found: %s' % path)
            return flask.abort(404)

        FlaskInjector(app=self, modules=[])

if __name__ == '__main__':
    Main().run(debug=True)
