import React from 'react';
import BadgeMintingForm from './components/BadgeMintingForm';
import BadgeDetails from './components/BadgeDetails';
import OwnedTokens from './components/OwnedTokens';
import './styles.css';

function App() {
  return (
    <div>
      <h1>Course Completion Badge DApp</h1>
      <BadgeMintingForm />
      <BadgeDetails />
      <OwnedTokens />
    </div>
  );
}

export default App;
