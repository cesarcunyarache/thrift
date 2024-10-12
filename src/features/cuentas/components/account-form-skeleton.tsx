import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


export const AccountFormSkeleton = () => {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Skeleton className="h-4 w-12" />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Skeleton className="h-4 w-12" />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Skeleton className="h-4 w-12" />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between items-center">
                <Skeleton className="mt-2 w-32 h-8 " />
            </div>

            <Card className="shadow-none border border-zinc-200 dark:border-zinc-700 mt-4 pt-6 max-w-xl">
                <CardContent>
                    <Skeleton className="h-6 w-40 mb-4" />
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-6 w-36" />
                </CardContent>
            </Card>
        </>
    );
}

