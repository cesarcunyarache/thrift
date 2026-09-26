
import DataGrid from "@/components/data-grid";
import { DataCharts } from "@/components/data-charts";
import { Filters } from "@/components/filters";

export default function DashboardPage() {
  return (
    <div >
      <Filters />
      <DataGrid />
      <DataCharts />
    </div>
  );
  {/* <>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard (en desarrollo)</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
     
      </BreadcrumbList>
    </Breadcrumb>
    <PlaceholderContent />
  </>  */}
}
