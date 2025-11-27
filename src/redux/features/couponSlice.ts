import { createSlice } from "@reduxjs/toolkit";

interface CouponState {
    code: string | null;
    discountAmount: number;
}

const initialState: CouponState = {
    code: null,
    discountAmount: 0,
};

export const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        applyCoupon: (state, action) => {
            state.code = action.payload.code;
            state.discountAmount = action.payload.discountAmount;
        },
        clearCoupon: (state) => {
            state.code = null;
            state.discountAmount = 0;
        },
    },
});

export const { applyCoupon, clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
