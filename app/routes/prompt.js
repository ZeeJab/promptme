import Route from "ember-route";
import injectService from "ember-service/inject";
import Ember from "ember";

export default Route.extend({
  prompt: injectService(),

  model() {
    return this.get('prompt').getCountdown();
  }
});
