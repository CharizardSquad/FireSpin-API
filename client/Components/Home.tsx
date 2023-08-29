import React, { useState, type ReactElement } from 'react';
// import ReactDOM from 'react-dom'

function Home(): ReactElement {
  const [input, setInput] = useState('');

  const handleInputChange = (e: any): void => {
    setInput(e.target.value);
  };
  const handlePasteClick = async () => {
    try {
      const pastedText = await navigator.clipboard.readText();
      setInput(pastedText);
    } catch (err) {
      return 'Unable to paste text';
    }
  };
  return (
    <div>
      <input
        placeholder="insert API here"
        type="text"
        value={input}
        onChange={handleInputChange}
        disabled={true}
      />
      <button onClick={handlePasteClick}>Paste</button>
    </div>
  );
}

export default Home;
