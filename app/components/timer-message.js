import run from 'ember-runloop';
import Component from 'ember-component';

export default Component.extend({
  tagName: 'p',
  classNames: 'timer-message',
  timerMessage: "3",

  didInsertElement() {
    run.later(() => {
      this.set('timerMessage', "2");
    }, 2000);

    run.later(() => {
      this.set('timerMessage', "1");
    }, 4000);
  }
});
