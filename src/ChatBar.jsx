import React, {Component} from 'react';

class ChatBar extends Component {






  render() {

    let username = this.props.defaultUser;
    let onKeyPress = this.props.onKeyPress;

    return (
      <footer className="chatbar">
        <input type="text" className='chatbar-username' name='userInput' placeholder='User Name' value={username}/>
        <input type="text" className='chatbar-message' name='messageInput' placeholder='Type a message and hit Enter' onKeyPress={onKeyPress} />
      </footer>
    );
  }

}
export default ChatBar;

