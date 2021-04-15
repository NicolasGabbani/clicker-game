<template>
  <div id="game-content" :class="decorClass || decorArray.filter(d => d.get)[this.user.decor]?.cls">
    <Screenshot 
      :gameStart="this.user.gameStart" 
      :decorClass="decorClass"
      :currentDecor="this.user.decor"
      :decorArray="decorArray"
      :clsLicorne="licorneClass" 
      :currentLicorne="this.user.licorne"
      :total="display_total"
      :currency="display_currency"
      :cps="display_cps"
      :builds="display_builds"
      :name="this.user.name"
      :success="display_success"
      :buildsSuccess="display_builds_success"
      @toggleScreenshot="toggleScreenshot"
      @closeOptions="closeOptions"
      v-show="openScreenshot"
    />
    <Header />
    <Bonus
      @inc="increment"
      @cps="cps"
      :cpsNum="this.user.cps"
      @bonusCpsClicked="bonusCpsClicked"
      @BonusFraiseSucc="BonusFraiseSucc"
      @BonusFraiseLoseSucc="BonusFraiseLoseSucc"
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
        <Score :currency="display_currency" :cps="display_cps" :totalNum="this.user.total" @scoreFraiseSucc="scoreFraiseSucc" />
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
            @toggleScreenshot="toggleScreenshot"
          />
          <div v-show="openSuccess">
            <Success :success="display_success" :buildsSuccess="display_builds_success" @checkSucc="checkSucc" />
          </div>
          <div v-show="!openSuccess">
            <Store 
              :store="display_store" 
              :builds="display_builds" 
              :currency="this.user.currency" 
              @buy="buy" 
              @purchaseStoreSucc="purchaseStoreSucc" 
              @calcCps="calcCps" 
            />
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
import fnSucc from "@/utils/succ"
import fnMenu from "@/utils/menu"
import fnGameplay from "@/utils/gameplay"
import fnSound from "@/utils/sound"
import ClickButton from "@/components/ClickButton.vue";
import Menu from "@/components/Menu.vue";
import Header from "@/components/Header.vue";
import Score from "@/components/Score.vue";
import Name from "@/components/Name.vue";
import Fontain from "@/components/Fontain.vue";
import Builds from "@/components/Builds.vue";
import Store from "@/components/Store.vue";
import Success from "@/components/Success.vue";
import Bonus from "@/components/Bonus.vue";
import HaveSuccess from "@/components/HaveSuccess.vue";
import Screenshot from "@/components/Screenshot.vue";
import Deco from "@/components/Deco.vue";
import Decor from "@/data/decor"
import moment from 'moment'
export default {
  name: "Game",
  components: {
    ClickButton,
    Menu,
    Header,
    Score,
    Name,
    Fontain,
    Builds,
    Store,
    Success,
    Bonus,
    HaveSuccess,
    Deco,
    Screenshot
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
      openScreenshot: false,
      haveSuccess: false,
      haveNewSuccess: false,
      currentSuccess: {},
      haveBonusCpsClicked: false,
      decorArray: Decor,
      decorClass: '',
      licorneClass: '',
      classicSound: new Audio(require('../assets/sounds/click2.mp3'))
    };
  },
  methods: {
    ...fnSucc,
    ...fnMenu,
    ...fnGameplay,
    ...fnSound,

    changeName(name) {
      this.user.name = name
      if (!this.display_success.filter((succ) => succ.succ === "changeName")[0].done) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.succ === "changeName")[0]
        );
      }
      this.save();
    },

    bonusCpsClicked(timer) {
      this.bonusCpsClickedTimer = timer;
      this.haveBonusCpsClicked = true;
    },

    renderNumeral(val){
      if(val >= 1000000) return numeral(val).format('0.000a')
      return numeral(val).format('0,0.0')
    },
  },
  mounted() {
    this.cps()
    this.checkSucc()
    this.initPlayClassicSound()

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
    }
  },
  created() {
    if(this.user.gameStart == null){
      this.user.gameStart = Date.now()
      this.save()
    }
  },
};
</script>
