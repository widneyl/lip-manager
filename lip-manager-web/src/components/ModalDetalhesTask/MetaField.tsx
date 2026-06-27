import { Box, Typography } from "@mui/material";
import { sx } from "./styles";

interface Props {
    label: string;
    children: React.ReactNode;
}

export function MetaField({ label, children }: Props) {
    return (
        <Box sx={sx.metaRow}>
            <Typography sx={sx.label}>
                {label}
            </Typography>

            {children}
        </Box>
    );
}