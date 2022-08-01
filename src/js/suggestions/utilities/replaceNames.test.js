import { expect } from 'chai';
import { replaceNames } from './replaceNames';

const { describe, it } = global;

describe('Chats replaceNames', () => {
  it('does not replace text for invalid names', () => {
    const message = 'asdf ab a b bc';

    expect(replaceNames('', message)).to.be.equal(message);
    expect(replaceNames('a', message)).to.be.equal(message);
    expect(replaceNames('a b', message)).to.be.equal(message);
    expect(replaceNames('ab bc', message)).to.be.equal(message);
    expect(replaceNames('', message)).to.be.equal(message);
  });

  it('replaces first names', () => {
    const message = 'Hey Ivan, how are you doing?';

    expect(replaceNames('Ivan Montiel', message)).to.be.equal('Hey %FIRST_NAME%, how are you doing?');
    expect(replaceNames('Ivan', message)).to.be.equal('Hey %FIRST_NAME%, how are you doing?');
    expect(replaceNames('Ivan Daniel Montiel', message)).to.be.equal('Hey %FIRST_NAME%, how are you doing?');
    expect(replaceNames('Ivañ Daniel Montiel', 'Hey Ivañ')).to.be.equal('Hey %FIRST_NAME%');
    expect(replaceNames('Ivañ Daniel Montiel', 'Ivañ, Hello')).to.be.equal('%FIRST_NAME%, Hello');
  });

  it('replaces last names', () => {
    const message = 'Hey Ivan Montiel, how are you doing?';

    expect(replaceNames('Ivan Montiel', message)).to.be.equal('Hey %FIRST_NAME% %LAST_NAME%, how are you doing?');
    expect(replaceNames('Ivan', message)).to.be.equal('Hey %FIRST_NAME% Montiel, how are you doing?');
    expect(replaceNames('Ivan Daniel Montiel', message)).to.be.equal('Hey %FIRST_NAME% %LAST_NAME%, how are you doing?');
    expect(replaceNames('Ivañ Daniel Moñtiel', 'Hey Ivañ Moñtiel')).to.be.equal('Hey %FIRST_NAME% %LAST_NAME%');
  });
});
