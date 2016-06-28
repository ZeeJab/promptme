import Service from 'ember-service';

const prompts = [
  // "Zoma is boma",
  // "Toma is a boma",
  // "Horace is a khoroos",
  // "Baba khoroos",
  // "Chimigi",
  "Long hair, don't care",
  "Turn down for what",
  "This shit is bananas",
  "I got this (I don't)",
  "Don't take it personal",
  "Think things through ",
  "Just one of them days",
  "Laugh until you cry",
  "We're just getting started",
  "Everything is a remix",
  "Play with perceptions",
  "Everything is connected",
  "I can't answer that",
  "Pushing buttons",
  "Are you sure?",
  "Safe and sound",
  "Wake me up",
  "Don't let me down",
  "I hate you, I love you",
  "Sleeping alone",
  "Take it slow",
  "Better, not more",
  "When all hope is lost",
  "Slow and steady",
  "Tall drink of water",
  "Secrets",
  "Moon",
  "Dust",
  "Bitch don’t kill my vibe",
  "Started from the bottom now we’re here",
  "Turnt up for what",
  "Monkeys everywhere",
  "Chilling with my homegirl",
  "A room with a view",
  "Going home for the weekend",
  "Home is where the .... is",
  "Ooops, I think i've fallen in love",
  "A city in the 80s",
  "Living on my own",
  "Sharing spaces trading places"
];

const PROMPT_TIMEOUT = 100 * 1000;

export default Service.extend({
  init() {
    let info = localStorage.promptMe;

    if (info) {
      try {
        info = JSON.parse(info);
      } catch (e) {
        info = null;
        console.error("Couldn't parse localStorage.promptMe", e);
      }
    }

    if (info && !isStillActive(info)) {
      delete localStorage.promptMe;
      info = null;
    }

    this.set('info', info);
  },

  hasActivePrompt() {
    let info = this.get('info');

    if (!info) { return false; }

    return isStillActive(info);
  },

  getPrompt() {
    let info = this.get('info');

    if (!info || !isStillActive(info)) {
      info = this.buildPromptInfo();
    }

    return prompts[info.randomPromptIndex];
  },

  getExpiresAt() {
    let info = this.get('info');

    if (!info || !isStillActive(info)) {
      info = this.buildPromptInfo();
    }

    return new Date(info.timestamp + PROMPT_TIMEOUT + 10000);
  },

  buildPromptInfo() {
    // Calculate number of days since epoch, then take that modulo the number
    // of prompt entries, which determines which one is today's prompt.
    let randomPromptIndex = Math.floor((Date.now() - (new Date(0))) / (1000 * 60 * 60 * 24)) % prompts.length;
    let timestamp = Date.now();

    let promptInfo = { randomPromptIndex, timestamp };

    localStorage.promptMe = JSON.stringify(promptInfo);
    this.set('info', promptInfo);

    return promptInfo;
  }
});

function isStillActive(info) {
  return (Date.now() - info.timestamp) < PROMPT_TIMEOUT;
}
