<template>
  <main>
    <div class="container">
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
        <div v-if="audits && audits.data && audits.data.length">
          <table class="table">
            <thead>
              <tr>
                <th>Audited</th>
                <th>Performance</th>
                <th>Accessibility</th>
                <th>Best Practices</th>
                <th>SEO</th>
                <th>PWA</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(audit, index) in audits.data"
                :key="`${audit.id}_${index}`"
              >
                <td><TimeAgo :date="audit.updatedAt" /></td>
                <td>{{ audit.scorePerformance }}</td>
                <td>{{ audit.scoreAccessibility }}</td>
                <td>{{ audit.scoreBestPractices }}</td>
                <td>{{ audit.scoreSeo }}</td>
                <td>{{ audit.scorePwa }}</td>
                <td class="text text--align-right">
                  <router-link
                    :to="
                      `/dashboard/${$route.params.team}/audit-webpages/${$route.params.id}/${audit.id}`
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
              v-if="audits && audits.hasMore"
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
import { emptyPagination, Audits } from "@/types/manage";
import TimeAgo from "@/components/TimeAgo.vue";
import LargeMessage from "@/components/LargeMessage.vue";
import Loading from "@/components/Loading.vue";
library.add(faEye, faArrowDown, faSync);

@Component({
  middleware: "auth",
  components: {
    Loading,
    LargeMessage,
    TimeAgo,
    FontAwesomeIcon
  }
})
export default class Dashboard extends Vue {
  loading = "";
  loadingMore = false;
  audits: Audits = emptyPagination;
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
      .dispatch("manage/getAudits", {
        team: this.$route.params.team,
        id: this.$route.params.id
      })
      .then(audits => {
        this.audits = { ...audits };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loading = ""));
  }

  private loadMore() {
    this.loadingMore = true;
    this.$store
      .dispatch("manage/getAudits", {
        team: this.$route.params.team,
        start: this.$store.state.manage.audits[
          `${this.$route.params.team}${this.$route.params.id}`
        ].next,
        id: this.$route.params.id
      })
      .then(() => {
        this.audits = {
          ...this.$store.getters["manage/audits"](
            this.$route.params.team,
            this.$route.params.id
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
