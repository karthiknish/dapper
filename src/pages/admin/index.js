import Link from "next/link";

function index() {
  return (
    <div className="flex flex-col">
      <Link href="/admin/sales">Sales Data</Link>
      <Link href="/admin/cost">Cost Benefit Analysis</Link>
    </div>
  );
}

export default index;
