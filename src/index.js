import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import loadItem from './api';
import './index.css';

function DisplayItem({ match }) {
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const id = match.params.id;
  const loadingText = loading ? 'Loading...' : null;

  useEffect(() => {
    setError(null);
    setLoading(true);
    
    const promise = loadItem(id);
    promise
      .then((item) => setItem(item))
      .catch((err) => {
        setError(err);
        setItem(null);
      })
      .finally(() => setLoading(false));

    return () => {
      promise.cancel();
    };
  }, [id]);

  return (
    <div>
      <h1>{item?.name}</h1>
      <div>{error || loadingText || `$${item?.price}`}</div>
      <h2>Other Items to Look At</h2>
      <ItemList />
      <Link to='/'>Go home</Link>
    </div>
  );
}

function ItemList() {
  return (
    <ul>
      <li>
        <Link to='/items/water-bottle'>Water Bottle</Link>
      </li>
      <li>
        <Link to='/items/helmet'>Helmet</Link>
      </li>
      <li>
        <Link to='/items/sealant'>Sealant</Link>
      </li>
    </ul>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome Home</h1>
      <p>Want to look at some items for your biking?</p>
      <ItemList />
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/items/:id' component={DisplayItem} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
