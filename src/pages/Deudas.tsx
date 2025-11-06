import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Calendar, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Deudas() {
  const { toast } = useToast();
  const [selectedDebt, setSelectedDebt] = useState<typeof debts[0] | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  
  const debts = [
    {
      id: 1,
      concept: "Matrícula Semestre 2024-2",
      amount: 850000,
      dueDate: "2024-10-15",
      status: "pending",
      description: "Matrícula correspondiente al segundo semestre académico 2024",
    },
    {
      id: 2,
      concept: "Arancel - Cuota 3/10",
      amount: 420000,
      dueDate: "2024-10-20",
      status: "pending",
      description: "Tercera cuota del arancel anual",
    },
    {
      id: 3,
      concept: "Arancel - Cuota 4/10",
      amount: 420000,
      dueDate: "2024-11-15",
      status: "pending",
      description: "Cuarta cuota del arancel anual",
    },
    {
      id: 4,
      concept: "Biblioteca - Multa por retraso",
      amount: 5000,
      dueDate: "2024-10-10",
      status: "overdue",
      description: "Multa por devolución tardía de material bibliográfico",
    },
  ];

  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
  const overdueDebts = debts.filter((d) => d.status === "overdue");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount);
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const handlePayNow = (debt: typeof debts[0]) => {
    setSelectedDebt(debt);
    setIsPaymentDialogOpen(true);
  };

  const handleConfirmPayment = () => {
    if (!selectedDebt) return;
    
    setIsPaymentDialogOpen(false);
    toast({
      title: "Pago procesado",
      description: `El pago de ${selectedDebt.concept} por ${formatCurrency(selectedDebt.amount)} ha sido procesado exitosamente.`,
    });
    
    // Simular actualización de la deuda (en un caso real, esto vendría del backend)
    setTimeout(() => {
      toast({
        title: "Pago confirmado",
        description: "Recibirás un comprobante por correo electrónico.",
      });
    }, 1000);
    
    setSelectedDebt(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mis Deudas</h1>
        <p className="text-muted-foreground">
          Estado detallado de tus obligaciones financieras pendientes
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Deuda Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(totalDebt)}</div>
            <p className="text-xs text-muted-foreground mt-1">{debts.length} pagos pendientes</p>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Próximo Vencimiento</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {new Date(debts[0].dueDate).toLocaleDateString("es-CL", { day: "numeric", month: "short" })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{debts[0].concept}</p>
          </CardContent>
        </Card>

        <Card className="shadow-medium border-destructive/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Deudas Vencidas</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overdueDebts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {overdueDebts.length > 0 ? "Requieren atención inmediata" : "Sin deudas vencidas"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Debts List */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Detalle de Deudas</CardTitle>
          <CardDescription>Lista completa de obligaciones financieras pendientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {debts.map((debt) => (
              <div
                key={debt.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border hover:shadow-soft transition-all"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{debt.concept}</h3>
                    <Badge variant={debt.status === "overdue" ? "overdue" : "pending"}>
                      {debt.status === "overdue" ? "Vencida" : "Pendiente"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{debt.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        Vence: {new Date(debt.dueDate).toLocaleDateString("es-CL")}
                      </span>
                    </div>
                    {isOverdue(debt.dueDate) && (
                      <span className="text-destructive font-medium">
                        ¡Atención requerida!
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(debt.amount)}</p>
                  </div>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => handlePayNow(debt)}
                  >
                    Pagar Ahora
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Pago</DialogTitle>
            <DialogDescription>
              ¿Estás seguro que deseas proceder con el pago?
            </DialogDescription>
          </DialogHeader>
          {selectedDebt && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Concepto:</p>
                <p className="text-sm text-muted-foreground">{selectedDebt.concept}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Monto a pagar:</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(selectedDebt.amount)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Fecha de vencimiento:</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedDebt.dueDate).toLocaleDateString("es-CL")}
                </p>
              </div>
              {isOverdue(selectedDebt.dueDate) && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive font-medium">
                    ⚠️ Esta deuda está vencida. El pago debe realizarse lo antes posible.
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmPayment}>
              Confirmar Pago
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
