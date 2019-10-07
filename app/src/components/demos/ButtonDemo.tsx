import React from 'react';

interface IProps {
}

export default class ButtonDemo extends React.Component<IProps, {}> {
  render() {
    return (
        <div>
            <img className='gold-button' src="button1.png"></img>
            <img className='gold-button' src="button2.png"></img>
        </div>
    );
  }
}