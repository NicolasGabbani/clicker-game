<template>
  <div id="game-content" :class="decorClass || decorArray.filter(d => d.get)[this.user.decor]?.cls">
    <Bonus
      @inc="increment"
      @cps="cps"
      :cpsNum="this.user.cps"
      @bonusCpsClicked="bonusCpsClicked"
      @BonusFraiseSucc="BonusFraiseSucc"
    />
    <div class="game container">
      <div class="col container-centered-col text-center po-r">
        <Fontain :loaded="loaded" :cps="this.user.cps" :rain="this.user.rain" />
        <Name :name="this.user.name" @changeName="changeName" />
        <ClickButton
          @inc="increment"
          :cps="this.user.cps"
          :clsLicorne="licorneClass"
          :decorArray="decorArray"
          :currentLicorne="this.user.licorne"
          :haveSuccess="haveSuccess"
          :success="currentSuccess"
          :haveBonusCpsClicked="haveBonusCpsClicked"
          @licorneClickSucc="licorneClickSucc"
        />
        <Score :currency="display_currency" :cps="display_cps" :total="display_total" :totalNum="this.user.total" />
      </div>
      <div class="col">
        <div>
          <div class="options">
            <button class="nes-btn" :class="{ 'is-success': openSuccess }" @click.prevent="openSuccess = !openSuccess">
              <span class="new-success-radar in-btn" v-if="haveNewSuccess"></span>
              succès
            </button>
            <button class="nes-btn" :class="{ 'is-success': openOptions }" @click.prevent="openOptions = !openOptions">
              options
            </button>
          </div>
          <Menu
            @reset="reset"
            @save="save"
            @closeOptions="closeOptions"
            v-show="openOptions"
            :decor="decorArray"
            :currentDecor="this.user.decor"
            @selectDecor="selectDecor"
            :currentLicorne="this.user.licorne"
            @selectLicorne="selectLicorne"
            :rain="this.user.rain"
            @optionRain="optionRain"
          />
          <div v-show="openSuccess">
            <Success :success="display_success" :buildsSuccess="display_builds_success" @checkSucc="checkSucc" />
          </div>
          <div v-show="!openSuccess">
            <Store :store="display_store" :builds="display_builds" :currency="this.user.currency" @buy="buy" @purchaseStoreSucc="purchaseStoreSucc" @storeHeartSucc="storeHeartSucc" @calcCps="calcCps" />
            <Builds
              @buyBuild="buyBuild"
              @buy="buy"
              :builds="display_builds"
              :total="this.user.total"
              :cps="this.user.cps"
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
    <Deco @grandSageSucc="grandSageSucc" />
  </div>
</template>

<script>
import ClickButton from "@/components/ClickButton.vue";
import Menu from "@/components/Menu.vue";
import Score from "@/components/Score.vue";
import Name from "@/components/Name.vue";
import Fontain from "@/components/Fontain.vue";
import Builds from "@/components/Builds.vue";
import Store from "@/components/Store.vue";
import Success from "@/components/Success.vue";
import Bonus from "@/components/Bonus.vue";
import HaveSuccess from "@/components/HaveSuccess.vue";
import Deco from "@/components/Deco.vue";
import Decor from "@/data/decor"
export default {
  name: "Game",
  components: {
    ClickButton,
    Menu,
    Score,
    Name,
    Fontain,
    Builds,
    Store,
    Success,
    Bonus,
    HaveSuccess,
    Deco,
  },
  props: {
    user: Object,
    builds: String,
    store: String,
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
      display_store: JSON.parse(this.store),
      display_success: JSON.parse(this.success),
      display_builds_success: JSON.parse(this.buildsSuccess),
      onsave: false,
      onsaveTimer: 60000,
      openSuccess: false,
      openOptions: false,
      haveSuccess: false,
      haveNewSuccess: false,
      currentSuccess: {},
      haveBonusCpsClicked: false,
      decorArray: Decor,
      decorClass: '',
      licorneClass: ''
    };
  },
  methods: {
    increment(inc = 1, number = 1, el = null) {
      if (
        el == "bonus" &&
        !this.display_success.filter((succ) => succ.succ === "oneBonus")[0].done
      ) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.succ === "oneBonus")[0]
        );
      }
      if (
        el == "button" &&
        !this.display_success.filter((succ) => succ.succ === "oneClicked")[0].done
      ) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.succ === "oneClicked")[0]
        );
      }
      this.user.currency = this.user.currency + inc * number;
      this.user.total = this.user.total + inc * number;
      this.display_currency = this.renderNumeral(this.user.currency);
      this.display_total = this.renderNumeral(this.user.total);

      let oldDecorArray = this.decorArray.filter(d => d.get).length
      let oldLicorneArray = this.decorArray.filter(d => d.licorne).length

      for(let i in this.decorArray){
        this.decorArray[i].get = this.user.total >= this.decorArray[i].score
      }

      for(let l in this.decorArray.filter(d => d.licorne != undefined)){
        this.decorArray[l].licorne = this.user.total >= this.decorArray[l].score
      }

      if(oldDecorArray != 0 && oldDecorArray != this.decorArray.filter(d => d.get).length){
        this.user.decor = this.decorArray.filter(d => d.get).length - 1
      }

      if(oldLicorneArray != 0 && oldLicorneArray != this.decorArray.filter(d => d.licorne).length){
        this.user.licorne = this.decorArray.filter(d => d.licorne).length - 1
      }

      this.decorClass = this.user.decor == -1 ? this.decorArray.filter(d => d.get).slice(-1)[0]?.cls : null
      this.licorneClass = this.user.licorne == -1 ? this.decorArray.filter(d => d.licorne).slice(-1)[0]?.cls : null
    },

    calcCps(multiple = 1) {
      this.user.cps = 0;
      for (let index in this.display_builds) {
        this.user.cps += this.display_builds[index].number * this.display_builds[index].inc
      }
      this.user.cps = this.user.cps * multiple;
      this.display_cps = this.renderNumeral(this.user.cps);
    },

    buy(price){
      this.user.currency = this.user.currency - price;
      this.display_currency = this.renderNumeral(this.user.currency);
    },

    buyBuild(build) {
      if (this.user.currency < build.price) return;

      this.buy(build.price)

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

      build.price *= 1.2; // EASY MODE
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
      localStorage.store = JSON.stringify(this.display_store)
      localStorage.success = JSON.stringify(this.display_success)
      localStorage.buildssuccess = JSON.stringify(this.display_builds_success)
      this.onsave = true;
    },

    reset() {
      let c = confirm("T'es sûr de vouloir effacer ta partie ?")
      if (!c) return this.closeOptions()
      this.$cookies.remove("user")
      localStorage.removeItem("builds")
      localStorage.removeItem("store")
      localStorage.removeItem("success")
      localStorage.removeItem("buildssuccess")
      window.location.reload()
    },

    displaySuccess(succ) {
      if (this.haveSuccess) {
        setTimeout(() => {
          this.displaySuccess(succ)
        }, 3500);
      } else {
        this.currentSuccess = succ
        succ.done = true
        succ.new = true
        this.haveSuccess = true
        this.checkSucc()
      }
    },

    checkSucc(){
      for(let index in this.display_success){
        this.haveNewSuccess = this.display_success[index].new
        if(this.haveNewSuccess) return
      }
      for(let index in this.display_builds_success){
        this.haveNewSuccess = this.display_builds_success[index].new
        if(this.haveNewSuccess) return
      }
      return this.haveNewSuccess
    },

    changeName(name) {
      this.user.name = name;
      if (!this.display_success.filter((succ) => succ.succ === "changeName")[0].done) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.succ === "changeName")[0]
        );
      }
      this.save();
    },

    optionRain(rain){
      this.user.rain = rain
      console.log(this.user.rain)
    },

    BonusFraiseSucc(){
      if (!this.display_success.filter((succ) => succ.succ === "bonusFraise")[0].done) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.succ === "bonusFraise")[0]
        );
      }
    },

    purchaseStoreSucc(){
      if (!this.display_success.filter((succ) => succ.succ === "purchaseStore")[0].done) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.succ === "purchaseStore")[0]
        );
      }
    },

    storeHeartSucc(){
      if (!this.display_success.filter((succ) => succ.succ === "storeHeart")[0].done) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.succ === "storeHeart")[0]
        );
      }
    },

    grandSageSucc(){
      if (!this.display_success.filter((succ) => succ.succ === "grandSage")[0].done) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.succ === "grandSage")[0]
        );
      }
    },

    licorneClickSucc(){
      if (!this.display_success.filter((succ) => succ.succ === "licorneClick")[0].done) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.succ === "licorneClick")[0]
        );
      }
    },

    closeOptions() {
      this.openOptions = false;
    },

    selectDecor(index){
      this.user.decor = index
    },

    selectLicorne(index){
      this.user.licorne = index
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
  mounted() {
    this.cps()
    this.checkSucc()

    this.$timer2 = setInterval(() => {
      this.save()
    }, this.onsaveTimer)
  },
  unmounted() {
    clearInterval(this.$timer)
    clearInterval(this.$timer2)
    clearInterval(this.$timer3)
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
