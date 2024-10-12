import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default function DashboardPage() {
  return (
    <>
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
    </>
  );
}
