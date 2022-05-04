import {useCallback, useMemo, memo} from "react";
import {Button, ButtonGroup, TableCell, TableRow, Typography} from "@mui/material";
import {Badge, Clear} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {selectMetadata} from "../../../redux/features/shipmentsSlice";
import {TABLE_FIELDS} from "../shipment-types";

const ShipmentsTableRow = memo(({ shipment, onOpen, onDelete }) => {
    const shipmentMetadata = useSelector(selectMetadata);

    const assignActionsToShipment = (shipment) => ({ ...shipment, actions: shipmentMetadata.actions });

    const tableContentTemplate = useCallback((content) => (
        <Typography variant='caption'>
            {content}
        </Typography>
    ), []);

    const shipmentActionsTemplates = useCallback((actions) => {
        const actionButtons = {
            'open': (
                <Button key='row-info-btn' color='info' onClick={onOpen}>
                    <Badge/>
                </Button>
            ),
            'delete': (
                <Button key='row-delete-btn' color='error' onClick={onDelete}>
                    <Clear/>
                </Button>
            ),
        };

        return (
            <ButtonGroup size='small' variant='text'>
                {actions.map(action => actionButtons[action])}
            </ButtonGroup>
        );
    }, [onOpen, onDelete]);

    const templates = useMemo(() => ({
        'content': tableContentTemplate,
        'actions': shipmentActionsTemplates
    }), [tableContentTemplate, shipmentActionsTemplates]);

    const shipmentWithActions = assignActionsToShipment(shipment);

    return (
        <TableRow key={shipment.orderNo}>
            {TABLE_FIELDS.map(field => {
                const [template, data] = [templates[field.type], shipmentWithActions[field.id]];
                return (
                    <TableCell key={field.id} size='small' align={field.align}>
                        {template(data)}
                    </TableCell>
                );
            })}
        </TableRow>
    );
});

export default ShipmentsTableRow;