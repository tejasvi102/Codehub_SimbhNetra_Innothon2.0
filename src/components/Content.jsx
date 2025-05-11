import { Link } from "react-router-dom";
const  Content = ()=>{
    return <>  <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 bg-blue-500 p-4 rounded shadow-md inline-block">
            Welcome to Simbh Netra - A Lost and Found System  
          </h1>
          <p className="text-lg mb-8">
            Your one-stop solution for finding persons and helping others find theirs.
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              to="/login"
              className="bg-yellow-500 text-white px-6 py-3 rounded-md text-lg hover:bg-yellow-600 transition"
            >
              Get Started
            </Link>
            <Link
              to="/report"
              className="bg-green-500 text-white px-6 py-3 rounded-md text-lg hover:bg-green-600 transition"
            >
              Report a Lost Person
            </Link>
          </div>
        </div>
      </section>
      </>
    
}
export default Content;