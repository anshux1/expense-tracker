import Table from "@/components/transactions/Table"
export const dynamic = "force-dynamic"
export default function Page() {
  return (
    <div className="max-w-screen-2xl px-4 h-fit rounded-b my-8 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Transaction History</h1>
      <Table />
    </div>
  )
}
