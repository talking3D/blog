import * as React from 'react';

const SearchBar = () => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  return (
    <form action='' method='post' onSubmit={ (e) => handleSubmit }>

    </form>
  )
};

export default SearchBar;