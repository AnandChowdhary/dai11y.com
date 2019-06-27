<template>
  <main>
    <div
      class="container container--size-small container--top-20height container--bottom-20height"
    >
      <router-link
        :to="`/dashboard/${$route.params.team}/audit-webpages`"
        class="card card--type-padded text text--align-center"
      >
        <span>Audits</span>
      </router-link>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Loading from "@/components/Loading.vue";

@Component({
  middleware: "auth",
  components: {
    Loading
  }
})
export default class Dashboard extends Vue {
  private mounted() {}
}
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 10vh 0;
  margin-bottom: 10vh;
  h1 {
    margin: 0 0 2rem 0;
  }
}
.card {
  display: block;
  font-size: 125%;
}
</style>
