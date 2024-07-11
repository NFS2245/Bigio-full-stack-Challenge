import React, { Component } from 'react';
import Header from './Header';
import SideNav from './SideNav';

class DashboardPage extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="section">
                    <div className="columns">
                        <SideNav />
                        <main className="column">
                            <div className="has-text-centered">
                                <h1 className="title is-1 has-text-black">Dashboard</h1>
                                <div className="is-size-4 mt-3">
                                    <p><strong>Name:</strong> Nafis Athallah</p>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardPage;
