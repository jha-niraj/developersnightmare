import { useState, useCallback } from 'react';

const Input = React.memo(({ onChange }) => {
    console.log('Input rendered');
    return (
        <input
            type="text"
            onChange={onChange}
            placeholder="Type something..."
            className="w-full p-2 border rounded-lg"
        />
    );
});

const StableCallbackInput = () => {
    const [value, setValue] = useState('');
    const [otherState, setOtherState] = useState(0);

    const handleChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">useCallback Demo</h1>
            <p className="mb-4">
                Type in the input. `useCallback` keeps the `onChange` handler stable, so the
                memoized Input doesn’t re-render. Click "Update Other State" to change unrelated
                state—Input still won’t re-render! Check the console.
            </p>
            <Input onChange={handleChange} />
            <p className="my-4">Input Value: {value}</p>
            <button
                onClick={() => setOtherState(otherState + 1)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
                Update Other State ({otherState})
            </button>
        </div>
    );
};

export default StableCallbackInput;