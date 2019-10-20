import React from 'react';
import HTUButton from './HTUButton';

interface IProps {
}

export default class TwoChoices extends React.Component<IProps, {}> {
  render() {
    return (
        <div>
            <HTUButton href="/">1</HTUButton>
            <HTUButton href="/" speed={6}>2</HTUButton>
        </div>
    );
  }
}