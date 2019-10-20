import React from 'react';
import HTUButton from './HTUButton';

interface IProps {
}

export default class TwoChoices extends React.Component<IProps, {}> {
  render() {
    return (
        <div>
            <HTUButton type={1} msg="1">1</HTUButton>
            <HTUButton type={1} msg="2" speed={6}>2</HTUButton>
        </div>
    );
  }
}