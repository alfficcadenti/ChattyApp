import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

  }





  render() {
    //this.state = {value: this.props.defaultUser};
    let username = this.props.defaultUser
    let onKeyPress = this.props.onKeyPress;
    let changeUserName = this.props.changeUserName;

    return (
      <footer className="chatbar">
        <input type="text" className='chatbar-username' name='userInput' placeholder={username} onKeyPress={changeUserName} />
        <input type="text" className='chatbar-message' name='messageInput' placeholder='Type a message and hit Enter' onKeyPress={onKeyPress} />
      </footer>
    );
  }

}
export default ChatBar;

