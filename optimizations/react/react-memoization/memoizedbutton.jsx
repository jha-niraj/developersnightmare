import React, { useState } from 'react';

// Memoized Button component
const Button = React.memo(({ onClick, label }) => {
    console.log('Button rendered'); // Log to show render behavior
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
            {label}
        </button>
    );
});

// Parent component to demonstrate memoization
const MemoizedButton = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">React.memo Demo</h1>
            <p className="mb-4">Count: {count}</p>
            <p className="mb-4">
                The button below is memoized. It only re-renders if its props (`label` or `onClick`) change.
                Click "Increment" to update the count and watch the console—Button won’t re-render!
            </p>
            <Button label="Click Me" onClick={handleClick} />
            <button
                onClick={() => setCount(count + 1)}
                className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
                Increment
            </button>
        </div>
    );
};

export default MemoizedButton;