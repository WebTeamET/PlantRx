import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Plus, Minus, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ShoppingCartProps {
  trigger?: React.ReactNode;
}

export function ShoppingCart({ trigger }: ShoppingCartProps) {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateCartItem,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    isLoading,
    loadingId
  } = useCart();

  const formatPrice = (amount: string, currencyCode: string) => {
    const price = parseFloat(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode
    }).format(price);
  };

  const handleQuantityChange = async (lineItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(lineItemId);
    } else {
      await updateCartItem(lineItemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cart && cart.webUrl) {
      window.open(cart.webUrl, '_blank');
    }
  };

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen} modal={true}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      
      <SheetContent className="w-full max-w-md sm:max-w-lg h-screen max-h-full bg-white dark:bg-gray-900 p-0 fixed">
        <div className="flex flex-col h-full max-h-full !bg-gold/10 dark:!bg-white/20">
          {/* Header */}
          <div className="px-6 pb-4 pt-12">
            <SheetTitle className="flex items-center justify-between text-2xl font-bold text-gray-900 dark:text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <span className='text-primary'>Cart ({getTotalItems()})</span>
              </div>
              {cart && cart.lineItems.length > 0 && (
                <div className="text-base font-normal text-primary">
                  {cart.lineItems.length} item{cart.lineItems.length !== 1 ? 's' : ''}
                </div>
              )}
            </SheetTitle>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {!cart || cart.lineItems.length === 0 ? (
              <div className="flex-1 flex items-center justify-center px-6">
                <div className="text-center">
                  <div className="p-4 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-0 flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="max-sm:!text-2xl font-semibold text-primary mb-3">
                    Your cart is empty
                  </h3>
                  <p className="text-primary mb-6 max-sm:text-sm text-base max-sm:text-sm">
                    Start adding some premium natural products
                  </p>
                  <Button
                    onClick={() => setCartOpen(false)}
                    className="ctm-button btn-green"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="space-y-4">
                    {cart.lineItems.map((item) => (
                      <div key={item.id} className="bg-gray-50 dark:bg-gray-800 border border-gold dark:border-gray-700 rounded-xl p-4 shadow-sm">
                        <div className="flex items-start gap-4">
                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-base leading-tight mb-3">
                              {item.title}
                            </h4>
                            {item.variant.title !== 'Default Title' && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                {item.variant.title}
                              </p>
                            )}
                            <p className="text-base font-medium text-gold">
                              {formatPrice(item.variant.price.amount, item.variant.price.currencyCode)}
                            </p>
                          </div>
                          
                          {/* Remove Button */}
                           <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="!p-1 max-sm:min-h-3 max-sm:min-w-8 sm:!p-3 hover:bg-green/10 hover:dark:bg-emerald-900/40 text-green dark:[&_svg_line]:stroke-white dark:[&_svg_path]:stroke-white border-green dark:border-green [&_svg_path]:stroke-green [&_svg_line]:stroke-green hover:[&_svg_path]:stroke-primary hover:[&_svg_line]:stroke-primary"
                            disabled={isLoading}
                          >
                            {loadingId === item.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        
                        {/* Quantity and Total */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gold dark:border-gray-500">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={isLoading}
                              className="!w-6 !h-6 sm:!w-8 sm:!h-8 max-sm:min-w-[30px] max-sm:min-h-[30px] p-0 border-green dark:border-gray-600"
                            >
                              <Minus className="sm:!w-4 sm:!h-4 !h-3.5 !w-3.5" />
                            </Button>
                            
                            <div className="sm:w-8 w-5 text-center">
                              {loadingId === item.id ? (
                                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                              ) : (
                                <span className="font-bold text-green dark:text-white text-base">
                                  {item.quantity}
                                </span>
                              )}
                            </div>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={isLoading}
                              className="!w-6 !h-6 sm:!w-8 sm:!h-8 max-sm:min-w-[30px] max-sm:min-h-[30px] p-0 border-green dark:border-gray-600"
                            >
                              <Plus className="!w-4 !h-4 !h-3.5 !w-3.5" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-primary dark:text-white text-base">
                              {formatPrice(
                                (parseFloat(item.variant.price.amount) * item.quantity).toString(),
                                item.variant.price.currencyCode
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="border-t border-gold dark:border-gray-700 dark:bg-gray-800 px-6 py-3">
                  <div className="space-y-2.5 mb-5">
                    <div className="flex justify-between text-base">
                      <span className="text-primary dark:text-gray-300">Subtotal</span>
                      <span className="font-medium text-primary dark:text-white">
                        {formatPrice(cart.subtotalPrice.amount, cart.subtotalPrice.currencyCode)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-base">
                      <span className="text-primary dark:text-gray-300">Shipping</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        Free
                      </span>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-green dark:text-white">Total</span>
                      <span className="text-green dark:text-white font-bold">
                        {formatPrice(cart.totalPrice.amount, cart.totalPrice.currencyCode)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    onClick={handleCheckout}
                    className="w-full min-w-full ctm-button btn-green !border-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <ExternalLink className="w-5 h-5 mr-2" />
                    )}
                    Secure Checkout
                  </Button>
                  
                  <p className="text-sm text-primary dark:text-white text-center mt-3">
                    Secure payment powered by Shopify
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}