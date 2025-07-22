import React from 'react'
import { IndexPageData } from "@/types";

interface ImportantDatesProps {
    onelinerInfo: IndexPageData;
}

const ImportantDates = ({ onelinerInfo }: ImportantDatesProps) => {
    const oneliner = onelinerInfo?.oneliner?.important_dates;
    const importantDates = onelinerInfo?.importantDates || [];

    return (
        <div>
            <div className="import_wrap">
                <div className="auto-container clearfix">
                    <div className="row test-imp-row">
                        <div
                            className="col-md-12 session_wrap_style1 wow fadeInUp"
                            data-wow-delay="200ms"
                            data-wow-duration="1000ms"
                        >
                            <h2>
                                Important <span>Dates</span>
                            </h2>
                            <p>{oneliner?.content || ""}</p>
                        </div>

                        <div className="test-imp">
                            <div className="row test-imp-row">
                                <div className="col-md-3"></div>
                                <div
                                    className="col-md-3 col-sm-6 wow fadeInUp"
                                    data-wow-delay="200ms"
                                    data-wow-duration="1000ms"
                                >
                                    <div className="date-mainblock-color1">
                                        <div className="date-topbg-color1">
                                            <div className="pull-left date-lflex">
                                                <div className="date-circle1"></div>
                                                <div className="date-lstrip1"></div>
                                                <div className="date-circle2"></div>
                                                <div className="date-lstrip2"></div>
                                            </div>
                                            <div className="pull-right date-rflex">
                                                <div className="date-circle1"></div>
                                                <div className="date-lstrip3"></div>
                                                <div className="date-circle2"></div>
                                                <div className="date-lstrip4"></div>
                                            </div>
                                        </div>
                                        <div className="date-textblock">
                                            <div
                                                className="may_wrap15"
                                                dangerouslySetInnerHTML={{
                                                    __html: importantDates[0]?.date || "",
                                                }}
                                            />
                                            <div className="earl_wrap">
                                                {importantDates[0]?.text || ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-md-3 col-sm-6 wow fadeInUp"
                                    data-wow-delay="400ms"
                                    data-wow-duration="1200ms"
                                >
                                    <div className="date-mainblock-color2">
                                        <div className="date-topbg-color2">
                                            <div className="pull-left date-lflex">
                                                <div className="date-circle1"></div>
                                                <div className="date-rstrip1"></div>
                                                <div className="date-circle2"></div>
                                                <div className="date-rstrip2"></div>
                                            </div>
                                            <div className="pull-right date-rflex">
                                                <div className="date-circle1"></div>
                                                <div className="date-rstrip3"></div>
                                                <div className="date-circle2"></div>
                                                <div className="date-rstrip4"></div>
                                            </div>
                                        </div>
                                        <div className="date-textblock">
                                            <div
                                                className="may_wrap15 rih5 "
                                                dangerouslySetInnerHTML={{
                                                    __html: importantDates[1]?.date || "",
                                                }}
                                            ></div>
                                            <div className="earl_wrap">
                                                {importantDates[1]?.text || ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImportantDates