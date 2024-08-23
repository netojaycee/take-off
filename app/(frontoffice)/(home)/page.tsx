import BestSellingItems from "./(components)/BestSellingItems";
import Categories from "./(components)/Categories";
import FeaturedItems from "./(components)/FeaturedItems";
import Hero from "./(components)/Hero";
import NewItemsBanner from "./(components)/NewItemsBanner";
import NewItemsProducts from "./(components)/NewItemsProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <NewItemsBanner />
      <NewItemsProducts />

      <FeaturedItems />
      

      <BestSellingItems />
    </>
  );
}
