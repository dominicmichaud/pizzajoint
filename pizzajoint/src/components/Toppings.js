import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

const orderWrapperVariants = {
  hidden: {
    opacity: 0,
    x: -150,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 125,
    },
  },
  exit: {
    opacity: 0,
    x: -150,
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

const Toppings = ({ addTopping, pizza }) => {
  let toppings = ['mushrooms', 'peppers', 'onions', 'olives', 'extra cheese', 'tomatoes'];

  return (
    <motion.div
      className="toppings container"
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={containerVariants}
    >
      <h3
        data-testid="toppings-heading"
      >
        Step 2: Choose Toppings
      </h3>
      <ul
        data-testid="toppings-list"
      >
        {toppings.map(topping => {
          let spanClass = pizza.toppings.includes(topping) ? 'active' : '';
          return (
            <motion.li
              key={topping}
              onClick={() => addTopping(topping)}
              whileHover={{ scale: 1.3, color: '#F1BF98', originX: 0 }}
              transition={listElementTransitions}
            >
              <span className={spanClass}>{topping}</span>
            </motion.li>
          )
        })}
      </ul>

      <AnimatePresence exitBeforeEnter>
        {pizza.toppings.length > 0 && (
          <motion.div
            exit="exit"
            animate="visible"
            initial="hidden"
            variants={orderWrapperVariants}
          >
            <Link to="/order">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  textShadow: '0 0 8px rgb(255, 255, 255)',
                  boxShadow: '0 0 8px rgb(255, 255, 255)',
                }}
                transition={{ type: 'tween' }}
                data-testid="toppings-order-btn"
              >
                Order
                </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Toppings;