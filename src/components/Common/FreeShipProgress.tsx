"use client";

import React from "react";
import Image from "next/image";
import { FREESHIP_MIN_AMOUNT } from "@/utils/helper";

const FreeShipProgress = ({ totalAmount }: { totalAmount: number }) => {
    const needMore = Math.max(FREESHIP_MIN_AMOUNT - totalAmount, 0);

    const progressPercent = Math.min(
        Math.round((totalAmount / FREESHIP_MIN_AMOUNT) * 100),
        100
    );

    return (
        <div className="freeship-box">

            {/* TEXT */}
            {needMore > 0 ? (
                <p className="text-line freeship-text">
                    <Image
                        src="/images/icons/truck-1.svg"
                        alt="truck"
                        width={22}
                        height={22}
                        className="truck-icon"
                    />
                    Mua thêm
                    <span className="need-more"> {needMore.toLocaleString()}đ </span>
                    để được
                    <span className="highlight"> FREESHIP </span>
                    nhé!
                </p>
            ) : (
                <p className="text-success">🎉 Bạn đã đủ điều kiện FREESHIP!</p>
            )}

            {/* PROGRESS BAR */}
            <div className="progress-container">
                <div
                    className="progress-fill"
                    style={{ width: `${progressPercent}%` }}
                ></div>

                {/* TRUCK ICON */}
                <div
                    className="truck"
                    style={{ left: `calc(${progressPercent}% - 22px)` }}
                >
                    <Image
                        src="/images/icons/truck.svg"
                        alt="truck"
                        width={42}
                        height={42}
                    />
                </div>
            </div>

            {/* LABELS */}
            <div className="labels">
                <span>0đ</span>
                <span>{FREESHIP_MIN_AMOUNT.toLocaleString()}đ</span>
            </div>

            {/* CSS */}
            <style jsx>{`
                .freeship-text {
                    display: flex;
                    align-items: center;
                    gap: 6px; /* khoảng cách icon - text */
                    font-size: 15px;
                    color: #3b4cca;
                    font-weight: 500;
                    line-height: 1.4;
                    flex-wrap: wrap;
                }

                .truck-icon {
                    margin-top: -1px; /* căn icon xuống */
                }

                .need-more {
                    font-weight: 700;
                    color: #2563eb; /* xanh Tiki */
                }

                .highlight {
                    font-weight: 700;
                    color: #2563eb;
                    margin-left: 4px;
                    margin-right: 4px;
                }
                .freeship-box {
                    border: 1px solid #e0e7ff;
                    background: #f8f9ff;
                    border-radius: 16px;
                    padding: 22px;
                    box-shadow: 0 4px 10px rgba(77, 112, 255, 0.08);
                    margin-bottom: 18px;
                }

                .text-line {
                    font-size: 15px;
                    color: black;
                    margin-bottom: 14px;
                    font-weight: 500;
                }

                .highlight {
                    color: #2563eb;
                    font-weight: 700;
                }

                .text-success {
                    color: #0ea5e9;
                    font-size: 15px;
                    font-weight: 600;
                    margin-bottom: 14px;
                }

                /* PROGRESS BAR OUTSIDE */
                .progress-container {
                    position: relative;
                    width: 100%;
                    height: 18px;
                    background: #e3e7ff;
                    border-radius: 999px;
                    overflow: visible; /* quan trọng để thấy xe */
                    margin-top: 10px;
                }

                /* PROGRESS ICON FILL (TIKI STYLE: GRADIENT) */
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #4f46e5, #3b82f6, #60a5fa);
                    border-radius: 999px;
                    transition: width 0.6s ease-out;
                }

                /* TRUCK ICON */
                .truck {
                    position: absolute;
                    top: -26px; /* nâng lên để thấy toàn bộ icon */
                    transition: left 0.6s ease-out;
                    animation: truckMove 0.6s infinite ease-in-out;
                }

                /* LABELS */
                .labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    color: #6b7280;
                    margin-top: 10px;
                }

                /* TRUCK ANIMATION */
                @keyframes truckMove {
                    0% {
                        transform: translateX(-2px);
                    }
                    50% {
                        transform: translateX(2px);
                    }
                    100% {
                        transform: translateX(-2px);
                    }
                }
            `}</style>
        </div>
    );
};

export default FreeShipProgress;
