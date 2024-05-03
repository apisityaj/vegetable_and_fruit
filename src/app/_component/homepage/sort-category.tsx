import React, { useState } from 'react';
import { data } from '@/app/_data/vegetable-fruit';
import { VegetableAndFruit } from '@/app/_type/type';


const ItemManager: React.FC = () => {
    const [items, setItems] = useState<VegetableAndFruit[]>(data);
    const [items_fruit, setItemsFruit] = useState<VegetableAndFruit[]>([]);
    const [items_veget, setItemsVeget] = useState<VegetableAndFruit[]>([]);
    const [undoStack, setUndoStack] = useState<VegetableAndFruit[]>([]);

    const handleItemClick = (item: VegetableAndFruit) => {

        // Add item to the target column
        const targetColumn = item?.type === 'Fruit' ? setItemsFruit : setItemsVeget;
        targetColumn(prev => [...prev, item]);

        // Remove item from the displayed items list
        setItems(prev => prev.filter(i => i !== item));

        // Add item to the undo stack
        setUndoStack(prev => [...prev, item]);

        // Set timeout to move the item back to the displayed items list after 5 seconds
        setTimeout(() => {

            setItems(prev => {
                const hasDuplicate = prev.some(hasitem => hasitem?.name === item?.name && hasitem?.type === item?.type);
                if (!hasDuplicate) {
                    return [...prev, item];
                }
                return prev;
            });

            targetColumn(prev => prev.filter(i => i !== item));

        }, 5000);
    };

    const handleItemReturn = (item: VegetableAndFruit) => {

        const targetColumn = item?.type === 'Fruit' ? setItemsFruit : setItemsVeget;
        targetColumn(prev => prev.filter(i => i !== item));
        setItems(prev => [...prev, item]);

    };

    const undoMoveItem = () => {

        const lastItem = undoStack.pop();
        if (lastItem) {
            const targetColumn = lastItem.type === 'Fruit' ? setItemsFruit : setItemsVeget;
            targetColumn(prev => prev.filter(i => i !== lastItem));
            setItems(prev => [...prev, lastItem]);
        }
        setUndoStack([...undoStack]);

    };

    return (
        <div className='flex flex-col md:flex-row lg:flex-row w-full h-full md:space-x-4 mb-5'>
            <div className='flex-1'>
                <ul>
                    {items?.map(item => (
                        <div
                            key={item?.name}
                            className='text-center border rounded-md mt-2 pt-2 pb-2'
                            onClick={() => handleItemClick(item)}
                        >
                            {item?.name}
                        </div>
                    ))}
                </ul>
            </div>
            <div className='flex-1 h-[700px] border rounded-md mt-2'>
                <div className='text-center bg-gray-100 pt-2 pb-2'>
                    <h3>Fruits</h3>
                </div>
                <ul>
                    {items_fruit?.map(item => (
                        <div
                            key={item?.name}
                            className='text-center border rounded-md mt-2 pt-2 pb-2'
                            onClick={() => handleItemReturn(item)}
                        >
                            {item?.name}
                        </div>
                    ))}
                </ul>
            </div>
            <div className='flex-1 h-[700px] border rounded-md mt-2' onClick={() => undoMoveItem()}>
                <div className='text-center bg-gray-100 pt-2 pb-2'>
                    <h3>Vegetables</h3>
                </div>
                <ul>
                    {items_veget?.map(item => (
                        <div
                            key={item?.name}
                            className='text-center border rounded-md mt-2 pt-2 pb-2'
                            onClick={() => handleItemReturn(item)}
                        >
                            {item?.name}
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ItemManager;
