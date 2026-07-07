import Hero from "./Hero"
import FeaturedCategories from "../FeaturedCategories"
import FeatureProducts from "../FeatureProdcuts"
import PromoAndTrustBanner from "./PromoAndTrustBanner"




export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeatureProducts />
      <PromoAndTrustBanner />
    </>
  )
}