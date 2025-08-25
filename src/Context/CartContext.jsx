import React, { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    // ✅ Load cart from localStorage when app starts
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Sync cart with localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.variationId === item.variationId &&
          i.size === item.size
      );

      if (existingIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += item.quantity || 1;
        return updatedItems;
      }
      return [...prevItems, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeItem = (productId, variationId, size) => {
    setItems((prevItems) =>
      prevItems.filter((item) => {
        const sameProduct = item.productId === productId;
        const sameSize = item.size === size;

        // If variationId is provided, check it. Otherwise ignore it.
        const sameVariation = variationId
          ? item.variationId === variationId
          : true;

        return !(sameProduct && sameSize && sameVariation);
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cartItems");
  };

  const increaseQuantity = (productId, variationId, size) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId &&
        item.variationId === variationId &&
        item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId, variationId, size) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.productId === productId &&
          item.variationId === variationId &&
          item.size === size &&
          item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const updateCartItemSize = (productId, variationId, oldSize, newSize) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId &&
        item.variationId === variationId &&
        item.size === oldSize
          ? { ...item, size: newSize }
          : item
      )
    );
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: items,
        addToCart: addItem,
        removeFromCart: removeItem,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice: total,
        totalItems,
        updateCartItemSize,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
