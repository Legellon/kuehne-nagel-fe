import {
    Box,
    CircularProgress,
    TableBody,
    Typography
} from "@mui/material";

import {useSearchParams} from 'react-router-dom/main';

import ShipmentsTable from "./shipments-table/shipments-table";
import ShipmentDetails from "./shipment-details/shipment-details";

import {useState, useEffect, useMemo, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";

import {QUERY_PARAMS} from "./shipment-types";

import {
    deleteShipment,
    fakeFetchShipments,
    fetchShipments,
    selectAllShipments,
    selectLoading,
    selectShipmentByOrderNo, updateShipment
} from "../../redux/features/shipmentsSlice";

const loaderBoxStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%'
}

export default function ShipmentDashboard() {
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    //State of the opened shipment
    const [selectedOrderNo, setSelectedOrderNo] = useState(null);

    const shipments = useSelector(selectAllShipments);
    const selectedShipment = useSelector((state) => selectShipmentByOrderNo(state, selectedOrderNo));
    const isLoading = useSelector(selectLoading);

    console.log('a')

    //Load shipments
    useEffect(() => {
        dispatch(fetchShipments());
    }, [dispatch]);

    const onDeleteShipment = useCallback((orderNo) => {
        dispatch(deleteShipment({ orderNo }))
    }, [dispatch]);

    const onUpdateShipment = useCallback((orderNo, newShipment) => {
        dispatch(updateShipment({ orderNo, shipment: newShipment }));
    }, [dispatch]);

    const onOpenShipment = useCallback((orderNo) => {
        setSelectedOrderNo(orderNo);
        setSearchParams({[QUERY_PARAMS.viewShipment]: orderNo})
    }, [setSearchParams]);

    const onCloseShipment = useCallback(() => {
        setSelectedOrderNo(null);
        setSearchParams({});
    }, [setSearchParams]);

    //Hook to load event details by orderNo from search params
    useEffect(() => {
        //If loading is completed
        if (isLoading) return;

        //Open shipment details by orderNo if URL search params have it
        if (searchParams.has(QUERY_PARAMS.viewShipment)) {
            const orderNo = searchParams.get(QUERY_PARAMS.viewShipment)

            if (orderNo) setSelectedOrderNo(orderNo);
            //Clear search params if failed to find a shipment
            else if (shipments.length !== 0) setSearchParams({});
        }

        //Otherwise, close shipment details if opened
        else if (shipments.length !== 0) setSelectedOrderNo(null);

    }, [isLoading, searchParams, setSearchParams, selectedOrderNo, shipments]);

    const shipmentsTableRows = useMemo(() => shipments.map(shipment => (
        <ShipmentsTable.Row
            key={shipment.orderNo}
            shipment={shipment}
            onOpen={() => onOpenShipment(shipment.orderNo)}
            onDelete={() => onDeleteShipment(shipment.orderNo)}
        />
    )), [onDeleteShipment, onOpenShipment, shipments]);

    return (
        <>
            {isLoading ? (
                <Box sx={loaderBoxStyles}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <CircularProgress
                            sx={{position: 'relative', left: 8}}
                            color='primary'
                        />
                        <Typography variant='overline'>Loading</Typography>
                    </div>
                </Box>
            ) : (
                <>
                    {!!selectedShipment && (
                        <ShipmentDetails
                            open={!!selectedShipment}
                            onClose={() => onCloseShipment()}
                            shipment={selectedShipment}
                            onUpdate={onUpdateShipment}
                            onDelete={onDeleteShipment}
                        />
                    )}

                    <ShipmentsTable>
                        <ShipmentsTable.Header />

                        <TableBody>
                            {shipmentsTableRows}
                        </TableBody>
                    </ShipmentsTable>
                </>
            )}
        </>
    );
}