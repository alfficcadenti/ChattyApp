import React, {Component} from 'react';

class Message extends Component {

  render () {
    var styles = {color:this.props.color,}

  let extension = this.props.content.substr(-3,3)
      if ( extension === "jpg" || extension === "png" || extension === "gif") {
        var message = <img className='image-post' src={this.props.content} />
        }
      else {
        var message = <span className='message-content'>{this.props.content}</span>
      }


    if (this.props.type === "incomingMessage" || this.props.type === "postMessage") {




      return (
        <div className='message'>
          <span className='message-username' style={styles}>{this.props.username}</span>
          {message}
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
