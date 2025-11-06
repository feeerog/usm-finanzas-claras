import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, MapPin, BookOpen, Calendar, Building2, CreditCard, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const CHILEAN_BANKS = [
  "Banco de Chile",
  "Banco Internacional",
  "Banco del Estado de Chile (BancoEstado)",
  "Scotiabank Sud Americano",
  "Banco de Crédito e Inversiones (BCI)",
  "Banco Do Brasil S.A.",
  "Corpbanca (Banco Itaú Chile)",
  "Banco BICE",
  "HSBC Bank (Chile)",
  "Banco Santander-Chile",
  "Banco Itaú Chile",
  "JP Morgan Chase Bank, N.A.",
  "Banco Security",
  "Banco Falabella",
  "Banco BTG Pactual Chile",
  "Banco Consorcio",
  "Banco Ripley",
  "ABCdin Banco",
];

const ACCOUNT_TYPES = [
  "Cuenta Corriente",
  "Cuenta RUT",
  "Cuenta Vista",
  "Cuenta de Ahorros",
];

export default function Perfil() {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);
  // Función para obtener cuenta bancaria inicial desde localStorage
  const getInitialBankAccount = (): {
    bank: string;
    accountType: string;
    accountNumber: string;
  } | null => {
    const savedBankAccount = localStorage.getItem("bankAccount");
    if (savedBankAccount) {
      try {
        return JSON.parse(savedBankAccount);
      } catch (error) {
        console.error("Error al cargar cuenta bancaria:", error);
        return null;
      }
    }
    return null;
  };

  const [bankAccount, setBankAccount] = useState<{
    bank: string;
    accountType: string;
    accountNumber: string;
  } | null>(getInitialBankAccount);
  const [editedBankAccount, setEditedBankAccount] = useState({
    bank: "",
    accountType: "",
    accountNumber: "",
  });

  // Función para obtener datos iniciales del perfil desde localStorage o valores por defecto
  const getInitialStudentInfo = () => {
    const savedProfile = localStorage.getItem("studentProfile");
    const defaultInfo = {
      name: "María José González Pérez",
      rut: "20.420.676-0",
      email: "maria.gonzalez@sansano.usm.cl",
      phone: "+56 9 8765 4321",
      address: "Rancagua, Chile",
      career: "Ingeniería Civil Informática",
      enrollment: "202001234",
      admissionYear: "2020",
      currentSemester: "12",
      status: "Regular",
    };

    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        return { ...defaultInfo, ...parsed };
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        return defaultInfo;
      }
    }
    return defaultInfo;
  };

  const [studentInfo, setStudentInfo] = useState(getInitialStudentInfo);

  const [editedProfile, setEditedProfile] = useState({
    email: "",
    phone: "",
    address: "",
  });

  // Los datos se cargan en el estado inicial, pero mantenemos este useEffect
  // por si necesitamos sincronizar datos externos en el futuro

  // Guardar datos del perfil en localStorage cuando cambien
  useEffect(() => {
    const profileData = {
      email: studentInfo.email,
      phone: studentInfo.phone,
      address: studentInfo.address,
    };
    localStorage.setItem("studentProfile", JSON.stringify(profileData));
  }, [studentInfo.email, studentInfo.phone, studentInfo.address]);

  // Guardar cuenta bancaria en localStorage cuando cambie
  useEffect(() => {
    if (bankAccount) {
      localStorage.setItem("bankAccount", JSON.stringify(bankAccount));
    }
  }, [bankAccount]);

  const handleSaveBankAccount = () => {
    if (!editedBankAccount.bank || !editedBankAccount.accountType || !editedBankAccount.accountNumber) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos.",
        variant: "destructive",
      });
      return;
    }
    
    setBankAccount(editedBankAccount);
    setIsEditDialogOpen(false);
    toast({
      title: bankAccount ? "Cuenta bancaria actualizada" : "Cuenta bancaria registrada",
      description: "Los cambios se han guardado correctamente.",
    });
  };

  const handleOpenDialog = () => {
    if (bankAccount) {
      setEditedBankAccount(bankAccount);
    } else {
      setEditedBankAccount({
        bank: "",
        accountType: "",
        accountNumber: "",
      });
    }
    setIsEditDialogOpen(true);
  };

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditProfile = () => {
    setEditedProfile({
      email: studentInfo.email,
      phone: studentInfo.phone,
      address: studentInfo.address,
    });
    setIsEditProfileDialogOpen(true);
  };

  const handleSaveProfile = () => {
    if (!editedProfile.email || !editedProfile.phone || !editedProfile.address) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos.",
        variant: "destructive",
      });
      return;
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedProfile.email)) {
      toast({
        title: "Error",
        description: "Por favor ingresa un correo electrónico válido.",
        variant: "destructive",
      });
      return;
    }

    setStudentInfo({
      ...studentInfo,
      email: editedProfile.email,
      phone: editedProfile.phone,
      address: editedProfile.address,
    });
    setIsEditProfileDialogOpen(false);
    toast({
      title: "Perfil actualizado",
      description: "Tus datos de contacto se han actualizado correctamente.",
    });
  };

  const handleCancelEditProfile = () => {
    setIsEditProfileDialogOpen(false);
  };

  const handleChangePassword = () => {
    toast({
      title: "Cambiar contraseña",
      description: "Redirigiendo al formulario de cambio de contraseña...",
    });
  };

  const handleUpdateContactInfo = () => {
    toast({
      title: "Actualizar datos de contacto",
      description: "Abre el formulario de edición de perfil para actualizar tus datos de contacto.",
    });
  };

  const handleDownloadCertificates = () => {
    toast({
      title: "Descargando certificados",
      description: "Se están preparando tus certificados para descargar...",
    });
    
    setTimeout(() => {
      toast({
        title: "Certificados listos",
        description: "Los certificados se han descargado correctamente.",
      });
    }, 1500);
  };

  const handleNotificationSettings = () => {
    toast({
      title: "Configuración de notificaciones",
      description: "Redirigiendo a la configuración de notificaciones...",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mi Perfil</h1>
        <p className="text-muted-foreground">
          Información personal y académica
        </p>
      </div>

      {/* Profile Header */}
      <Card className="shadow-medium">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{studentInfo.name}</h2>
                <p className="text-muted-foreground">RUT: {studentInfo.rut}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="success">{studentInfo.status}</Badge>
                <Badge variant="outline">Semestre {studentInfo.currentSemester}</Badge>
              </div>
            </div>
            <Button variant="outline" onClick={handleEditProfile}>Editar Perfil</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Datos de contacto y personales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Correo Electrónico</p>
                <p className="text-sm text-muted-foreground">{studentInfo.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Teléfono</p>
                <p className="text-sm text-muted-foreground">{studentInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Dirección</p>
                <p className="text-sm text-muted-foreground">{studentInfo.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Información Académica</CardTitle>
            <CardDescription>Datos de tu carrera y estudios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Carrera</p>
                <p className="text-sm text-muted-foreground">{studentInfo.career}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Año de Ingreso</p>
                <p className="text-sm text-muted-foreground">{studentInfo.admissionYear}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">N° Matrícula</p>
                <p className="text-sm text-muted-foreground">{studentInfo.enrollment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bank Account Information */}
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Información Bancaria</CardTitle>
              <CardDescription>Cuenta para depósito de pagos y beneficios</CardDescription>
            </div>
            {bankAccount && (
              <Button variant="outline" size="sm" onClick={handleOpenDialog}>
                <Edit className="h-4 w-4 mr-2" />
                Cambiar Cuenta
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!bankAccount ? (
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-foreground">No hay cuenta bancaria registrada</p>
                <p className="text-sm text-muted-foreground">Registra una cuenta para recibir pagos y beneficios</p>
              </div>
              <Button onClick={handleOpenDialog}>
                <CreditCard className="h-4 w-4 mr-2" />
                Registrar Cuenta Bancaria
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Banco</p>
                  <p className="text-sm text-muted-foreground">{bankAccount.bank}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Tipo de Cuenta</p>
                  <p className="text-sm text-muted-foreground">{bankAccount.accountType}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Número de Cuenta</p>
                  <p className="text-sm text-muted-foreground">{bankAccount.accountNumber}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog for Edit Profile */}
      <Dialog open={isEditProfileDialogOpen} onOpenChange={setIsEditProfileDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>
              Actualiza tu información de contacto. Los datos académicos no pueden ser modificados.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+56 9 1234 5678"
                value={editedProfile.phone}
                onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                type="text"
                placeholder="Ciudad, País"
                value={editedProfile.address}
                onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEditProfile}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProfile}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for Bank Account */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{bankAccount ? "Editar Cuenta Bancaria" : "Registrar Cuenta Bancaria"}</DialogTitle>
            <DialogDescription>
              {bankAccount ? "Actualiza la información de tu cuenta bancaria" : "Ingresa los datos de tu cuenta bancaria para recibir pagos"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="bank">Banco</Label>
              <Select
                value={editedBankAccount.bank}
                onValueChange={(value) => setEditedBankAccount({ ...editedBankAccount, bank: value })}
              >
                <SelectTrigger id="bank">
                  <SelectValue placeholder="Selecciona un banco" />
                </SelectTrigger>
                <SelectContent>
                  {CHILEAN_BANKS.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountType">Tipo de Cuenta</Label>
              <Select
                value={editedBankAccount.accountType}
                onValueChange={(value) => setEditedBankAccount({ ...editedBankAccount, accountType: value })}
              >
                <SelectTrigger id="accountType">
                  <SelectValue placeholder="Selecciona un tipo de cuenta" />
                </SelectTrigger>
                <SelectContent>
                  {ACCOUNT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountNumber">Número de Cuenta</Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Ej: 1234567890"
                value={editedBankAccount.accountNumber}
                onChange={(e) => setEditedBankAccount({ ...editedBankAccount, accountNumber: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancelar
            </Button>
            <Button onClick={handleSaveBankAccount}>
              {bankAccount ? "Guardar Cambios" : "Registrar Cuenta"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Actions */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Gestiona tu cuenta y preferencias</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={handleChangePassword}>Cambiar Contraseña</Button>
          <Button variant="outline" onClick={handleUpdateContactInfo}>Actualizar Datos de Contacto</Button>
          <Button variant="outline" onClick={handleDownloadCertificates}>Descargar Certificados</Button>
          <Button variant="outline" onClick={handleNotificationSettings}>Configuración de Notificaciones</Button>
        </CardContent>
      </Card>
    </div>
  );
}
