// components/OddRow.tsx
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface OddRowProps {
  odd: {
    sport_key: string
    id: string
    home_team: string
    away_team: string
    commence_time: string
  }
  bestOdds?: Record<string, number>
}

export function OddRow({ odd, bestOdds }: OddRowProps) {
  return (
    <Link
      className="grid grid-cols-[1fr] xl:grid-cols-[20%_40%_40%] border border-[#edf3fa] divide-x divide-[#edf3fa] hover:border-b-green-500 hover:opacity-50"
      href={`/odds/${odd.sport_key}/${odd.id}`}
      title={`${odd.home_team}vs${odd.away_team}`}
    >
      <div className="text-left xl:text-center flex flex-col justify-center text-sm p-2">
        <p>{format(new Date(odd.commence_time), "dd/MM", { locale: ptBR })}</p>
        <p>
          <b>{format(new Date(odd.commence_time), "HH:mm", { locale: ptBR })}</b>
        </p>
      </div>

      <div className="flex justify-start border-[0] flex-col justify-center text-sm p-2 md:col-span-1 col-span-2">
        <h4>{odd.home_team}</h4>
        <p>
          <b>vs</b>
        </p>
        <h4>{odd.away_team}</h4>
      </div>

      {bestOdds && (
        <div className="flex-col justify-center items-center gap-2 xl:gap-4 p-2 flex xl:flex-row">
          {Object.entries(bestOdds).map(([team, price]) => (
            <div key={team} className="text-sm border p-2 w-full hover:text-green-500 hover:border-green-500">
              <span className="mr-1">{team === "Draw" ? "Empate" : team.split(" ")[0]}</span>
              <span className="font-bold">{price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </Link>
  )
}
