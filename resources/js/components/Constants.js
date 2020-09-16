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
    posts: 'posts',
    sendPost: 'posts/store',
    deletePost: 'posts/delete',
    //followers
    followers: 'followers',
    followings: 'followings',
    follow: 'follow',
    unfollow: 'unfollow',
};
export default Constants;
