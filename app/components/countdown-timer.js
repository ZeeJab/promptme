import Ember from 'ember';
import computed from "ember-computed";
import observer from "ember-metal/observer";

export default Ember.Component.extend({
  classNames: ['countdown-timer'],

  didInsertElement() {
    let seconds = this.get('countdown.remainingTime') + 1;

    if (this.get('countdown.showingTimer')) {
      this.$('p').css('animation', `scale-down linear ${seconds}s`);
      this.$('.remaining-time').css('animation', `scale-up linear ${seconds}s`);
    }
  },

  showingTimerDidChange: observer('countdown.showingTimer', function() {
    Ember.run.later(() => {
      let seconds = this.get('countdown.remainingTime') + 1;
      if (this.get('countdown.showingTimer')) {
        this.$('p').css('animation', `scale-down linear ${seconds}s`);
        this.$('.remaining-time').css('animation', `scale-up linear ${seconds}s`);
      }
    }, 100);
  }),

  remainingTime: computed('countdown.remainingTime', function() {
    let seconds = this.get('countdown.remainingTime');

    let minutes = Math.floor(seconds / 60);
    seconds = seconds - (minutes * 60);

    seconds = ("0" + seconds).slice(-2);
    minutes = minutes === 0 ? '' : minutes;

    return `${minutes}:${seconds}`;
  }),
});
