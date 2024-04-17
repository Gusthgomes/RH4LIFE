"use client";
import { Button } from "../ui/button";
import { HiOutlineTrash } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
};

export const RemoveBtn = ({ id }: Props) => {

    const router = useRouter();

    const removeVaga = async () => {
        const confirmed = confirm("Deseja realmente deletar essa vaga?");

        if (confirmed){
            try {
                const res = await fetch(`/api/vagas?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    router.refresh();
                    alert("Vaga deletada com sucesso!");
                } else {
                    alert("Erro ao deletar a vaga")
                };

            } catch (error) {
                console.log("Error: ", error)
            }
        }
    }
    return(
        <Button
        onClick={removeVaga}
            className="my-2 bg-red-600 rounded hover:bg-red-700"
            variant="destructive"
        >
            <HiOutlineTrash size={17} color="#FFF" className="my-2" />
        </Button>
    )
};
