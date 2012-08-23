[![build status](https://secure.travis-ci.org/dscape/futoncli.png)](http://travis-ci.org/dscape/futoncli)
# futoncli

*futon on your command line*

<a href="http://codestre.am/4fd7fdf69582b28f1f01c7bf"><img src="https://github.com/dscape/futoncli/raw/master/assets/play.png" alt="play futon command line client video in codestream"></a>

## overview

[futoncli](https://github.com/dscape/futoncli) is a [command line tool](http://en.wikipedia.org/wiki/Command-line_interface) for managing and interacting with [couchdb](http://couchdb.apache.org). it's open-source and easy to use.

`futoncli` requires `npm`, the [node package manager](http://npmjs.org).

## one-line npm install

    [sudo] curl http://npmjs.org/install.sh | sh

## one-line futoncli install

    [sudo] npm install futon -g

## mantra

`futoncli` is designed with serendipity in mind. you should be able to work with it without the need for instructions.

`futoncli` uses [nano](http://github.com/dscape/nano) under the hood, so most of the code is actually there. 

even thought `futoncli` works it is not a finished product as it was hacked together in a couple of hours. you are likely to find problems with it and you are encouraged to send in a pull request for any issue you find.

## .futoncliconf file

all configuration data for your local `futoncli` install is located in the *.futoncliconf* file in your home directory. directly modifying this file is not really advised. you should be able to make all configuration changes via:

    futon config

## tests

check [issues]. (hint: no tests)

## contribute

everyone is welcome to contribute with patches, bug-fixes and new features. check roadmap for ideas of things i know are broken. also issues.

1. create an [issue][2] on github so the community can comment on your idea
2. fork `futoncli` in github
3. create a new branch `git checkout -b my_branch`
4. create tests for the changes you made
5. make sure you pass both existing and newly inserted tests
6. commit your changes
7. push to your branch `git push origin my_branch`
8. create a pull request

to run tests make sure you npm test but also run tests without mocks:

## meta

* code: `git clone git://github.com/dscape/futoncli.git`
* home: <http://github.com/dscape/futoncli>
* bugs: <http://github.com/dscape/futoncli/issues>

`(oo)--',-` in [caos][3]

!["futoncli"](https://github.com/dscape/futoncli/raw/master/assets/screen.png "futon command line client")

## license

copyright 2011 nuno job <nunojob.com> (oo)--',--

licensed under the apache license, version 2.0 (the "license");
you may not use this file except in compliance with the license.
you may obtain a copy of the license at

    http://www.apache.org/licenses/license-2.0

unless required by applicable law or agreed to in writing, software
distributed under the license is distributed on an "as is" basis,
without warranties or conditions of any kind, either express or implied.
see the license for the specific language governing permissions and
limitations under the license.

[2]: http://github.com/dscape/futoncli/issues
[3]: http://caos.di.uminho.pt/