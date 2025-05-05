import React, { useEffect, useState } from 'react'

const Ratting = ({initialRating, onRate}) => {
  const [rating, setRating]=useState(initialRating || 0)


  const handleRating=(value)=>{
    setRating(value);
    if(onRate) onRate(value)
  }

  useEffect(()=>{
    if(initialRating){
      setRating(initialRating)
    }
  })
  return (
    <div>
      {Array.from({length: 5}, (_, index)=>{
        const starValue=index+1;
        return(
          <span key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <=rating ? 'text-pink-500': 'text-gray-300'}`}
          onClick={()=>handleRating(starValue)}>

          
            &#9733;
          </span>
        )
      })}
    </div>
  )
}

export default Ratting