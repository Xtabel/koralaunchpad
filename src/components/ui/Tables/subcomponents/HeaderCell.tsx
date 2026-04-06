import { Stack, TableCell, Typography, useTheme } from "@mui/material";
import SortIndicators from "./SortIndicators";
import type { Column } from "@/types";


interface HeaderCellProps<T> {
    column: Column<T>; // Add the column prop
    handleSort: (columnId: keyof T) => void;
    orderBy: keyof T | null; // Add orderBy prop
    orderDirection: "asc" | "desc" | null; // Add orderDirection prop
}

const HeaderCell = <T,>({ column, handleSort, orderBy, orderDirection }: HeaderCellProps<T>) => {
    const theme = useTheme();
    return (
        <TableCell
            key={column.id as string}
            style={{ minWidth: column.minWidth }}
            sx={{ fontSize: "12px", fontWeight: 600, padding: "20px", textAlign: column.align || "left" }}
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="4px"
                sx={{ cursor: column.sortable ? "pointer" : "default" }}
                onClick={() => column.sortable ? handleSort(column.id as keyof T) : null}
            >
                <Typography fontSize="12px" color={theme.palette.text.primary}
                    lineHeight="160%" letterSpacing="-0.24px" fontWeight={500}
                >
                    {column.label}
                </Typography>
                {column.sortable && (
                    <SortIndicators
                        isActive={orderBy === column.id}
                        direction={orderDirection}
                    />
                )}
            </Stack>
        </TableCell>
    );
};

export default HeaderCell;