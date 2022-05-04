import {Box, Modal, MenuItem, Typography} from "@mui/material";
import {Button, Select, TextField} from "@mui/material";

import {useEffect, useRef, useState} from "react";

import {TABLE_FIELDS, SHIPMENT_STATUS} from "../shipment-types";

const modalBoxStyle = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    gap: '1rem',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    border: '1px solid lightgray',
    boxShadow: 24,
    padding: '2rem',
    borderRadius: 2
};

const buttonsPanelStyle = {
    display: 'flex',
};

const buttonsGroupStyle = {
    marginLeft: 'auto'
};

const inputSize = {
    width: 450
};

export default function ShipmentDetails({ open, onClose, onDelete, onUpdate, shipment }) {
    const [form, setForm] = useState({});
    const loading = useRef(true);

    useEffect(() => {
        if (!!shipment) {
            setForm({ ...shipment })
            loading.current = false;
        }
    }, [shipment]);

    const formBody = !loading.current && TABLE_FIELDS.map(field => {
        if (field.type === 'content') {
            const commonProps = {
                key: field.id,
                label: field.label,
                variant: 'standard'
            };

            const handleInputChange = (e) => setForm(prevState => ({...prevState, [field.id]: e.target.value}));

            const inputTemplates = {
                'text': (props, onChange, value) => (
                    <TextField
                        onChange={onChange}
                        defaultValue={value}
                        {...props}
                    />
                ),
                'select': (props, onChange, value) => (
                    <Select
                        onChange={onChange}
                        value={value}
                        {...props}
                    >
                        {SHIPMENT_STATUS.map(status =>
                            <MenuItem key={status} value={status}>{status}</MenuItem>
                        )}
                    </Select>
                ),
            };

            return inputTemplates[field.input](commonProps, handleInputChange, form[field.id]);
        }
        return null;
    });

    return (
        <Modal
            open={open}
            onClose={() => onClose()}
        >
            <Box
                component='form'
                sx={modalBoxStyle}
                noValidate
                autoComplete='off'
            >
                <Typography variant='overline' sx={inputSize}>
                    SHIPMENT DETAILS
                </Typography>

                {formBody}

                <div style={buttonsPanelStyle}>
                    <Button color='info' onClick={onClose}>
                        Close
                    </Button>

                    <div style={buttonsGroupStyle}>
                        <Button color='warning' onClick={() => {
                            onUpdate(shipment.orderNo, form);
                            onClose();
                        }}>
                            Save
                        </Button>
                        <Button color='error' onClick={() => {
                            onDelete(shipment.orderNo);
                            onClose();
                        }}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}