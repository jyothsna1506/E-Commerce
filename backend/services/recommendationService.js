// Rule-Based Personalized Recommendation Engine
// Deterministic, explainable scoring based on user activity & preferences

/**
 * Computes personalized product recommendations for a user.
 * @param {Object} params
 * @param {Object|null} params.user - User document or null for guest
 * @param {Array} params.products - Array of available products
 * @param {number} [params.limit=8] - Max recommendations to return
 * @returns {Array} List of recommended products with scoring and explainable reasons
 */
const getPersonalizedRecommendations = ({ user, products = [], limit = 8 }) => {
  if (!products || products.length === 0) return [];

  // Extract user signals if user is authenticated
  const recentlyViewedIds = (user?.recentlyViewed || []).map((rv) => Number(rv.productId || rv));
  const recentlyPurchasedIds = (user?.recentlyPurchased || []).map((rp) => Number(rp.productId || rp));
  const preferredCategories = (user?.preferences?.preferredCategories || []).map((c) => c.toLowerCase());
  const preferredClothingSize = user?.preferences?.clothingSize || "";
  const preferredShoeSize = user?.preferences?.shoeSize || "";
  const wishlistIds = (user?.wishlist || []).map(Number);

  // Map recently viewed products to analyze category affinity
  const viewedCategories = {};
  recentlyViewedIds.forEach((id) => {
    const prod = products.find((p) => p.id === id);
    if (prod && prod.category) {
      viewedCategories[prod.category] = (viewedCategories[prod.category] || 0) + 1;
    }
  });

  // Map recently purchased products to analyze category affinity
  const purchasedCategories = {};
  recentlyPurchasedIds.forEach((id) => {
    const prod = products.find((p) => p.id === id);
    if (prod && prod.category) {
      purchasedCategories[prod.category] = (purchasedCategories[prod.category] || 0) + 1;
    }
  });

  // Identify latest viewed and purchased products for specific explainability
  const latestViewedProduct = recentlyViewedIds.length > 0
    ? products.find((p) => p.id === recentlyViewedIds[0])
    : null;
  const latestPurchasedProduct = recentlyPurchasedIds.length > 0
    ? products.find((p) => p.id === recentlyPurchasedIds[0])
    : null;

  const scoredProducts = products.map((product) => {
    let score = 0;
    const reasons = [];

    // 1. Explicit Category Preference Match (+45 pts)
    if (preferredCategories.includes(product.category.toLowerCase())) {
      score += 45;
      reasons.push(`Matches your preferred ${capitalize(product.category)} category`);
    }

    // 2. Recently Viewed Product Affinity
    if (latestViewedProduct && product.category === latestViewedProduct.category && product.id !== latestViewedProduct.id) {
      score += 40;
      reasons.push(`Because you recently viewed "${latestViewedProduct.name.slice(0, 28)}..."`);
    } else {
      const viewCount = viewedCategories[product.category] || 0;
      if (viewCount > 0) {
        const viewScore = Math.min(viewCount * 20, 60);
        score += viewScore;
        reasons.push(`Because you recently viewed ${capitalize(product.category)}`);
      }
    }

    // 3. Recently Purchased Product Affinity
    if (latestPurchasedProduct && product.category === latestPurchasedProduct.category && product.id !== latestPurchasedProduct.id) {
      score += 45;
      reasons.push(`Based on your purchase of "${latestPurchasedProduct.name.slice(0, 28)}..."`);
    } else {
      const purchaseCount = purchasedCategories[product.category] || 0;
      if (purchaseCount > 0) {
        const purchaseScore = Math.min(purchaseCount * 35, 70);
        score += purchaseScore;
        reasons.push(`Based on your recent purchases`);
      }
    }

    // 4. Variant / Size Match (+15 pts)
    if (product.variants && Array.isArray(product.variants)) {
      if (preferredClothingSize && product.variants.includes(preferredClothingSize)) {
        score += 15;
        reasons.push(`Available in your size (${preferredClothingSize})`);
      } else if (preferredShoeSize && product.variants.includes(preferredShoeSize)) {
        score += 15;
        reasons.push(`Available in your shoe size (${preferredShoeSize})`);
      }
    }

    // 5. Wishlist Affinity (+15 pts)
    if (wishlistIds.includes(product.id)) {
      score += 15;
      reasons.push("Saved in your wishlist");
    }

    // 6. Quality & Rating Baseline (up to 15 pts)
    if (product.rating) {
      score += Math.max(0, (product.rating - 4.0) * 15);
    }
    if (product.discount && product.discount >= 20) {
      score += 10;
      reasons.push(`Special Offer (${product.discount}% OFF)`);
    }

    // 7. Deprioritize exact recently purchased items to avoid duplicate suggestions
    if (recentlyPurchasedIds.includes(product.id)) {
      score -= 25;
    }

    // Determine primary explainable reason
    const primaryReason =
      reasons.length > 0
        ? reasons[0]
        : product.rating >= 4.7
        ? "Top Rated Customer Favorite"
        : `Trending in ${capitalize(product.category)}`;

    return {
      ...(product.toObject ? product.toObject() : product),
      recommendationScore: Math.round(score),
      recommendationReason: primaryReason,
    };
  });

  // Sort descending by score, tie-break by rating
  scoredProducts.sort((a, b) => {
    if (b.recommendationScore !== a.recommendationScore) {
      return b.recommendationScore - a.recommendationScore;
    }
    return (b.rating || 0) - (a.rating || 0);
  });

  return scoredProducts.slice(0, limit);
};

const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

module.exports = {
  getPersonalizedRecommendations,
};
