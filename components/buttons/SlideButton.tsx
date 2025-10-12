import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface SlideButtonProps {
  label: string;
  onClick?: () => void;
}

const StyledWrapper = styled(motion.div)`
  .button {
    min-height: 50px;
    min-width: 180px;
    position: relative;
    background: transparent;
    cursor: pointer;
    border: 2px solid #3b82f6;
    overflow: hidden;
    border-radius: 25px;
    color: #3b82f6;
    font-weight: 700;
    letter-spacing: 1.5px;
    font-size: 14px;
    transition: all 0.5s ease;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    white-space: nowrap;
  }

  .btn-txt {
    position: relative;
    z-index: 2;
  }

  .button::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #3b82f6, #1d4ed8);
    border-radius: 25px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
    z-index: -1;
  }

  .button:hover {
    color: white;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    border-color: transparent;
  }

  .button:hover::after {
    transform: scaleX(1);
  }

  .button:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    .button {
      min-height: 45px;
      min-width: 160px;
      font-size: 13px;
      letter-spacing: 1.2px;
      padding: 0 16px;
    }
  }

  @media (max-width: 480px) {
    .button {
      min-width: auto;
      width: 100%;
      max-width: 220px;
      min-height: 48px;
      font-size: 14px;
      letter-spacing: 1.5px;
      padding: 0 20px;
    }
  }
`;

const SlideButton: React.FC<SlideButtonProps> = ({ label, onClick }) => {
  return (
    <StyledWrapper
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <button className="button">
        <span className="btn-txt">{label}</span>
      </button>
    </StyledWrapper>
  );
};

export default SlideButton;
