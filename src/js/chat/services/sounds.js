import {Howl} from 'howler';
import pingAiff from 'assets/sounds/ping.aiff';
import pingMp3 from 'assets/sounds/ping.mp3';
import pingOgg from 'assets/sounds/ping.ogg';
import pingWav from 'assets/sounds/ping.wav';

import newChatAiff from 'assets/sounds/newChat.aiff';
import newChatMp3 from 'assets/sounds/newChat.mp3';
import newChatOgg from 'assets/sounds/newChat.ogg';
import newChatWav from 'assets/sounds/newChat.wav';

const ping = new Howl({
  src: [
    pingAiff,
    pingMp3,
    pingOgg,
    pingWav,
  ],
});

const newChat = new Howl({
  src: [
    newChatAiff,
    newChatMp3,
    newChatOgg,
    newChatWav,
  ],
});

export default {
  ping,
  newChat,
};
