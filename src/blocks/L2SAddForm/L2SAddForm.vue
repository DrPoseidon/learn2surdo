<template>
  <div :class="$style.root">
    <div
      :class="[
        $style.message,
        { [$style.success]: error === false, [$style.error]: error === true },
      ]"
      ref="message"
      v-if="showMessage"
    >
      {{ message }}
    </div>
    <b-form-group :class="$style.whatToAddGroup">
      <b-form-radio v-model="whatToAdd" title="whatToAdd" value="categories"
        >Добавить новые категории</b-form-radio
      >
      <b-form-radio v-model="whatToAdd" title="whatToAdd" value="gestures"
        >Добавить новые жесты</b-form-radio
      >
    </b-form-group>
    <b-form v-if="whatToAdd === 'gestures'" enctype="multipart/form-data">
      <div :class="$style.addForm" v-for="(el, index) in gestures" :key="index">
        <b-form-input
          type="text"
          placeholder="Имя"
          v-model="gestures[index].title"
          required
        />
        <b-form-input
          type="text"
          placeholder="Описание"
          v-model="gestures[index].description"
          required
        />
        <b-form-file
          v-model="gestures[index].fileName"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <b-form-select v-model="gestures[index].category" :options="options" />
      </div>
    </b-form>
    <b-form v-if="whatToAdd === 'categories'" enctype="multipart/form-data">
      <div
        :class="$style.addForm"
        v-for="(el, index) in categories"
        :key="index"
      >
        <b-form-input
          type="text"
          placeholder="Название категории"
          v-model="categories[index].title"
          required
        />
      </div>
    </b-form>
    <div :class="$style.buttons">
      <b-button variant="primary" @click="add">Отправить</b-button>
      <div :class="$style.plusMinus" v-if="whatToAdd">
        <b-button variant="danger" @click="removeFrom">-</b-button>
        <b-button variant="success" @click="addTo">+</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  title: "L2SAddForm",
  data() {
    return {
      gestures: [
        { title: "", description: "", category: null, fileName: null },
      ],
      categories: [{ title: "" }],
      whatToAdd: "",
      error: false,
      message: "Сообщение",
      showMessage: false,
    };
  },
  computed: {
    ...mapGetters(["CATEGORIES"]),
    options() {
      let arr = [
        { value: null, text: "Выберите категорию из списка", disabled: true },
      ];
      this.CATEGORIES.forEach((el) => {
        arr.push({ value: el.title, text: el.title });
      });
      return arr;
    },
  },
  methods: {
    ...mapActions([
      "ADD_GESTURES_TO_DB",
      "ADD_CATEGORIES_TO_DB",
      "GET_ALL_CATEGORIES_FROM_DB",
      "GET_ALL_GESTURES_FROM_DB",
    ]),
    changeMessage(text) {
      this.showMessage = true;
      this.message = text;
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    },
    async add() {
      const { whatToAdd } = this;
      let { categories, gestures } = this;
      if (whatToAdd === "categories") {
        let error = false;
        categories.forEach((el) => {
          if (!el.title) {
            error = !error;
          }
        });
        if (!error) {
          await this.ADD_CATEGORIES_TO_DB(categories).then((result) => {
            if (result.status === 201) {
              categories = [{ title: "" }];
              this.error = false;
              this.changeMessage("Категории успешно добавлены!");
              this.GET_ALL_CATEGORIES_FROM_DB();
            } else {
              this.changeMessage(result.data);
              this.error = true;
              console.log(result.data);
            }
          });
        }
      }
      if (whatToAdd === "gestures") {
        const newGestures = [];
        gestures.forEach((el) => {
          let tmp = {
            category: el.category,
            description: el.description,
            fileName: el.fileName.name,
            title: el.title,
          };
          newGestures.push(tmp);
        });
        gestures = newGestures;
        let error = false;
        gestures.forEach((el) => {
          if (!el.category || !el.description || !el.title) {
            error = !error;
          }
        });
        if (!error) {
          await this.ADD_GESTURES_TO_DB(gestures).then((result) => {
            if (result.status === 201) {
              this.gestures = [
                { title: "", description: "", category: null, fileName: null },
              ];
              this.error = false;
              this.changeMessage("Жесты успешно добавлены!");
              this.GET_ALL_GESTURES_FROM_DB();
            } else {
              this.changeMessage(result.data);
              this.error = true;
              console.log(result.data);
            }
          });
        }
      }
    },
    addTo() {
      const { whatToAdd, categories, gestures } = this;
      if (whatToAdd === "categories") {
        categories.push({ title: "" });
      }
      if (whatToAdd === "gestures") {
        gestures.push({
          title: "",
          description: "",
          category: null,
          fileName: null,
        });
      }
    },
    removeFrom() {
      const { whatToAdd, categories, gestures } = this;
      if (whatToAdd === "gestures") {
        if (gestures.length > 1) {
          gestures.pop();
        }
      }
      if (whatToAdd === "categories") {
        if (categories.length > 1) {
          categories.pop();
        }
      }
    },
  },
  mounted() {
    this.GET_ALL_CATEGORIES_FROM_DB();
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
