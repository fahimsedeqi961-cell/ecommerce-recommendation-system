import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null); // Holds the authenticated user state
  const [loading, setLoading] = useState(true);

  // 1. VERIFY AUTH STATUS ON STARTUP (Queries your new /me route via cookies)
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:2000/api/auth/me', {
        method: 'GET',
        credentials: 'include' // Mandatory to pass along the httpOnly cookie
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        return data.user;
      }
    } catch (err) {
      console.error("User session is inactive:", err);
    }
    setUser(null);
    return null;
  };

  // 2. FETCH CART FROM DATABASE (No userId body needed anymore!)
  const fetchUserCart = async (currentUser) => {
    const activeUser = currentUser || user;
    if (!activeUser) return;

    try {
      const response = await fetch('http://localhost:2000/api/cart/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Automatically passes token cookie to verify request
        body: JSON.stringify({ userId: activeUser.id }) // Fallback if your backend doesn't decode cookie in cart yet
      });
      const data = await response.json();

      if (data.success && data.cart) {
        const formattedItems = data.cart.items.map(item => ({
          ...item.productId,
          quantity: item.quantity
        }));
        setCartItems(formattedItems);
      }
    } catch (err) {
      console.error("Error retrieving database cart registry:", err);
    }
  };

  // Synchronize authentication checking and initial data loading sequence
  useEffect(() => {
    const initializeApplicationSession = async () => {
      setLoading(true);
      const authenticatedUser = await checkAuthStatus();
      if (authenticatedUser) {
        await fetchUserCart(authenticatedUser);
      }
      setLoading(false);
    };
    initializeApplicationSession();
  }, []);

  // 3. ADD TO DATABASE CART
  const addToCart = async (product) => {
    if (!user) {
      alert("Please log in to your profile account to save items to your permanent database cart.");
      return;
    }

    try {
      const response = await fetch('http://localhost:2000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId: user.id, productId: product._id || product.id })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        fetchUserCart();
      } else {
        alert(data.message || "Failed to add item to server repository.");
      }
    } catch (err) {
      console.error("Add to database cart routine failed:", err);
    }
  };

  // 4. EDIT QUANTITY DIRECT MATRIX
  const updateQuantityOnServer = async (productId, newQuantity) => {
    if (!user) return;
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    try {
      const response = await fetch('http://localhost:2000/api/cart/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId: user.id, productId, quantity: newQuantity })
      });
      if (response.ok) fetchUserCart();
    } catch (err) {
      console.error("Server synchronization quantity error:", err);
    }
  };

  const incrementQuantity = (item) => updateQuantityOnServer(item._id || item.id, item.quantity + 1);
  const decrementQuantity = (item) => updateQuantityOnServer(item._id || item.id, item.quantity - 1);

  // 5. REMOVE SINGLE ITEM BLOCK
  const removeFromCart = async (productId) => {
    if (!user) return;
    try {
      await fetch('http://localhost:2000/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId: user.id, productId })
      });
      fetchUserCart();
    } catch (err) {
      console.error("Purging line item node error:", err);
    }
  };

  // 6. PURGE CLEAR ENTIRE CART
  const clearCart = async () => {
    if (!user) return;
    try {
      const response = await fetch('http://localhost:2000/api/cart/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId: user.id })
      });
      if (response.ok) setCartItems([]);
    } catch (err) {
      console.error("Wiping database collection context error:", err);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (Number(item.price || 0) * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, clearCart,
      cartCount, cartTotal, loading, user, checkAuthStatus,
      incrementQuantity, decrementQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
