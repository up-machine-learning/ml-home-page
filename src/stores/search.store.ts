/* eslint-disable no-unused-vars */
import { ISuggestion } from "@/models/interface/suggestion.interface";
import { https } from "@/utils/axios.helpter";
import { defineStore } from "pinia";

/**
 * When Using this store you should cut this file to store folder
 * Don't forget remove this store folder after cuted
 */

export const useSearchStore = defineStore({
  id: "searchResultId",
  state: () => ({
    _data: [],
  }),
  getters: {
    getAll: (state): ISuggestion[] => state._data,
  },
  actions: {
    async findAll(body: any, query?: any) {
      const result = await https
        .post("api/trip/suggestion", body, {
          params: query,
        })
        .then((res) => res.data);
      this._data = result;
      return result;
    },

    async findDestination(params: any) {
      const result = await https
        .get("api/trip/destinations", {
          params,
        })
        .then((res) => res.data);
      return result;
    },
  },
});
