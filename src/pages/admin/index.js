import Link from "next/link";
import { FaChartBar, FaBalanceScale } from "react-icons/fa";
import Orders from "./orders";
import {motion} from 'framer-motion'
function index() {
  return (
    <motion.div  initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="flex flex-col items-start space-y-4 p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
        <div className="grid grid-cols-2">
          <Link
            href="/admin/sales"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition duration-150"
          >
            <FaChartBar className="w-6 h-6" />
            <span>Sales Data</span>
          </Link>

          <Link
            href="/admin/cost"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition duration-150"
          >
            <FaBalanceScale className="w-6 h-6" />
            <span>Cost Benefit Analysis</span>
          </Link>
        </div>
      </div>
      <Orders />
    </motion.div>
  );
}

export default index;
