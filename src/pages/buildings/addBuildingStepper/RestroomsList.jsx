import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx';

const RestroomsList = ({ polygon, onDeletePolygon }) => {
    const [restroom, setRestroom] = useState('')
  
    useEffect(() => {
      const polygonId = polygon?.id;
      if(polygonId) setRestroom(polygonId)
    }, [polygon?.id])
    return (
      <div className="flex items-center justify-between gap-4 border rounded-lg py-2 px-4 mt-4 shadow-md">
        <input
          type="text"
          value={restroom}
          onChange={(e) => setRestroom(e.target.value)}
          className="text-lg font-semibold text-primary capitalize outline-none"
        />
        <button onClick={() => onDeletePolygon(polygon?.id)}>
          <RxCross2 fontSize={20} color="#EF4B8B" />
        </button>
      </div>
    );
  };

export default RestroomsList;
