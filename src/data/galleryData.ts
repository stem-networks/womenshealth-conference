export type GalleryData = {
    [day: string]:
    | {
        [category: string]: string[]; // for nested categories like coffee, keynotes, etc.
    }
    | string[]; // for flat arrays like group-photos
};

export const galleryData: GalleryData = {
    day1: {
        coffee: [
            "/images/gallery-event/day1/coffee/1.webp",
            "/images/gallery-event/day1/coffee/2.webp",
            "/images/gallery-event/day1/coffee/3.webp",
            "/images/gallery-event/day1/coffee/4.webp",
            "/images/gallery-event/day1/coffee/5.webp",
            "/images/gallery-event/day1/coffee/6.webp",
            "/images/gallery-event/day2/coffee/1.webp",
            "/images/gallery-event/day1/coffee/7.webp",
            "/images/gallery-event/day1/coffee/8.webp",
        ],
        keynotes: [
            "/images/gallery-event/day1/keynotes/1.webp",
            "/images/gallery-event/day1/keynotes/2.webp",
            "/images/gallery-event/day1/keynotes/3.webp",
            "/images/gallery-event/day1/keynotes/4.webp",
            "/images/gallery-event/day2/keynotes/1.webp",
            "/images/gallery-event/day1/keynotes/6.webp",
            "/images/gallery-event/day1/keynotes/7.webp",
            "/images/gallery-event/day1/keynotes/8.webp",
            "/images/gallery-event/day1/keynotes/5.webp",
        ],
        posters: [
            "/images/gallery-event/day1/posters/1.webp",
            "/images/gallery-event/day1/posters/2.webp",
            "/images/gallery-event/day2/posters/3.webp",
            // "/images/gallery-event/day1/posters/4.webp",
            // "/images/gallery-event/day1/posters/5.webp",
            // "/images/gallery-event/day1/posters/6.webp",
            // "/images/gallery-event/day1/posters/7.webp",
            // "/images/gallery-event/day1/posters/8.webp",
        ],
        "oral-speakers": [
            "/images/gallery-event/day1/oral-speakers/1.webp",
            "/images/gallery-event/day1/oral-speakers/2.webp",
        ],
        lunch: [
            "/images/gallery-event/day1/lunch/1.webp",
            "/images/gallery-event/day1/lunch/2.webp",
            "/images/gallery-event/day1/lunch/3.webp",
            "/images/gallery-event/day1/lunch/4.webp",
            "/images/gallery-event/day1/lunch/5.webp",
            "/images/gallery-event/day1/lunch/6.webp",
        ],
        "panel-discussion": [
            "/images/gallery-event/day1/panel-discussion/1.webp",
            "/images/gallery-event/day1/panel-discussion/2.webp",
        ],
    },
    day2: {
        coffee: [
            "/images/gallery-event/day2/coffee/1.webp",
        ],
        keynotes: [
            "/images/gallery-event/day2/keynotes/1.webp",
            "/images/gallery-event/day2/keynotes/2.webp",
            "/images/gallery-event/day2/keynotes/3.webp",
            "/images/gallery-event/day2/keynotes/4.webp",
            "/images/gallery-event/day2/keynotes/5.webp",
            "/images/gallery-event/day2/keynotes/6.webp",
        ],
        posters: [
            "/images/gallery-event/day2/posters/1.webp",
            "/images/gallery-event/day2/posters/2.webp",
        ],
        // "oral-speakers": [
        //     "/images/gallery-event/day2/oral-speakers/1.webp",
        //     "/images/gallery-event/day2/oral-speakers/2.webp",
        // ],
        lunch: [
            "/images/gallery-event/day2/lunch/1.webp",
        ],
        // "panel-discussion": [
        //     "/images/gallery-event/day2/panel-discussion/1.webp",
        //     "/images/gallery-event/day2/panel-discussion/2.webp",
        // ],
    },
    groupphotos: [
        "/images/gallery-event/group-photos/1.webp",
        "/images/gallery-event/group-photos/2.webp",
        "/images/gallery-event/group-photos/3.webp",
        "/images/gallery-event/group-photos/4.webp",
    ],
};
