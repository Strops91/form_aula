import Button from "@mui/material/Button";

interface Props {
    texto: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Buttons({ texto, onClick }: Props) {
    return (
        <Button variant="contained" onClick={onClick}>
            {texto}
        </Button>
    );
}