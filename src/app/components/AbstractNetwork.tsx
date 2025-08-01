import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ApiResponse, IndexPageData } from '@/types';

// Images 
import img4 from '../../../public/images/images/img4.webp';
import icon1 from '../../../public/images/images/icon_1.png';
import icon2 from '../../../public/images/images/icon_2.png';
import icon3 from '../../../public/images/images/icon_3.png';
import icon4 from '../../../public/images/images/icon_4.png';
import icon5 from '../../../public/images/images/icon_5.png';
import icon6 from '../../../public/images/images/icon_6.png';
import icon7 from '../../../public/images/images/icon_7.png';
import icon8 from '../../../public/images/images/icon_8.png';

interface AbstractNetworkProps {
    generalAbstractInfo: ApiResponse;
    onelinerAbstractInfo: IndexPageData;
}

const AbstractNetwork: React.FC<AbstractNetworkProps> = ({ generalAbstractInfo, onelinerAbstractInfo }) => {

    const general = generalAbstractInfo?.data || {}
    const onelinerNetwork = onelinerAbstractInfo?.oneliner?.Explore_Our_Comprehensive_Networking_Services;
    const networkingHeading = onelinerNetwork?.headding || "";
    const networkingContent = onelinerNetwork?.content || "";

    const onelinerAbstract = onelinerAbstractInfo?.oneliner?.Submit_Your_Abstract?.content;

    return (
        <div>
            <div className="spek_wrap">
                <div className="set_gray_wrap1 wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1000ms">
                    <div className="add_style1">
                        <hr />
                        <h3> {onelinerAbstract ? onelinerAbstract : ""}</h3>
                        <Link href="/call-for-abstract-submission" title='Submit Your Abstract'>Submit Your Abstract</Link>
                    </div>
                </div>
                <div className="set_gray_wrap2 wow fadeInUp" data-wow-delay="500ms" data-wow-duration="1000ms"><Image
                    src={img4} alt={general.clname ? general.clname : ""} title={general.clname ? general.clname : ""} loading="lazy" /></div>
            </div>

            <div className="import_wrap2">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-md-12 session_wrap_style1 wow fadeInUp" data-wow-delay="200ms"
                            data-wow-duration="1000ms">
                            <h3>{networkingHeading}</h3>
                            <p>{networkingContent}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="enhan_wrap">
                <div className="auto-container clearfix">
                    <div className="row clearfix">
                        <div className="col-md-3 col-sm-6  wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1000ms">
                            <div className="wrap_iocn1">
                                <Image src={icon1} alt="Personal encounters" title="Personal encounters" loading="lazy" />
                                <p>Personal encounters</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">
                            <div className="wrap_iocn1">
                                <Image src={icon2} alt="Networking opportunities" title="Networking opportunities" loading="lazy" />
                                <p>Networking opportunities</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="600ms" data-wow-duration="1000ms">
                            <div className="wrap_iocn1 top156">
                                <Image src={icon3} alt="Career Growth" title="Career Growth" loading="lazy" />
                                <p> Career Growth</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="800ms" data-wow-duration="1000ms">
                            <div className="wrap_iocn2 top156">
                                <Image src={icon8} alt="Scholars help" title="Scholars help" loading="lazy" />
                                <p>Scholars help</p>
                            </div>
                        </div>
                        <div className="col-md-12 wow fadeInUp" data-wow-delay="1000ms" data-wow-duration="1000ms">
                            <hr />
                        </div>
                        <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="1100ms" data-wow-duration="1000ms">
                            <div className="wrap_iocn1 top156">
                                <Image src={icon4} alt="New learnings" title="New learnings" loading="lazy" />
                                <p>New learnings</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="1200ms" data-wow-duration="1000ms">
                            <div className="wrap_iocn1">
                                <Image src={icon5} alt="Contribute to research advancements" title="Contribute to research advancements" loading="lazy" />
                                <p>Contribute to research advancements</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="1300ms" data-wow-duration="1000ms">
                            <div className="wrap_iocn1">
                                <Image src={icon6} alt="Exchange of ideas" title="Exchange of ideas" loading="lazy" />
                                <p>Exchange of ideas</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="1400ms" data-wow-duration="1000ms">
                            <div className="wrap_iocn2 top156">
                                <Image src={icon7} alt="Knowledge sharing" title="Knowledge sharing" loading="lazy" />
                                <p>Knowledge sharing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AbstractNetwork