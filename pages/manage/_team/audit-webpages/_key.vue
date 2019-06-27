<template>
  <main>
    <Loading v-if="loading" :message="loading" />
    <div v-else>
      <div class="row">
        <div>
          <nuxt-link
            :to="`/manage/${$route.params.team}/audit-webpages`"
            aria-label="Back"
            data-balloon-pos="down"
            class="button button--type-icon button--type-back"
          >
            <font-awesome-icon class="icon" icon="arrow-left" fixed-width />
          </nuxt-link>
          <h1>Audit</h1>
        </div>
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
      <form
        v-if="auditWebpage"
        v-meta-ctrl-enter="updateAuditWebpage"
        @submit.prevent="updateAuditWebpage"
      >
        <Input
          type="url"
          :value="auditWebpage.url"
          label="URL"
          placeholder="Enter new audit webpage's URL"
          required
          @input="val => (auditWebpage.url = val)"
        />
        <Select
          :value="auditWebpage.repeatEvery"
          label="Repeat"
          placeholder="Select how often to audit"
          :options="repeatEvery"
          @input="val => (auditWebpage.repeatEvery = val)"
        />
        <button class="button">Update audit</button>
        <button
          type="button"
          class="button button--color-danger"
          style="margin-left: 0.5rem"
          @click.prevent="showDelete = auditWebpage"
        >
          Delete audit
        </button>
      </form>
    </div>
    <transition name="modal">
      <Confirm v-if="showDelete" :on-close="() => (showDelete = false)">
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
        <button type="button" class="button" @click="showDelete = false">
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
  faEye,
  faEyeSlash,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading.vue";
import Confirm from "@/components/Confirm.vue";
import TimeAgo from "@/components/TimeAgo.vue";
import LargeMessage from "@/components/LargeMessage.vue";
import Input from "@/components/form/Input.vue";
import Checkbox from "@/components/form/Checkbox.vue";
import Select from "@/components/form/Select.vue";
import { User } from "@/types/auth";
import { AuditWebpages, emptyPagination, AuditWebpage } from "@/types/manage";
library.add(
  faPencilAlt,
  faArrowDown,
  faSync,
  faTrash,
  faEye,
  faEyeSlash,
  faArrowLeft
);

@Component({
  components: {
    Loading,
    Input,
    Confirm,
    TimeAgo,
    FontAwesomeIcon,
    Select,
    LargeMessage,
    Checkbox
  },
  middleware: "auth"
})
export default class ManageSettings extends Vue {
  auditWebpages: AuditWebpages = emptyPagination;
  showDelete = false;
  loading = "";
  repeatEvery = {
    0: "Hourly",
    1: "Daily",
    2: "Weekly",
    3: "Monthly"
  };
  auditWebpage: AuditWebpage | null = null;

  private created() {
    this.auditWebpages = {
      ...this.$store.getters["manage/auditWebpages"](this.$route.params.team)
    };
  }

  private load() {
    this.loading = "Loading your audits";
    this.$store
      .dispatch("manage/getAuditWebpage", {
        team: this.$route.params.team,
        id: this.$route.params.key
      })
      .then(auditWebpage => {
        this.auditWebpage = { ...auditWebpage };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loading = ""));
  }

  private mounted() {
    this.load();
  }

  private updateAuditWebpage() {
    this.loading = "Updating your audit";
    const key = this.auditWebpage;
    if (key) {
      [
        "auditWebpage",
        "secretKey",
        "organizationId",
        "createdAt",
        "updatedAt",
        "lastAuditAt"
      ].forEach(k => delete key[k]);
    }
    this.$store
      .dispatch("manage/updateAuditWebpage", {
        team: this.$route.params.team,
        id: this.$route.params.key,
        ...key
      })
      .then(auditWebpages => {
        this.auditWebpages = { ...auditWebpages };
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        this.loading = "";
      });
  }

  private deleteAuditWebpage(key: string) {
    this.showDelete = false;
    this.loading = "Deleting your audit";
    this.$store
      .dispatch("manage/deleteAuditWebpage", {
        team: this.$route.params.team,
        id: key
      })
      .then(auditWebpages => {
        this.auditWebpages = { ...auditWebpages };
        this.$router.push(`/manage/${this.$route.params.team}/audit-webpages`);
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => (this.loading = ""));
  }
}
</script>

<style lang="scss" scoped></style>
