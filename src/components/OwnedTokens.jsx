import React, { useState } from 'react';
import { getContract, requestAccount } from '../contract/contract';

function OwnedTokens() {
  const [address, setAddress] = useState('');
  const [tokens, setTokens] = useState([]);

  const handleFetchTokens = async () => {
    try {
      await requestAccount();
      const contract = await getContract();
      const ownedTokens = await contract.getOwnedTokens(address);
      setTokens(ownedTokens);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch owned tokens.');
    }
  };

  return (
    <div>
      <h2>Owned Tokens</h2>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleFetchTokens}>Get Owned Tokens</button>
      <ul>
        {tokens.map((tokenId) => (
          <li key={tokenId}>Token ID: {tokenId.toString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default OwnedTokens;
