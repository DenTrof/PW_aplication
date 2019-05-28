import React from 'react';
import Background from './logo_2.png';
import {
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
} from 'reactstrap';

class Header extends React.PureComponent {

  render() {
    return (
      <header className="app-header navbar">
        <NavbarBrand style={{ backgroundImage: `url(${Background})` }} href="#"></NavbarBrand>
        <Nav className="d-md-down-none-1" navbar>
          <NavItem className="px-3">
            <NavLink href="/"> Log out </NavLink>
          </NavItem>
        </Nav>
      </header>
    );
  }
}

export default Header;
