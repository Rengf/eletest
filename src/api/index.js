//调用数据接口
import ajax from "./ajax";
const BASE_URL = "http://localhost:3000";
const USER_API = "/api";

//歌单列表
export const reqSheetList = (cat) =>
    ajax(BASE_URL + "/top/playlist", {
        limit: 30,
        order: 'new',
        cat: cat
    }, "GET");

//歌曲列表
export const reqSheetMusicList = (id) =>
    ajax(BASE_URL + "/playlist/detail", {
        id: id
    }, "GET");

//播放歌曲
export const reqPlayMusic = (id) =>
    ajax(BASE_URL + "/song/url", {
        id: id
    }, "GET");

//获取歌单类别
export const reqSheetCategoryList = () => ajax(BASE_URL + "/playlist/catlist", {}, "GET")

//获取歌手列表
export const reqSingerList = (data) => ajax(BASE_URL + "/artist/list", {
    cat: data.cat,
    limit: data.limit,
    offset: data.page
}, "GET")

//获取歌手单曲
export const reqSingerArtists = (id) => ajax(BASE_URL + "/artists", {
    id: id
}, "GET")

//获取歌手mv
export const reqSingerMv = (id) => ajax(BASE_URL + "/artist/mv", {
    id: id
}, "GET")

//播放mv
export const reqPlayVideo = (id) => ajax(BASE_URL + "/mv/url", {
    id: id
}, "GET")