import { useState } from "react"
import Hero from "./Hero"
import FeaturedCategories from "../FeaturedCategories"
import FeatureProducts from "../FeatureProdcuts"
import PromoAndTrustBanner from "./PromoAndTrustBanner"




export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  return (
    <div className="space-y-2">
      <Hero />
      <FeaturedCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <FeatureProducts
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        setActiveCategory={setActiveCategory}
        setSearchQuery={setSearchQuery}
      />

      <PromoAndTrustBanner />

    </div>
  )
}