import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Receipt, Calendar, CreditCard } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

export default function Pagos() {
  const { toast } = useToast();
  
  const payments = [
    {
      id: 2,
      concept: "Arancel - Cuota 2/10",
      amount: 420000,
      date: "2024-09-15",
      method: "Transferencia Bancaria",
      status: "paid",
      receipt: "BOL-2024-09-00152",
    },
    {
      id: 3,
      concept: "Arancel - Cuota 1/10",
      amount: 420000,
      date: "2024-08-15",
      method: "Webpay",
      status: "paid",
      receipt: "BOL-2024-08-00098",
    },
    {
      id: 4,
      concept: "Matrícula Semestre 2024-1",
      amount: 800000,
      date: "2024-03-10",
      method: "Transferencia Bancaria",
      status: "paid",
      receipt: "BOL-2024-03-00045",
    },
    {
      id: 5,
      concept: "Seguro Estudiantil 2024",
      amount: 25000,
      date: "2024-03-10",
      method: "Webpay",
      status: "paid",
      receipt: "BOL-2024-03-00046",
    },
    {
      id: 6,
      concept: "Arancel 2023 - Cuota 10/10",
      amount: 420000,
      date: "2023-12-15",
      method: "Transferencia Bancaria",
      status: "paid",
      receipt: "BOL-2023-12-00234",
    },
  ];

  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const currentYear = new Date().getFullYear();
  const currentYearPayments = payments.filter(
    (p) => new Date(p.date).getFullYear() === currentYear
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount);
  };

  const handleDownloadReceipt = (payment: typeof payments[0]) => {
    toast({
      title: "Descargando boleta",
      description: `Se está descargando la boleta ${payment.receipt} para ${payment.concept}.`,
    });
    
    // Simular descarga (en un caso real, esto descargaría un archivo PDF)
    setTimeout(() => {
      toast({
        title: "Boleta descargada",
        description: `La boleta ${payment.receipt} se ha descargado correctamente.`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Historial de Pagos</h1>
        <p className="text-muted-foreground">
          Registro completo de todos tus pagos realizados
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(totalPaid)}</div>
            <p className="text-xs text-muted-foreground mt-1">Histórico completo</p>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pagos {currentYear}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{currentYearPayments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Pagos realizados este año</p>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Último Pago</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(payments[0].amount)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(payments[0].date).toLocaleDateString("es-CL")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Detalle de Pagos</CardTitle>
          <CardDescription>Historial completo de transacciones realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Concepto</TableHead>
                  <TableHead className="font-semibold">Fecha</TableHead>
                  <TableHead className="font-semibold">Método</TableHead>
                  <TableHead className="font-semibold">N° Boleta</TableHead>
                  <TableHead className="font-semibold text-right">Monto</TableHead>
                  <TableHead className="font-semibold text-center">Estado</TableHead>
                  <TableHead className="font-semibold text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{payment.concept}</TableCell>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString("es-CL", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{payment.method}</TableCell>
                    <TableCell className="font-mono text-sm">{payment.receipt}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(payment.amount)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="paid">Pagado</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownloadReceipt(payment)}
                        title="Descargar boleta"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
