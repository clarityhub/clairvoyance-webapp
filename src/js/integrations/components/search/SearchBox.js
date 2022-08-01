import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'debounce';

import Card from 'theme-claire/src/atoms/Card';
import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Input from 'theme-claire/src/atoms/Input';

import { searchBoxCard } from './SearchBox.scss';
import { search } from '../../actions/search';

class SearchBox extends Component {
  componentDidMount() {
    this.search = debounce(this.props.search, 1000);
  }

  handleSubmit = (search) => (e) => {
    e && e.preventDefault();

    this.search(e.target.search.value);
  };

  handleInput = (search) => (e) => {
    this.search(e.target.value);
  };

  render() {
    return (
      <Card className={searchBoxCard}>
        <form onSubmit={this.handleSubmit(search)}>
          <FormGroup>
            <Input
              label="Search for Integrations"
              name="search"
              onInput={this.handleInput(search)}
            />
          </FormGroup>
        </form>
      </Card>
    );
  }
}

export default connect(
  null,
  {
    search,
  }
)(SearchBox);
