import Route from "ember-route";
import injectService from "ember-service/inject";

export default Route.extend({
  prompt: injectService(),

  beforeModel() {
    if (this.get('prompt').hasActivePrompt()) {
      this.transitionTo('prompt');
    }
  }
});
