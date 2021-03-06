export default {
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

  checkSucc() {
    for (let index in this.display_success) {
      this.haveNewSuccess = this.display_success[index].new
      if (this.haveNewSuccess) return
    }
    for (let index in this.display_builds_success) {
      this.haveNewSuccess = this.display_builds_success[index].new
      if (this.haveNewSuccess) return
    }
    return this.haveNewSuccess
  },

  BonusFraiseSucc() {
    if (!this.display_success.filter((succ) => succ.succ === "bonusFraise")[0].done) {
      this.displaySuccess(
        this.display_success.filter((succ) => succ.succ === "bonusFraise")[0]
      );
    }
  },

  BonusFraiseLoseSucc() {
    if (!this.display_success.filter((succ) => succ.succ === "bonusFraiseLose")[0].done) {
      this.displaySuccess(
        this.display_success.filter((succ) => succ.succ === "bonusFraiseLose")[0]
      );
    }
  },

  purchaseStoreSucc() {
    if (!this.display_success.filter((succ) => succ.succ === "purchaseStore")[0].done) {
      this.displaySuccess(
        this.display_success.filter((succ) => succ.succ === "purchaseStore")[0]
      );
    }
  },

  grandSageSucc() {
    if (!this.display_success.filter((succ) => succ.succ === "grandSage")[0].done) {
      this.displaySuccess(
        this.display_success.filter((succ) => succ.succ === "grandSage")[0]
      );
    }
  },

  licorneClickSucc() {
    if (!this.display_success.filter((succ) => succ.succ === "licorneClick")[0].done) {
      this.displaySuccess(
        this.display_success.filter((succ) => succ.succ === "licorneClick")[0]
      );
    }
  },

  licorneClickBonusx2Succ() {
    if (!this.display_success.filter((succ) => succ.succ === "bonusx2")[0].done) {
      this.displaySuccess(
        this.display_success.filter((succ) => succ.succ === "bonusx2")[0]
      );
    }
  },

  scoreFraiseSucc() {
    if (!this.display_success.filter((succ) => succ.succ === "scoreFraise")[0].done) {
      this.displaySuccess(
        this.display_success.filter((succ) => succ.succ === "scoreFraise")[0]
      );
    }
  },

  statsLicorneClickSucc() {
    if (!this.display_success.filter((succ) => succ.succ === "statsLicorneClick")[0].done) {
      this.displaySuccess(
        this.display_success.filter((succ) => succ.succ === "statsLicorneClick")[0]
      );
    }
  }
}
