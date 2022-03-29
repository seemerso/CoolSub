Vue.component("codenames", {
  data: function () {
    return {
      nameText: this.name,
      codeNameFront: false
    };
  },
  props: ["name", "cname", "flipped"],
  methods: {
    flipFunction: function () {
      if (this.codeNameFront) {
        this.nameText = this.name;
      } else {
        this.nameText = this.cname;
      }
      this.codeNameFront = !this.codeNameFront;
      this.flipped = !this.flipped;
    }
  },
  template: '<div v-on:click="flipFunction" v-bind:class="{backgroundFlip: flipped}">{{nameText}}</b>'
});

var app = new Vue({
  el: "#app",
  data: {
    name: "",
    email: "",
    nameError: false,
    emailError: false,
    codenames: [
      { name: "Protagonist", codename: "Joker", flipped: false },
      { name: "Anne", codename: "Panther", flipped: false },
      { name: "Ryuji", codename: "Skull", flipped: false },
      { name: "Luke", codename: "G.O.A.T. Prof.", flipped: false }
    ]
  },

  watch: {
  
    name: function () {
      if (this.name.length >= 2) {
        this.nameError = true;
      } else {
        this.nameError = false;
      }
    },

    email: function () {
      var validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var result = validEmail.test(this.email);
      if (result) {
        this.emailError = true;
      } else {
        this.emailError = false;
      }
    }
  },
  
  computed: {
    submit: function () {
      if (this.name.length < 1 && this.email.length < 1) {
        return "";
      } else if (this.nameError && this.emailError) {
        return "Submitted";
      } else {
        return "Not Submitted";
      }
    },

    stuff: function () {
      if (this.name.length < 1 && this.email.length < 1) {
        return "";
      } else if (!this.nameError && !this.emailError) {
        return "Name needs at least 2 characters & email needs to be formatted as email@domain.xxx";
      } else if (!this.nameError && this.emailError) {
        return "Name needs at least 2 characters";
      } else if (this.nameError && !this.emailError) {
        return "Email needs to be formatted as email@domain.xxx";
      } else {
        return "";
      }
    }
  }
});