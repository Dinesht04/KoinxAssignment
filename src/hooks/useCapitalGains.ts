import { Dispatch,SetStateAction } from "react"
import { CapitalGains } from "@/Types"

export const UseCapitalGains = (setCapitalGains: Dispatch<SetStateAction<CapitalGains|undefined>>,
    setError: Dispatch<SetStateAction<string|null>>,
    setLoading: Dispatch<SetStateAction<boolean>>
    ) =>{
    const fetchCapitalGains = async () => {
        try {
          const response = await fetch("/api/capitalgains")
          if (!response.ok) {
            throw new Error("Failed to fetch capital gains data")
          }
          const data = await response.json()
          setCapitalGains(data.capitalGains)
        } catch (err) {
          setError("Error loading CapitalGains data")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
  
      fetchCapitalGains()
}