import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changSearchField } from '../../../redux/slice';

export const SearchField = () => {
  const { search } = useSelector(state => state.search);
  const dispatch = useDispatch();

  function handleChage(e) {
    const { value } = e.target;
    dispatch(changSearchField(value));
  }

  return (
    <form action="" className="form">
      <input 
        type="text" 
        className="form__input" 
        placeholder='Search' 
        value={search}
        onChange={handleChage}
      />
    </form>
  )
}
