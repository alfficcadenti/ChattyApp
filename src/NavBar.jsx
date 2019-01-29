import React, {Component} from 'react';


class NavBar extends Component {
  constructor() {
    super();
  }


  render() {
    return (

        <nav className='navbar'>
          <a href="/" className="navbar-brand">Chatty</a>
          <span className='activeUsers'>{this.props.users} users online</span>
        </nav>
    );
  }
}
export default NavBar;
