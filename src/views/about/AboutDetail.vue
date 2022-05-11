<template>
    <div class="about">
        <div ref="content">
            <p style="text-align: center" v-show="list.length">
                <button id="aa">加载更多</button>
            </p>
            <div class="item"  v-for="item in list">
                <div class="wa">
                    <div class="left">
                        <img @click="show(item.custom.ext.identity.headUrl)" v-if="item.custom.ext && item.custom.ext.identity && item.custom.ext.identity.headUrl" :src="item.custom.ext.identity.headUrl" alt="">
                        <img v-else src="img/eastPhoto@2x.png" alt="">
                    </div>
                    <div class="right">
                        <p class="name" :class="{ tip : item.from === teacher || admin.indexOf(item.from) !== -1 }">
                            {{ item.fromNick }}
                            <span class="teacher" v-show="item.from === teacher">讲师</span>
                            <span>{{new Date(item.time).toLocaleString()}}</span>
                        </p>
                        <!--正常发言-->
                        <p v-if="item.type == 'text'" class="text" :class="{ tipBack : item.fromNick === '顶底之王' || admin.indexOf(item.from) !== -1 }">
                            {{item.text}}
                        </p>
                        <!--被删发言-->
                        <p v-if="item.type == 'custom'" class="text yellow">
                            被删：{{ item.custom.ext.deleteMsg.test }}
                        </p>
                        <p v-if="item.type=='image'" class="text">
                            <img :src="item.file.url" alt="" @click="show(item.file.url)">
                        </p>
                        <!--回复-->
                        <div>
                            <p class="reply"  v-if="item.custom.ext && item.custom.ext.identity && item.custom.ext.identity.identityType == 5">
                                {{ item.custom.ext.identity.replyContent }}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <p style="padding-bottom: 100px"></p>
<!--            <input type="text" v-model="renderBy">-->
<!--            <button @click="co">确认</button>-->
        </div>


        <van-image-preview
            closeable
            v-model="imgShow"
            :images="imageList"
            :start-position="startPosition"
        >
        </van-image-preview>
    </div>
</template>

<script>
import {ImagePreview} from 'vant';
export default {
    name: 'AboutDetail',
    components: {
        [ImagePreview.Component.name]: ImagePreview.Component,
    },
    data() {
        return{
            renderBy: '',
            list: [],
            teacher: 'prod_l809_bhdoyw',
            // 唛斯基、大弟子、
            admin: ['prod_u966198_9q2tk2', 'prod_s145_oan1nj'],
            //图片预览
            imgShow: false,
            imageList: [],
            startPosition: 0,
        }
    },
    methods: {
        show(url) {
            this.imageList.length = 0
            this.imageList.push(url)
            this.imgShow = true
        },
        co() {
            // this.renderBy =
        }
    },
    mounted() {
        let this_ = this
        var data = {};
        this_.Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        });
        var nim = SDK.NIM.getInstance({
            // 初始化SDK
            // debug: true
            appKey: 'ea2ee5fe8c9f29543746b34ca4844d29',
            account: 'prod_u974278_ylezmw',
            token: '9e33cd176198a22026df726dd6fa1995',
            // customTag: 'TV',
            onconnect: onConnect,
            onerror: onError,
            onwillreconnect: onWillReconnect,
            ondisconnect: onDisconnect,
            // 多端登录
            onloginportschange: onLoginPortsChange,
            // 用户关系
            onblacklist: onBlacklist,
            onsyncmarkinblacklist: onMarkInBlacklist,
            onmutelist: onMutelist,
            onsyncmarkinmutelist: onMarkInMutelist,
            // 好友关系
            onfriends: onFriends,
            onsyncfriendaction: onSyncFriendAction,
            // 用户名片
            onmyinfo: onMyInfo,
            onupdatemyinfo: onUpdateMyInfo,
            onusers: onUsers,
            onupdateuser: onUpdateUser,
            // 群组
            onteams: onTeams,
            onsynccreateteam: onCreateTeam,
            onUpdateTeam: onUpdateTeam,
            onteammembers: onTeamMembers,
            // onsyncteammembersdone: onSyncTeamMembersDone,
            onupdateteammember: onUpdateTeamMember,
            // 群消息业务已读通知
            onTeamMsgReceipt: onTeamMsgReceipt,
            // 会话
            onsessions: onSessions,
            onupdatesession: onUpdateSession,
            // 消息
            onroamingmsgs: onRoamingMsgs,
            onofflinemsgs: onOfflineMsgs,
            onmsg: onMsg,
            // 系统通知
            onofflinesysmsgs: onOfflineSysMsgs,
            onsysmsg: onSysMsg,
            onupdatesysmsg: onUpdateSysMsg,
            onsysmsgunread: onSysMsgUnread,
            onupdatesysmsgunread: onUpdateSysMsgUnread,
            onofflinecustomsysmsgs: onOfflineCustomSysMsgs,
            oncustomsysmsg: onCustomSysMsg,
            // 收到广播消息
            onbroadcastmsg: onBroadcastMsg,
            onbroadcastmsgs: onBroadcastMsgs,
            // 同步完成
            onsyncdone: onSyncDone
        });

        function onConnect() {
            console.log('连接成功');
            // 获取聊天室地址
            nim.getChatroomAddress({
                chatroomId: '650118464',
                done: getChatroomAddressDone
            });
            function getChatroomAddressDone(error, obj) {
                console.log('获取聊天室地址' + (!error?'成功':'失败'), error, obj);
                // 初始化聊天室
                var chatroom = SDK.Chatroom.getInstance({
                    appKey: 'ea2ee5fe8c9f29543746b34ca4844d29',
                    account: 'prod_u974278_ylezmw',
                    token: '9e33cd176198a22026df726dd6fa1995',
                    chatroomId: '650118464',
                    chatroomAddresses: obj.address,
                    onconnect: onChatroomConnect,
                    onerror: onChatroomError,
                    onwillreconnect: onChatroomWillReconnect,
                    ondisconnect: onChatroomDisconnect,
                    // 消息
                    onmsgs: onChatroomMsgs
                });
                function onChatroomConnect(obj) {
                    console.log('进入聊天室', obj);
                    // 获取历史信息
                    chatroom.getHistoryMsgs({
                        timetag: Date.parse(new Date()),
                        // limit: 100,
                        msgTypes: ['text', 'image', 'audio','video', 'file', 'geo', 'tip', 'notification', 'custom'],
                        reverse: false,
                        done: (error, obj) => {
                            console.log('获取聊天室历史' + (!error?'成功':'失败'), error, obj.msgs);
                            this_.Toast.clear()
                            let html = ''
                            obj.msgs.reverse()
                            obj.msgs.forEach(it => {
                                it.custom = it.custom ? JSON.parse(it.custom) : ''
                                // if(!it.custom.ext.identity) {
                                //     it.custom.ext.identity = {
                                //         identityType: '',
                                //         replyContent: ''
                                //     }
                                // }
                            })
                            this_.list = obj.msgs
                            this_.$nextTick(() => {
                                window.scrollTo(0,this_.$refs.content.scrollHeight)
                            })
                        }
                    })



                    //获取聊天室成员信息
                    chatroom.getChatroomMembers({
                        guest: true,
                        limit: 99999,
                        done: (error, obj) => {
                            console.log('获取聊天室成员' + (!error ? '成功' : '失败'), error, obj.members);
                            // prevNum = obj.members.length
                        }
                    });
                    // 往上查询更多  // https://doc.yunxin.163.com/docs/TM5MzM5Njk/jgyODc1NDk?platformId=60179#%E8%8E%B7%E5%8F%96%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%8E%86%E5%8F%B2%E6%B6%88%E6%81%AF
                    document.getElementById('aa').addEventListener('click', function (){
                        this_.Toast.loading({
                            message: '加载中...',
                            forbidClick: true,
                            duration: 0
                        });
                        chatroom.getHistoryMsgs({
                            timetag: this_.list[0].time,
                            limit: 100,
                            msgTypes: ['text', 'image', 'audio','video', 'file', 'geo', 'tip', 'notification', 'custom'],
                            done: (error, obj) => {
                                console.log('获取聊天室历史' + (!error?'成功':'失败'), error, obj.msgs);
                                this_.Toast.clear()
                                obj.msgs.reverse()
                                obj.msgs.forEach(it => {
                                    it.custom = it.custom ? JSON.parse(it.custom) : ''
                                    // if(!it.custom.ext.identity) {
                                    //     it.custom.ext.identity = {
                                    //         identityType: '',
                                    //         replyContent: ''
                                    //     }
                                    // }
                                })
                                this_.list = obj.msgs.concat(this_.list)
                            }
                        })
                    })
                }
                function onChatroomMsgs(msgs) {
                    console.log('收到聊天室消息', msgs[0]);
                    msgs[0].custom = msgs[0].custom ? JSON.parse(msgs[0].custom) : ''
                    // if(!msgs[0].custom.ext.identity) {
                    //     msgs[0].custom.ext.identity = {
                    //         identityType: '',
                    //         replyContent: ''
                    //     }
                    // }
                    this_.list.push(msgs[0])
                    // this_.$nextTick(() => {
                    //     window.scrollTo(0,this_.$refs.content.scrollHeight)
                    // })
                }
                function onChatroomWillReconnect(obj) {
                    // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
                    console.log('即将重连', obj);
                }
                function onChatroomDisconnect(error) {
                    // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
                    console.log('连接断开', error);
                    if (error) {
                        switch (error.code) {
                            // 账号或者密码错误, 请跳转到登录页面并提示错误
                            case 302:
                                break;
                            // 被踢, 请提示错误后跳转到登录页面
                            case 'kicked':
                                break;
                            default:
                                break;
                        }
                    }
                }
                function onChatroomError(error, obj) {
                    console.log('发生错误', error, obj);
                }

            }
        }
        function onWillReconnect(obj) {
            // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
            console.log('即将重连');
            console.log(obj.retryCount);
            console.log(obj.duration);
        }
        function onDisconnect(error) {
            // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
            console.log('丢失连接');
            console.log(error);
            if (error) {
                switch (error.code) {
                    // 账号或者密码错误, 请跳转到登录页面并提示错误
                    case 302:
                        break;
                    // 被踢, 请提示错误后跳转到登录页面
                    case 'kicked':
                        break;
                    default:
                        break;
                }
            }
        }
        function onError(error) {
            console.log(error);
        }

        function onLoginPortsChange(loginPorts) {
            console.log('当前登录帐号在其它端的状态发生改变了', loginPorts);
        }

        function onBlacklist(blacklist) {
            console.log('收到黑名单', blacklist);
            data.blacklist = nim.mergeRelations(data.blacklist, blacklist);
            data.blacklist = nim.cutRelations(data.blacklist, blacklist.invalid);
            refreshBlacklistUI();
        }
        function onMarkInBlacklist(obj) {
            console.log(obj);
            console.log(obj.account + '被你在其它端' + (obj.isAdd ? '加入' : '移除') + '黑名单');
            if (obj.isAdd) {
                addToBlacklist(obj);
            } else {
                removeFromBlacklist(obj);
            }
        }
        function addToBlacklist(obj) {
            data.blacklist = nim.mergeRelations(data.blacklist, obj.record);
            refreshBlacklistUI();
        }
        function removeFromBlacklist(obj) {
            data.blacklist = nim.cutRelations(data.blacklist, obj.record);
            refreshBlacklistUI();
        }
        function refreshBlacklistUI() {
            // 刷新界面
        }
        function onMutelist(mutelist) {
            console.log('收到静音列表', mutelist);
            data.mutelist = nim.mergeRelations(data.mutelist, mutelist);
            data.mutelist = nim.cutRelations(data.mutelist, mutelist.invalid);
            refreshMutelistUI();
        }
        function onMarkInMutelist(obj) {
            console.log(obj);
            console.log(obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '静音列表');
            if (obj.isAdd) {
                addToMutelist(obj);
            } else {
                removeFromMutelist(obj);
            }
        }
        function addToMutelist(obj) {
            data.mutelist = nim.mergeRelations(data.mutelist, obj.record);
            refreshMutelistUI();
        }
        function removeFromMutelist(obj) {
            data.mutelist = nim.cutRelations(data.mutelist, obj.record);
            refreshMutelistUI();
        }
        function refreshMutelistUI() {
            // 刷新界面
        }

        function onFriends(friends) {
            console.log('收到好友列表', friends);
            data.friends = nim.mergeFriends(data.friends, friends);
            data.friends = nim.cutFriends(data.friends, friends.invalid);
            refreshFriendsUI();
        }
        function onSyncFriendAction(obj) {
            console.log(obj);
            switch (obj.type) {
                case 'addFriend':
                    console.log('你在其它端直接加了一个好友' + obj.account + ', 附言' + obj.ps);
                    onAddFriend(obj.friend);
                    break;
                case 'applyFriend':
                    console.log('你在其它端申请加了一个好友' + obj.account + ', 附言' + obj.ps);
                    break;
                case 'passFriendApply':
                    console.log('你在其它端通过了一个好友申请' + obj.account + ', 附言' + obj.ps);
                    onAddFriend(obj.friend);
                    break;
                case 'rejectFriendApply':
                    console.log('你在其它端拒绝了一个好友申请' + obj.account + ', 附言' + obj.ps);
                    break;
                case 'deleteFriend':
                    console.log('你在其它端删了一个好友' + obj.account);
                    onDeleteFriend(obj.account);
                    break;
                case 'updateFriend':
                    console.log('你在其它端更新了一个好友', obj.friend);
                    onUpdateFriend(obj.friend);
                    break;
            }
        }
        function onAddFriend(friend) {
            data.friends = nim.mergeFriends(data.friends, friend);
            refreshFriendsUI();
        }
        function onDeleteFriend(account) {
            data.friends = nim.cutFriendsByAccounts(data.friends, account);
            refreshFriendsUI();
        }
        function onUpdateFriend(friend) {
            data.friends = nim.mergeFriends(data.friends, friend);
            refreshFriendsUI();
        }
        function refreshFriendsUI() {
            // 刷新界面
        }

        function onMyInfo(user) {
            console.log('收到我的名片', user);
            data.myInfo = user;
            updateMyInfoUI();
        }
        function onUpdateMyInfo(user) {
            console.log('我的名片更新了', user);
            data.myInfo = NIM.util.merge(data.myInfo, user);
            updateMyInfoUI();
        }
        function updateMyInfoUI() {
            // 刷新界面
        }
        function onUsers(users) {
            console.log('收到用户名片列表', users);
            data.users = nim.mergeUsers(data.users, users);
        }
        function onUpdateUser(user) {
            console.log('用户名片更新了', user);
            data.users = nim.mergeUsers(data.users, user);
        }
        function onTeams(teams) {
            console.log('群列表', teams);
            data.teams = nim.mergeTeams(data.teams, teams);
            onInvalidTeams(teams.invalid);
        }
        function onInvalidTeams(teams) {
            data.teams = nim.cutTeams(data.teams, teams);
            data.invalidTeams = nim.mergeTeams(data.invalidTeams, teams);
            refreshTeamsUI();
        }
        function onCreateTeam(team) {
            console.log('你创建了一个群', team);
            data.teams = nim.mergeTeams(data.teams, team);
            refreshTeamsUI();
            onTeamMembers({
                teamId: team.teamId,
                members: owner
            });
        }
        function refreshTeamsUI() {
            // 刷新界面
        }
        function onTeamMembers(teamId, members) {
            console.log('群id', teamId, '群成员', members);
            var teamId = obj.teamId;
            var members = obj.members;
            data.teamMembers = data.teamMembers || {};
            data.teamMembers[teamId] = nim.mergeTeamMembers(data.teamMembers[teamId], members);
            data.teamMembers[teamId] = nim.cutTeamMembers(data.teamMembers[teamId], members.invalid);
            refreshTeamMembersUI();
        }
        // function onSyncTeamMembersDone() {
        //     console.log('同步群列表完成');
        // }
        function onUpdateTeam (team) {
            console.log('群状态更新', team)
        }
        function onUpdateTeamMember(teamMember) {
            console.log('群成员信息更新了', teamMember);
            onTeamMembers({
                teamId: teamMember.teamId,
                members: teamMember
            });
        }
        function refreshTeamMembersUI() {
            // 刷新界面
        }
        function onTeamMsgReceipt (teamMsgReceipts) {
            console.log('群消息已读通知', teamMsgReceipts)
        }

        function onSessions(sessions) {
            console.log('收到会话列表', sessions);
            data.sessions = nim.mergeSessions(data.sessions, sessions);
            updateSessionsUI();
        }
        function onUpdateSession(session) {
            console.log('会话更新了', session);
            data.sessions = nim.mergeSessions(data.sessions, session);
            updateSessionsUI();
        }
        function updateSessionsUI() {
            // 刷新界面
        }

        function onRoamingMsgs(obj) {
            console.log('漫游消息', obj);
            pushMsg(obj.msgs);
        }
        function onOfflineMsgs(obj) {
            console.log('离线消息', obj);
            pushMsg(obj.msgs);
        }
        function onMsg(msg) {
            console.log('收到消息', msg.scene, msg.type, msg);
            pushMsg(msg);
        }
        function onBroadcastMsg(msg) {
            console.log('收到广播消息', msg);
        }
        function onBroadcastMsgs(msgs) {
            console.log('收到广播消息列表', msgs);
        }
        function pushMsg(msgs) {
            if (!Array.isArray(msgs)) { msgs = [msgs]; }
            var sessionId = msgs[0].sessionId;
            data.msgs = data.msgs || {};
            data.msgs[sessionId] = nim.mergeMsgs(data.msgs[sessionId], msgs);
        }

        function onOfflineSysMsgs(sysMsgs) {
            console.log('收到离线系统通知', sysMsgs);
            pushSysMsgs(sysMsgs);
        }
        function onSysMsg(sysMsg) {
            console.log('收到系统通知', sysMsg)
            pushSysMsgs(sysMsg);
        }
        function onUpdateSysMsg(sysMsg) {
            pushSysMsgs(sysMsg);
        }
        function pushSysMsgs(sysMsgs) {
            data.sysMsgs = nim.mergeSysMsgs(data.sysMsgs, sysMsgs);
            refreshSysMsgsUI();
        }
        function onSysMsgUnread(obj) {
            console.log('收到系统通知未读数', obj);
            data.sysMsgUnread = obj;
            refreshSysMsgsUI();
        }
        function onUpdateSysMsgUnread(obj) {
            console.log('系统通知未读数更新了', obj);
            data.sysMsgUnread = obj;
            refreshSysMsgsUI();
        }
        function refreshSysMsgsUI() {
            // 刷新界面
        }
        function onOfflineCustomSysMsgs(sysMsgs) {
            console.log('收到离线自定义系统通知', sysMsgs);
        }
        function onCustomSysMsg(sysMsg) {
            console.log('收到自定义系统通知', sysMsg);
        }

        function onSyncDone() {
            console.log('同步完成');
        }
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/assets/scss/base';
.about{
    padding: 10px;
    background-color: #F3F3F3;
}
.item {
    .wa{
        overflow: hidden;
        padding-bottom: 16px;
        .left{
            float: left;
            width: 30px;
            img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
        }
        .right{
            box-sizing: border-box;
            padding-left: 5px;
            float: left;
            width: 320px;
            .name{
                color: #333333;
                font-size: 12px;
                .teacher{
                    display: inline-block;
                    background-color: #5e89ef;
                    color: #ffffff;
                    font-size: 8px;
                }
                span{
                    font-size: 10px;
                }
            }
            .tip{
                color: red;
            }
            .text{
                color: #010101;
                border-radius: 4px;
                padding: 5px;
                margin-top: 5px;
                font-size: 14px;
                background-color: #ffffff;
                line-height: 18px;
                img{
                    max-width: 150px;
                }
            }
            .yellow{
                background-color: lightyellow;
                text-decoration:line-through
            }
            .reply{
                display: block;
                font-size: 12px;
                background-color: #E3E1E2;
                color: #5D5D5D;
                margin: 3px 0;
                padding: 5px;
            }
            .tipBack{
                background-color: #F3CABC;
            }

        }
    }

}

</style>
