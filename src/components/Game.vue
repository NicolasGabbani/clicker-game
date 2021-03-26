<template>
  <div id="game-content">
    <Bonus
      @inc="increment"
      :top="bonusTop"
      :left="bonusLeft"
      :interval="bonusDisplayedTimer"
      v-if="haveBonus"
    />
    <div class="game">
      <div class="col centered text-center">
        <div>
          <ClickButton @inc="increment" />
          <Score :currency="display_currency" :cps="display_cps" :total="display_total" />
        </div>
      </div>
      <div class="col">
        <div class="btn-options-container">
          <button class="btn-options" @click.prevent="openOptions">options</button>
        </div>
        <div class="centered">
          <div class="options-content" v-show="optionsOpen">
            <Menu @reset="reset" @save="save" />
            <Success :success="display_success" />
          </div>
          <Builds @buy="buy" :builds="display_builds" :total="this.user.total" v-show="!optionsOpen" />
        </div>
      </div>
    </div>
    <div class="saved" :class="{ onsave: onsave }">jeu sauvegardé</div>
    <HaveSuccess v-if="haveSuccess" :success="currentSuccess" />
  </div>
</template>

<script>
import ClickButton from "@/components/ClickButton.vue";
import Menu from "@/components/Menu.vue";
import Score from "@/components/Score.vue";
import Builds from "@/components/Builds.vue";
import Success from "@/components/Success.vue";
import Bonus from "@/components/Bonus.vue";
import HaveSuccess from "@/components/HaveSuccess.vue";
export default {
  name: "Game",
  components: {
    ClickButton,
    Menu,
    Score,
    Builds,
    Success,
    Bonus,
    HaveSuccess
  },
  props: {
    user: Object,
    builds: String,
    success: String,
  },
  data() {
    return {
      display_total: numeral(this.user.total).format("0,0"),
      display_currency: numeral(this.user.currency).format("0,0"),
      display_cps: numeral(this.user.cps).format("0,0.0"),
      display_builds: JSON.parse(this.builds),
      display_success: JSON.parse(this.success),
      onsave: false,
      onsaveTimer: 60000,
      optionsOpen: false,
      haveSuccess: false,
      currentSuccess: '',
      haveBonus: false,
      bonusMinInterval: 1000,
      bonusMaxInterval: 5000,
      intervalBonus: Math.floor(
        Math.random() * (this.bonusMaxInterval - this.bonusMinInterval + 1) +
          this.bonusMinInterval
      ),
      bonusTop: `${Math.floor(Math.random() * 99)}%`,
      bonusLeft: `${Math.floor(Math.random() * 99)}%`,
      bonusDisplayedTimer: 5000,
    };
  },
  methods: {
    randomBonusInit() {
      this.$randomBonus = setTimeout(() => {
        this.intervalBonus = Math.floor(
          Math.random() * (this.bonusMaxInterval - this.bonusMinInterval + 1) +
            this.bonusMinInterval
        );
        (this.bonusTop = `${Math.floor(Math.random() * 99)}%`),
        (this.bonusLeft = `${Math.floor(Math.random() * 99)}%`);
        this.haveBonus = true;
        this.$bonusTimer = setTimeout(() => {
          clearTimeout(this.$randomBonus);
          this.haveBonus = false;
          this.randomBonusInit();
        }, this.bonusDisplayedTimer);
      }, this.intervalBonus);
    },
    increment(inc = 1, number = 1, el = null) {
      if (
        el == "bonus" &&
        !this.display_success.filter((succ) => succ.id === "oneBonus")[0].done
      ) {
        this.displaySuccess(this.display_success.filter((succ) => succ.id === "oneBonus")[0])
      }
      if (
        el == "button" &&
        !this.display_success.filter((succ) => succ.id === "oneClicked")[0].done
      ) {
        this.displaySuccess(this.display_success.filter((succ) => succ.id === "oneClicked")[0])
      }
      this.user.currency = this.user.currency + inc * number;
      this.user.total = this.user.total + inc * number;
      this.display_currency = numeral(this.user.currency).format("0,0")
      this.display_total = numeral(this.user.total).format("0,0")
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
        this.displaySuccess(this.display_success.filter(
          (succ) => succ.buildName === build.name && succ.id == "haveOne"
        )[0]);
      }

      this.user.cps = 0;
      for (let index in this.display_builds) {
        this.user.cps +=
          this.display_builds[index].number * this.display_builds[index].inc;
      }
      this.display_cps = numeral(this.user.cps).format("0,0.0");

      build.price *= 2;
    },

    save() {
      this.$cookies.set("user", this.user, -1);
      this.$cookies.set("builds", JSON.stringify(this.display_builds), -1);
      this.$cookies.set("success", JSON.stringify(this.display_success), -1);
      this.onsave = true;
    },
    reset() {
      this.$cookies.remove("user");
      this.$cookies.remove("builds");
      this.$cookies.remove("success");
      window.location.reload();
    },
    openOptions() {
      this.optionsOpen = !this.optionsOpen;
    },
    displaySuccess(succ) {
      this.currentSuccess = succ.name
      succ.done = true
      this.haveSuccess = true
    }
  },
  mounted() {
    this.randomBonusInit();
    this.$timer = setInterval(() => {
      for (let index in this.display_builds) {
        this.display_builds[index].buyable =
          this.user.currency >= this.display_builds[index].price;
      }

      this.increment(this.user.cps / 10);
      document.title = `${this.display_currency} ⭐️ - Super Licorne Clicker`;
    }, 100);

    this.$timer2 = setInterval(() => {
      this.save();
    }, this.onsaveTimer);
  },
  unmounted() {
    clearInterval(this.$timer);
    clearInterval(this.$timer2);
    clearInterval(this.$timer3);
    clearTimeout(this.$randomBonus);
  },

  watch: {
    onsave: function (val) {
      if (val) {
        setTimeout(() => {
          this.onsave = false;
        }, 1000);
      }
    },
    haveSuccess: function (val) {
      if (val) {
        setTimeout(() => {
          this.haveSuccess = false;
        }, 2000);
      }
    },
  },
};
</script>
