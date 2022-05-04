import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import offlineData from "./offlineData";

const initialState = {
    data: [],
    loading: false,
    metadata: {
        actions: ['open', 'delete']
    }
};

const ENDPOINT = "https://my.api.mockaroo.com/shipments.json?key=5e0b62d0";

const fakeFetchShipments = createAsyncThunk('shipments/fakeFetchShipments', async () => {
    try {
        return offlineData;
    } catch (e) {
        console.error(e);
    }
});

const fetchShipments = createAsyncThunk('shipments/fetchShipments', async () => {
    try {
        return (await axios.get(ENDPOINT)).data;
    } catch (e) {
        console.error(e);
    }
});

const shipmentsSlice = createSlice({
    name: 'shipments',

    initialState,

    reducers: {
        updateShipment: (state, action) => {
            const { orderNo, shipment } = action.payload;
            const targetShipment = state.data.find(shipment => shipment.orderNo === orderNo);
            Object.keys(shipment).map(key => targetShipment[key] = shipment[key]);
        },

        deleteShipment: (state, action) => {
            const { orderNo } = action.payload;
            state.data = state.data.filter(shipment => shipment.orderNo !== orderNo);
        },
    },

    extraReducers: {
        [fetchShipments.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        [fetchShipments.pending]: (state, action) => {
            state.loading = true;
        },

        [fakeFetchShipments.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        [fakeFetchShipments.pending]: (state, action) => {
            state.loading = true;
        }
    },
});

export const selectAllShipments = (state) => state.shipments.data;
export const selectLoading = (state) => state.shipments.loading;
export const selectMetadata = (state) => state.shipments.metadata;
export const selectShipmentByOrderNo = (state, orderNo) => state.shipments.data.find(shipment => shipment.orderNo === orderNo);

export { fetchShipments, fakeFetchShipments };
export const { updateShipment, deleteShipment } = shipmentsSlice.actions;

export default shipmentsSlice.reducer;