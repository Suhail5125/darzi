import { Bell, CheckCircle2 } from "lucide-react";

export default function Notifications() {
  const notifications = [
    { id: 1, title: "Order Ready", message: "Your bespoke suit is ready for pickup.", time: "2h ago", read: false },
    { id: 2, title: "Booking Confirmed", message: "Your laundry pickup for tomorrow at 10 AM is confirmed.", time: "5h ago", read: true },
    { id: 3, title: "New Product", message: "Exclusive 'Gold Member' fabric spray now in stock.", time: "1d ago", read: true },
  ];

  return (
    <div className="pt-32 pb-16 min-h-screen container mx-auto px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-primary">Notifications</h1>
          <span className="text-xs font-bold tracking-widest text-primary/60 uppercase">3 New</span>
        </div>
        
        <div className="space-y-4">
          {notifications.map((n) => (
            <div 
              key={n.id} 
              className={`p-6 rounded-2xl border transition-all ${n.read ? 'bg-background border-primary/5' : 'bg-primary/5 border-primary/10 shadow-sm'}`}
            >
              <div className="flex gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${n.read ? 'bg-muted text-muted-foreground' : 'bg-primary text-white'}`}>
                  {n.read ? <CheckCircle2 className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-primary">{n.title}</h3>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{n.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
