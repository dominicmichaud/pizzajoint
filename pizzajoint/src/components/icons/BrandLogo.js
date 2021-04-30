import React from 'react';
import { motion } from 'framer-motion';

const svgVariants = {
    initial: {
        opacity: 0,
        rotate: -180
    },
    animate: {
        rotate: 0,
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 1,
        },
    },
};

const pathVariants = {
    initial: {
        opacity: 0,
        pathLength: 0,
    },
    animate: {
        opacity: 1,
        pathLength: 1,
        transition: {
            ease: 'easeInOut',
            duration: 2,
        },
    },
};

const BrandLogo = () => (
    <motion.svg
        initial="initial"
        animate="animate"
        variants={svgVariants}
        className="pizza-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
    >
        <motion.path
            fill="none"
            d="M40 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z"
            variants={pathVariants}
        />
        <motion.path
            fill="none"
            d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z"
            variants={pathVariants}
        />
    </motion.svg>
);

export default BrandLogo;