import {
    Paper,
    Table,
    TableContainer,
} from "@mui/material";

import ShipmentsTableRow from "./shipments-table-row";
import ShipmentTableHeader from "./shipments-table-header";

const tableStyles = {
    width: '100%',
    overflow: 'hidden'
};

const tableContainerStyles = {
    maxHeight: '100vh'
};

const ShipmentsTable = ({ children }) => {
    return (
        <Paper sx={tableStyles}>
            <TableContainer sx={tableContainerStyles}>
                <Table stickyHeader aria-label="sticky table">
                    {children}
                </Table>
            </TableContainer>
        </Paper>
    );
}

ShipmentsTable.Row = ShipmentsTableRow;
ShipmentsTable.Header = ShipmentTableHeader;

export default ShipmentsTable;
