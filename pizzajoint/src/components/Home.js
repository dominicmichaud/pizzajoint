import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import Loader from './Loader';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 1.5,
    },
  },
  exit: {
    scale: 0.4,
    opacity: 0,
    originY: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: '0 0 8px rgb(255, 255, 255)',
    boxShadow: '0 0 8px rgb(255, 255, 255)',
    transition: {
      yoyo: Infinity,
      duration: 0.3,
    },
  },
};

const Home = () => {
  return (
    <motion.div
      className="home container"
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={containerVariants}
    >
      <h2>
        Welcome to Pizza Joint
      </h2>
      <Link
        to="/base"
        data-testid="home-link"
      >
        <motion.button
          whileHover="hover"
          variants={buttonVariants}
          data-testid="home-create-btn"
        >
          Create Your Pizza
        </motion.button>
      </Link>
      {/* <Loader /> */}
    </motion.div>
  )
}

export default Home;