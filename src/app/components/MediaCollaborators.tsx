import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const MediaCollaborators = () => {
    return (
        <div className="media-collaborators-block">
            <div className="pnc-partners">
                {/* <h2>Partnered Content Networks</h2> */}
                <div className="faq_wrap">
                    <div className="auto-container">
                        <div className="row clearfix">
                            <div
                                className="col-md-12 session_wrap_style1 wow fadeInUp"
                                data-wow-delay="200ms"
                                data-wow-duration="1000ms"
                            >
                                <h3 className="bot_wrap157 mty155">
                                    Media <span className="org_wrap">Partners</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slider-container">
                    <ul className="slider">
                        {/* Original Image Slides (without duplication) */}
                        <li className="slideimg">
                            <Link
                                href="https://allconferencealert.net/"
                                title="All Conference Alert"
                                target="_blank"
                            >
                                <Image
                                    src="/images/images/all_conf_alert.webp"
                                    alt="All Conference Alert"
                                    title="All Conference Alert"
                                    width="400"
                                    height="100"
                                />
                            </Link>
                        </li>

                        <li className="slideimg">
                            <Link
                                href="https://conferenceineurope.net/"
                                title="Conference In Europe"
                                target="_blank"
                            >
                                <Image
                                    src="/images/images/urop_logo.webp"
                                    alt="Conference In Europe"
                                    title="Conference In Europe"
                                    width="400"
                                    height="100"
                                />
                            </Link>
                        </li>

                        <li className="slideimg">
                            <Link
                                href="https://internationalconferencealerts.com/"
                                title="International Conference Alerts"
                                target="_blank"
                            >
                                <Image
                                    src="/images/images/intern_conf_alerts.webp"
                                    alt="International Conference Alerts"
                                    title="International Conference Alerts"
                                    width="400"
                                    height="100"
                                />
                            </Link>
                        </li>

                        <li className="slideimg">
                            <Link
                                href="https://eventsnotification.com/"
                                title="Events Notification"
                                target="_blank"
                            >
                                <Image
                                    src="/images/images/events_notificatiopn.webp"
                                    alt="Events Notification"
                                    title="Events Notification"
                                    width="400"
                                    height="100"
                                />
                            </Link>
                        </li>

                        <li className="slideimg">
                            <Link href="https://conferencenext.com/" title="Conference Next" target="_blank">
                                <Image src="/images/images/conference_next.webp" alt="Conference Next" title="Conference Next" width="400"
                                    height="100" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MediaCollaborators