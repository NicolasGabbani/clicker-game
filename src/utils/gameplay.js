export default {
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

    if(el == "button"){
      this.user.totalClick++
      if (this.user.totalClick == 100 && !this.display_success.filter((succ) => succ.succ === "totalClick100")[0].done) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.succ === "totalClick100")[0]
        );
      }
      if (this.user.totalClick == 10000 && !this.display_success.filter((succ) => succ.succ === "totalClick10000")[0].done) {
        this.displaySuccess(
          this.display_success.filter((succ) => succ.succ === "totalClick10000")[0]
        );
      }
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

    if(oldDecorArray > 1 && oldDecorArray != this.decorArray.filter(d => d.get).length){
      console.log(oldDecorArray, this.decorArray.filter(d => d.get).length)
      this.user.decor = this.decorArray.filter(d => d.get).length - 1
    }

    if(oldLicorneArray > 1 && oldLicorneArray != this.decorArray.filter(d => d.licorne).length){
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

    this.checkStore()
    
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
      document.title = `${this.display_currency} fraises - SuperLicorne - Super jeu de clique dans l'univers de SuperBlablaland`;
    }, 100);
  },
}