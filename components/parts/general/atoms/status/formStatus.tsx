import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

type Props = {
    status: "success" | "error" | "warning" | string
    message: string,
    show: boolean
}

export default function FormStatus({ message, status, show = false }: Props) {
    const [variant, setVariant] = useState("success")

    useEffect(() => {
        if (status == "success") {
            setVariant("success")
        }else if (status == "error") {
            setVariant("danger")
        }else if (status == "warning") {
            setVariant("warning")
        }
    }, [status])

    return (
        <Alert variant={variant} show={show}>
            {message}
        </Alert>
    )
}