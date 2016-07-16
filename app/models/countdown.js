import Ember from 'ember';
import EmberObject from 'ember-object';
import computed from 'ember-computed';
import Evented from 'ember-evented';

import { PROMPT_TIMEOUT, PROMPT_DELAY } from "promptme/services/prompt";

export default EmberObject.extend(Evented, {
  init() {
    let didRefresh = this.get('didRefresh');
    let didComplete = this.get('didComplete');

    if (!didRefresh && !didComplete) {
      this.set('showingCountdown', true);
      this.set('showingTimer', false);
      Ember.run.later(() => {
        this.set('showingTimer', true);
        this.set('showingCountdown', false);
      }, PROMPT_DELAY);
    }

    if (this.get('remainingTime') > 0) {
      this.timer = setInterval(() => {
        this.notifyPropertyChange('remainingTime');
        if (this.get('remainingTime') <= 0) {
          this.set('countdownFinished', true);
          clearInterval(this.timer);
        }
      }, 100);
    } else {
      this.set('showingTimer', false);
    }
  },

  remainingTime: computed('expiresAt', function() {
    return Math.round((this.get('expiresAt').getTime() - Date.now()) / 1000);
  }),

  remainingTimeString: computed('remainingTime', function() {
    let seconds = this.get('remainingTime');

    let minutes = Math.floor(seconds / 60);
    seconds = seconds - (minutes * 60);

    seconds = ("0" + seconds).slice(-2);
    minutes = minutes === 0 ? '' : minutes;

    return `${minutes}:${seconds}`;
  }),

  showingCountdown: false,
  showingTimer: true,

  expiresAt: computed('timestamp', function() {
    return new Date(this.get('timestamp') + PROMPT_TIMEOUT + PROMPT_DELAY);
  })
});
