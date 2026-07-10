import Cart from "../models/Cart.js";
import Product from "../models/Product.js";


// Get the cart 
export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    let cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    return res.status(200).json({
      success: true,
      cart
    })
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(5000).json({ message: "Failed to retrieve user database cart profile.", error: error.message })
  }
};


// Add an itme to the cart 
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product record not found inside inventory catalogs." });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
      if (cart.items[itemIndex].quantity >= product.stock) {
        return res.status(400).json({ message: "Requested purchase volume exceeds active available allocations." });
      }
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();
    return res.status(200).json({ success: true, message: "Product successfully mapped into records.", cart });
  } catch (error) {
    console.error("Add to cart error.", error);
    return res.status(500).json({ message: "Database update stream failure,", error: error.message });
  }
};



// 3. EDIT SPECIFIC QUANTITY COEFFICIENTS (Direct +/- manipulation overrides)
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity configurations cannot drop beneath single integers." });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Active user cart schema structure not found." });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item link not discovered inside active schema arrays." });
    }

    // Verify inventory ceiling limits
    const product = await Product.findById(productId);
    if (product && quantity > product.stock) {
      return res.status(400).json({ message: `Insufficient inventory levels. Cap restricted at ${product.stock} items.` });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    return res.status(200).json({ success: true, message: "Cart line metrics updated smoothly.", cart });
  } catch (error) {
    console.error("Update quantity error:", error);
    return res.status(500).json({ message: "Execution routine mutation error.", error: error.message });
  }
};

// 4. ABSOLUTE REMOVAL OF SPECIFIC LINE ITEM NODES
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart trace un-mapped." });


    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();
    return res.status(200).json({ success: true, message: "Product line completely purged from array indices.", cart });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({ message: "Array indexing parsing fault.", error: error.message });
  }
};

// 5. PURGE WIPE  CLEAR ENTIRE CART SCHEMAS
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Active session cart targets not located." });

    cart.items = []; // Completely drop array contents down to fresh baseline bounds
    await cart.save();

    return res.status(200).json({ success: true, message: "User database cart configuration reset clean.", cart });
  } catch (error) {
    console.error("Clear cart error:", error);
    return res.status(500).json({ message: "Database array cleaning fault execution.", error: error.message });
  }
};
