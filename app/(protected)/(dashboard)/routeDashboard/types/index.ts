export type Sale = {
  id: string
  customer: string
  product: string
  amount: number
  status: "Completed" | "Pending" | "Cancelled"
  date: string
}