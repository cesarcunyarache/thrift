
import { ThemeColorToggle } from "@/components/theme-color-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function TemasPage() {
  return (
    <Card className="border shadow-none drop-shadow-none mb-4 w-96">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">
            Temas
          </CardTitle>
          <CardDescription className="text-sm line-clamp-1">
             Cambia el tema de la aplicación
          </CardDescription>
        </div>

      </CardHeader>
      <CardContent className="flex lg:flex-row flex-col gap-4">
        <ThemeColorToggle />
      </CardContent>
    </Card>



  );

}
