import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    return (
      <footer className="chatbar">
        <input type="text" className='chatbar-username' name='userInput' placeholder='User Name' />
        <input type="text" className='chatbar-message' name='messageInput' placeholder='Type a message and hit Enter' />
      </footer>
    );
  }

}
export default ChatBar;