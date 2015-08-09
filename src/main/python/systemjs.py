# Util

import json
import os
import re


class SystemJSResolver(object):
    """
    https://github.com/jspm/registry/wiki/Configuring-Packages-for-jspm
    """

    @staticmethod
    def create(app, static_folder, static_path):

        # Load config
        # http://flask.pocoo.org/docs/0.10/api/#flask.Flask.open_resource
        with app.open_resource(os.path.join(static_folder, 'config.js')) as f:
            contents = f.read().replace('\n', '')

        return SystemJSResolver(static_path, contents)

    def __init__(self, static_path, config_script):
        self.static_path = static_path

        # Parse config into single object.
        self.config = {}
        import re
        pattern = re.compile('System\.config\((.*?)\);', re.MULTILINE)
        for match in pattern.findall(config_script):
            obj = json.loads(match)
            # Merge config declarations.
            self.config = {key: value for (key, value) in (self.config.items() + obj.items())}

    def get_config(self):
        return self.config

    def resolve(self, path):
        """
        [config.js]

            System.config({
              "paths": {
                "github:*": "packages/github/*"
              }
            });

            System.config({
              "map": {
                "angular": "github:angular/bower-angular@1.4.3"
              }
            });

        :param path:
        :return:
        """

        # Resolve against map.
        match = re.match(r'(\w+)/?(.*)', path)
        component = self.config['map'].get(match.group(1))
        if not component:
            raise 'Invalid path: %s' % path

        filepath = os.path.join(component, match.group(2))

        # Resolve against paths.
        for key, value in self.config['paths'].iteritems():
            p = re.compile(key.replace('*', '(.*)'))
            m = p.match(filepath)
            if m:
                filepath = re.sub(p, value, filepath).replace('*', m.group(1))
                break

        redirect = os.path.join(self.static_path, filepath)
        return redirect
