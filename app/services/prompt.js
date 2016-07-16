import Service from 'ember-service';
import Countdown from 'promptme/models/countdown';

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
  "Better, not more",
  "When all hope is lost",
  "Slow and steady",
  "Tall drink of water",
  "Many hands make light work",
  "Shut up and dance ",
  "It's a four letter word",
  "Turn up the volume",
  "Brain freeze!",
  "Keep it simple",
  "Dig a little deeper",
  "Connect the dots",
  "Tidy up that mess!",
  "I get up again",
  "Free lunch",
  "Fool me twice",
  "Take it all away",
  "Staring at the sun",
  "Peachy keen",
  "Twinkle toes",
  "Odd one out",
  "Smell the roses",
  "Yesterday's news",
  "Breakfast special",
  "Burnt toast",
  "The good stuff",
  "Are you serious?",
  "Can't feel my face",
  "Food for thought",
  "Middle of nowhere",
  "On the edge",
  "Peering into space",
  "It takes a village",
  "Keeping secrets",
  "It's oh so quiet",
  "Drip drip drip",
  "BOOM! There it is",
  "She is free",
  "Still floating",
  "Power of nice",
  "Oh yes, I'm a mess",
  "I will not be awkward today",
  "Why is he kissing her?",
  "Give it up",
  "Crazy like a coconut",
  "Get your skates on",
  "Tootie fruity",
  "This is the spot",
  "Plants and people",
  "Thanks for having me",
  "Are you still listening?",
  "Tuesday morning",
  "What have you to loose?",
  "She's the blues",
  "Drunk on light",
  "Unfolding midnight",
  "Catch the sparrow",
  "Be my baby",
  "Wait by the window",
  "About to slip down",
  "Too tired for fun",
  "We all scream for...",
  "Sleep walk",
  "Match point",
  "Singing the same song",
  "Second hand parts",
  "Jump the fence",
  "Collect your things",
  "Coffee in the shower",
  "Windows wide open",
  "Bite your tongue",
  "Colorful past",
  "Quick dry paint",
  "Dude, I can't",
  "Piece of cake",
  "Up and away",
  "Hello yellow",
  "I want you",
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
  "Take it slow",
  "Sharing spaces trading places"
];

// export const PROMPT_TIMEOUT = 1197 * 1000;
export const PROMPT_TIMEOUT = 20 * 1000;
export const PROMPT_DELAY = 3 * 1000;

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

    this.set('info', info);
  },

  hasActivePrompt() {
    let info = this.get('info');

    if (!info) { return false; }

    return isStillActive(info);
  },

  getCountdown() {
    let info = this.get('info');

    if (!info) {
      info = this.buildPromptInfo();
    } else if (isStillActive(info)) {
      info.didRefresh = true;
    } else if (didCompletePrompt(info)) {
      info.didComplete = true;
    } else {
      info = this.buildPromptInfo();
    }

    info.prompt = prompts[info.promptIndex];
    info.pastPrompts = this.getPastPrompts();

    return Countdown.create(info);
  },

  getPastPrompts() {
    let promptIndex = getPromptIndex();

    return prompts.slice(0, promptIndex);
  },

  buildPromptInfo() {
    let timestamp = Date.now();
    let promptIndex = getPromptIndex();

    let promptInfo = { promptIndex, timestamp };

    localStorage.promptMe = JSON.stringify(promptInfo);
    this.set('info', promptInfo);

    return promptInfo;
  }
});

function getPromptIndex() {
  return Math.floor((Date.now() - new Date('2016-07-10 EDT')) / (1000 * 60 * 60 * 24));
}

function didCompletePrompt(info) {
  return info.promptIndex === getPromptIndex();
}

function isStillActive(info) {
  return (Date.now() - info.timestamp) < PROMPT_TIMEOUT;
}
