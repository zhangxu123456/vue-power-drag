const state = {
    collects:[]
}

const getters = {
    renderCollects(state){
        return state.collects
    }
}

const mutations = {
    pushCollects(state,items){
        state.collects.push(items)
    }
}

const actions = {
    invokePushItems(context,item){ //触发mutations里面的pushCollects ,传入数据形参item 对应到items
        context.commit('pushCollects',item);
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}