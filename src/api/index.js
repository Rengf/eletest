//调用数据接口
import ajax from "./ajax";
const BASE_URL = "http://localhost:3000";
const USER_API = "/api";

//歌单列表
export const reqSheetList = () =>
    ajax(BASE_URL + "/playlist/hot", {
        limit: 30,
        order: 'hot',
        cat: '经典'
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