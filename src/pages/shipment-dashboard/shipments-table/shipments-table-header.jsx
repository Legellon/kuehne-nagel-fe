import {memo} from "react";
import {TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {TABLE_FIELDS} from "../shipment-types";

const ShipmentTableHeader = memo(() => {
    const headerCellTemplate = (title) => (
        <Typography variant='overline'>
            {title}
        </Typography>
    );

    return (
        <TableHead>
            <TableRow>
                {TABLE_FIELDS.map(field => (
                    <TableCell
                        key={field.id}
                        align={field.align}
                        style={{minWidth: field.minWidth}}
                    >
                        {headerCellTemplate(field.label.toUpperCase())}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
});

export default ShipmentTableHeader;