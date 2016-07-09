import Controller from 'ember-controller';
import injectService from 'ember-service/inject';

export default Controller.extend({
  prompt: injectService(),

  init() {
    this._super();
    this.set('pastPrompts', this.get('prompt').getPastPrompts());
  },

  actions: {
    toggleAbout() {
      this.toggleProperty('isShowingAbout');
    },

    hideAbout() {
      this.toggleProperty('isShowingAbout');
    }
  }

});
