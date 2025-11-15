"use client";

import { Modal } from "antd";
import { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";

const OrderModal = ({ open, onClose, order }: any) => {
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector("header");
        if (header) {
            setHeaderHeight(header.getBoundingClientRect().height);
        }
    }, []);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            closable={true}
            keyboard={true}
            centered={true}
            width={650}
            className="order-modal"
            styles={{
                content: {
                    marginTop: headerHeight, // ⭐ CÁCH NAVBAR + 20PX
                    borderRadius: 12,
                },
                body: {
                    padding: 0,
                    maxHeight: "70vh",
                    overflowY: "auto",
                    background: "#fff",
                },
                mask:{
                    backdropFilter: "blur(3px)",
                }
            }}
        >
            <OrderDetails orderItem={order} />
        </Modal>
    );
};

export default OrderModal;
