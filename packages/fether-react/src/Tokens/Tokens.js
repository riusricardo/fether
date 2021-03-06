// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: BSD-3-Clause

import React, { PureComponent } from 'react';
import { AccountHeader, Clickable, MenuPopup } from 'fether-ui';
import { Link, withRouter } from 'react-router-dom';

import Health from '../Health';
import TokensList from './TokensList';
import withAccount from '../utils/withAccount';

@withRouter
@withAccount
class Tokens extends PureComponent {
  state = {
    isMenuOpen: false
  };

  handleMenuClose = () => {
    this.setState({ isMenuOpen: false });
  };

  handleMenuOpen = () => {
    this.setState({ isMenuOpen: true });
  };

  isParitySignerAccount = () => {
    const {
      account: { type }
    } = this.props;

    return type === 'signer';
  };

  menuItems = () => {
    const {
      account: { address },
      history
    } = this.props;

    const backupAccountItem = {
      name: 'Backup Account',
      onClick: () => history.push(`/backup/${address}`)
    };

    const menuItems = [
      {
        name: 'Add Tokens',
        onClick: () => history.push(`/whitelist/${address}`)
      }
    ];

    if (this.isParitySignerAccount() === false) {
      menuItems.unshift(backupAccountItem);
    }

    return menuItems;
  };

  render () {
    const {
      account: { address, name, type }
    } = this.props;
    const { isMenuOpen } = this.state;

    return (
      <div className='tokens'>
        <div className={isMenuOpen ? 'popup-underlay' : ''} />
        <AccountHeader
          address={address}
          copyAddress
          name={name}
          type={type}
          left={
            <Link to='/accounts' className='icon -back'>
              Back
            </Link>
          }
          right={
            <MenuPopup
              className='popup-menu-account'
              horizontalOffset={1}
              menuItems={this.menuItems()}
              onClose={this.handleMenuClose}
              onOpen={this.handleMenuOpen}
              size='small'
              trigger={<Clickable className='icon -menu' />}
            />
          }
        />

        <TokensList />

        <nav className='footer-nav'>
          <div className='footer-nav_status'>
            <Health />
          </div>
        </nav>
      </div>
    );
  }
}

export default Tokens;
