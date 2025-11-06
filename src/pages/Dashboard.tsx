import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingDown, Award, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  
  const upcomingPayments = [
    { id: 1, concept: "Matrícula Semestre 2024-2", amount: "$850.000", dueDate: "2024-10-15", status: "pending" },
    { id: 2, concept: "Arancel - Cuota 3/10", amount: "$420.000", dueDate: "2024-10-20", status: "pending" },
  ];

  const recentPayments = [
    { id: 1, concept: "Arancel - Cuota 2/10", amount: "$420.000", date: "2024-09-15", status: "paid" },
    { id: 2, concept: "Arancel - Cuota 1/10", amount: "$420.000", date: "2024-08-15", status: "paid" },
  ];

  const activeScholarships = [
    { id: 1, name: "Beca de Excelencia Académica", coverage: "50%", validUntil: "2024-12-31" },
    { id: 2, name: "Beca Alimentación", coverage: "$45.000/mes", validUntil: "2024-12-31" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Panel de Control</h1>
        <p className="text-muted-foreground">
          Resumen de tu situación financiera y académica
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Deuda Total"
          value="$1.270.000"
          icon={DollarSign}
          description="2 pagos pendientes"
        />
        <StatsCard
          title="Próximo Pago"
          value="$850.000"
          icon={Calendar}
          description="Vence: 15 Oct 2024"
        />
        <StatsCard
          title="Becas Activas"
          value="2"
          icon={Award}
          description="Cobertura total: 50% + alimentación"
        />
        <StatsCard
          title="Pagos Realizados"
          value="$840.000"
          icon={TrendingDown}
          description="Últimos 2 meses"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Payments */}
        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <CardTitle>Pagos Pendientes</CardTitle>
            </div>
            <CardDescription>Próximos pagos a realizar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{payment.concept}</p>
                    <p className="text-sm text-muted-foreground">
                      Vence: {new Date(payment.dueDate).toLocaleDateString("es-CL")}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-bold text-foreground">{payment.amount}</p>
                    <Badge variant="pending">Pendiente</Badge>
                  </div>
                </div>
              ))}
              <Button 
                className="w-full" 
                variant="default"
                onClick={() => navigate("/deudas")}
              >
                Ver Todas las Deudas
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <CardTitle>Pagos Recientes</CardTitle>
            </div>
            <CardDescription>Últimos pagos realizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{payment.concept}</p>
                    <p className="text-sm text-muted-foreground">
                      Pagado: {new Date(payment.date).toLocaleDateString("es-CL")}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-bold text-foreground">{payment.amount}</p>
                    <Badge variant="paid">Pagado</Badge>
                  </div>
                </div>
              ))}
              <Button 
                className="w-full" 
                variant="default"
                onClick={() => navigate("/pagos")}
              >
                Ver Historial Completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Scholarships */}
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-accent" />
            <CardTitle>Becas y Beneficios Activos</CardTitle>
          </div>
          <CardDescription>Beneficios vigentes para el período actual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {activeScholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="p-4 rounded-lg border border-border bg-card hover:shadow-soft transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{scholarship.name}</h3>
                  <Badge variant="success">Activa</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Cobertura: {scholarship.coverage}</p>
                  <p>Válida hasta: {new Date(scholarship.validUntil).toLocaleDateString("es-CL")}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
