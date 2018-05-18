// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import Blockie from 'react-blockies';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('createAccountStore')
@observer
class CreateAccountStep1 extends Component {
  componentDidMount () {
    this.props.createAccountStore.generateNewAccount();
  }

  handleChange = ({ target: { value } }) =>
    this.props.createAccountStore.setName(value);

  render () {
    const {
      createAccountStore: { address, generateNewAccount, name },
      location: { pathname }
    } = this.props;

    return (
      <div className='window_content -modal'>
        {address &&
          <div className='box -modal -padded'>
            <div>
              Your new address:<br />
              <Blockie seed={address} />
              <pre>{address} </pre>
              {pathname === '/accounts/new' &&
                <button onClick={generateNewAccount}>Change</button>}
            </div>
            <label>
              Set a name for this account:<br />
              <input
                disabled={pathname !== '/accounts/new'}
                onChange={this.handleChange}
                required
                value={name}
              />
            </label>
            <div className='box'>
              {pathname === '/accounts/new' &&
                !!name &&
                <Link to='/accounts/new/step2'>
                  <button>Select</button>
                </Link>}
            </div>
          </div>}
      </div>
    );
  }
}

export default CreateAccountStep1;
