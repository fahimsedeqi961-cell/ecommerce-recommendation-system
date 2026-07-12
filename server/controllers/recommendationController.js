import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const getFrequentlyBoughtTogether = async (req, res) => {
  try {
    const { productId } = req.params;

    // 1. Find all successful database orders that contain this current item ID
    const associatedOrders = await Order.find({ products: productId });

    // 2. Extract and count all OTHER items bought inside those same orders
    const productFrequencyMap = {};

    associatedOrders.forEach(order => {
      order.products.forEach(id => {
        const idString = id.toString();
        // Skip the current product itself
        if (idString !== productId) {
          productFrequencyMap[idString] = (productFrequencyMap[idString] || 0) + 1;
        }
      });
    });

    // 3. Sort the matching items by their frequency score
    const sortedProductIds = Object.keys(productFrequencyMap).sort(
      (a, b) => productFrequencyMap[b] - productFrequencyMap[a]
    );

    // 4. Fallback Logic: If there aren't enough orders yet, grab items from the same category
    let recommendedProducts = [];
    if (sortedProductIds.length > 0) {
      // Pull full product objects for the top 4 co-purchased items
      recommendedProducts = await Product.find({ _id: { $in: sortedProductIds.slice(0, 4) } });
    }

    if (recommendedProducts.length < 4) {
      // Find the source product to check its category matching tag
      const currentProduct = await Product.findById(productId);
      const remainderLimit = 4 - recommendedProducts.length;

      const fallbackProducts = await Product.find({
        category: currentProduct.category,
        _id: { $ne: productId, $nin: sortedProductIds } // Avoid duplications
      }).limit(remainderLimit);

      recommendedProducts = [...recommendedProducts, ...fallbackProducts];
    }

    return res.status(200).json({ success: true, data: recommendedProducts });
  } catch (error) {
    console.error("Recommendation execution fault:", error);
    return res.status(500).json({ message: "Failed to compile recommendations", error: error.message });
  }
};
