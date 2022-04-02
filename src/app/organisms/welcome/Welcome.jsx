import React from 'react';
import './Welcome.scss';

import Text from '../../atoms/text/Text';

import dSvg from '../../../../public/res/svg/d.svg';

function Welcome() {
  return (
    <div className="app-welcome flex--center">
      <div>
        <img className="app-welcome__logo noselect" src={dSvg} alt="dConvos logo" />
        <Text className="app-welcome__heading" variant="h1" weight="medium" primary>start chatting!</Text>
        <Text className="app-welcome__subheading" variant="s1">your chats are e2e encrypted. <br /> we dont care about your chats anyway</Text>
      </div>
    </div>
  );
}

export default Welcome;
