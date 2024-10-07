import { ShoeBrand, searchSchema } from "@/schemas/searchSchema";
import shoes from "./shoes.json";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type SearchResult = Awaited<ReturnType<typeof search>>;
export type Shoe = SearchResult["shoes"][number];

export async function search(params: unknown) {
  // Parse the params
  const parsedParams = searchSchema.parse(params);

  // Artificial wait of 1s - 3.5s
  await wait(1000 + Math.random() * 2500);

  // Filter shoes by given query
  const queryRegExp = new RegExp(`${parsedParams.query}`, "gi");
  const queriedShoes = shoes.running_shoes.filter((shoe) => {
    return (
      queryRegExp.test(shoe.brand) ||
      queryRegExp.test(shoe.model) ||
      queryRegExp.test(shoe.description) ||
      shoe.colors.some((color) => queryRegExp.test(color)) ||
      shoe.features.some((feature) => queryRegExp.test(feature))
    );
  });

  // Filter shoes by given brand
  const filteredShoes =
    parsedParams.brand === "ALL"
      ? queriedShoes
      : queriedShoes.filter((shoe) => shoe.brand === parsedParams.brand);

  // Include only correct page of results
  const startIndex = (parsedParams.page - 1) * parsedParams.limit;
  const endIndex = startIndex + parsedParams.limit;
  const shoesOnPage = filteredShoes.slice(startIndex, endIndex);

  // Calculate total aggregated values by brand
  const brandTotals: Record<"ALL" | ShoeBrand, number> = {
    ALL: queriedShoes.length,
    Adidas: queriedShoes.filter((shoe) => shoe.brand === "Adidas").length,
    Asics: queriedShoes.filter((shoe) => shoe.brand === "Asics").length,
    Hoka: queriedShoes.filter((shoe) => shoe.brand === "Hoka").length,
    Nike: queriedShoes.filter((shoe) => shoe.brand === "Nike").length,
  };

  return {
    shoes: shoesOnPage,
    totals: brandTotals,
    total: filteredShoes.length,
  };
}
