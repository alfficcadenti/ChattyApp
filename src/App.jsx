import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';



class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }



  }

    handleKeyPress = (event) => {
      if(event.key == 'Enter'){
        let content = event.target.value;
        let username = this.state.currentUser.name
        const newMessage = { "username": username, "content": content};
        this.socket.send(JSON.stringify(newMessage))
      }
    }

    changeUserName = (event) => {

      if(event.key == 'Enter'){
        let username = event.target.value;
        this.state.currentUser.name = username;
      }
    }


  componentDidMount() {

    let mySocket = new WebSocket("ws://localhost:3001/");
    this.socket = mySocket;
    mySocket.onopen = () => {
      if(mySocket.readyState) {
        console.log('Connected to server');
      }
    }

    mySocket.onmessage = (message) => {
      let data = JSON.parse(message.data)
      const messages = this.state.messages.concat(data)
      this.setState({messages: messages})
    }
  }



  render() {



    return (


      <div>
        <NavBar />

        <MessageList messages={this.state.messages}/>

        <ChatBar defaultUser={this.state.currentUser.name} onKeyPress={this.handleKeyPress} changeUserName={this.changeUserName}/>

      </div>
    );
  }
}
export default App;
