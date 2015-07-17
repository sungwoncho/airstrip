# airstrip.io

Where nomad stories land daily.

Author's blog article: [Making airstrip.io](https://sungwoncho.io/making-airstrip-io/)

## Build status

* `prod`

[![Build Status](https://magnum.travis-ci.com/sungwoncho/airstrip.svg?token=hGE2stF83pPqiLgUqVjc&branch=prod)](https://magnum.travis-ci.com/sungwoncho/airstrip)

* `master`

[![Build Status](https://magnum.travis-ci.com/sungwoncho/airstrip.svg?token=hGE2stF83pPqiLgUqVjc&branch=master)](https://magnum.travis-ci.com/sungwoncho/airstrip)


## Continuous Deployment

`secrets.tar.enc` is decrypted and decompressed before the build runs. It
 contains the following files:

* `mup.json`, `settings.json`: configurations for Meteor Up.
* `digital_ocean`: private key to access digital ocean droplet while deploying.

Any commits pushed to `prod` branch will be deployed after successful build on TravisCI.
Work on your feature branch and merge them to `master` before pushing to `prod`.


## Contributing

Issues and pull requests are welcome. Let's make this better.

Please see [airstrip roadmap](https://trello.com/b/XLaDBggV/airstrip-roadmap) for more information.


## Lisence

airstrip is a free software released under the term specified in [LICENSE](https://github.com/sungwoncho/airstrip/blob/master/LISENCE) file.
