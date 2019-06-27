<template>
  <main>
    <div
      class="container container--size-medium container--top-20height container--bottom-20height"
    >
      <Loading v-if="loading" :message="loading" />
      <div v-else class="card card--type-padded">
        <div class="row">
          <h1>Audits</h1>
          <div class="text text--align-right">
            <button
              aria-label="Refresh"
              data-balloon-pos="down"
              class="button button--type-icon"
              @click="load"
            >
              <font-awesome-icon class="icon" icon="sync" fixed-width />
            </button>
          </div>
        </div>
        <div
          v-if="
            auditWebpages && auditWebpages.data && auditWebpages.data.length
          "
        >
          <table class="table">
            <tbody>
              <tr
                v-for="(auditWebpage, index) in auditWebpages.data"
                :key="`${auditWebpage.id}_${index}`"
              >
                <td>{{ auditWebpage.url }}</td>
                <td class="text text--align-right">
                  <router-link
                    :to="
                      `/dashboard/${$route.params.team}/audit-webpages/${auditWebpage.id}`
                    "
                    aria-label="View audits"
                    data-balloon-pos="up"
                    class="button button--type-icon"
                  >
                    <font-awesome-icon class="icon" icon="eye" fixed-width />
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination text text--align-center">
            <button
              v-if="auditWebpages && auditWebpages.hasMore"
              class="button"
              :disabled="loadingMore"
              @click="loadMore"
            >
              <span>Load more audits</span>
              <font-awesome-icon
                v-if="!loadingMore"
                class="icon"
                icon="arrow-down"
              />
              <font-awesome-icon
                v-else
                class="icon icon--ml-2 icon--color-light"
                icon="sync"
                spin
              />
            </button>
          </div>
        </div>
        <div v-else>
          <LargeMessage
            heading="No audits yet"
            img="undraw_mobile_testing_reah.svg"
            text="Create an audit in Settings"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faArrowDown, faSync } from "@fortawesome/free-solid-svg-icons";
import { emptyPagination, AuditWebpages } from "../../../../types/manage";
import LargeMessage from "@/components/LargeMessage.vue";
import Loading from "@/components/Loading.vue";
library.add(faEye, faArrowDown, faSync);

@Component({
  middleware: "auth",
  components: {
    Loading,
    LargeMessage,
    FontAwesomeIcon
  }
})
export default class Dashboard extends Vue {
  loading = "";
  loadingMore = false;
  auditWebpages: AuditWebpages = emptyPagination;
  repeatEvery = {
    0: "Hourly",
    1: "Daily",
    2: "Weekly",
    3: "Monthly"
  };

  private mounted() {
    this.load();
  }
  private load() {
    this.loading = "Loading your audits";
    this.$store
      .dispatch("manage/getAuditWebpages", { team: this.$route.params.team })
      .then(auditWebpages => {
        this.auditWebpages = { ...auditWebpages };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loading = ""));
  }

  private loadMore() {
    this.loadingMore = true;
    this.$store
      .dispatch("manage/getAuditWebpages", {
        team: this.$route.params.team,
        start: this.$store.state.manage.auditWebpages[this.$route.params.team]
          .next
      })
      .then(() => {
        this.auditWebpages = {
          ...this.$store.getters["manage/auditWebpages"](
            this.$route.params.team
          )
        };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loadingMore = false));
  }
}
</script>

<style lang="scss" scoped></style>
