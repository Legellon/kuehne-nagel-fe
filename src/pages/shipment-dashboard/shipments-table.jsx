import {
    Paper,
    Typography,
    Box,
    CircularProgress
} from "@mui/material";

import {Badge, Clear} from '@mui/icons-material';

import {Table, TableBody, TableContainer, TableHead, TableRow, TableCell} from '@mui/material';
import {Button, ButtonGroup} from '@mui/material';

import {ShipmentDetails} from "./shipment-details";

import {useSearchParams} from 'react-router-dom/main';
import {useEffect, useMemo, useState} from "react";

import {QUERY_PARAMS, TABLE_INFO} from './shipment-types';
import offlineData from './offlineData';

const loaderBoxStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%'
}

const tableStyles = {
    width: '100%',
    overflow: 'hidden'
};

const tableContainerStyles = {
    maxHeight: '100vh'
};

export default function ShipmentsTable() {
    const [isLoading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const [shipments, setShipments] = useState([]);

    const handleDelete = () => {

    };

    const handleCloseShipment = () => {
        setShipment(null);
        setSearchParams({});
    }

    //Serialized data from the API to the table format
    const tableData = useMemo(() => shipments.map(shipment => {
        const handleOpenShipment = (shipment) => {
            setShipment(shipment);
            setSearchParams({[QUERY_PARAMS.viewShipment]: shipment.orderNo})
        };

        const actions = (
            <ButtonGroup size='small' variant='text'>
                <Button color='info' onClick={() => handleOpenShipment(shipment)}>
                    <Badge/>
                </Button>
                <Button color='error' onClick={handleDelete}>
                    <Clear/>
                </Button>
            </ButtonGroup>
        );

        return {...shipment, actions};
    }), [shipments]);

    //Shipment rows for the table
    const BodyRows = useMemo(() => tableData.map(row => {
        return <TableRow key={row.orderNo}>
            {TABLE_INFO.map(article => {
                const value = row[article.id];
                return (
                    <TableCell size='small' key={article.id} align={article.align}>
                        <Typography variant='caption'>
                            {value}
                        </Typography>
                    </TableCell>
                );
            })}
        </TableRow>
    }), [tableData]);

    //Header cells for the table
    const HeaderColumns = useMemo(() => TABLE_INFO.map(article => (
        <TableCell
            key={article.id}
            align={article.align}
            style={{minWidth: article.minWidth}}
        >
            <Typography variant='overline'>
                {article.label.toUpperCase()}
            </Typography>
        </TableCell>
    )), []);

    //Load shipments
    useEffect(() => {
        setShipments(offlineData);
        setLoading(false);
    }, []);

    //State of the opened shipment
    const [shipment, setShipment] = useState(null);

    const openShipmentDetails = !!shipment;

    //Hook to load event details by orderNo from search params
    //If loading is completed
    //Open shipment details by orderNo if URL search params have it
    //Otherwise, close shipment details if opened
    useEffect(() => {
        if (isLoading) return;

        if (searchParams.has(QUERY_PARAMS.viewShipment)) {
            const orderNo = searchParams.get(QUERY_PARAMS.viewShipment)
            const shipmentFromParams = shipments.find(item => item.orderNo === orderNo);

            if (shipmentFromParams) setShipment(shipmentFromParams);
            else setSearchParams({});
        }
        else if (shipment) setShipment(null);

    }, [isLoading, searchParams]);

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
                    <ShipmentDetails
                        open={openShipmentDetails}
                        onClose={handleCloseShipment}
                        shipment={shipment}
                    />

                    <Paper sx={tableStyles}>
                        <TableContainer sx={tableContainerStyles}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {HeaderColumns}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {BodyRows}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </>
            )}
        </>
    );
}
