<template>
  <div :class="$style.root">
    <div :class="$style.form">
      <h2>Регистрация</h2>
      <b-form-input
        type="text"
        :state="getLoginState()"
        v-model="login"
        placeholder="Придумайте логин"
      />
      <b-form-invalid-feedback :class="$style.message" v-if="loginState">
        {{ loginMessage }}
      </b-form-invalid-feedback>
      <b-form-input
        type="text"
        :state="getNameState()"
        v-model="name"
        placeholder="Введите свое имя"
      />
      <b-form-invalid-feedback :class="$style.message" v-if="nameState">
        {{ nameMessage }}
      </b-form-invalid-feedback>
      <b-form-input
        type="password"
        :state="getPasswordState()"
        v-model="password"
        placeholder="Придумайте пароль"
      />
      <b-form-invalid-feedback :class="$style.message" v-if="passwordState">
        {{ passwordMessage }}
      </b-form-invalid-feedback>
      <b-form-input
        v-model="repeatedPassword"
        :state="getRepeatedPasswordState()"
        type="password"
        placeholder="Подтвердите пароль"
        v-if="password.length >= 6"
      />
      <b-form-invalid-feedback
        :class="$style.message"
        v-if="repeatedPasswordState && password.length >= 6"
      >
        {{ repeatedPasswordMessage }}
      </b-form-invalid-feedback>
      <b-button variant="success" @click="register"
        >Зарегистрироваться</b-button
      >
      <p>У вас уже есть аккаунт? <a href="/login">Войти</a></p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import crypto from "crypto-js";
export default {
  name: "register",
  data() {
    return {
      login: "",
      name: "",
      password: "",
      repeatedPassword: "",
      nameMessage: "",
      loginMessage: "",
      passwordMessage: "",
      repeatedPasswordMessage: "",
      nameState: false,
      loginState: false,
      passwordState: false,
      repeatedPasswordState: false,
      loginError: false,
    };
  },
  created() {
    if (localStorage.getItem("userID")) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["USER_ID"]),
  },
  methods: {
    ...mapActions(["REGISTER"]),
    register() {
      const {
        login,
        name,
        password,
        repeatedPassword,
        nameState,
        loginState,
        passwordState,
        repeatedPasswordState,
      } = this;
      if (
        login &&
        name &&
        password &&
        repeatedPassword &&
        password === repeatedPassword &&
        !nameState &&
        !loginState &&
        !passwordState &&
        !repeatedPasswordState
      ) {
        this.REGISTER({
          login: login.toLowerCase(),
          name,
          password: crypto.MD5(password).toString(),
        }).then((result) => {
          if (result.data === "error") {
            this.loginError = true;
            setTimeout(() => {
              this.loginError = false;
            }, 1000);
          }
          if (result === "redirectToHome") {
            window.location.href = "/";
          }
        });
      }
    },
    getNameState() {
      if (this.name.length === 0) {
        this.nameState = false;
        return null;
      } else if (this.name.length < 2) {
        this.nameMessage = "Имя должно состоять минимум из двух символов";
        this.nameState = true;
        return false;
      } else if (this.name.length > 20) {
        this.nameMessage = "Имя должно быть меньше двадцати символов";
        this.nameState = true;
        return false;
      } else {
        this.nameState = false;
        return true;
      }
    },
    getLoginState() {
      if (this.login.length === 0) {
        this.loginState = false;
        return null;
      } else if (this.loginError) {
        this.loginMessage = "Введенный логин уже существует";
        this.loginState = true;
        return false;
      } else if (this.login.length < 2) {
        this.loginMessage = "Логин должен состоять минимум из двух символов";
        this.loginState = true;
        return false;
      } else if (this.login.length > 20) {
        this.loginMessage = "Логин должен быть меньше двадцати символов";
        this.loginState = true;
        return false;
      } else {
        this.loginState = false;
        return true;
      }
    },
    getPasswordState() {
      if (this.password.length === 0) {
        this.passwordState = false;
        return null;
      } else if (this.password.length < 6) {
        this.passwordMessage =
          "Пароль должен состоять минимум из шести символов";
        this.passwordState = true;
        return false;
      } else {
        this.passwordState = false;
        return true;
      }
    },
    getRepeatedPasswordState() {
      if (this.repeatedPassword.length !== 0) {
        if (this.password !== this.repeatedPassword) {
          this.repeatedPasswordMessage = "Пароли должны совпадать";
          this.repeatedPasswordState = true;
          return false;
        } else {
          this.repeatedPasswordState = false;
          return true;
        }
      } else {
        this.repeatedPasswordState = false;
        return null;
      }
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
