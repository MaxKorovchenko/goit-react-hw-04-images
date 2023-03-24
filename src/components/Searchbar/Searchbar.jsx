import { useState } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

import { Button, Form, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit, search }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => setSearchQuery(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery === search) return;

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Button type="submit" aria-label="search">
          <FcSearch />
        </Button>

        <Input
          onChange={handleChange}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </Form>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};
