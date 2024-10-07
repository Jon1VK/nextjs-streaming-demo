import { Shoe } from "@/data/search";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type ShoeCardProps = {
  shoe: Shoe;
};

export default function ShoeCard(props: ShoeCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between mb-2">
          <CardTitle>
            {props.shoe.brand} - {props.shoe.model}
          </CardTitle>
          <div className="font-semibold">{props.shoe.price}€</div>
        </div>
        <CardDescription>{props.shoe.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
