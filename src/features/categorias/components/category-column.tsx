import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    id: string;
    category: string | null;
    categroyId: string | null;
};

export const CategoryColumn = ({ id, category }: Props) => {

    const router = useRouter();

    const onclick = () => {
        if (id) {
            router.push(`/transacciones/${id}/editar`);
        }
    }
    return (
        <div
            onClick={onclick}
            className={
                cn("flex items-center cursor-pointer hover:underline",
                    !category && "text-rose-500",
                )
            }
                 
        >
            {!category && <TriangleAlert className=" mr-2 size-4 shrink-0" />}
            {category || "Sin categoria"}
        </div>

    );
}

