# airstrip.io

Where nomad stories land daily.

## Build status

**production** [![Build Status](https://magnum.travis-ci.com/sungwoncho/airstrip.svg?token=hGE2stF83pPqiLgUqVjc&branch=prod)](https://magnum.travis-ci.com/sungwoncho/airstrip)


## Continuous Deployment

`secrets.tar.enc` is decrypted and decompressed before the build runs. It
 contains the following files:

* `mup.json`, `settings.json`: configurations for Meteor Up.
* `digital_ocean`: private key to access digital ocean droplet while deploying.
