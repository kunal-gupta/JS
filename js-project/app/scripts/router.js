import HomeView from './HomeView';

class Router extends Backbone.Router {

  constructor () {
    this.routes = {
      '': 'home'
    };
    super();
  }

  home () {
    var view = new HomeView();
    $('#app').html(view.render().$el);
  }


}

export default Router;