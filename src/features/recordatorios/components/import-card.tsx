/* const dateFormat = "DD/MM/YYYY HH:mm:ss"; */

type Props = {
    data: string[][]
    onCancel: () => void
    onSubmit: () => void
}

export const ImportCard = ({} : Props) => {
    return (
        <div>
            <h1>Importar transacciones</h1>
        </div>
    );
}