import Route from "ember-route";
import injectService from "ember-service/inject";
import Ember from "ember";

export default Route.extend({
  prompt: injectService(),

  model() {
    let model = {
      timerDelay: true,
      prompt: this.get('prompt').getPrompt(),
      expiresAt: this.get('prompt').getExpiresAt()
    };

    setTimeout(() => {
      // model.timerDelay = false;
      Ember.set(model, 'timerDelay', false);
    }, 1000);

    return model;
  }
});
