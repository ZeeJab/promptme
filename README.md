# Promptme

One Prompt a day. Project owner https://twitter.com/islabell

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Deploying
* `npm install -g surge`
* `ember build -prod && surge --domain promptme.surge.sh --project ./dist`
* `surge --domain promptme.xyz --project ./dist`
* `surge --domain promptmexyz.com --project ./dist`
