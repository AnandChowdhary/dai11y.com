<template>
  <main>
    <div class="container">
      <Loading v-if="loading" :message="loading" />
      <div v-else class="card card--type-padded">
        <div class="row">
          <h1>Audit</h1>
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
        <div v-if="audit">
          {{ audit }}
        </div>
        <div v-else>
          <LargeMessage
            heading="No audit yet"
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
import { emptyPagination, Audit } from "@/types/manage";
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
  audit!: Audit;
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
    this.loading = "Loading your audit";
    this.$store
      .dispatch("manage/getAudit", {
        team: this.$route.params.team,
        id: this.$route.params.id,
        auditId: this.$route.params.auditId
      })
      .then(audit => {
        this.audit = { ...audit };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loading = ""));
  }
}
</script>

<style lang="scss" scoped></style>
