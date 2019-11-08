import {
    RECEIVE_SHEET_LIST,
    RECEIVE_SHEETMUSIC_LIST,
    RECEIVE_PLAY_MUSIC,
    RECEIVE_SHEETCATEGORY_LIST,
    RECEIVE_MY_SHEET_TAGS,
    RECEIVE_LOCAL_SHEET_TAGS,
    DELETE_PLAYLIST_MUSIC,
    SET_NEXT_PLAY_MUSIC
} from "../mutations-types";

import {
    reqSheetList,
    reqSheetMusicList,
    reqPlayMusic,
    reqSheetCategoryList,
    reqPersonaLizedList
} from "./../../api/index";
import {
    isArray
} from "util";

const state = {
    sheetLists: [], //歌单列表
    sheetName: "",
    sheetMusicLists: [], //歌单音乐列表
    playMusic: {}, //播放的音乐
    sheetCategoryLists: {}, //歌单分类列表
    playLists: [], //播放列表
    mySheetTags: [{ // 我的歌单标签
            name: "推荐",
            id: 1
        },
        {
            name: "官方",
            id: 2
        },
        {
            name: "精品",
            id: 3
        }
    ],
    nextPlayMusic: {}
};

const getters = {
    sheetLists(state) {
        return state.sheetLists;
    },
    sheetMusicLists(state) {
        return state.sheetMusicLists;
    },
    playMusic(state) {
        return state.playMusic;
    },
    sheetCategoryLists(state) {
        return state.sheetCategoryLists;
    },
    playLists(state) {
        return state.playLists;
    },
    mySheetTags(state) {
        return state.mySheetTags;
    },
    nextPlayMusic(state) {
        return state.nextPlayMusic;
    }
};

const actions = {
    async getSheetList({
        commit
    }, [data, sheetName]) {
        const result = await reqSheetList(data);
        if (result.code == 200) {
            const sheetLists = result.playlists;
            commit(RECEIVE_SHEET_LIST, [sheetLists, sheetName]);
        }
    },
    async getPersonaLizedList({
        commit
    }, [data, sheetName]) {
        const result = await reqPersonaLizedList(data);
        if (result.code == 200) {
            const sheetLists = result.result;
            commit(RECEIVE_SHEET_LIST, [sheetLists, sheetName]);
        }
    },
    async getSheetMusicList({
        commit
    }, data) {
        if (isArray(data)) {
            commit(RECEIVE_SHEETMUSIC_LIST, [, data]);
        } else {
            const result = await reqSheetMusicList(data);
            if (result.code == 200) {
                const sheetMusicLists = result.playlist;
                // const tracks = result.playlist.tracks;
                commit(RECEIVE_SHEETMUSIC_LIST, [sheetMusicLists, ]);
            }

        }
    },
    async getPlayMusic({
        commit
    }, playingMusic) {
        const result = await reqPlayMusic(playingMusic[0]);
        if (result.code == 200) {
            const playMusic = result.data[0];
            playMusic.name = playingMusic[1];
            playMusic.singer = playingMusic[2];
            playMusic.image = playingMusic[3];
            playMusic.singerId = playingMusic[4]
            commit(RECEIVE_PLAY_MUSIC, playMusic);
        }
    },
    async getSheetCategoryList({
        commit
    }) {
        const result = await reqSheetCategoryList();
        if (result.code == 200) {
            const sheetCategoryLists = result;
            var tagCategory = sheetCategoryLists.categories;
            var tagLists = [
                [],
                [],
                [],
                [],
                []
            ];
            sheetCategoryLists.sub.forEach(val => {
                if (val.category == 0) {
                    tagLists[0].push(val);
                } else if (val.category == 1) {
                    tagLists[1].push(val);
                } else if (val.category == 2) {
                    tagLists[2].push(val);
                } else if (val.category == 3) {
                    tagLists[3].push(val);
                } else if (val.category == 4) {
                    tagLists[4].push(val);
                }
            });

            var tags = {
                tagCategory: tagCategory,
                tagLists: tagLists
            };
            commit(RECEIVE_SHEETCATEGORY_LIST, tags);
        }
    },

    setMySheetTags({
        commit
    }, [as, tag]) {
        commit(RECEIVE_MY_SHEET_TAGS, [as, tag]);
    },
    getLocalSheetTags({
        commit
    }) {
        commit(RECEIVE_LOCAL_SHEET_TAGS)
    },
    deletePlayListMusic({
        commit
    }, index) {
        commit(DELETE_PLAYLIST_MUSIC, index)
    },
    setNextPlayMusic({
        commit
    }, nextPlayMusic) {
        commit(SET_NEXT_PLAY_MUSIC, nextPlayMusic)
    }
};

const mutations = {
    [RECEIVE_SHEET_LIST](state, [sheetLists, sheetName]) {
        if (state.sheetName == sheetName) {
            sheetLists.forEach(newval => {
                var newSheet = state.sheetLists.find((val) => {
                    if (val.name == newval.name) {
                        return newval
                    }
                })
                if (!newSheet) {
                    state.sheetLists.push(newval)
                }
            })
        } else {
            state.sheetLists = sheetLists;
            state.sheetName = sheetName
        }
    },
    [RECEIVE_SHEETMUSIC_LIST](state, [sheetMusicLists, tracks]) {
        if (state.playLists.length == 0 && tracks) {
            state.playLists = tracks;
        } else if (tracks) {
            tracks.forEach(val => {
                var oldplay;
                state.playLists.forEach(oldval => {
                    if (val.name == oldval.name) {
                        oldplay = val
                    }
                })
                if (!oldplay) {
                    state.playLists.push(val)
                }
            });
        }
        state.sheetMusicLists = sheetMusicLists;
    },
    [RECEIVE_PLAY_MUSIC](state, playMusic) {
        state.playMusic = playMusic;
    },
    [RECEIVE_SHEETCATEGORY_LIST](state, sheetCategoryLists) {
        state.sheetCategoryLists = sheetCategoryLists;
    },
    [RECEIVE_MY_SHEET_TAGS](state, [as, tag]) {
        if (as == "add") {
            var possess = state.mySheetTags.find(val => {
                if (tag.name == val.name) {
                    return val;
                } else {
                    return false;
                }
            });
            if (possess) {
                return;
            } else {
                if (localStorage.getItem("mySheetTags")) {
                    var mytags = JSON.parse(localStorage.getItem("mySheetTags"));
                    mytags.push(tag)
                    localStorage.setItem("mySheetTags", JSON.stringify(mytags));
                    state.mySheetTags = mytags;
                } else {
                    state.mySheetTags.push(tag)
                    localStorage.setItem("mySheetTags", JSON.stringify(state.mySheetTags));
                }
            }
        } else {
            state.mySheetTags.forEach((val, index) => {
                if (val == tag) {
                    if (localStorage.getItem("mySheetTags")) {
                        state.mySheetTags.splice(index, 1);
                        localStorage.setItem("mySheetTags", JSON.stringify(state.mySheetTags));
                    } else {
                        return
                    }
                }
            });
        }
    },
    [RECEIVE_LOCAL_SHEET_TAGS](state) {
        state.mySheetTags = JSON.parse(localStorage.getItem("mySheetTags"));
    },
    [DELETE_PLAYLIST_MUSIC](state, [index, length]) {
        state.playLists.splice(index, length)
    },
    [SET_NEXT_PLAY_MUSIC](state, nextPlayMusic) {
        state.nextPlayMusic = nextPlayMusic;
    }
};
export default {
    state,
    actions,
    mutations,
    getters
};