import { Suspense } from "react";
import ProductsList from "./productsList";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsList />
    </Suspense>
  );
}