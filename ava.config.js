export default {
    require: ['esm'],
    "files": [
        "tests/*.js"
    ],
    "sources": [
        "./src/index.js",
    ],
    "cache": true,
    "concurrency": 5,
    "failFast": true,
    "failWithoutAssertions": false,
    "tap": true,
    "verbose": true,
    "compileEnhancements": false,
    "require": [
        "@babel/register",
        "@babel/polyfill"
    ],
    "babel": {
        "testOptions": {
            "presets": [
                "@babel/env"
            ],
            "babelrc": false
        }
    }
}