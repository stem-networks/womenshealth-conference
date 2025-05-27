"use client"

import React, { useEffect, useRef } from "react";
import Link from 'next/link'
import Image from 'next/image'
import cancerscience from '../../../public/images/partners/cancerscience.png';
import bioanalyticalresearch from '../../../public/images/partners/bioanalyticalresearch.png';
import catalysis from '../../../public/images/partners/catalysis.png';
import cellbiology from '../../../public/images/partners/cellbiology.png';
import darkbiotechnology from '../../../public/images/partners/darkbiotechnology.png';
import epidemiology from '../../../public/images/partners/epidemiology.png';
import food_nutrition from '../../../public/images/partners/food_nutrition.png';
import gynecology from '../../../public/images/partners/gynecology.png';
import histology from '../../../public/images/partners/histology.png';
import infectious_disease from '../../../public/images/partners/infectious_disease.png';
import mutation from '../../../public/images/partners/mutation.png';
import nanotechnology from '../../../public/images/partners/nanotechnology.png';
import neonatalbiology from '../../../public/images/partners/neonatalbiology.png';
import neonataldisorders from '../../../public/images/partners/neonataldisorders.png';
import neurocare from '../../../public/images/partners/neurocare.png';
import nursing_science from '../../../public/images/partners/nursing_science.png';
import pollutiontoxicology from '../../../public/images/partners/pollutiontoxicology.png';
import public_health from '../../../public/images/partners/public_health.png';
import renaldisorders from '../../../public/images/partners/renaldisorders.png';
import sleepphysiology from '../../../public/images/partners/sleepphysiology.png';
import theastrophysics from '../../../public/images/partners/theastrophysics.png';
import thepharma from '../../../public/images/partners/thepharma.png';
import toxicology from '../../../public/images/partners/toxicology.png';
import vaccine_studies from '../../../public/images/partners/vaccine_studies.png';

const PartneredContent = () => {

    const sliderRef = useRef<HTMLUListElement | null>(null);
    const animationFrameId = useRef<number | null>(null);
    let scrollPosition = 0;

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const slideElement = slider.querySelector('.slideimg') as HTMLElement;
        if (!slideElement) return;

        // const slideWidth = slideElement.offsetWidth; 

        // Clone slides for seamless loop
        slider.innerHTML += slider.innerHTML;

        // Auto-slide functionality
        const autoSlide = () => {
            scrollPosition -= 1;

            if (Math.abs(scrollPosition) >= slider.scrollWidth / 2) {
                scrollPosition = 0;
            }

            slider.style.transform = `translateX(${scrollPosition}px)`;
            animationFrameId.current = requestAnimationFrame(autoSlide);
        };

        autoSlide(); // Start auto-slide

        const handleMouseEnter = () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };

        const handleMouseLeave = () => {
            autoSlide();
        };

        slider.addEventListener("mouseenter", handleMouseEnter);
        slider.addEventListener("mouseleave", handleMouseLeave);

        // Cleanup on unmount
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            slider.removeEventListener("mouseenter", handleMouseEnter);
            slider.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div>

            <div className="pnc-partners">
                {/* <h2>Partnered Content Networks</h2> */}
                <div className="faq_wrap">
                    <div className="auto-container">
                        <div className="row clearfix">
                            <div className="col-md-12 session_wrap_style1 wow fadeInUp" data-wow-delay="200ms"
                                data-wow-duration="1000ms">
                                <h3 className="bot_wrap157 mty155">Partnered <span className="org_wrap">Content Networks</span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slider-container">
                    <ul className="slider" ref={sliderRef}>
                        {/* Original Image Slides (without duplication) */}
                        <li className="slideimg"><Link href="https://cancerscience.net" title="Cancer Science" target="_blank"><Image src={cancerscience} alt="Cancer Science" title="Cancer Science" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://vaccine-studies.com" title="Vaccine Studies" target="_blank"><Image src={vaccine_studies} alt="Vaccine Studies" title="Vaccine Studies" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://gynecology.blog" title="Gynecology" target="_blank"><Image src={gynecology} alt="Gynecology" title="Gynecology" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://food-nutrition.blog" title="Food Nutrition" target="_blank"><Image src={food_nutrition} alt="Food Nutrition" title="Food Nutrition" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://nursing-science.com" title="Nursing Science" target="_blank"><Image src={nursing_science} alt="Nursing Science" title="Nursing Science" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://public-health.blog" title="Public Health" target="_blank"><Image src={public_health} alt="Public Health" title="Public Health" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://thepharma.net" title="The Pharma" target="_blank"><Image src={thepharma} alt="The Pharma" title="The Pharma" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://infect.blog" title="Infectious Diseases" target="_blank"><Image src={infectious_disease} alt="Infectious Disease" title="Infectious Diseases" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://neurocare.blog" title="Neuro Care" target="_blank"><Image src={neurocare} alt="Neuro Care" title="Neuro Care" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://catalysis.blog" title="Catalysis" target="_blank"><Image src={catalysis} alt="Catalysis" title="Catalysis" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://neonatalbiology.com" title="Neonatal Biology" target="_blank"><Image src={neonatalbiology} alt="Neonatal Biology" title="Neonatal Biology" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://neonataldisorders.com" title="Neonatal Disorders" target="_blank"><Image src={neonataldisorders} alt="Neonatal Disorders" title="Neonatal Disorders" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://mutation.blog" title="Mutation" target="_blank"><Image src={mutation} alt="Mutation" title="Mutation" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://nanotechnology.blog" title="Nanotechnology" target="_blank"><Image src={nanotechnology} alt="Nanotechnology" title="Nanotechnology" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://toxicology.blog" title="Toxicology" target="_blank"><Image src={toxicology} alt="Toxicology" title="Toxicology" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://darkbiotechnology.com" title="Dark Biotechnology" target="_blank"><Image src={darkbiotechnology} alt="Dark Biotechnology" title="Dark Biotechnology" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://pollutiontoxicology.com" title="Pollution Toxicology" target="_blank"><Image src={pollutiontoxicology} alt="Pollution Toxicology" title="Pollution Toxicology" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://cellbiology.blog" title="Cell Biology" target="_blank"><Image src={cellbiology} alt="Cell Biology" title="Cell Biology" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://bioanalyticalresearch.com" title="Bioanalytical Research" target="_blank"><Image src={bioanalyticalresearch} alt="Bioanalytical Research" title="Bioanalytical Research" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://renaldisorders.com" title="Renal Disorders" target="_blank"><Image src={renaldisorders} alt="Renal Disorders" title="Renal Disorders" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://theastrophysics.com" title="The Astrophysics" target="_blank"><Image src={theastrophysics} alt="The Astrophysics" title="The Astrophysics" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://sleepphysiology.com" title="Sleep Physiology" target="_blank"><Image src={sleepphysiology} alt="Sleep Physiology" title="Sleep Physiology" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://epidemiology.blog" title="Epidemiology" target="_blank"><Image src={epidemiology} alt="Epidemiology" title="Epidemiology" loading="lazy" /></Link></li>
                        <li className="slideimg"><Link href="https://histology.blog" title="Histology" target="_blank"><Image src={histology} alt="Histology" title="Histology" loading="lazy" /></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PartneredContent