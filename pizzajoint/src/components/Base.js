import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {
    x: '100vh',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      delay: 0.5
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

const nextWrapperVariants = {
  hidden: {
    opacity: 0,
    x: -150
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 125,
    },
  },
};

const listElementTransitions = {
  type: 'spring',
  stiffness: 300
}

const Base = ({ addBase, pizza }) => {
  const bases = ['Classic', 'Thin & Crispy', 'Thick Crust'];

  return (
    <motion.div
      className="base container"
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={containerVariants}
    >
      <h3>Step 1: Choose Your Base</h3>
      <ul>
        {bases.map(base => {
          let spanClass = pizza.base === base ? 'active' : '';
          return (
            <motion.li
              key={base}
              onClick={() => addBase(base)}
              whileHover={{ scale: 1.3, color: '#F1BF98', originX: 0 }}
              transition={listElementTransitions}
            >
              <span className={spanClass}>{base}</span>
            </motion.li>
          )
        })}
      </ul>

      {pizza.base && (
        <motion.div
          className="next"
          variants={nextWrapperVariants}
        >
          <Link to="/toppings">
            <motion.button
              whileHover={{
                scale: 1.1,
                textShadow: '0 0 8px rgb(255, 255, 255)',
                boxShadow: '0 0 8px rgb(255, 255, 255)',
              }}
              transition={{ type: 'tween' }}
            >
              Next
            </motion.button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Base;