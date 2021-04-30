import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from './icons/BrandLogo';

const homeTitleTransitions = {
  delay: 0.5,
  type: 'spring',
  stiffness: 120,
};

const constraints = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

const Header = () => {
  return (
    <header>
      <motion.div
        className="logo"
        drag
        dragConstraints={constraints}
        dragElastic={0.55}
      >
        <BrandLogo />
      </motion.div>
      <motion.div
        className="title"
        animate={{ y: -10 }}
        initial={{ y: -250 }}
        transition={homeTitleTransitions}
      >
        <h1>Pizza Joint</h1>
      </motion.div>
    </header>
  )
}

export default Header;