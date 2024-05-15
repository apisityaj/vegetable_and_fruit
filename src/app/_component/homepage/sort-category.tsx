import React, { useState } from "react";
import { data } from "@/app/_data/vegetable-fruit";
import { VegetableAndFruit } from "@/app/_type/type";

const ItemManager: React.FC = () => {
  const [items, setItems] = useState<VegetableAndFruit[]>(data);
  const [itemsFruit, setItemsFruit] = useState<VegetableAndFruit[]>([]);
  const [itemsVeget, setItemsVeget] = useState<VegetableAndFruit[]>([]);
  const [stackItems, setStackItems] = useState<VegetableAndFruit[]>([]);
  const [itemTimeouts, setItemTimeouts] = useState<{
    [key: string]: NodeJS.Timeout;
  }>({});

  const handleItemClick = (item: VegetableAndFruit) => {
    // Clear previous timeout for this item
    if (itemTimeouts[item.name]) {
      clearTimeout(itemTimeouts[item.name]);
    }
    
    // Add item to the target column
    const targetColumn = item?.type === "Fruit" ? setItemsFruit : setItemsVeget;
    targetColumn((prev) => [...prev, item]);

    // Remove item from the displayed items list
    setItems((prev) => prev.filter((i) => i !== item));

    // Add item to the undo stack
    setStackItems((prev) => [...prev, item]);

    // Set timeout to move the item back to the displayed items list after 5 seconds
    const timeoutId = setTimeout(() => {
      setItems((prev) => {
        const hasDuplicate = prev.some(
          (hasitem) =>
            hasitem?.name === item?.name && hasitem?.type === item?.type
        );
        if (!hasDuplicate) {
          return [...prev, item];
        }
        return prev;
      });

      targetColumn((prev) => prev.filter((i) => i !== item));
    }, 5000);

    // Update itemTimeouts state
    setItemTimeouts((prev) => ({
      ...prev,
      [item.name]: timeoutId,
    }));
  };

  const handleItemReturn = (item: VegetableAndFruit) => {
    const targetColumn = item?.type === "Fruit" ? setItemsFruit : setItemsVeget;
    targetColumn((prev) => prev.filter((i) => i !== item));
    setItems((prev) => [...prev, item]);

    // Clear timeout for this item
    if (itemTimeouts[item.name]) {
      clearTimeout(itemTimeouts[item.name]);
    }
  };

  const undoMoveItem = () => {
    // Check item fruit and veg 
    if (itemsFruit.length === 0 && itemsVeget.length === 0) {
      console.log('No items to undo.');
      return;
    }

    let lastItem = stackItems.pop();
    if (lastItem) {
      const targetColumn =
        lastItem.type === "Fruit" ? setItemsFruit : setItemsVeget;
      targetColumn((prev) => prev.filter((i) => i !== lastItem));
      setItems((prev) => [...prev, lastItem]);
    }
    setStackItems([...stackItems]);
  
    // Clear timeout for this item
    if (lastItem && itemTimeouts[lastItem.name]) {
      clearTimeout(itemTimeouts[lastItem.name]);
    }
  };
  return (
    <div className="flex flex-col md:flex-row lg:flex-row w-full h-full md:space-x-4 mb-5">
      <div className="flex-1">
        <ul>
          {items?.map((item) => (
            <div
              key={item?.name}
              className="text-center border rounded-md mt-2 pt-2 pb-2"
              onClick={() => handleItemClick(item)}
            >
              {item?.name}
            </div>
          ))}
        </ul>
      </div>
      <div className="flex-1 h-[700px] border rounded-md mt-2">
        <div className="text-center bg-gray-100 pt-2 pb-2">
          <h3>Fruits</h3>
        </div>
        <ul>
          {itemsFruit?.map((item) => (
            <div
              key={item?.name}
              className="text-center border rounded-md mt-2 pt-2 pb-2"
              onClick={() => handleItemReturn(item)}
            >
              {item?.name}
            </div>
          ))}
        </ul>
      </div>
      <div
        className="flex-1 h-[700px] border rounded-md mt-2"
        onClick={() => undoMoveItem()}
      >
        <div className="text-center bg-gray-100 pt-2 pb-2">
          <h3>Vegetables</h3>
        </div>
        <ul>
          {itemsVeget?.map((item) => (
            <div
              key={item?.name}
              className="text-center border rounded-md mt-2 pt-2 pb-2"
              onClick={(e) => {
                e.stopPropagation(); // Stop event bubbling
                handleItemReturn(item);
              }}
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
