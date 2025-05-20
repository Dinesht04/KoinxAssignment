import { NextResponse } from "next/server"

const capitalgainsData= {
    "capitalGains": {
        "stcg": {
            "profits": 70200.88,
            "losses": 1548.53
        },
        "ltcg": {
            "profits": 5020,
            "losses": 3050
        },
    }
}

export async function GET() {
  return NextResponse.json(capitalgainsData)
}