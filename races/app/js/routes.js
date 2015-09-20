var currentTag = null;
var routes = {};

function mount(tag, options) {
  currentTag && currentTag.unmount(true);
  currentTag = riot.mount('#content', tag, options)[0];
}

function handler(collection, id, path) {
  var fn = routes[collection || 'runners-page'];
  fn ? fn(id, path) : riot.route('runners');
}

riot.route(handler);
