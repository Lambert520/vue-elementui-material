import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}
const mutations = {
	handleSsh: (state, d_no) =>{
		state.d_no = d_no
		localStorage.setItem('d_no', d_no)
		console.log(d_no)
	},
    handleUserName: (state, user_name) => {
        state.user_name = user_name
        localStorage.setItem('user_name', user_name)
        console.log(user_name)
    },
	handleUserType: (state, user_type) => {
	    state.user_type = user_type
	    localStorage.setItem('user_type', user_type)
	    console.log(user_type)
	},
	handleUserNo:(state,user_no) => {
		state.user_no = user_no
		localStorage.setItem('user_no', user_no)
		console.log(user_no)
	},
    login:(state,n) => {
        //传入登录状态islogin
        let islogin = JSON.parse(n);
        localStorage.setItem('islogin',JSON.stringify(islogin));
        console.log(islogin);
        state.islogin = islogin;
        }
      
    
}

const state = {
    user_name: '' || localStorage.getItem('user_name'),
	user_type: '' || localStorage.getItem('user_type'),
	user_no: '' || localStorage.getItem('user_no'),
	d_no: '' || localStorage.getItem('d_no'),

    islogin:''
}
const getters = {
    userName: (state) => state.user_name,
	userNType: (state) => state.user_type,
	userNo: (state) => state.user_no,
	dNo: (state) => state.d_no
}

const store = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
export default  store 
