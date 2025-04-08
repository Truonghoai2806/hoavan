import BannerCarousel from "./components/banner";
import Benefits from "./components/benefits";
import CategorySection from "./components/categorySection";
import FeaturedProducts from "./components/featuredProducts";
import NewArrivals from "./components/newArrivals";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <BannerCarousel />
      <CategorySection />
      <FeaturedProducts />
      <NewArrivals/>
      <Benefits/>
    </>

  );
}
