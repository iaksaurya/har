import { twMerge } from "tailwind-merge";
import FormattedPrice from "./FormattedPrice";

interface Props {
  regularPrice?: number;
  discountedPrice?: number;
  className?: string;
}

const PriceTag = ({ regularPrice, className }: Props) => {
  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      <p className=" font-medium">
        <FormattedPrice amount={regularPrice} />
      </p>
      {/* <p className="font-bold text-skyText">
        <FormattedPrice amount={discountedPrice} />
      </p> */}
    </div>
  );
};

export default PriceTag;
