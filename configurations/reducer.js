export const initialState = {
    user: null,
    featuredPlaylist: [],
    boilerPlateData: [],
    currentSongPlaying: {},
    play: false,
    pause: false,
    favorited: false,
    selectedSongNeedle: {},
    favoriteSongsInPlaylist: [],

    //remove after finished developing
    //token: "BQA0mbpJXoFI50icHk7pPqZcXzHHSEIr7lr60Msix0NUQAQwlnGSypPC10CyhVsRndrX4jKyZ2O9GlVumP2WGj_aT3xqSY3i6SIje9CleuJmVJmvWaD-0kZlOpDovz60EvWe9H-3-GM9pvUH6CqLLHRfZwBuZPXRrjIATvIqhOf6U99r3Luj",
};
export const actionTypes = {
    SET_USER: "SET_USER",
    SET_BOILER_PLATE_DATA: "SET_BOILER_PLATE_DATA",
    SET_FEATURED_PLAYLISTS: "SET_FEATURED_PLAYLISTS",
    SET_CURRENT_SONG: "SET_CURRENT_SONG",
    SET_SELECTED_SONG_NEEDLE: "SET_SELECTED_SONG_NEEDLE",
    SET_FAVORITE_SONGS_IN_PLAYLIST: "SET_FAVORITE_SONGS_IN_PLAYLIST",
    SET_PLAYING: "SET_PLAYING",
    SET_PAUSED: "SET_PAUSED",
    SET_FAVORITE: "SET_FAVORITE",
};
// Reducer Job: receive actions from the user and perform the actions and push the action data
// into the state(initialState) for the data layer to consume
const reducer = (state, action) => {
    console.log(
        "Reducer: Setting the incoming api data into the data layer context"
    );
    console.log(action);
    //action has 2 types-> type, [payload]
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };

        case "SET_FEATURED_PLAYLISTS":
            return {
                ...state,
                featuredPlaylist: action.featuredPlaylist,
            };
        case "SET_BOILER_PLATE_DATA":
            return {
                ...state,
                boilerPlateData: action.boilerPlateData,
            };
        case "SET_CURRENT_SONG":
            return {
                ...state,
                currentSongPlaying: action.currentSongPlaying,
            };
        case "SET_SELECTED_SONG_NEEDLE":
            return {
                ...state,
                selectedSongNeedle: action.selectedSongNeedle,
            };

        case "SET_PLAYING":
            return {
                ...state,
                play: action.play,
            };
        case "SET_PAUSED":
            return {
                ...state,
                pause: action.pause,
            };
        case "SET_FAVORITE":
            return {
                ...state,
                favorited: action.favorited,
            };

        default:
            return state;
    }
};
export default reducer;