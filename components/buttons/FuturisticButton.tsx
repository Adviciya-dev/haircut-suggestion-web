import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";

interface FuturisticButtonProps {
  label: string;
  href: string;
  isMobile?: boolean;
}

const StyledButton = styled(motion.button)`
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
  white-space: nowrap;
  min-width: 140px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &::before {
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

  &:hover::before {
    left: 100%;
  }

  &:hover {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    transform: translateY(-1px);
  }

  &.mobile {
    width: 100%;
    min-width: auto;
  }

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: 13px;
    min-width: 120px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 14px;
    min-width: auto;
    width: 100%;
    max-width: 200px;
    border-radius: 25px;
  }
`;

const FuturisticButton: React.FC<FuturisticButtonProps> = ({
  label,
  href,
  isMobile,
}) => {
  return (
    <StyledButton
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={isMobile ? "mobile" : ""}
      as={motion(Link)}
      href={href}
    >
      {label}
    </StyledButton>
  );
};

export default FuturisticButton;
