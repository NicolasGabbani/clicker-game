<template>
  <div>
    <div class="game">
      <div class="col centered text-center">
        <div>
          <ClickButton @inc="increment" />
          <Score :currency="display_currency" :tps="display_tps" />
        </div>
      </div>
      <div class="col">
        <div class="btn-options-container"><button class="btn-options" @click.prevent="openOptions">options</button></div>
        <div class="centered">
          <div class="options-content" v-show="optionsOpen">
            <Menu @reset="reset" @save="save" />
            <Success :success="display_success" />
          </div>
          <Builds @buy="buy" :builds="display_builds" v-show="!optionsOpen" />
        </div>
      </div>
      
    </div>
    <div class="saved" :class="{ onsave: onsave }">jeu sauvegardé</div>
  </div>
</template>

<script>
import ClickButton from "@/components/ClickButton.vue";
import Menu from "@/components/Menu.vue";
import Score from "@/components/Score.vue";
import Builds from "@/components/Builds.vue";
import Success from "@/components/Success.vue";
export default {
  name: "Game",
  components: {
    ClickButton,
    Menu,
    Score,
    Builds,
    Success,
  },
  props: {
    user: Object,
    builds: String,
    success: String,
  },
  data() {
    return {
      display_currency: numeral(this.user.currency).format("0,0"),
      display_tps: numeral(this.user.tps).format("0,0.0"),
      display_builds: JSON.parse(this.builds),
      display_success: JSON.parse(this.success),
      onsave: false,
      onsaveTimer: 60000,
      optionsOpen: false
    };
  },
  methods: {
    increment(inc = 1, number = 1) {
      if (this.user.currency == 1) {
        this.display_success.filter((succ) => succ.id === "oneClicked")[0].done = true;
      }
      this.user.currency = this.user.currency + inc * number;
      return (this.display_currency = numeral(this.user.currency).format("0,0"));
    },

    buy(build) {
      this.user.currency = this.user.currency - build.price;
      this.display_currency = numeral(this.user.currency).format("0,0");

      build.number += 1;

      if (
        this.display_success.filter(
          (succ) => succ.buildName === build.name && succ.id == "haveOne"
        ).length
      ) {
        this.display_success.filter(
          (succ) => succ.buildName === build.name && succ.id == "haveOne"
        )[0].done = true;
      }

      this.user.tps = 0;
      for (let index in this.display_builds) {
        this.user.tps +=
          this.display_builds[index].number * this.display_builds[index].inc;
      }
      this.display_tps = numeral(this.user.tps).format("0,0.0");

      build.price *= 2;
    },

    save() {
      this.$cookies.set("user", this.user, -1);
      this.$cookies.set("builds", JSON.stringify(this.display_builds), -1);
      this.$cookies.set("success", JSON.stringify(this.display_success), -1);
      this.onsave = true;
    },
    reset() {
      console.log("game reset");
      this.$cookies.remove("user");
      this.$cookies.remove("builds");
      this.$cookies.remove("success");
      window.location.reload();
    },
    openOptions() {
      this.optionsOpen = !this.optionsOpen
    }
  },
  mounted() {
    this.$timer = setInterval(() => {
      for (let index in this.display_builds) {
        this.display_builds[index].buyable = this.user.currency >= this.display_builds[index].price;
      }

      this.increment(this.user.tps / 10);
      document.title = this.display_currency;
    }, 100);

    this.$timer2 = setInterval(() => {
      this.save();
    }, this.onsaveTimer);
  },
  unmounted() {
    clearInterval(this.$timer);
    clearInterval(this.$timer2);
    clearInterval(this.$timer3);
  },

  watch: {
    onsave: function (val) {
      if (val) {
        setTimeout(() => {
          this.onsave = false;
        }, 1000);
      }
    },
  },
};
</script>
