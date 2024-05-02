import React, { useState, useEffect } from 'react';
import { data } from '@/app/_data/vegetable-fruit';
import { VegetableAndFruit } from '@/app/_type/type';

type Props = {};

const SortCategory = (props: Props) => {

    const [items, setItems] = useState<VegetableAndFruit[]>(data);


    return (
        <div className='flex flex-col md:flex-row lg:flex-row w-full h-full md:space-x-4 lg:space-x-4 mb-5'>
            <div className='flex-1'>
                <ul>
                    {items.map(item => (
                        <div className='mt-2 text-center border rounded-md pt-2 pb-2' key={item.name}>
                            {item.name}
                        </div>
                    ))}
                </ul>
            </div>

            <div key="test" className='flex-1  mt-2 border rounded-md h-[700px]'>
                <ul>
                    <div className='h-full text-center bg-gray-100 pt-2 pb-2'>
                        <h3>Fruits</h3>
                    </div>
                    <div className='mt-2 text-center border rounded-md pt-2 pb-2' >
                        name
                    </div>
                </ul>
            </div>
            <div className='flex-1  mt-2 border rounded-md h-[700px]' >
                <ul>
                    <div className='h-full text-center bg-gray-100 pt-2 pb-2' >
                        <h3>Vegetables</h3>
                    </div>

                </ul>
            </div>
        </div>
    )
}

export default SortCategory;

