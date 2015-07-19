# airstrip

Where nomad stories land daily

[airstrip.io](https://airstrip.io)

## Build status

`prod`    | `matser`   |
--------|----------|
[![Build Status](https://travis-ci.org/sungwoncho/airstrip.svg?branch=prod)](https://travis-ci.org/sungwoncho/airstrip) | [![Build Status](https://travis-ci.org/sungwoncho/airstrip.svg?branch=master)](https://travis-ci.org/sungwoncho/airstrip)


## Continuous Deployment

`secrets.tar.enc` is decrypted and decompressed before the build runs. It
 contains the following files:

* `mup.json`, `settings.json`: configurations for Meteor Up.
* `digital_ocean`: private key to access digital ocean droplet while deploying.

Any commits pushed to `prod` branch will be deployed after successful build on TravisCI.
Work on your feature branch and merge them to `master` before pushing to `prod`.


## Contributing

You may open an issue with suggestions and feedback. See [airstrip roadmap](https://trello.com/b/XLaDBggV/airstrip-roadmap) for planned features.

Please respect our [code of conduct](https://github.com/sungwoncho/airstrip/blob/master/CODE_OF_CONDUCT.md)


## References

[Making airstrip.io](https://sungwoncho.io/making-airstrip-io/)


## Lisence

airstrip is a free software released under the term specified in [LICENSE](https://github.com/sungwoncho/airstrip/blob/master/LICENSE) file.
