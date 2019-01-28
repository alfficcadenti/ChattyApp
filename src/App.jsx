import React, {Component} from 'react';
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

    handleKeyPress = (event) => {
      if(event.key == 'Enter'){
        let content = event.target.value;
        let username = this.state.currentUser.name
        const newMessage = { "username": username, "content": content};

        const messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages})
        this.socket.send(JSON.stringify(newMessage))


      }
    }


  componentDidMount() {
    //console.log("componentDidMount <App />");

    let mySocket = new WebSocket("ws://localhost:3001/");
    this.socket = mySocket;
    mySocket.onopen = () => {
      if(mySocket.readyState) {
        console.log('Connected to server');
      }

    }

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = { username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }



  render() {



    return (


      <div>
        <NavBar />

        <MessageList messages={this.state.messages}/>

        <ChatBar defaultUser={this.state.currentUser.name} onKeyPress={this.handleKeyPress}/>

      </div>
    );
  }
}
export default App;
