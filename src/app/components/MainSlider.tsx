import React from 'react'

const MainSlider = () => {

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: true,
        afterChange: () => {
            // Get all slides
            document.querySelectorAll(".slick-slide").forEach((slide) => {
                const isHidden = slide.getAttribute("aria-hidden") === "true";

                // Disable interactive elements in hidden slides
                slide.querySelectorAll("a, button").forEach((el) => {
                    el.setAttribute("tabindex", isHidden ? "-1" : "0");
                });
            });
        },
    };

    return (
        <div>
            <div className="book_wrap">
                <Slider {...sliderSettings}>
                    {/* Slide 1 - Book Today */}
                    <div className="auto-container clearfix" aria-hidden="false">
                        <div className="row clearfix">
                            <div
                                className="col-md-12 wow fadeInUp animated"
                                data-wow-delay="200ms"
                                data-wow-duration="1000ms"
                            >
                                <h2>Book Today &amp; Save huge!</h2>
                                {/* <h3>Listener @ ${listenerDiscountedFee} | Presenter @ ${presenterDiscountedFee}</h3> */}
                                {/* { listenerDiscountedFee > 0 && presenterDiscountedFee > 0 && (
                          <h3>Listener @ ${listenerDiscountedFee} | Presenter @ ${presenterDiscountedFee}</h3>
                        )} */}

                                <a href="/register" title="Register" tabIndex={0}>
                                    Register now
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Slide 2 - Sponsor */}
                    <div className="auto-container clearfix" aria-hidden="false">
                        <div className="row clearfix">
                            <div
                                className="col-md-12 wow fadeInUp animated"
                                data-wow-delay="200ms"
                                data-wow-duration="1000ms"
                            >
                                <h2>Engage, Influence, Inspire</h2>
                                <h3>Become a Sponsor and Leave a Lasting Impression!</h3>
                                <button
                                    type="button"
                                    title="Contact"
                                    className="index-contact"
                                    tabIndex={0}
                                    onClick={() => toggleModal2("sponsor", "Sponsorship Form")}
                                >
                                    Contact
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Slide 3 - Exhibitor */}
                    <div className="auto-container clearfix" aria-hidden="false">
                        <div className="row clearfix">
                            <div
                                className="col-md-12 wow fadeInUp animated"
                                data-wow-delay="200ms"
                                data-wow-duration="1000ms"
                            >
                                <h2>Make your brand stand out</h2>
                                <h3>Become an exhibitor at our International Conference</h3>
                                <button
                                    type="button"
                                    title="Contact"
                                    className="index-contact"
                                    tabIndex={0}
                                    onClick={() => toggleModal2('exhibitor', 'Exhibitor Form')}
                                >
                                    Contact
                                </button>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default MainSlider