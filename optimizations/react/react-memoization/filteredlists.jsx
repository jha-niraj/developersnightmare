import { useState, useMemo } from 'react';

const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
}));

const FilteredList = () => {
    const [search, setSearch] = useState('');

    const filteredItems = useMemo(() => {
        console.log('Filtering items');
        return items.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">useMemo Demo</h1>
            <p className="mb-4">
                Type to filter 1000 items. `useMemo` caches the filtered list, so filtering
                only runs when the search query changes. Check the console!
            </p>
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search items..."
                className="w-full p-2 mb-4 border rounded-lg"
            />
            <ul className="space-y-2">
                {
                    filteredItems.slice(0, 10).map(item => (
                        <li key={item.id} className="p-2 bg-white rounded-lg shadow">
                            {item.name}
                        </li>
                    ))
                }
            </ul>
            <p className="mt-4">Showing {filteredItems.length} items (first 10 displayed).</p>
        </div>
    );
};

export default FilteredList;