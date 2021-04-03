<template>
  <div id="game-content" :class="classConditionBg">
    <Bonus
      @inc="increment"
      @cps="cps"
      :cpsNum="this.user.cps"
      @bonusCpsClicked="bonusCpsClicked"
    />
    <div class="game container">
      <div class="col container-centered-col text-center po-r">
        <Fontain :loaded="loaded" :cps="this.user.cps" />
        <Name :name="this.user.name" @changeName="changeName" />
        <ClickButton
          @inc="increment"
          :cps="this.user.cps"
          :classBg="classConditionBg"
          :haveSuccess="haveSuccess"
          :success="currentSuccess"
          :haveBonusCpsClicked="haveBonusCpsClicked"
        />
        <Score :currency="display_currency" :cps="display_cps" :total="display_total" :totalNum="this.user.total" />
      </div>
      <div class="col">
        <div>
          <div class="options">
            <button
              class="nes-btn"
              :class="{ 'is-success': openSuccess }"
              @click.prevent="openSuccess = !openSuccess"
            >
              succès
            </button>
            <button
              class="nes-btn"
              :class="{ 'is-success': openOptions }"
              @click.prevent="openOptions = !openOptions"
            >
              options
            </button>
          </div>
          <Menu
            @reset="reset"
            @save="save"
            @closeOptions="closeOptions"
            v-show="openOptions"
          />
          <div v-show="openSuccess">
            <Success :success="display_success" :buildsSuccess="display_builds_success" />
          </div>
          <div v-show="!openSuccess">
            <Builds
              @buy="buy"
              :builds="display_builds"
              :total="this.user.total"
              :cps="this.user.cps"
              :currency="this.user.currency"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="saved nes-container is-dark is-rounded is-centered"
      :class="{ onsave: onsave }"
    >
      jeu sauvegardé
    </div>
    <HaveSuccess v-if="haveSuccess" :success="currentSuccess" />
    <Deco />
  </div>
</template>

<script>
import "@/libs/tooltip.js";
import ClickButton from "@/components/ClickButton.vue";
import Menu from "@/components/Menu.vue";
import Score from "@/components/Score.vue";
import Name from "@/components/Name.vue";
import Fontain from "@/components/Fontain.vue";
import Builds from "@/components/Builds.vue";
import Success from "@/components/Success.vue";
import Bonus from "@/components/Bonus.vue";
import HaveSuccess from "@/components/HaveSuccess.vue";
import Deco from "@/components/Deco.vue";
export default {
  name: "Game",
  components: {
    ClickButton,
    Menu,
    Score,
    Name,
    Fontain,
    Builds,
    Success,
    Bonus,
    HaveSuccess,
    Deco,
  },
  props: {
    user: Object,
    builds: String,
    success: String,
    buildsSuccess: String,
    loaded: Boolean,
  },
  data() {
    return {
      display_total: this.renderNumeral(this.user.total),
      display_currency: this.renderNumeral(this.user.currency),
      display_cps: this.renderNumeral(this.user.cps),
      display_builds: JSON.parse(this.builds),
      display_success: JSON.parse(this.success),
      display_builds_success: JSON.parse(this.buildsSuccess),
      onsave: false,
      onsaveTimer: 60000,
      openSuccess: false,
      openOptions: false,
      haveSuccess: false,
      currentSuccess: {},
      haveBonusCpsClicked: false,
    };
  },
  methods: {
    increment(inc = 1, number = 1, el = null) {
      if (
        el == "bonus" &&
        !this.display_success.filter((succ) => succ.id === "oneBonus")[0].done
      ) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.id === "oneBonus")[0]
        );
      }
      if (
        el == "button" &&
        !this.display_success.filter((succ) => succ.id === "oneClicked")[0].done
      ) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.id === "oneClicked")[0]
        );
      }
      this.user.currency = this.user.currency + inc * number;
      this.user.total = this.user.total + inc * number;
      this.display_currency = this.renderNumeral(this.user.currency);
      this.display_total = this.renderNumeral(this.user.total);
    },

    calcCps(multiple = 1) {
      this.user.cps = 0;
      for (let index in this.display_builds) {
        this.user.cps += this.display_builds[index].number * this.display_builds[index].inc
      }
      this.user.cps = this.user.cps * multiple;
      this.display_cps = this.renderNumeral(this.user.cps);
    },

    buy(build) {
      if (this.user.currency < build.price) return;

      this.user.currency = this.user.currency - build.price;
      this.display_currency = this.renderNumeral(this.user.currency);

      build.number += 1;

      if (
        this.display_builds_success.filter(
          (succ) => succ.buildName === build.name && succ.done == false
        ).length
      ) {
        this.displaySuccess(
          this.display_builds_success.filter((succ) => succ.buildName === build.name)[0]
        );
      }

      this.calcCps();

      build.price *= 2; // EASY MODE
    },

    cps(multiple = 1) {
      if (this.$timer) {
        clearInterval(this.$timer);
      }

      this.calcCps(multiple);

      this.$timer = setInterval(() => {
        for (let index in this.display_builds) {
          this.display_builds[index].buyable = this.user.currency >= this.display_builds[index].price
          this.display_builds[index].total += (this.display_builds[index].number * this.display_builds[index].inc) / 10
        }

        this.increment(this.user.cps / 10);
        document.title = `${this.display_currency} étoiles - Super jeu de clique dans l'univers de SuperBlablaland`;
      }, 100);
    },

    save() {
      this.$cookies.set("user", this.user, -1);
      localStorage.builds = JSON.stringify(this.display_builds)
      localStorage.success = JSON.stringify(this.display_success)
      localStorage.buildssuccess = JSON.stringify(this.display_builds_success)
      this.onsave = true;
    },
    reset() {
      let c = confirm("T'es sûr de vouloir effacer ta partie ?")
      if (!c) return this.closeOptions()
      this.$cookies.remove("user")
      localStorage.removeItem("builds")
      localStorage.removeItem("success")
      localStorage.removeItem("buildssuccess")
      window.location.reload()
    },
    displaySuccess(succ) {
      if (this.haveSuccess) {
        setTimeout(() => {
          this.displaySuccess(succ);
        }, 3500);
      } else {
        this.currentSuccess = succ;
        succ.done = true;
        this.haveSuccess = true;
      }
    },
    changeName(name) {
      this.user.name = name;
      if (!this.display_success.filter((succ) => succ.id === "changeName")[0].done) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.id === "changeName")[0]
        );
      }
      this.save();
    },
    closeOptions() {
      this.openOptions = false;
    },
    bonusCpsClicked(timer) {
      this.bonusCpsClickedTimer = timer;
      this.haveBonusCpsClicked = true;
    },
    renderNumeral(val){
      if(val >= 1000000) return numeral(val).format('0.000a')
      return numeral(val).format('0,0.0')
    }
  },
  computed: {
    classConditionBg() {
      return {
        l3tsg01: this.user.total >= 15,
        cb0nc4: this.user.total >= 30,
        jml3sp0p: this.user.total >= 60,
        j4im3l3sch4ts: this.user.total >= 80,
        cm4rr4nt: this.user.total >= 100,
        jss1l1c0rn3: this.user.total >= 115,
        g4m4d0n3gg: this.user.total >= 130,
        g0g4l4x1e: this.user.total >= 180,
        n3xtl3v3l: this.user.total >= 200,
        un1v3rs20uf: this.user.total >= 215,
        jss0ul4l0l: this.user.total >= 230,
        j3v0l: this.user.total >= 280,
        y0y0l30uf: this.user.total >= 300,
        sky1sth3l1m1t: this.user.total >= 315,
        n0m0rel1m1it: this.user.total >= 330,
        sup3rbbl: this.user.total >= 380
      };
    },
  },
  mounted() {
    this.cps();

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
    haveSuccess: function (val) {
      if (val) {
        setTimeout(() => {
          this.haveSuccess = false;
          this.currentSuccess = {};
        }, 3500);
      }
    },
    haveBonusCpsClicked: function (val) {
      if (this.bonusCpsClikedTimeOut) {
        clearTimeout(this.bonusCpsClikedTimeOut);
      }
      this.bonusCpsClikedTimeOut = setTimeout(() => {
        this.haveBonusCpsClicked = false;
      }, this.bonusCpsClickedTimer);
    },
  },
};
</script>
