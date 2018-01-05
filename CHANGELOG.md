# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.7.0"></a>
# [1.7.0](https://github.com/palulabs/loog/compare/v1.6.0...v1.7.0) (2018-01-05)


### Features

* **Methods:** Add new 'success' method ([0f3c165](https://github.com/palulabs/loog/commit/0f3c165))
* **Prefixes:** Add `npm` prefix style ([d7858fc](https://github.com/palulabs/loog/commit/d7858fc))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/palulabs/loog/compare/v1.5.1...v1.6.0) (2017-07-29)


### Features

* **Chaining:** Add support for chained method calls ([74a84fe](https://github.com/palulabs/loog/commit/74a84fe))
* **Clear:** Add new `clear` method ([71083fb](https://github.com/palulabs/loog/commit/71083fb))
* **clearLine:** Add clearLine method ([05cdffb](https://github.com/palulabs/loog/commit/05cdffb))
* **Count:** Added count / clearCount methods ([f36458e](https://github.com/palulabs/loog/commit/f36458e))
* **Prefixes:** Allow custom prefixes and process prefix ([4888a4a](https://github.com/palulabs/loog/commit/4888a4a))
* **Track:** Add track / untrack / report methods ([cdd0f3c](https://github.com/palulabs/loog/commit/cdd0f3c))



<a name="1.5.1"></a>
## [1.5.1](https://github.com/palulabs/loog/compare/v1.5.0...v1.5.1) (2017-07-06)



<a name="1.5.0"></a>
# [1.5.0](https://github.com/palulabs/loog/compare/v1.4.0...v1.5.0) (2017-07-05)


### Bug Fixes

* **LogLevel:** Reorder log levels to match npm[@5](https://github.com/5) style ([84aded7](https://github.com/palulabs/loog/commit/84aded7))


### Features

* **Log level:** Read default log level from `process.env.npm_config_loglevel` if exists ([e57c224](https://github.com/palulabs/loog/commit/e57c224))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/palulabs/loog/compare/v1.3.1...v1.4.0) (2017-05-23)


### Bug Fixes

* **logLevel:** Make sure `log` is always enabled (unless muted) ([e2e78da](https://github.com/palulabs/loog/commit/e2e78da))
* **mute:** Change underlying mute value to boolean (from int) ([6c15931](https://github.com/palulabs/loog/commit/6c15931))
* **mute:** Make sure that mute actually prevents logs from being printed ([87ef295](https://github.com/palulabs/loog/commit/87ef295))


### Features

* **Indentation:** Add methods to pause/resume/reset indentation, fix for negative indentation ([87485f2](https://github.com/palulabs/loog/commit/87485f2)), closes [#4](https://github.com/palulabs/loog/issues/4)



<a name="1.3.1"></a>
## [1.3.1](https://github.com/palulabs/loog/compare/v1.3.0...v1.3.1) (2017-05-22)


### Bug Fixes

* **logLevel:** Make sure logLevel is valid when calling setLogLevel ([fa78d92](https://github.com/palulabs/loog/commit/fa78d92))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/palulabs/loog/compare/v1.2.2...v1.3.0) (2017-05-22)


### Features

* **logLevel:** Add `logLevel` config and `setLogLevel` methods ([414a930](https://github.com/palulabs/loog/commit/414a930))
