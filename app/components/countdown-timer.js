import Ember from 'ember';
import computed from "ember-computed";

export default Ember.Component.extend({
  classNames: ['countown-timer'],

  didInsertElement() {
    this.timer = setInterval(() => {
      this.notifyPropertyChange('remainingTime');
    }, 1000);
  },

  remainingTime: computed('to', function() {
    let seconds = Math.round((this.get('to').getTime() - Date.now()) / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds - (minutes * 60);

    seconds = ("0" + seconds).slice(-2);
    minutes = minutes === 0 ? '' : minutes;

    if ((this.get('to').getTime() - Date.now()) < 0) {
      // return "🎉";
      return "DONEZO!";
    }

    return `${minutes}:${seconds}`;
  }),
});
