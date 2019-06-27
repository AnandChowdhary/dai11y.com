<template>
  <main>
    <Loading v-if="loading" :message="loading" />
    <div v-else>
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
      <LargeMessage
        v-if="
          !loading &&
            (!auditWebpages ||
              !auditWebpages.data ||
              !auditWebpages.data.length)
        "
        heading="No audits yet"
        img="undraw_software_engineer_lvl5.svg"
        text="Create an audit below"
      />
      <div
        v-else-if="
          auditWebpages && auditWebpages.data && auditWebpages.data.length
        "
      >
        <table class="table">
          <thead>
            <tr>
              <th>URL</th>
              <th>Repeats</th>
              <th>Last audit</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(auditWebpage, index) in auditWebpages.data"
              :key="`${auditWebpage.id}_${index}`"
            >
              <td>{{ auditWebpage.url }}</td>
              <td>{{ repeatEvery[auditWebpage.repeatEvery] }}</td>
              <td><TimeAgo :date="auditWebpage.lastAuditAt" /></td>
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
                <router-link
                  :to="
                    `/manage/${$route.params.team}/audit-webpages/${auditWebpage.id}`
                  "
                  aria-label="Edit"
                  data-balloon-pos="up"
                  class="button button--type-icon"
                >
                  <font-awesome-icon
                    class="icon"
                    icon="pencil-alt"
                    fixed-width
                  />
                </router-link>
                <button
                  aria-label="Delete"
                  data-balloon-pos="up"
                  class="button button--type-icon button--color-danger"
                  @click="() => (showDelete = auditWebpage)"
                >
                  <font-awesome-icon class="icon" icon="trash" fixed-width />
                </button>
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
      <h2>Create audit</h2>
      <p>
        You can use audits to programmatically access Dai11y in your
        applications.
      </p>
      <form @submit.prevent="createAuditWebpage">
        <Input
          type="url"
          :value="newAuditWebpageUrl"
          label="URL"
          placeholder="Enter new audit webpage's URL"
          required
          @input="val => (newAuditWebpageUrl = val)"
        />
        <Select
          :value="newAuditWebpageRepeat"
          label="Repeat"
          placeholder="Select how often to audit"
          :options="repeatEvery"
          @input="val => (newAuditWebpageRepeat = val)"
        />
        <button class="button">Create audit</button>
      </form>
    </div>
    <transition name="modal">
      <Confirm v-if="showDelete" :on-close="() => (showDelete = null)">
        <h2>Are you sure you want to delete this audit?</h2>
        <p>
          Deleting an audit is not reversible, and you'll need to update any
          apps using this key.
        </p>
        <button
          class="button button--color-danger button--state-cta"
          @click="deleteAuditWebpage(showDelete.id)"
        >
          Yes, delete audit
        </button>
        <button type="button" class="button" @click="showDelete = null">
          No, don't delete
        </button>
      </Confirm>
    </transition>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { getAllCountries } from "countries-and-timezones";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPencilAlt,
  faArrowDown,
  faSync,
  faTrash,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading.vue";
import Confirm from "@/components/Confirm.vue";
import TimeAgo from "@/components/TimeAgo.vue";
import LargeMessage from "@/components/LargeMessage.vue";
import CheckList from "@/components/form/CheckList.vue";
import Input from "@/components/form/Input.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import Select from "@/components/form/Select.vue";
import { User } from "@/types/auth";
import { AuditWebpages, emptyPagination, AuditWebpage } from "@/types/manage";
library.add(faPencilAlt, faArrowDown, faSync, faTrash, faEye);

@Component({
  components: {
    Loading,
    Confirm,
    CheckList,
    TimeAgo,
    Input,
    FontAwesomeIcon,
    Select,
    LargeMessage,
    Checkbox
  },
  middleware: "auth"
})
export default class ManageSettings extends Vue {
  auditWebpages: AuditWebpages = emptyPagination;
  showDelete: AuditWebpage | null = null;
  loadingMore = false;
  loading = "";
  newAuditWebpageUrl = "";
  newAuditWebpageRepeat = 1;
  repeatEvery = {
    0: "Hourly",
    1: "Daily",
    2: "Weekly",
    3: "Monthly"
  };

  private created() {
    this.auditWebpages = {
      ...this.$store.getters["manage/auditWebpages"](this.$route.params.team)
    };
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

  private mounted() {
    this.load();
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

  private createAuditWebpage() {
    this.loading = "Creating your audit";
    this.$store
      .dispatch("manage/createAuditWebpage", {
        team: this.$route.params.team,
        url: this.newAuditWebpageUrl,
        repeatEvery: this.newAuditWebpageRepeat
      })
      .then(auditWebpages => {
        this.auditWebpages = { ...auditWebpages };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        this.loading = "";
        this.newAuditWebpageUrl = "";
        this.newAuditWebpageRepeat = 1;
      });
  }

  private deleteAuditWebpage(key: string) {
    this.showDelete = null;
    this.loading = "Deleting your audit";
    this.$store
      .dispatch("manage/deleteAuditWebpage", {
        team: this.$route.params.team,
        id: key
      })
      .then(auditWebpages => {
        this.auditWebpages = { ...auditWebpages };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loading = ""));
  }
}
</script>

<style lang="scss" scoped></style>
