import { Home, CreditCard, Receipt, Award, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Inicio", url: "/", icon: Home },
  { title: "Deudas", url: "/deudas", icon: CreditCard },
  { title: "Pagos", url: "/pagos", icon: Receipt },
  { title: "Becas y Beneficios", url: "/becas", icon: Award },
  { title: "Mi Perfil", url: "/perfil", icon: User },
];

export function Navbar() {
  return (
    <>
      {/* Logo Section */}
      <div className="w-full border-b bg-card py-3">
        <div className="container mx-auto px-4">
          <NavLink to="/" className="flex items-center gap-3">
            <img 
              src="/usm.png" 
              alt="USM Logo" 
              className="h-14 w-auto object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Portal Estudiantil
              </h1>
              <p className="text-sm text-muted-foreground">
                Universidad Técnica Federico Santa María
              </p>
            </div>
          </NavLink>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-center gap-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                end
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all relative",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

