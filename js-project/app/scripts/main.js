// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

import Router from './router';

// ----------------------------------------------------------------------------
// Class Definition
// ----------------------------------------------------------------------------

class Application {

  constructor () {
    new Router();
    Backbone.history.start();
  }

}

// ----------------------------------------------------------------------------
// DOM Ready
// ----------------------------------------------------------------------------

$(() => {
  var app = new Application();
});