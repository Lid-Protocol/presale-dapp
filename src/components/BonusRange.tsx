import React, { useState, useEffect } from 'react';
import { BonusRange } from '../config';
import { Box } from '@chakra-ui/core';

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '220px',
    left: '70%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: { zIndex: 1000 }
};

Modal.setAppElement('#root');

const BonusStructure: any = () => {
  var subtitle: any;

  const [modalIsOpen, setIsOpen] = useState(false);

  const [marginBottom, setMarginBotom] = useState("");
  const [paddingTop, setPaddingTop] = useState("")

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect( () => {
    if (window.innerWidth > 999) {
      setMarginBotom("-50px");
      setPaddingTop("20px")
    } else {
      setMarginBotom("-10%")
      setPaddingTop("0px")
    }
  }, [])
  
    return (
      <>
        <Box ml="69%" mb={marginBottom} pt={paddingTop}>
          <button onClick={openModal}>Bonuses</button>
        </Box>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}> BonusRange </h2>

          {BonusRange.map((data) => (
            <p key={data.eth}>
              {' '}
              {data.eth} ETH : {data.reward}{' '}
            </p>
          ))}

          <button onClick={closeModal}>close</button>
        </Modal>
      </>
  );
};

export default BonusStructure;
