import { Button, Card, CardContent, CardHeader, CardTitle } from "@darzi/shared-ui";
import { Minus, Plus, Trash2, ShoppingBag, MapPin, Tag, DollarSign, Truck } from "lucide-react";
import { Link } from "wouter";

export default function Cart() {
  const cartItems = [
    {
      id: 1,
      service: "Steam Pressing",
      description: "Professional steam pressing for dress shirts",
      quantity: 3,
      price: 12.00
    },
    {
      id: 2,
      service: "Dry Cleaning",
      description: "Eco-friendly dry cleaning for suits",
      quantity: 1,
      price: 25.00
    }
  ];

  const previousOrders = [
    { id: "ORD-7192", service: "Dry Cleaning", date: "May 10, 2026", total: "$75.00" },
    { id: "ORD-7105", service: "Eco Washing", date: "May 08, 2026", total: "$35.00" }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tip = 5.00;
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08;
  const total = subtotal + tip + deliveryFee + tax;

  return (
    <div className="container mx-auto px-6 md:px-12 pb-16 page-padding-top">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Cart Items ({cartItems.length})</h1>
          <p className="text-muted-foreground">Review and manage your selected services.</p>
        </div>
        <Link href="/services">
          <Button className="rounded-full px-8 h-12 shadow-lg shadow-primary/20">
            Continue Shopping
          </Button>
        </Link>
      </div>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items - Full width on mobile, left side on desktop */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="border-primary/5 hover:border-primary/20 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-primary/40" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary text-lg">{item.service}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-lg font-bold text-primary mt-2">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-semibold text-primary w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Side Panel - Hidden on mobile, fixed width on desktop */}
          <div className="w-full lg:w-96 lg:sticky lg:top-24 lg:h-fit space-y-6">
            {/* Address */}
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle className="text-lg font-serif flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">123 Main Street, Apt 4B<br />New York, NY 10001</p>
                <Button variant="outline" size="sm" className="w-full">
                  Change Address
                </Button>
              </CardContent>
            </Card>

            {/* Coupons */}
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle className="text-lg font-serif flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Coupons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 text-sm border border-primary/20 rounded-lg focus:outline-none focus:border-primary"
                  />
                  <Button size="sm">Apply</Button>
                </div>
              </CardContent>
            </Card>

            {/* Tip */}
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle className="text-lg font-serif flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Give a Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <Button variant="outline" size="sm">$3</Button>
                  <Button variant="outline" size="sm" className="bg-primary/10">$5</Button>
                  <Button variant="outline" size="sm">$10</Button>
                </div>
                <input 
                  type="number" 
                  placeholder="Custom amount"
                  className="w-full px-3 py-2 text-sm border border-primary/20 rounded-lg focus:outline-none focus:border-primary"
                />
              </CardContent>
            </Card>

            {/* Delivery Instructions */}
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle className="text-lg font-serif flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea 
                  placeholder="Special instructions for pickup/delivery..."
                  className="w-full px-3 py-2 text-sm border border-primary/20 rounded-lg focus:outline-none focus:border-primary resize-none"
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tip</span>
                  <span className="font-semibold">${tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-primary/10 pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-primary">Total</span>
                    <span className="font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full mt-6 h-12 rounded-xl">
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>

            {/* Previous Orders */}
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {previousOrders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center py-2 border-b border-primary/5 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-primary">{order.service}</p>
                        <p className="text-xs text-muted-foreground">{order.id} • {order.date}</p>
                      </div>
                      <span className="text-sm font-bold text-primary">{order.total}</span>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-3 text-muted-foreground">
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-primary mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some services to get started</p>
          <Link href="/services">
            <Button className="rounded-full px-8">Browse Services</Button>
          </Link>
        </div>
      )}
    </div>
  );
}