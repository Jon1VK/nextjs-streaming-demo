import { SHOE_BRANDS } from "@/schemas/searchSchema";
import BrandFilterButton from "./BrandFilterButton";

export default function BrandFilter() {
  return (
    <fieldset>
      <legend id="legend" className="mb-1">
        Brand
      </legend>
      <ul aria-describedby="legend" className="flex flex-wrap gap-2">
        <li>
          <BrandFilterButton brand="ALL" />
        </li>
        {SHOE_BRANDS.map((brand) => (
          <li key={brand}>
            <BrandFilterButton brand={brand} />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
