import React, { Component } from 'react';
import 'graphiql/graphiql.css';
import 'codemirror/theme/hopscotch.css';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import { Input, Modal, Button, Sidebar, Segment, Menu } from 'semantic-ui-react'
import update from 'react-addons-update'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuery: -1,
      queries: [],
      schemas: {},
      showLeftMenu: false
    }
  }
  uriChanged(e, d, c) {
    console.log(e.target.value)
  }
  fetcher(graphQLParams) {
    return fetch(window.location.origin + '/graphql', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }
  selectQuery(i) {
    this.setState(oldState=>Object.assign({}, oldState, {selectedQuery: i}))
  }
  addQuery() {
    let newQuery = {
      name: this.state.queries.length,
      uri: 'a'
    }
    let newState = update(this.state, {queries: {$push: newQuery}})
    this.setState(newState)
  }
  toggleLeftMenu() {
    this.setState(oldState=>Object.assign(
      {}, 
      oldState, 
      {showLeftMenu: !this.state.showLeftMenu}
    ))
  }
  render() {
    return (
      <div className="App">
        <Sidebar.Pushable as={Segment}>
          <Sidebar 
          as={Menu} 
          animation='push' 
          visible={this.state.showLeftMenu} 
          vertical 
          inverted>
            Hey, I'm a sidebar
          </Sidebar>
          <Sidebar.Pusher>
            <GraphiQL 
              fetcher={this.fetcher}
              editorTheme='hopscotch'>
              <GraphiQL.Toolbar>
                <Button onClick={()=>this.toggleLeftMenu()}>Open Menu</Button>
              <Input label="URI" onBlur={this.uriChanged}/>
                {/* <Modal trigger={<Button compact="true">Change URI</Button>}>
                  <Modal.Content>
                    <Input label="URI" />
                  </Modal.Content>
                </Modal> */}
              </GraphiQL.Toolbar>
              <GraphiQL.Logo>&nbsp;</GraphiQL.Logo>
            </GraphiQL>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
