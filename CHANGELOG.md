# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
