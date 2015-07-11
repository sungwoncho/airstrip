# airstrip.io

Where nomad stories land daily.

## Build status

* `prod`

[![Build Status](https://magnum.travis-ci.com/sungwoncho/airstrip.svg?token=hGE2stF83pPqiLgUqVjc&branch=prod)](https://magnum.travis-ci.com/sungwoncho/airstrip)


## Continuous Deployment

`secrets.tar.enc` is decrypted and decompressed before the build runs. It
 contains the following files:

* `mup.json`, `settings.json`: configurations for Meteor Up.
* `digital_ocean`: private key to access digital ocean droplet while deploying.

Any commits pushed to `prod` branch will be deployed after successful build on TravisCI.
Work on your feature branch and merge them to `master` before pushing to `prod`.
