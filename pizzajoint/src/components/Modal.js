import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const overlayVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};

const modalVariants = {
    hidden: {
        opacity: 0,
        y: '-100vh',
    },
    visible: {
        opacity: 1,
        y: 200,
        transition: {
            delay: 0.5,
        },
    },
};

const Modal = ({ showModal, setShowModal }) => {
    return (
        <AnimatePresence exitBeforeEnter>
            {showModal && (
                <motion.div
                    className="overlay"
                    animate="visible"
                    initial="hidden"
                    exit="hidden"
                    variants={overlayVariants}
                >
                    <motion.div
                        className="modal"
                        variants={modalVariants}
                    >
                        <p>How about making another pizza? ya&nbsp;fecking&nbsp;bastard!</p>
                        <Link
                            to="/"
                            data-testid="modal-link-btn"
                        >
                            <button>Start again</button>
                        </Link>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
};

Modal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
};

export default Modal;