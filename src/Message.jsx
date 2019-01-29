import React, {Component} from 'react';

class Message extends Component {

  render () {
    console.log(this.props.color)
    var styles = {color:this.props.color,}
    console.log(styles)

    if (this.props.type === "incomingMessage" || this.props.type === "postMessage") {
      return (
        <div className='message'>
          <span className='message-username' style={styles}>{this.props.username}</span>
          <span className='message-content'>{this.props.content}</span>
        </div>
        );
    }
    else {
      return (
        <div className='message system'>
          <span>{this.props.content}</span>
        </div>
      );
    }
  }

}
export default Message;
