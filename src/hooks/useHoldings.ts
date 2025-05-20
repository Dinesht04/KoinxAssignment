import { Holding } from "@/Types"
import { Dispatch,SetStateAction } from "react"



export const UseHoldings = (setHoldings: Dispatch<SetStateAction<Holding[]>>,
    setError: Dispatch<SetStateAction<string|null>>,
    setLoading: Dispatch<SetStateAction<boolean>>
    ) =>{
    const fetchHoldings = async () => {
        try {
          const response = await fetch("/api/holdings")
          if (!response.ok) {
            throw new Error("Failed to fetch holdings data")
          }
          const data = await response.json()
  
          const holdingsWithAmountToSell = data.map((holding: Holding) => ({
            ...holding,
            amountToSell: "-",
          }))
  
          setHoldings(holdingsWithAmountToSell)
        } catch (err) {
          setError("Error loading holdings data")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
  
      fetchHoldings()
}