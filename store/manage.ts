import { MutationTree, ActionTree, GetterTree } from "vuex";
import { RootState, Membership, Organization } from "~/types/manage";

export const state = (): RootState => ({});

export const mutations: MutationTree<RootState> = {
  setOrganization(state: RootState, organization: Organization): void {
    state.organization = organization;
  },
  clearAll(state: RootState): void {
    delete state.organization;
    delete state.membership;
  }
};

export const actions: ActionTree<RootState, RootState> = {
  async getOrganization({ commit }, context) {
    const org: Organization = (await this.$axios.get(
      `/organizations/${context}`
    )).data;
    commit("setOrganization", org);
  },
  async updateOrganization({ dispatch, state }, context) {
    if (!state.organization) return;
    await this.$axios.patch(`/organizations/${state.organization.id}`, context);
    return dispatch("getOrganization", state.organization.id);
  }
};

export const getters: GetterTree<RootState, RootState> = {
  membership: state => state.membership
};
