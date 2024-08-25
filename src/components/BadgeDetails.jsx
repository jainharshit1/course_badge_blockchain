import React, { useState } from 'react';
import { getContract, requestAccount } from '../contract/contract';

function BadgeDetails() {
  const [tokenId, setTokenId] = useState('');
  const [courseDetails, setCourseDetails] = useState({ name: '', description: '', badgeType: '' });

  const handleFetchDetails = async () => {
    try {
      await requestAccount();
      const contract = await getContract();
      const details = await contract.getCourseDetails(tokenId);
      setCourseDetails({
        name: details.name,
        description: details.description,
        badgeType: details.badgeType === 0 ? 'Merit' : 'Completion',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to fetch badge details.');
    }
  };

  return (
    <div>
      <h2>Badge Details</h2>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={handleFetchDetails}>Get Details</button>
      <div>
        <p><strong>Course Name:</strong> {courseDetails.name}</p>
        <p><strong>Description:</strong> {courseDetails.description}</p>
        <p><strong>Badge Type:</strong> {courseDetails.badgeType}</p>
      </div>
    </div>
  );
}

export default BadgeDetails;
