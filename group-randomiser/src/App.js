import React, { useState } from 'react';
import random from 'random';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [allowLess, setAllowLess] = useState(false);
  const [groups, setGroups] = useState([]);

  const handleGenerateGroups = () => {
    const num1Value = parseInt(num1, 10);
    const num2Value = parseInt(num2, 10);

    if (isNaN(num1Value) || isNaN(num2Value)) {
      alert('Please enter valid numbers for Group Size and Total Members.');
      return;
    }

    // Send the data to the server for group generation
    fetch(`/generate-groups?num1=${num1Value}&num2=${num2Value}&allowLess=${allowLess}`)
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Random Groups Generator</h1>
      <label htmlFor="num1">Group Size:</label>
      <input
        type="number"
        id="num1"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      /><br />

      <label htmlFor="num2">Total Members:</label>
      <input
        type="number"
        id="num2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      /><br />

      <label htmlFor="allowLess">Allow Less?</label>
      <input
        type="checkbox"
        id="allowLess"
        checked={allowLess}
        onChange={(e) => setAllowLess(e.target.checked)}
      /><br />

      <button onClick={handleGenerateGroups}>Generate Groups</button>

      <div>
        {groups.map((group, index) => (
          <p key={index}>
            <strong>Group {index + 1}:</strong> {group.join(', ')}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
