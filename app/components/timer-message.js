import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'timer-message',
  timerMessage: "READY",

  didInsertElement() {
    Ember.run.later(() => {
      this.set('timerMessage', "SET");
    }, 1000);

    Ember.run.later(() => {
      this.set('timerMessage', "GO!");
    }, 2000);
  }
});
