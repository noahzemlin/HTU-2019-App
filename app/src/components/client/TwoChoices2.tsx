import React from 'react';
import HTUButton from './HTUButton';

interface IProps {
}

export default class TwoChoices2 extends React.Component<IProps, {}> {
  render() {
    return (
        <div>
            <HTUButton cstyle="htu-button-gold" msg="gold" wipe={true}></HTUButton>
            <HTUButton cstyle="htu-button-silver" msg="silver" speed={6} wipe={true}></HTUButton>
        </div>
    );
  }
}