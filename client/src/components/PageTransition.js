import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const TRUCK_GIF = 'https://media.tenor.com/Px7TQfQfWJYAAAAi/truck-fast.gif';

export default function PageTransition({ children, active }) {
  const [gifFailed, setGifFailed] = useState(false);

  return (
    <motion.div initial={false} className="page-transition">
      <AnimatePresence>
        {active && (
          <motion.div
            key="truck-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="pt-overlay"
          >
            <div className="pt-road-line" />
            <motion.div
              initial={{ x: '-28vw' }}
              animate={{ x: '118vw' }}
              exit={{ x: '118vw' }}
              transition={{ duration: 0.62, ease: 'easeInOut' }}
              className="pt-truck-lane"
            >
              <div className="pt-truck-card">
                {!gifFailed ? (
                  <img
                    src={TRUCK_GIF}
                    alt="Loading route"
                    className="pt-truck-gif"
                    onError={() => setGifFailed(true)}
                  />
                ) : (
                  <span className="pt-truck-fallback" role="img" aria-label="Truck loading">🚛</span>
                )}
                <span className="pt-truck-text">Loading Route...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="pt-content"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
