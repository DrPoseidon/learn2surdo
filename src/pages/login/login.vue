<template>
  <div :class="$style.root">
    <div :class="$style.form">
      <h2>Авторизация</h2>
      <b-form-input
        type="text"
        :state="loginState"
        v-model="login"
        placeholder="Введите свой логин"
      />
      <b-form-input
        v-if="login.length > 2"
        type="password"
        :state="passwordState"
        v-model="password"
        placeholder="Введите свой пароль"
      />
      <b-form-invalid-feedback :class="$style.message" v-if="messageState">
        {{ message }}
      </b-form-invalid-feedback>
      <b-button variant="success" @click="register">Войти</b-button>
      <p>У вас нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import crypto from "crypto-js";
export default {
  name: "login",
  data() {
    return {
      login: "",
      password: "",
      message: "",
      loginState: null,
      passwordState: null,
      messageState: null,
    };
  },
  async created() {
    if (localStorage.getItem("userID")) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["USER_ID"]),
  },
  methods: {
    ...mapActions(["LOGIN", "CHECK_SESSION"]),
    register() {
      const { login, password } = this;
      if (login && password) {
        this.LOGIN({
          login: login.toLowerCase(),
          password: crypto.MD5(password).toString(),
        }).then((result) => {
          if (result === "redirectToHome") {
            this.$router.push("/");
          } else {
            this.loginState = false;
            this.passwordState = false;
            this.message = result;
            this.messageState = true;
            setTimeout(() => {
              this.messageState = false;
              this.loginState = null;
              this.passwordState = null;
            }, 3000);
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
