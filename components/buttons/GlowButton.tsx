import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface GlowButtonProps {
  label: string;
  onClick?: () => void;
}

const StyledWrapper = styled(motion.div)`
  .button {
    min-width: 140px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: linear-gradient(45deg, #3b82f6, #1d4ed8);
    border-radius: 25px;
    color: white;
    font-weight: 600;
    font-size: 14px;
    border: none;
    position: relative;
    cursor: pointer;
    transition: all 0.5s ease;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    overflow: hidden;
    white-space: nowrap;
    padding: 0 16px;
  }

  .button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  .button:hover::before {
    left: 100%;
  }

  .button:hover {
    box-shadow: 0 0 25px rgba(59, 130, 246, 0.6);
    transform: translateY(-2px);
  }

  .button:active {
    transform: scale(0.98);
  }

  .icon {
    height: 20px;
    width: 20px;
    transition: transform 0.5s ease;
    flex-shrink: 0;
  }

  .button:hover .icon {
    transform: rotate(180deg);
  }

  @media (max-width: 768px) {
    .button {
      min-width: 120px;
      height: 40px;
      font-size: 13px;
      padding: 0 12px;
      gap: 6px;
    }

    .icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 480px) {
    .button {
      min-width: auto;
      width: 100%;
      max-width: 200px;
      height: 42px;
      font-size: 14px;
      padding: 0 16px;
      gap: 8px;
    }

    .icon {
      height: 20px;
      width: 20px;
    }
  }
`;

const GlowButton: React.FC<GlowButtonProps> = ({ label, onClick }) => {
  return (
    <StyledWrapper
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <button className="button">
        <svg
          className="icon"
          viewBox="0 0 512 512"
          height="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
            fill="white"
          />
        </svg>
        {label}
      </button>
    </StyledWrapper>
  );
};

export default GlowButton;
