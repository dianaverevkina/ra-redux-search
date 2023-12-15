import { useSelector } from 'react-redux'

export const Items = () => {
  const { items, loading, error, search } = useSelector(state => state.search)

  let content; 
  
  if (loading) {
    content = <p>Searching...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (!search) {
    content = <p>Type something to search...</p>
  } else {
    content = items.map(el => <li key={el.id}>{el.name}</li>);
  }

  return (
    <ul>
      {content}
    </ul>
  )
}
