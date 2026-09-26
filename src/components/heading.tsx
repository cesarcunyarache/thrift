import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";


interface HeadingProps {
    items: {
        label: string;
        href: string;
    }[];
    title: string;
    extraContent?: React.ReactNode;
}
export const Heading = ({ items, title, extraContent }: HeadingProps) => {
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
                {extraContent && (
                    <div className="ml-2">
                        {extraContent}
                    </div>
                )}
            </div>
        </>
    );
};