const getRandomKeyword = (keyword) => {
    if (keyword[Math.floor(Math.random() * keyword.length)] === undefined) {
        return keyword[0];
    }

    return keyword[Math.floor(Math.random() * keyword.length)];
};
const keyWordObject = [{
    INDIAN: [{
        popularin2021: [
            "new hindi releases",
            "taaza hindi tunes",
            "fresh  hindi tunes",
            "2021 hindi 2021 top songs",
            "popular 2021 hindi",
            "popular hindi in 2021",
            "trending hindi hits 2021",
            "2021 new hindi songs of 2021 hindi",
            "latest hindi songs 2021",
        ],
        retro: [
            "70s duets",
            "70s bollywood",
            "old songs bollywood",
            "all day retro shuffle",
            "burman classics",
            "old retro bollywood songs",
            "purane gaane bollywood",
            "retro bollywood",
        ],
        dance: [
            "dance hits hindi bollywood",
            "all time hits hindi dance dance bollywood",
            "hindi bollywood dance hits",
            "hindi bollywood super dance",
            "dance hindi playlist",
        ],
        bollywood90s: [
            "sanu 1990s",
            "sanu abhijit 90s bollywood",
            "rathod 1990s",
            "all time 1990s bollywood",
            "sad 1990 hindi songs",
            "sameer anjaan 1990s hits",
            "bollywood udit narayan 90s",
            "harmony hindi",
            "hindi 1990s",
        ],
        evergreen: [
            "old classics hindi bollywood",
            "old hindi classics",
            "old hindi bollywood",
            "classics hindi old bollywood",
            "hindi old hits bollywood",
        ],
        romantic: [
            "top genres and moods",
            "monsoon moments",
            "love songs bollywood",
            "hindi romantic songs bollywood",
            "love songs hindi",
            "all day 2000 bollywood",
            "love in bollywood",
            "bollywood all time hindi love songs",
            "new love songs bollywood",
        ],
        disco: [
            "bollywood disco",
            "disco  hindi",
            "disco  bollywood",
            "disco  hits bollywood",
            "latest  bollywood disco",
        ],
        party: [
            "party hits hindi bollywood",
            "party music hindi",
            "party on my mind",
            "wheres the party tonight",
            "party bollywood",
            "party songs in bollywood",
            "new hindi party songs",
            "hindi all time party hits",
        ],
        fusion: [
            "indian fusion hits",
            "indian contemporary fusion",
            "fusion hindi indian",
            "fusion hits India",
            "hindi fusion indian",
        ],
    }, ],
    MOOD: [{
        cokestudio: [
            "coke studio india",
            "coke studio",
            "best of coke studio",
            "coke studio hits",
            "various artists coke studio",
        ],
        workout: [
            "workout bollywood",
            "running",
            "workout",
            "cycling",
            "motivation workout",
            "exercise",
        ],
        sleep: ["ambient english", "sleep", "sleeping", "sleep"],
        meditation: [
            "meditation",
            "mindfulness",
            "morning meditate india",
            "brahma meditation",
            "calmness meditate morning",
        ],
        yoga: ["ambient", "yoga"],
    }, ],
}, ];

const apiRequestURLS = [{
    INDIAN: {
        popularin2021: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].INDIAN[0].popularin2021),
        retro: "playlists?query=" + getRandomKeyword(keyWordObject[0].INDIAN[0].retro),
        dance: "playlists?query=" + getRandomKeyword(keyWordObject[0].INDIAN[0].dance),
        bollywood90s: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].INDIAN[0].bollywood90s),
        evergreen: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].INDIAN[0].evergreen),
        romantic: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].INDIAN[0].romantic),
        disco: "playlists?query=" + getRandomKeyword(keyWordObject[0].INDIAN[0].disco),
        party: "playlists?query=" + getRandomKeyword(keyWordObject[0].INDIAN[0].party),
        fusion: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].INDIAN[0].fusion),
    },
    MOOD: {
        cokestudio: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].MOOD[0].cokestudio),
        workout: "playlists?query=" + getRandomKeyword(keyWordObject[0].MOOD[0].workout),
        meditation: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].MOOD[0].meditation),
        sleep: "playlists?query=" + getRandomKeyword(keyWordObject[0].MOOD[0].sleep),
        yoga: "playlists?query=" + getRandomKeyword(keyWordObject[0].MOOD[0].yoga),
    },
}, ];

export const categories = [{
    INDIAN: [{
            title: "Popular in 2021",
            url: apiRequestURLS[0].INDIAN.popularin2021,
            seemore: false,
        },
        {
            title: "Bollywood Retro",
            url: apiRequestURLS[0].INDIAN.retro,
            seemore: false,
        },
        {
            title: "Bollywood Dance Hits",
            url: apiRequestURLS[0].INDIAN.dance,
            seemore: false,
        },
        {
            title: "90s Bollywood",
            url: apiRequestURLS[0].INDIAN.bollywood90s,
            seemore: true,
        },

        {
            title: "Evergreen Classics",
            url: apiRequestURLS[0].INDIAN.evergreen,
            seemore: false,
        },
        {
            title: "Bollywood Romance",
            url: apiRequestURLS[0].INDIAN.romantic,
            seemore: false,
        },
        {
            title: "मैं एक डिस्को",
            url: apiRequestURLS[0].INDIAN.disco,
            seemore: false,
        },
        {
            title: "Bollywood Party Hits",
            url: apiRequestURLS[0].INDIAN.party,
            seemore: false,
        },
        {
            title: "Indian Fusion",
            url: apiRequestURLS[0].INDIAN.fusion,
            seemore: false,
        },
    ],

    MOOD: [{
            title: "Coke Studio",
            url: apiRequestURLS[0].MOOD.cokestudio,
            seemore: false,
        },
        {
            title: "Workouts",
            url: apiRequestURLS[0].MOOD.workout,
            seemore: false,
        },
        {
            title: "Meditation",
            url: apiRequestURLS[0].MOOD.meditation,
            seemore: false,
        },
        {
            title: "Sleep",
            url: apiRequestURLS[0].MOOD.sleep,
            seemore: false,
        },
        {
            title: "Morning Yoga",
            url: apiRequestURLS[0].MOOD.yoga,
            seemore: false,
        },
    ],

    WESTERN: [{
            ROCK: [{
                    title: "Classic | Alternative | Rock Ballad | Hard | Soft",
                    url: "playlists?query=classic rock english",
                    seemore: false,
                },
                {
                    title: "Heavy Metal",
                    url: "playlists?query=heavy metal english",
                    seemore: false,
                },
                {
                    title: "Grunge",
                    url: "playlists?query=grunge english",
                    seemore: false,
                },
                {
                    title: "Grunge",
                    url: "playlists?query=post grunge english",
                    seemore: false,
                },
                {
                    title: "Punk",
                    url: "playlists?query=punk",
                    seemore: false,
                },
                {
                    title: "Funk",
                    url: "playlists?query=funk",
                    seemore: false,
                },
                {
                    title: "Country",
                    url: "playlists?query=country english",
                    seemore: false,
                },
                {
                    title: "Progressive",
                    url: "playlists?query=Progressive english",
                    seemore: false,
                },
                {
                    title: "Progressive",
                    url: "playlists?query=Psychadelic english",
                    seemore: false,
                },
                {
                    title: "Progressive",
                    url: "playlists?query=Psychadelic english",
                    seemore: false,
                },
                {
                    title: "Blues",
                    url: "playlists?query=blues english",
                    seemore: false,
                },
                {
                    title: "Folk",
                    url: "playlists?query=folk english",
                    seemore: false,
                },
            ],
        },

        {
            OTHERS: [{
                    title: "Electronic Dance Music(EDM)",
                    url: "playlists?query= edm english",
                    seemore: false,
                },
                {
                    title: "Dubstep",
                    url: "playlists?query= dubstep english",
                    seemore: false,
                },
                {
                    title: "Techno",
                    url: "playlists?query= techno english",
                    seemore: false,
                },
                {
                    title: "Hip Hop Workout",
                    url: "playlists?query= Hip Hop english",
                    seemore: false,
                },
                {
                    title: "Hip Hop Workout",
                    url: "playlists?query= Hip Hop english",
                    seemore: false,
                },
                {
                    title: "Gospel",
                    url: "playlists?query= Gospel english",
                    seemore: false,
                },
                {
                    title: "Reggae",
                    url: "playlists?query= Reggae english",
                    seemore: false,
                },
            ],
        },
    ],
}, ];