import Ember from 'ember';
import computed from "ember-computed";
import observer from "ember-metal/observer";

export default Ember.Component.extend({
  classNames: ['countdown-timer'],

  didInsertElement() {
    let seconds = this.get('countdown.remainingTime') + 1;
    // let seconds = 3;

    if (this.get('countdown.showingTimer')) {
      // this.$('p').css('animation', `scale-down linear ${seconds}s`);
      // this.$('.remaining-time').css('animation', `scale-up linear ${seconds}s`);
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


});
