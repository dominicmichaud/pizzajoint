import React, { useEffect } from 'react';
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
      mass: 0.4,
      damping: 8,
      when: 'beforeChildren',
      staggerChildren: 0.4,
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

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    delay: 1.5,
  }
}

const Order = ({ pizza, setShowModal }) => {

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 5000);
  }, [setShowModal]);

  return (
    <motion.div
      className="container order"
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={containerVariants}
    >
      <h2>Thank you for your order :)</h2>
      <motion.p
        variants={childVariants}
      >
        You ordered a {pizza.base} pizza with:
      </motion.p>
      <motion.div
        variants={childVariants}
      >
        {pizza.toppings.map(topping => <div key={topping}>{topping}</div>)}
      </motion.div>
    </motion.div>
  )
}

export default Order;