import { useState } from "react";
import { useEffect } from "react";
const Statistics = ()=>{
    const totalLost = 120;
  const found = 80;
  const unfound = totalLost - found;

  const [countLost, setCountLost] = useState(0);
  const [countFound, setCountFound] = useState(0);
  const [countUnfound, setCountUnfound] = useState(0);

  const animateCounter = (target, setState) => {
    let count = 0;
    const increment = target / 100;  
    const interval = setInterval(() => {
      if (count < target) {
        count += increment;
        setState(Math.floor(count));
      } else {
        clearInterval(interval);
      }
    }, 30);  
  };

  useEffect(() => {
    
    animateCounter(totalLost, setCountLost);
    animateCounter(found, setCountFound);
    animateCounter(unfound, setCountUnfound);
  }, [totalLost, found, unfound]);

    return (
        <>
        <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Statistical Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl fo nt-semibold mb-2">Total Lost People</h3>
              <p className="text-gray-600 text-4xl font-bold animate-number">{countLost}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Found People</h3>
              <p className="text-green-500 text-4xl font-bold animate-number">{countFound}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Unfound People</h3>
              <p className="text-red-500 text-4xl font-bold animate-number">{countUnfound}</p>
            </div>
          </div>
        </div>
      </section>
      </>
    )
}

export default Statistics;