import React from 'react';
import HTUButton from './HTUButton';

interface IProps {
}

export default class TwoChoices2 extends React.Component<IProps, {}> {
  render() {
    return (
        <div>
            <HTUButton msg="1">5</HTUButton>
            <HTUButton msg="2" speed={6}>6</HTUButton>
        </div>
    );
  }
}