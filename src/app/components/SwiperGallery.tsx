'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FaEye, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/autoplay';

const images = [
    '/images/images/city1.webp',
    '/images/images/city2.webp',
    '/images/images/g2.webp',
    '/images/images/g4.webp',
    '/images/images/city1.webp',
    '/images/images/city2.webp',
];

const SwiperGallery = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        Modal.setAppElement('body'); // or '#__next'
    }, []);

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setModalIsOpen(true);
    };

    const closeModal = () => setModalIsOpen(false);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);

    return (
        <div className="venue-container">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                loop
                autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
                {images.map((src, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="image-container" onClick={() => openModal(idx)}>
                            <Image src={src} alt={`Slide ${idx + 1}`} width={300} height={200} className="slide-image" />
                            <div className="hover-overlay">
                                <FaEye className="hover-eye-icon" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal2"
                overlayClassName="modal-overlay2"
            >
                <div className="modal-dialog2 modal-confirm">
                    <div className="modal-content2">
                        <div className="modal-header">
                            <h4 className="modal-title">City Attractions</h4>
                            <button className="close" onClick={closeModal}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <button className="prev-btn" onClick={prevImage}><FaArrowLeft /></button>
                            <Image src={images[currentIndex]} alt="Modal Image" width={500} height={350} className="modal-image" />
                            <button className="next-btn" onClick={nextImage}><FaArrowRight /></button>
                        </div>
                    </div>
                </div>
            </Modal>

            <style jsx>{`
        

      .modal-overlay2 {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
  .modal-title{
     border-bottom: 1px solid #ebebeb;
     color: var(--secondary-color);
	font-weight: 500;
  }
  .modal-content2{
  max-width:700px;
  }

.modal2 {
  max-width: 500px;
  background: white;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  position: relative;
}

.modal-body {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.modal-image {
  max-width: 100%;
  height: auto;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
color: var(--black-color);
    font-size: 30px;
  border: none;
  background: none;
  cursor: pointer;
}

.prev-btn, .next-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

      `}</style>

        </div>
    );
};

export default SwiperGallery;
