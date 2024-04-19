"use client";
import { Button } from "../ui/button";
import { HiOutlineTrash } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Vaga } from "../Dashboard/dashboard";

interface Props {
    id: string;
    setVagas: React.Dispatch<React.SetStateAction<Vaga[]>>;
};

export const RemoveBtn = ({ id, setVagas }: Props) => {

    const router = useRouter();

    const removeVaga = async () => {
        const confirmed = confirm("Deseja realmente deletar essa vaga?");

        if (confirmed){
            try {
                const res = await fetch(`/api/vagas?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    setVagas(prevVagas => prevVagas.filter(vaga => vaga._id !== id));
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
