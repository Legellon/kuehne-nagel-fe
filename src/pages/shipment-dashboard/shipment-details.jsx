import {MenuItem, Typography} from "@mui/material";

import {Button, Select, TextField} from "@mui/material";
import {Box, Modal} from "@mui/material";

import {useEffect, useState} from "react";

import {TABLE_INFO, SHIPMENT_STATUS} from "./shipment-types";

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

export function ShipmentDetails({open, onClose, shipment}) {
    const [form, setForm] = useState({});
    const renderInputs = Object.keys(form).length !== 0;

    useEffect(() => {
        if (shipment) setForm({...shipment});
    }, [shipment])

    const FormInputs = renderInputs ? (TABLE_INFO.map(article => {

        if (article.type === 'content') {
            const commonProps = {
                key: article.id,
                label: article.label,
                variant: 'standard'
            };

            const handleChange = (e) => setForm(prevState => ({...prevState, [article.id]: e.target.value}));

            switch (article.input) {
                case 'text':
                    return (
                        <TextField
                            {...commonProps}
                            onChange={handleChange}
                            defaultValue={form[article.id]}
                        />
                    );
                case 'select':
                    return (
                        <Select
                            {...commonProps}
                            onChange={handleChange}
                            value={form[article.id]}
                        >
                            {SHIPMENT_STATUS.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
                        </Select>
                    );
                default:
                    return (
                        <Typography color='darkred' variant='subtitle1'>
                            Unknown type of input - {article.input}
                        </Typography>
                    );
            }
        }

        if (article.type === 'action') return null;

        return (
            <Typography color='darkred' variant='subtitle1'>
                Unknown type of column - {article.input}
            </Typography>
        )
    })) : [];

    return (
        <Modal
            open={open}
            onClose={() => onClose()}
        >
            <>
                {shipment && (
                    <Box
                        component='form'
                        sx={modalBoxStyle}
                        noValidate
                        autoComplete='off'
                    >
                        <Typography variant='overline' sx={inputSize}>
                            SHIPMENT DETAILS
                        </Typography>

                        {FormInputs}

                        <div style={buttonsPanelStyle}>
                            <Button color='info' onClick={() => onClose()}>
                                Close
                            </Button>

                            <div style={buttonsGroupStyle}>
                                <Button color='warning'>
                                    Save
                                </Button>
                                <Button color='error'>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Box>
                )}
            </>
        </Modal>
    );
}