import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";


interface HeadingProps {
    items: {
        label: string;
        href: string;
    }[];
    title: string;
    buttonText?: string;
    buttonAction?: () => void;
}

export const Heading = ({ items, title, buttonText = "Añadir nuevo", buttonAction }: HeadingProps) => {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    {items.map((item, index) => (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink asChild>
                                <Link href={item.href}>{item.label}</Link>
                            </BreadcrumbLink>
                            {index < items.length - 1 && <BreadcrumbSeparator />}
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between items-center">
                <h2 className="mt-1 text-2xl font-bold tracking-tighter">{title}</h2>
                {buttonText && buttonAction && (
                    <Button onClick={buttonAction} className="ml-2">
                        <PlusIcon className="size-4 mr-2" />
                        {buttonText}
                    </Button>
                )}
            </div>
        </>
    );
};