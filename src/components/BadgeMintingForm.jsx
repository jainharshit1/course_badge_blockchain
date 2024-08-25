import React, { useState } from 'react';
import { getContract, requestAccount } from '../contract/contract';

function BadgeMintingForm() {
  const [recipient, setRecipient] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [badgeType, setBadgeType] = useState('Merit');

  const handleMint = async () => {
    try {
      await requestAccount();
      const contract = await getContract();
      const badgeTypeEnum = badgeType === 'Merit' ? 0 : 1;

      const tx = await contract.mintBadge(
        recipient,
        courseName,
        courseDescription,
        badgeTypeEnum
      );
      await tx.wait();
      alert('Badge minted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to mint badge.');
    }
  };

  return (
    <div>
      <h2>Mint Badge</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Course Description"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
      />
      <select value={badgeType} onChange={(e) => setBadgeType(e.target.value)}>
        <option value="Merit">Merit</option>
        <option value="Completion">Completion</option>
      </select>
      <button onClick={handleMint}>Mint Badge</button>
    </div>
  );
}

export default BadgeMintingForm;
