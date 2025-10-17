# 🎨 Guida Completa Shadcn/UI

## 📋 Indice
1. [Setup Iniziale](#setup-iniziale)
2. [Installazione Componenti](#installazione-componenti)
3. [Anatomia di un Componente](#anatomia-di-un-componente)
4. [Componenti Essenziali](#componenti-essenziali)
5. [Best Practices](#best-practices)
6. [Pattern Comuni](#pattern-comuni)
7. [Personalizzazione e Tema](#personalizzazione-e-tema)
8. [Troubleshooting](#troubleshooting)

---

## Setup Iniziale

### ✅ Prerequisiti

Il progetto **parte da "Nuno's Next.js Starter Kit"**, quindi shadcn/ui è **già configurato**:

- ✅ `components.json` presente nella root (definisce alias e percorsi)
- ✅ `tailwind.config.ts` configurato con CSS variables
- ✅ `src/components/ui/` cartella già creata
- ✅ Cartella `node_modules/@shadcn/ui` presente

### 🔍 Verificare Setup Existente

```bash
# 1. Verificare che components.json esiste e è valido
cat components.json

# Output atteso:
# {
#   "$schema": "https://ui.shadcn.com/schema.json",
#   "style": "default",
#   "rsc": true,
#   "tsx": true,
#   "alias": {
#     "@/components": "src/components",
#     "@/lib": "src/lib",
#     "@/utils": "src/lib/utils"
#   },
#   "px": "px"
# }

# 2. Verificare Tailwind installato
pnpm list tailwindcss

# 3. Verificare cartella ui/
ls -la src/components/ui/ 
```

Se tutto è OK, **sei pronto a installare componenti**. Altrimenti, vedi [Setup da Zero](#setup-da-zero-se-necessario).

---

## Installazione Componenti

### 🚀 Comando Base

```bash
pnpm dlx shadcn-ui@latest add [nome-componente]
```

### ✅ Componenti Essenziali da Installare Subito

Questi componenti coprono il **95% dei casi d'uso** comuni:

```bash
# Core UI Elements (Installa in questo ordine)
pnpm dlx shadcn-ui@latest add button
pnpm dlx shadcn-ui@latest add card
pnpm dlx shadcn-ui@latest add input
pnpm dlx shadcn-ui@latest add label
pnpm dlx shadcn-ui@latest add badge

# Forms & Validation
pnpm dlx shadcn-ui@latest add form
pnpm dlx shadcn-ui@latest add textarea
pnpm dlx shadcn-ui@latest add select
pnpm dlx shadcn-ui@latest add checkbox
pnpm dlx shadcn-ui@latest add radio-group

# Layout & Navigation
pnpm dlx shadcn-ui@latest add dropdown-menu
pnpm dlx shadcn-ui@latest add sheet
pnpm dlx shadcn-ui@latest add dialog

# Feedback & Status
pnpm dlx shadcn-ui@latest add toast
pnpm dlx shadcn-ui@latest add alert
pnpm dlx shadcn-ui@latest add loading-spinner
pnpm dlx shadcn-ui@latest add skeleton

# Tables & Data Display
pnpm dlx shadcn-ui@latest add table
pnpm dlx shadcn-ui@latest add pagination
```

### 📋 Lista Componenti Disponibili

```bash
# Vedere tutti i componenti disponibili
pnpm dlx shadcn-ui@latest
```

**Categorie Principali:**
- **Forms**: `input`, `textarea`, `select`, `checkbox`, `radio-group`, `form`, `slider`
- **Data Display**: `table`, `badge`, `avatar`, `progress`, `skeleton`
- **Navigation**: `dropdown-menu`, `sheet`, `navigation-menu`, `breadcrumb`, `tabs`
- **Overlays**: `dialog`, `drawer`, `popover`, `tooltip`, `alert-dialog`
- **Feedback**: `toast`, `alert`, `progress`, `loading-spinner`
- **Misc**: `calendar`, `date-picker`, `command`, `combo-box`

---

## Anatomia di un Componente

### 🔍 Struttura Tipica

Quando installi un componente, shadcn crea file in `src/components/ui/`:

```typescript
// src/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// 1. Schema delle varianti (size, variant, etc)
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 2. Props TypeScript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// 3. Componente React
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### 🧩 Concetti Chiave

| Concetto | Spiegazione |
|----------|------------|
| **CVA (Class Variance Authority)** | Definisce varianti CSS condizionali (size, variant, color) |
| **Slot (Radix UI)** | Permette di usare il componente come wrapper (`asChild`) |
| **cn()** | Utility per mergare classi Tailwind in modo intelligente |
| **forwardRef** | Espone il DOM ref del componente interno |
| **Props Interface** | Estende attributi HTML nativi + varianti custom |

---

## Componenti Essenziali

### 1️⃣ Button

```typescript
import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex gap-4">
      {/* Varianti */}
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>

      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🔔</Button>

      {/* States */}
      <Button disabled>Disabled</Button>
      <Button onClick={() => alert("Clicked!")}>Click me</Button>
    </div>
  );
}
```

### 2️⃣ Card

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardDemo() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Event Details</CardTitle>
        <CardDescription>Your event is scheduled for tomorrow</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Lorem ipsum dolor sit amet.</p>
      </CardContent>
    </Card>
  );
}
```

### 3️⃣ Input + Label

```typescript
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input 
        id="email" 
        type="email" 
        placeholder="user@example.com"
      />
    </div>
  );
}
```

### 4️⃣ Badge

```typescript
import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex gap-2">
      <Badge>Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Cancelled</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  );
}
```

### 5️⃣ Dialog (Modal)

```typescript
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive">Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### 6️⃣ Form (Con React Hook Form)

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 1. Schema Zod
const formSchema = z.object({
  email: z.string().email("Email invalida"),
  eventName: z.string().min(3, "Minimo 3 caratteri"),
});

type FormValues = z.infer<typeof formSchema>;

export default function EventForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      eventName: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    // Chiamare Server Action qui
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" {...field} />
              </FormControl>
              <FormDescription>
                We'll use this to send event updates
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Tech Conference 2025" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Event</Button>
      </form>
    </Form>
  );
}
```

### 7️⃣ Tabs

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="details" className="w-96">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="attendees">Attendees</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details">
        <p>Event details go here...</p>
      </TabsContent>
      
      <TabsContent value="attendees">
        <p>List of attendees...</p>
      </TabsContent>
    </Tabs>
  );
}
```

### 8️⃣ Table

```typescript
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const events = [
  { id: 1, name: "React Workshop", date: "2025-10-25", status: "Active" },
  { id: 2, name: "Next.js Masterclass", date: "2025-11-01", status: "Draft" },
];

export default function TableDemo() {
  return (
    <Table>
      <TableCaption>Your events</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Event Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

## Best Practices

### ✅ Regola 1: Componenti di Default = Server Components

```typescript
// ✅ CORRETTO
// src/components/event/event-card.tsx (file senza "use client")
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EventCard({ event }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        <Badge>{event.status}</Badge>
      </CardHeader>
      <CardContent>
        <p>{event.description}</p>
      </CardContent>
    </Card>
  );
}
```

### ✅ Regola 2: "use client" Solo per Interattività

```typescript
// ❌ SBAGLIATO - "use client" non necessario
"use client";
import { Card } from "@/components/ui/card";
export default function EventList({ events }) {
  return events.map(e => <Card key={e.id}>{e.name}</Card>);
}

// ✅ CORRETTO - "use client" per onClick
"use client";
import { Button } from "@/components/ui/button";
export default function DeleteButton({ eventId }) {
  const handleDelete = async () => {
    await deleteEvent(eventId);
  };
  return <Button onClick={handleDelete}>Delete</Button>;
}
```

### ✅ Regola 3: Componi Componenti, Non Duplicare

```typescript
// ❌ SBAGLIATO - Duplicazione
export function EventCard1() {
  return <Card className="p-4 rounded bg-white shadow"><Title>...</Title></Card>;
}
export function EventCard2() {
  return <Card className="p-4 rounded bg-white shadow"><Title>...</Title></Card>;
}

// ✅ CORRETTO - Composizione
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EventCardProps {
  title: string;
  description: string;
  status: "active" | "draft" | "cancelled";
}

export function EventCard({ title, description, status }: EventCardProps) {
  const statusColor = {
    active: "bg-green-100",
    draft: "bg-yellow-100",
    cancelled: "bg-red-100",
  };
  
  return (
    <Card className={statusColor[status]}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
}
```

### ✅ Regola 4: Usa cn() per Classi Dinamiche

```typescript
// ❌ SBAGLIATO - Template strings
export function Button({ variant }) {
  const className = `px-4 py-2 ${
    variant === "primary" ? "bg-blue-600 text-white" : "bg-gray-200"
  }`;
  return <button className={className}>Click</button>;
}

// ✅ CORRETTO - cn() di shadcn
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CustomButton({ variant = "default" }) {
  return (
    <Button 
      variant={variant}
      className={cn(
        "custom-class-if-needed",
        variant === "special" && "special-class"
      )}
    >
      Click
    </Button>
  );
}
```

### ✅ Regola 5: Props Type-Safe con TypeScript

```typescript
// ❌ SBAGLIATO - any type
export function EventCard(props: any) {
  return <Card>{props.name}</Card>;
}

// ✅ CORRETTO - Interface esplicita
import { ReactNode } from "react";

interface EventCardProps {
  id: string;
  title: string;
  description?: string;
  status: "active" | "draft" | "cancelled";
  children?: ReactNode;
  onDelete?: (id: string) => void;
}

export function EventCard({
  id,
  title,
  description,
  status,
  children,
  onDelete,
}: EventCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {description && <CardContent>{description}</CardContent>}
      {children}
      {onDelete && (
        <Button onClick={() => onDelete(id)} variant="destructive">
          Delete
        </Button>
      )}
    </Card>
  );
}
```

---

## Pattern Comuni

### 📌 Pattern 1: Form Modal

```typescript
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  eventName: z.string().min(3),
});

type FormValues = z.infer<typeof schema>;

export function CreateEventModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    // Chiamare Server Action
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

### 📌 Pattern 2: Data Table con Actions

```typescript
"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EventTableProps {
  events: Array<{ id: string; name: string; date: string }>;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function EventTable({ events, onDelete, onEdit }: EventTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">⋯</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onEdit(event.id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(event.id)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### 📌 Pattern 3: Responsive Grid di Card

```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
  id: string;
  name: string;
  date: string;
  attendees: number;
}

interface EventGridProps {
  events: Event[];
}

export function EventGrid({ events }: EventGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle className="text-lg">{event.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{event.date}</p>
            <p className="text-sm font-semibold mt-2">
              {event.attendees} attendees
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

## Personalizzazione e Tema

### 🎨 Variabili CSS Tailwind (in `globals.css`)

Shadcn usa CSS variables per il tema. Modifica `src/app/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.6%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.6%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.6%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 9.1%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --primary: 0 0% 9.1%;
    --primary-foreground: 0 0% 98%;
    --ring: 0 0% 3.6%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.6%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.6%;
    --popover-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 98%;
    --accent-foreground: 0 0% 9.1%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 9.1% 9.1%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9.1%;
    --ring: 0 0% 83.1%;
  }
}
```

### 🎯 Customizzare un Componente

```typescript
// src/components/ui/custom-button.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export function CustomButton({
  variant = "primary",
  className,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      className={cn(
        "rounded-full font-bold",
        variant === "primary" && "bg-gradient-to-r from-blue-600 to-blue-800",
        variant === "secondary" && "bg-gradient-to-r from-gray-400 to-gray-600",
        variant === "danger" && "bg-gradient-to-r from-red-600 to-red-800",
        className
      )}
      {...props}
    />
  );
}
```

---

## Troubleshooting

### ❌ Errore: "Cannot find module '@/components/ui/button'"

**Causa**: Componente non ancora installato

**Soluzione**:
```bash
pnpm dlx shadcn-ui@latest add button
```

### ❌ Errore: "Unexpected token 'export'"

**Causa**: Usi il componente in un client component senza `"use client"`

**Soluzione**:
```typescript
// Aggiungi all'inizio del file
"use client";

import { Button } from "@/components/ui/button";
export default function MyComponent() { ... }
```

### ❌ Styling non applicato (classi Tailwind non funzionano)

**Causa**: Postcss non configurato correttamente o `postcss.config.mjs` mancante

**Soluzione**:
```bash
# Verificare postcss.config.mjs esiste
cat postcss.config.mjs

# Deve contenere:
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

# Se manca, ricrearlo
pnpm add -D postcss autoprefixer
```

### ❌ Dark mode non funziona

**Causa**: Configurazione tema non corretta in `tailwind.config.ts`

**Soluzione**:
```typescript
// tailwind.config.ts
export default {
  darkMode: ["class"],  // ← Assicurati che sia "class"
  theme: {
    extend: {
      colors: {
        // Definisci colori custom se necessario
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### ❌ "ReferenceError: React is not defined"

**Causa**: Dimentichi di importare React in file RSC che usano JSX

**Soluzione**:
```typescript
// Aggiungi questo se il file è un RSC
import { ReactNode } from "react";

export function MyComponent({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
```

---

## 🚀 Quick Start Checklist

- [ ] Verificare `components.json` esiste
- [ ] Verificare `src/components/ui/` esiste e ha permessi lettura/scrittura
- [ ] Installare button: `pnpm dlx shadcn-ui@latest add button`
- [ ] Creare file test: `src/components/test-button.tsx`
- [ ] Importare Button e renderizzare in una pagina
- [ ] Verificare styling (background, border, text color)
- [ ] Se OK: Installare altri componenti dalla lista essenziale
