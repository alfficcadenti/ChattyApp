import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }



  render() {

    const messages = this.state.messages.map((message,index) => (
      <messageItem key={index} content={message.content} username={message.username} />
    ));

    return (
      <div>
        <NavBar />

        <MessageList messages={messages}/>

        <ChatBar defaultUser={this.state.currentUser.name}/>

      </div>
    );
  }
}
export default App;
