import NavBar from "@/components/common/navBar" // 组件
import MusicList from "@/components/musicList/musicList"
export default {
    name: "home",
    components: {
        NavBar,
        MusicList
    },
    data() {
        return {
            isShowList: false,
        }
    },

    created() {
        //
    },

    mounted() {
        //
    },
    methods: {
        showMusicList(showMusicList) {
            this.isShowList = showMusicList;
        }
    },

}