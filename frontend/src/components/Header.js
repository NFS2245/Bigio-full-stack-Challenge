import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="header hero has-background-success pb-3 pl-3">
                <div className="navbar-brand has-text-centered">
                    <a className='is-size-1 has-text-weight-semibold has-text-white'>
                        StoryKu
                    </a>
                </div>
            </header>
        );
    }
}

export default Header;
