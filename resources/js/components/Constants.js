const Constants = {
    domain: '/api/',
    //auth
    register: 'register',
    login: 'login',
    logout: 'logout',
    //user
    users: 'users',
    updateProfile: 'users/update',
    getUser: 'users/get',
    //messages
    chat: 'chat',
    messages: 'messages',
    sendMessage: 'messages/store',
    deleteMessage: 'messages/delete',
    //posts
    getUserPosts: 'posts/get',
    posts: 'posts',
    sendPost: 'posts/store',
    deletePost: 'posts/delete',
    //followers
    followers: 'followers',
    followings: 'followings',
    follow: 'follow',
    unfollow: 'unfollow',
    followFunction: (e, token, userId) => {
        e.preventDefault();
        return window.axios.post(`${Constants.domain}${Constants.follow}`, {
            userId: userId
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    },
    unfollowFunction: (e, token, userId) => {
        e.preventDefault();
        return window.axios.post(`${Constants.domain}${Constants.unfollow}`, {
            userId: userId
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    }
};
export default Constants;
