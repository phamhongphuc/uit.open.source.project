/* eslint-disable no-unused-vars */
import { MutationTree, ActionTree } from 'vuex';

export const state = () => ({
    breakpoint: 'md',
});

/** @type {MutationTree} */
export const mutations = {
    setBreakpoint(state, text) {
        state.breakpoint = text;
    },
};

/** @type {ActionTree} **/
export const actions = {
    updateBreakpoint({ state, commit }) {
        const w = window.innerWidth;
        let breakpoint = 'none';
        if (w < 576) breakpoint = 'xs';
        if (w >= 576) breakpoint = 'sm';
        if (w >= 768) breakpoint = 'md';
        if (w >= 992) breakpoint = 'lg';
        if (w >= 1200) breakpoint = 'xl';
        if (state.breakpoint !== breakpoint) {
            commit('setBreakpoint', breakpoint);
        }
    },
};
