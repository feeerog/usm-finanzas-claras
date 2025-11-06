import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Award, TrendingUp, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Becas() {
  const { toast } = useToast();
  const [isScholarshipDialogOpen, setIsScholarshipDialogOpen] = useState(false);
  
  const scholarships = [
    {
      id: 1,
      name: "Beca de Excelencia Académica",
      type: "Institucional",
      status: "active",
      coverage: "50%",
      amount: 2100000,
      period: "Anual",
      validFrom: "2024-03-01",
      validUntil: "2024-12-31",
      requirements: [
        "Promedio mínimo: 5.5",
        "No reprobar asignaturas",
        "Renovación semestral automática",
      ],
      description: "Beca otorgada por mérito académico durante la educación media",
    },
    {
      id: 2,
      name: "Beca Alimentación JUNAEB",
      type: "Estatal",
      status: "active",
      coverage: "$45.000/mes",
      amount: 45000,
      period: "Mensual",
      validFrom: "2024-03-01",
      validUntil: "2024-12-31",
      requirements: [
        "Mantener calidad de alumno regular",
        "Renovación anual según requisitos socioeconómicos",
      ],
      description: "Beneficio estatal para alimentación en el casino universitario",
    },
    {
      id: 3,
      name: "Beca Hijo de Profesional de la Educación",
      type: "Estatal",
      status: "pending",
      coverage: "30%",
      amount: 1260000,
      period: "Anual",
      validFrom: "2024-03-01",
      validUntil: "2024-12-31",
      requirements: [
        "Documentación familiar en revisión",
        "Verificación de antecedentes laborales",
      ],
      description: "Beneficio para hijos de docentes del sistema educacional chileno",
    },
    {
      id: 4,
      name: "Pago Ayudantía",
      type: "Institucional",
      status: "active",
      coverage: "$350.000/mes",
      amount: 350000,
      period: "Mensual",
      validFrom: "2024-03-01",
      validUntil: "2024-12-31",
      requirements: [
        "Asistencia obligatoria a clases de ayudantía",
        "Evaluación semestral de desempeño",
        "Mantener promedio mínimo 5.0",
      ],
      description: "Remuneración por servicios de ayudantía en ramos de la carrera",
    },
  ];

  const activeScholarships = scholarships.filter((s) => s.status === "active");
  const totalCoverage = activeScholarships.reduce((sum, s) => {
    if (s.coverage.includes("%")) {
      return sum + parseFloat(s.coverage);
    }
    return sum;
  }, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount);
  };

  const handleViewCertificate = (scholarship: typeof scholarships[0]) => {
    toast({
      title: "Descargando certificado",
      description: `Se está descargando el certificado de ${scholarship.name}.`,
    });
    
    setTimeout(() => {
      toast({
        title: "Certificado descargado",
        description: "El certificado se ha descargado correctamente.",
      });
    }, 1500);
  };

  const handleViewRequestStatus = (scholarship: typeof scholarships[0]) => {
    toast({
      title: "Estado de solicitud",
      description: `La solicitud de ${scholarship.name} está en proceso de revisión. Te notificaremos cuando haya actualizaciones.`,
    });
  };

  const handleSearchNewScholarships = () => {
    setIsScholarshipDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Becas y Beneficios</h1>
        <p className="text-muted-foreground">
          Estado de tus beneficios estudiantiles y ayudas financieras
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Becas Activas</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeScholarships.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {scholarships.length - activeScholarships.length} en proceso
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cobertura Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalCoverage}%</div>
            <p className="text-xs text-muted-foreground mt-1">Del arancel anual</p>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vigencia</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Dic 2024</div>
            <p className="text-xs text-muted-foreground mt-1">Renovación automática</p>
          </CardContent>
        </Card>
      </div>

      {/* Scholarships List */}
      <div className="space-y-4">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id} className="shadow-medium hover:shadow-strong transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                    <Badge variant={scholarship.status === "active" ? "success" : "warning"}>
                      {scholarship.status === "active" ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Activa
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3 w-3 mr-1" />
                          En Proceso
                        </>
                      )}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="outline">{scholarship.type}</Badge>
                    <span className="text-muted-foreground">•</span>
                    <span>{scholarship.period}</span>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{scholarship.coverage}</div>
                  <p className="text-sm text-muted-foreground">Cobertura</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{scholarship.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Detalles del Beneficio</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Monto:</span>
                        <span className="font-medium text-foreground">
                          {formatCurrency(scholarship.amount)}
                          {scholarship.period === "Mensual" && "/mes"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Período:</span>
                        <span className="font-medium text-foreground">{scholarship.period}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Válida desde:</span>
                        <span className="font-medium text-foreground">
                          {new Date(scholarship.validFrom).toLocaleDateString("es-CL")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Válida hasta:</span>
                        <span className="font-medium text-foreground">
                          {new Date(scholarship.validUntil).toLocaleDateString("es-CL")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Requisitos de Mantención</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {scholarship.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewCertificate(scholarship)}
                  >
                    Descargar Certificado
                  </Button>
                  {scholarship.status === "pending" && (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleViewRequestStatus(scholarship)}
                    >
                      Ver Estado de Solicitud
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Apply for new scholarship */}
      <Card className="shadow-medium border-accent/50">
        <CardHeader>
          <CardTitle>¿Buscas más beneficios?</CardTitle>
          <CardDescription>
            Explora otros programas de becas y beneficios disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="default"
            onClick={handleSearchNewScholarships}
          >
            Buscar Nuevas Becas
          </Button>
        </CardContent>
      </Card>

      {/* Dialog for Scholarship Application */}
      <Dialog open={isScholarshipDialogOpen} onOpenChange={setIsScholarshipDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Postulación de Becas</DialogTitle>
            <DialogDescription>
              Información sobre el período de postulación
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-8 w-8 text-warning" />
              <div>
                <p className="text-lg font-semibold text-foreground">
                  Fuera de plazo para postulación de becas
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              El período de postulación para nuevas becas se encuentra cerrado en este momento. 
              Cuando estemos en período de postulación, podrás buscar y aplicar a nuevas becas 
              disponibles desde esta sección.
            </p>
            <p className="text-sm text-muted-foreground">
              Te recomendamos revisar periódicamente esta sección para estar al tanto de los 
              próximos períodos de postulación.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsScholarshipDialogOpen(false)}>
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
