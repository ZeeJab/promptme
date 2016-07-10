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

    this.timer = setInterval(() => {
      this.notifyPropertyChange('remainingTime');
    }, 100);
  },

  remainingTime: computed('expiresAt', function() {
    return Math.round((this.get('expiresAt').getTime() - Date.now()) / 1000);
  }),

  countdownFinished: computed('remainingTime', function() {
    return this.get('remainingTime') < 0;
  }),

  showingCountdown: false,
  showingTimer: true,

  expiresAt: computed('timestamp', function() {
    return new Date(this.get('timestamp') + PROMPT_TIMEOUT + PROMPT_DELAY);
  })
});
