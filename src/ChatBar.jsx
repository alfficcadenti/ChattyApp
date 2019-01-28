import React, {Component} from 'react';

class ChatBar extends Component {

  render() {

    let username = this.props.defaultUser;

    return (
      <footer className="chatbar">
        <input type="text" className='chatbar-username' name='userInput' placeholder='User Name' value={username}/>
        <input type="text" className='chatbar-message' name='messageInput' placeholder='Type a message and hit Enter' />
      </footer>
    );
  }

}
export default ChatBar;