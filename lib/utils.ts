import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import _ from "lodash"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sortOddsByDate = (odds: any[]) => {
  return _.sortBy(odds, "commence_time")
}

export const sortOddsByBestPrice = (odds: any[]) => {
  return _.sortBy(odds, (odd) => {
    const bestOdd = getBestOddValue(odd.bookmakers)
    return -bestOdd
  })
}

export const groupOddsByDate = (odds: any[]) => {
  return _.groupBy(odds, (odd) => new Date(odd.commence_time).toDateString())
}

export const groupSportsByGroup = (sports: any[]) => {
  return _.groupBy(sports, "group")
}

export const filterSportsBySearch = (sports: any[], searchTerm: string) => {
  if (!searchTerm) return sports

  return _.filter(
    sports,
    (sport) =>
      _.includes(_.toLower(sport.title), _.toLower(searchTerm)) ||
      _.includes(_.toLower(sport.description), _.toLower(searchTerm)) ||
      _.includes(_.toLower(sport.group), _.toLower(searchTerm)),
  )
}

export const debounceSearch = _.debounce((callback: Function, query: string) => {
  callback(query)
}, 300)

export const getBestOddValue = (bookmakers: any[]) => {
  if (!bookmakers || bookmakers.length === 0) return 0

  const allPrices = _.flatMap(bookmakers, (bookmaker) =>
    _.flatMap(bookmaker.markets, (market) => (market.key === "h2h" ? _.map(market.outcomes, "price") : [])),
  )

  return _.max(allPrices) || 0
}

export const getRandomSports = (sports: any[], count: number) => {
  return _.sampleSize(sports, count)
}

export const sortFavoritesByOrder = (favorites: any[]) => {
  return _.sortBy(favorites, "order")
}

export const removeDuplicateOdds = (odds: any[]) => {
  return _.uniqBy(odds, "id")
}

export const calculateAverageOdd = (bookmakers: any[]) => {
  const allPrices = _.flatMap(bookmakers, (bookmaker) =>
    _.flatMap(bookmaker.markets, (market) => (market.key === "h2h" ? _.map(market.outcomes, "price") : [])),
  )

  return _.mean(allPrices) || 0
}
