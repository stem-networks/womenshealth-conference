// // components/GalleryEvent.tsx
// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { BsDownload } from "react-icons/bs";

// type GalleryData = {
//     [key: string]: string[];
// };
// interface GeneralInfo {
//     clname?: string;
// }
// interface GalleryEventProps {
//     generalInfo: GeneralInfo;
// }
// const galleryData: GalleryData = {
//     allPhotos: [
//         "1.webp", "2.webp", "3.webp", "8.webp", "5.webp",
//         "6.webp", "7.webp", "4.webp", "9.webp", "10.webp",
//         "11.webp", "12.webp", "13.webp", "14.webp", "15.webp",
//         "16.webp", "17.webp", "18.webp", "19.webp", "20.webp",
//         "21.webp", "22.webp", "23.webp", "24.webp", "25.webp",
//         "26.webp", "27.webp", "28.webp", "29.webp", "30.webp",
//         "31.webp", "33.webp", "34.webp", "35.webp",
//         "36.webp", "37.webp", "38.webp", "39.webp", "40.webp",
//         "41.webp", "42.webp", "43.webp", "44.webp", "45.webp",
//         "46.webp", "47.webp", "48.webp", "49.webp", "50.webp",
//         "51.webp", "52.webp", "53.webp", "54.webp", "55.webp",
//         "56.webp", "57.webp", "58.webp", "59.webp", "60.webp",
//         "61.webp", "62.webp", "63.webp", "64.webp", "65.webp",
//         "66.webp", "71.webp", "72.webp", "73.webp", "74.webp", "76.webp",
//         "77.webp", "78.webp", "79.webp", "80.webp", "81.webp", "82.webp",
//         // "85.webp", "86.webp", "87.webp",
//         //  "88.webp", "89.webp", "90.webp",
//         // "91.webp", "92.webp", "93.webp", "94.webp", "95.webp",
//         // "96.webp", "97.webp", "98.webp", "99.webp", "100.webp"

//     ],
//     allDay2: [],
// };

// export default function GalleryEvent({ generalInfo }: GalleryEventProps) {

//     const [columns, setColumns] = useState<React.ReactNode[][]>([[], [], [], []]);
//     const colCount = 4;

//     useEffect(() => {
//         let imgIndex = 0;
//         const colArrays: React.ReactNode[][] = Array.from({ length: colCount }, () => []);

//         Object.keys(galleryData).forEach((folder) => {
//             galleryData[folder].forEach((imageName) => {
//                 const imgPath = `/images/gallery-event/${folder}/${imageName}`;

//                 const imageWrapper = (
//                     <div key={`${folder}-${imageName}`} className="image-wrapper relative mb-4">
//                         <Image
//                             src={imgPath}
//                             alt={generalInfo?.clname || ""}
//                             title={generalInfo?.clname}
//                             width={400}
//                             height={400}
//                             className="w-100 h-auto rounded shadow-sm"
//                             loading="lazy"
//                         />
//                         <a
//                             href={imgPath}
//                             download
//                             className="download-icon absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md"
//                         >
//                             <BsDownload className="text-xl text-gray-700" />
//                         </a>
//                     </div>
//                 );

//                 colArrays[imgIndex % colCount].push(imageWrapper);
//                 imgIndex++;
//             });
//         });

//         setColumns(colArrays);
//     }, []);

//     return (
//         <div className="gallery-complete-page">
//             <div className="gallery-event-block">
//                 <div className="auto-container">
//                     <div className="gallery-images-block">
//                         {columns.map((col, i) => (
//                             <div
//                                 key={i}
//                                 className="each-indiv-images-block"
//                             >
//                                 {col}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// components/GalleryEvent.tsx
// "use client";

// import Image from "next/image";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { BsDownload } from "react-icons/bs";

// type GalleryData = {
//     [key: string]: string[];
// };
// interface GeneralInfo {
//     clname?: string;
// }
// interface GalleryEventProps {
//     generalInfo: GeneralInfo;
// }

// const galleryData: GalleryData = {
//     allPhotos: [
//         "1.webp", "2.webp", "3.webp", "8.webp", "5.webp",
//         "6.webp", "7.webp", "4.webp", "9.webp", "10.webp",
//         "11.webp", "12.webp", "13.webp", "14.webp", "15.webp",
//         "16.webp", "17.webp", "18.webp", "19.webp", "20.webp",
//         "21.webp", "22.webp", "23.webp", "24.webp", "25.webp",
//         "26.webp", "27.webp", "28.webp", "29.webp", "30.webp",
//         "31.webp", "33.webp", "34.webp", "35.webp",
//         "36.webp", "37.webp", "38.webp", "39.webp", "40.webp",
//         "41.webp", "42.webp", "43.webp", "44.webp", "45.webp",
//         "46.webp", "47.webp", "48.webp", "49.webp", "50.webp",
//         "51.webp", "52.webp", "53.webp", "54.webp", "55.webp",
//         "56.webp", "57.webp", "58.webp", "59.webp", "60.webp",
//         "61.webp", "62.webp", "63.webp", "64.webp", "65.webp",
//         "66.webp", "71.webp", "72.webp", "73.webp", "74.webp", "76.webp",
//         "77.webp", "78.webp", "79.webp", "80.webp", "81.webp", "82.webp",
//     ],
//     allDay2: [],
// };

// export default function GalleryEvent({ generalInfo }: GalleryEventProps) {
//     const [columns, setColumns] = useState<React.ReactNode[][]>([[], [], [], []]);
//     const [imagesLoaded, setImagesLoaded] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const loadedSetRef = useRef<Set<string>>(new Set()); // guard against double count

//     const colCount = 4;

//     // Build a flat list of all image URLs once
//     const allImageUrls = useMemo(() => {
//         const urls: string[] = [];
//         Object.keys(galleryData).forEach((folder) => {
//             galleryData[folder].forEach((imageName) => {
//                 urls.push(`/images/gallery-event/${folder}/${imageName}`);
//             });
//         });
//         return urls;
//     }, []);

//     const totalImages = allImageUrls.length;

//     // useEffect(() => {
//     //     console.log(`Total images to load: ${totalImages}`);
//     // }, [totalImages]);

//     // Build your columns (unchanged logic)
//     useEffect(() => {
//         let imgIndex = 0;
//         const colArrays: React.ReactNode[][] = Array.from({ length: colCount }, () => []);

//         Object.keys(galleryData).forEach((folder) => {
//             galleryData[folder].forEach((imageName) => {
//                 const imgPath = `/images/gallery-event/${folder}/${imageName}`;

//                 const imageWrapper = (
//                     <div key={`${folder}-${imageName}`} className="image-wrapper relative mb-4">
//                         <Image
//                             src={imgPath}
//                             alt={generalInfo?.clname || ""}
//                             title={generalInfo?.clname}
//                             width={400}
//                             height={400}
//                             className="w-100 h-auto rounded shadow-sm"
//                             loading="eager" // force load even below the fold
//                             onLoad={() => {
//                                 // guard in case event fires twice in Strict Mode
//                                 if (!loadedSetRef.current.has(imgPath)) {
//                                     loadedSetRef.current.add(imgPath);
//                                     setImagesLoaded((prev) => {
//                                         const newCount = prev + 1;
//                                         // console.log(`Image loaded: ${newCount}/${totalImages}`);
//                                         if (newCount === totalImages) {
//                                             // console.log("✅ All images loaded successfully");
//                                             setLoading(false);
//                                         }
//                                         return newCount;
//                                     });
//                                 }
//                             }}
//                             onError={() => {
//                                 if (!loadedSetRef.current.has(imgPath)) {
//                                     loadedSetRef.current.add(imgPath);
//                                     setImagesLoaded((prev) => {
//                                         const newCount = prev + 1;
//                                         console.warn(`⚠️ Failed to load: ${imgPath} (${newCount}/${totalImages})`);
//                                         if (newCount === totalImages) {
//                                             console.log("✅ All images attempted (with some errors).");
//                                             setLoading(false);
//                                         }
//                                         return newCount;
//                                     });
//                                 }
//                             }}
//                         />
//                         <a
//                             href={imgPath}
//                             download
//                             className="download-icon absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md"
//                         >
//                             <BsDownload className="text-xl text-gray-700" />
//                         </a>
//                     </div>
//                 );

//                 colArrays[imgIndex % colCount].push(imageWrapper);
//                 imgIndex++;
//             });
//         });

//         setColumns(colArrays);
//     }, [generalInfo]);

//     return (
//         <div className="gallery-complete-page">
//             <div className="gallery-event-block">
//                 <div className="auto-container relative">
//                     {/* Always render the images so load events can fire */}
//                     <div className="gallery-images-block">
//                         {columns.map((col, i) => (
//                             <div key={i} className="each-indiv-images-block">
//                                 {col}
//                             </div>
//                         ))}
//                     </div>

//                     {/* Full-cover overlay while loading */}
//                     {loading && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-20">
//                             <div className="loader-block"><span className="loader"></span></div>
//                             {/* <p className="text-center font-bold text-lg">
//                                 Loading images…
//                             </p> */}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// components/GalleryEvent.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BsDownload } from "react-icons/bs";

type GalleryData = {
    [key: string]: string[];
};
interface GeneralInfo {
    clname?: string;
}
interface GalleryEventProps {
    generalInfo: GeneralInfo;
}

const galleryData: GalleryData = {
    allPhotos: [
        "1.webp", "2.webp", "3.webp", "8.webp", "5.webp",
        "6.webp", "7.webp", "4.webp", "9.webp", "10.webp",
        "11.webp", "12.webp", "13.webp", "14.webp", "15.webp",
        "16.webp", "17.webp", "18.webp", "19.webp", "20.webp",
        "21.webp", "22.webp", "23.webp", "24.webp", "25.webp",
        "26.webp", "27.webp", "28.webp", "29.webp", "30.webp",
        "31.webp", "33.webp", "34.webp", "35.webp",
        "36.webp", "37.webp", "38.webp", "39.webp", "40.webp",
        "41.webp", "42.webp", "43.webp", "44.webp", "45.webp",
        "46.webp", "47.webp", "48.webp", "49.webp", "50.webp",
        "51.webp", "52.webp", "53.webp", "54.webp", "55.webp",
        "56.webp", "57.webp", "58.webp", "59.webp", "60.webp",
        "61.webp", "62.webp", "63.webp", "64.webp", "65.webp",
        "66.webp", "71.webp", "72.webp", "73.webp", "74.webp", "76.webp",
        "77.webp", "78.webp", "79.webp", "80.webp", "81.webp", "82.webp",
    ],
    allDay2: [],
};

export default function GalleryEvent({ generalInfo }: GalleryEventProps) {
    const [columns, setColumns] = useState<React.ReactNode[][]>([[], [], [], []]);
    const [loading, setLoading] = useState(true);
    const loadedSetRef = useRef<Set<string>>(new Set());

    const colCount = 4;

    // Build a flat list of all image URLs once
    const allImageUrls = useMemo(() => {
        const urls: string[] = [];
        Object.keys(galleryData).forEach((folder) => {
            galleryData[folder].forEach((imageName) => {
                urls.push(`/images/gallery-event/${folder}/${imageName}`);
            });
        });
        return urls;
    }, []);

    const totalImages = allImageUrls.length;

    // Build your columns
    useEffect(() => {
        let imgIndex = 0;
        const colArrays: React.ReactNode[][] = Array.from(
            { length: colCount },
            () => []
        );

        Object.keys(galleryData).forEach((folder) => {
            galleryData[folder].forEach((imageName) => {
                const imgPath = `/images/gallery-event/${folder}/${imageName}`;

                const imageWrapper = (
                    <div
                        key={`${folder}-${imageName}`}
                        className="image-wrapper relative mb-4"
                    >
                        <Image
                            src={imgPath}
                            alt={generalInfo?.clname || ""}
                            title={generalInfo?.clname}
                            width={400}
                            height={400}
                            className="w-100 h-auto rounded shadow-sm"
                            loading="eager"
                            onLoad={() => {
                                if (!loadedSetRef.current.has(imgPath)) {
                                    loadedSetRef.current.add(imgPath);
                                    if (loadedSetRef.current.size === totalImages) {
                                        setLoading(false);
                                    }
                                }
                            }}
                            onError={() => {
                                if (!loadedSetRef.current.has(imgPath)) {
                                    loadedSetRef.current.add(imgPath);
                                    if (loadedSetRef.current.size === totalImages) {
                                        setLoading(false);
                                    }
                                }
                            }}
                        />
                        <a
                            href={imgPath}
                            download
                            className="download-icon absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md"
                        >
                            <BsDownload className="text-xl text-gray-700" />
                        </a>
                    </div>
                );

                colArrays[imgIndex % colCount].push(imageWrapper);
                imgIndex++;
            });
        });

        setColumns(colArrays);
    }, [generalInfo, totalImages]); // ✅ include totalImages

    return (
        <div className="gallery-complete-page">
            <div className="gallery-event-block">
                <div className="auto-container relative">
                    {/* Always render the images so load events can fire */}
                    <div className="gallery-images-block">
                        {columns.map((col, i) => (
                            <div key={i} className="each-indiv-images-block">
                                {col}
                            </div>
                        ))}
                    </div>

                    {/* Full-cover overlay while loading */}
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-20">
                            <div className="loader-block">
                                <span className="loader"></span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
