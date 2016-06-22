import Controller from 'ember-controller';

export default Controller.extend({
  actions: {
    toggleAbout() {
      this.toggleProperty('isShowingAbout');
    },

    hideAbout() {
      this.toggleProperty('isShowingAbout');
    }
  }

});
