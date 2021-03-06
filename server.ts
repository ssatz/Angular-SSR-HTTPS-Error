import 'zone.js/dist/zone-node';
import 'reflect-metadata';
const domino = require('domino');
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
const compression = require('compression');
const PORT = process.env.PORT || 9000;
const DIST_FOLDER = join(process.cwd(), 'dist');

//
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html'), 'utf8').toString();
const win = domino.createWindow(template);
global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
    value: () => {
        return {
            enumerable: true,
            configurable: true
        };
    },
});
global['document'] = win.document;
global['$'] = require('jquery');
global['jQuery '] = global['$'];
global['Materialize'] = win.Materialize;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));


app.use(compression());
app.use(function (req, res, next) {
    res.set('accept', '*/*');
    next();
  });
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), { maxAge: '1y' }));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render('index', {
        req: req,
        res: res
    },
    (err: Error, html: string) => {
        res.status(html ? 200 : 500).send(html || err.message);
      });
});

// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
});
