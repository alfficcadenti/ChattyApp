import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  constructor() {
    super();
  }


    render() {
            const messages = this.props.messages.map((message,index) => {
              return (
                <Message key={index} content={message.content} username={message.username} />
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