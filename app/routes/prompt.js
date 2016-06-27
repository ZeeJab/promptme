import Route from "ember-route";
import injectService from "ember-service/inject";
import Ember from "ember";

export default Route.extend({
  prompt: injectService(),

  model() {
    let prompt = this.get('prompt');

    let hasActivePrompt = prompt.hasActivePrompt();

    let model = {
      timerDelay: !hasActivePrompt,
      prompt: prompt.getPrompt(),
      expiresAt: prompt.getExpiresAt()
    };

    if (!hasActivePrompt) {
      setTimeout(() => {
        // model.timerDelay = false;
        Ember.set(model, 'timerDelay', false);
      }, 3000);
    }

    return model;
  }
});
