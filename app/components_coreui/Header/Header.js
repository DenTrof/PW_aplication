import React from 'react';
import Background from './logo_2.png';


import {
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';

class Header extends React.PureComponent {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
        <NavbarBrand style={{ backgroundImage: `url(${Background})` }} href="#"></NavbarBrand>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
        <Nav className="d-md-down-none-1" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Log out</NavLink>
          </NavItem>
        </Nav>
      </header>
    );
  }
}

export default Header;
