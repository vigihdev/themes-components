// paths.js
const path = require("path");

const envs = [
    process.env?.BASEPATH_THEMES_COMPONENTS,
    process.env?.NODE_MODULES_THEMES_COMPONENTS,
    process.env?.ASSETS_THEMES_COMPONENTS,
];

envs.forEach(env => {
    if (typeof env !== 'string') {
        throw new Error(`Env ${env} is not defined`);
    }
});

const BASEPATH = path.resolve(process.env.PWD, process.env.BASEPATH_THEMES_COMPONENTS);
const NODE = path.resolve(process.env.PWD, process.env.NODE_MODULES_THEMES_COMPONENTS);
const ASSETS = path.resolve(process.env.PWD, process.env.ASSETS_THEMES_COMPONENTS)

module.exports.Paths = {
    BASEPATH: BASEPATH,
    ASSETS: ASSETS,
    NODE: NODE,
}
