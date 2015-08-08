System.config({
  "baseURL": "/res",
  "defaultJSExtensions": true,
  "transpiler": "traceur",
  "paths": {
    "github:*": "packages/github/*",
    "npm:*": "packages/npm/*"
  }
});

System.config({
  "map": {
    "nx": "/res/nx",
    "angular": "github:angular/bower-angular@1.4.3",
    "angular-bootstrap": "github:angular-ui/bootstrap-bower@0.13.2",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "font-awesome": "npm:font-awesome@4.4.0",
    "traceur": "github:jmcriffey/bower-traceur@0.0.90",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.90",
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.3"
    },
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.13"
    }
  }
});
