//调用数据接口
import ajax from "./ajax";
const BASE_URL = "http://localhost:3000";
const USER_API = "/api";

//歌单列表
export const reqSheetList = () =>
    ajax(BASE_URL + "/top/playlist", {
        limit: 10
    }, "GET");

//歌曲列表
export const reqSheetMusicList = () =>
    ajax(BASE_URL + "/playlist/detail", {
        id: 2778782119
    }, "GET");