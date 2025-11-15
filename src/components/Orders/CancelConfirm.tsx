"use client";
import { Modal } from "antd";

const CancelConfirm = ({ open, onConfirm, onClose }: any) => {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width={380}
        >
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
                Xác nhận hủy đơn hàng?
            </h2>

            <p className="text-gray-600 mb-5">
                Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể hoàn tác.
            </p>

            <div className="flex justify-end gap-3">
                <button
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                    onClick={onClose}
                >
                    Hủy
                </button>
                <button
                    className="px-4 py-2 rounded-lg bg-red-600 bg-dark text-white hover:bg-red-700"
                    onClick={onConfirm}
                >
                    Xác nhận
                </button>
            </div>
        </Modal>
    );
};

export default CancelConfirm;
