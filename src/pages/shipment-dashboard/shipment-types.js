export const QUERY_PARAMS = {
    viewShipment: 'vs',
};

export const TABLE_INFO = [
    {
        id: 'orderNo',
        label: 'OrderNo',
        type: 'content',
        input: 'text',
        minWidth: 200,
        align: 'left'
    },
    {
        id: 'date',
        label: 'DeliveryDate',
        type: 'content',
        input: 'text',
        minWidth: 90,
        align: 'left'
    },
    {
        id: 'customer',
        label: 'Customer',
        type: 'content',
        input: 'text',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'trackingNo',
        label: 'TrackingNo',
        type: 'content',
        input: 'text',
        minWidth: 200,
        align: 'left'
    },
    {
        id: 'status',
        label: 'Status',
        type: 'content',
        input: 'select',
        minWidth: 90,
        align: 'left'
    },
    {
        id: 'consignee',
        label: 'Consignee',
        type: 'content',
        input: 'text',
        minWidth: 170,
        align: 'left'
    },
    {
        id: 'actions',
        label: '',
        type: 'action',
        minWidth: 170,
        align: 'right'
    }
];

export const SHIPMENT_STATUS = ["'In Transit'", "'Delivered'", "'Shipped'"];