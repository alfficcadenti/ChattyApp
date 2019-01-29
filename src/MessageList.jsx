import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

    render() {

      const messages = this.props.messages.map((message,index) => {
        return (
          <Message key={index} content={message.content} username={message.username} type={message.type} color={message.color}/>
        )
      });

      return (
        <main className="messages">
            {messages}
        </main>
      );
    }
}
export default MessageList;