<template>
  <div :class="$style.root">
    <div
      :class="$style.message"
      v-if="visMessage"
      :style="{ color: color, borderColor: color }"
    >
      {{ message }}
    </div>
    <div :class="$style.main" v-if="!visMessage">
      <p>Выберете соответствие изображения и названия жеста</p>
      <div :class="$style.exercise">
        <b-button
          @click="reset()"
          v-if="comparisonArr.length"
          :class="$style.reset"
          >Сброс</b-button
        >
        <div :class="$style.images">
          <a
            v-for="image in images"
            :key="image.fileName"
            @click="setImage(image)"
            :class="$style.image"
          >
            <div
              :class="$style.choosen"
              :style="{
                borderColor: getColor(image, 'image'),
                opacity: getOpacity(image, 'image'),
              }"
            ></div>
            <L2SMedia
              :class="$style.image"
              :category="image.category"
              :fileName="image.fileName"
              width="10vw"
            />
          </a>
        </div>

        <div :class="$style.titles">
          <a
            v-for="title in titles"
            :key="title.title"
            @click="setTitle(title)"
            :class="$style.title"
            :style="{
              backgroundColor: getColor(title, 'title'),
            }"
          >
            <p>{{ title.title }}</p>
          </a>
        </div>
        <b-button
          @click="getSuccess"
          v-if="checkComparisonArr"
          :class="$style.answer"
          variant="success"
          >Ответ</b-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import L2SMedia from "Components/L2SMedia";
export default {
  name: "L2STestComparisonTask",
  components: {
    L2SMedia,
  },
  props: {
    curGestures: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      colors: ["orange", "lime", "purple"],
      comparisonArr: [],
      imagesIndexes: [],
      titlesIndexes: [],
      message: "Все верно",
      visMessage: false,
      color: undefined,
      globalError: 0,
    };
  },
  methods: {
    getSuccess() {
      const { comparisonArr } = this;
      let key = 0;
      comparisonArr.forEach((el) => {
        if (el.image === el.title) {
          key++;
        }
      });
      if (key === 3) {
        (this.comparisonArr = []), (this.imagesIndexes = []);
        this.titlesIndexes = [];
        this.$emit("nextGesture", {
          success: true,
          gesture: this.curGestures,
          answer: this.curGestures,
          exercise: "comparison",
        });
        console.log("success");
      } else {
        console.log("error");
        this.$emit("nextGesture", {
          success: false,
          gesture: this.curGestures,
          answer: this.comparisonArr,
          exercise: "comparison",
        });
      }
      this.reset();
    },
    getColor(data, type) {
      let color = undefined;
      if (this.comparisonArr.length) {
        this.comparisonArr.filter((el) => {
          if (type === "image" && el.image === data) {
            color = el.color;
          }
          if (type === "title" && el.title === data) {
            color = el.color;
          }
        });
      }
      return color;
    },
    getOpacity(data, type) {
      let opacity = 0;
      if (this.comparisonArr.length) {
        this.comparisonArr.filter((el) => {
          if (type === "image" && el.image === data) {
            opacity = 1;
          }
          if (type === "title" && el.title === data) {
            opacity = 1;
          }
        });
      }
      return opacity;
    },
    setImage(image) {
      const { comparisonArr, imagesIndexes, colors } = this;
      if (!comparisonArr.length) {
        comparisonArr.push({
          image,
          title: undefined,
          color: colors[0],
        });
        imagesIndexes.push(image);
      } else {
        if (comparisonArr[comparisonArr.length - 1].image === undefined) {
          comparisonArr[comparisonArr.length - 1].image = image;
          imagesIndexes.push(image);
        } else if (
          comparisonArr[comparisonArr.length - 1].title &&
          comparisonArr[comparisonArr.length - 1].image
        ) {
          let is = false;
          comparisonArr.forEach((el) => {
            if (el.image === image) {
              is = true;
            }
          });
          if (!is) {
            comparisonArr.push({
              image,
              title: undefined,
              color: colors[comparisonArr.length],
            });
            imagesIndexes.push(image);
          }
        }
      }
    },
    setTitle(title) {
      const { comparisonArr, titlesIndexes, colors } = this;
      if (!comparisonArr.length) {
        comparisonArr.push({
          image: undefined,
          title,
          color: colors[0],
        });
        titlesIndexes.push(title);
      } else {
        if (comparisonArr[comparisonArr.length - 1].title === undefined) {
          comparisonArr[comparisonArr.length - 1].title = title;
          titlesIndexes.push(title);
        } else if (
          comparisonArr[comparisonArr.length - 1].title &&
          comparisonArr[comparisonArr.length - 1].image
        ) {
          let is = false;
          comparisonArr.forEach((el) => {
            if (el.title === title) {
              is = true;
            }
          });
          if (!is) {
            comparisonArr.push({
              image: undefined,
              title,
              color: colors[comparisonArr.length],
            });
            titlesIndexes.push(title);
          }
        }
      }
    },
    reset() {
      this.comparisonArr = [];
      this.imagesIndexes = [];
      this.titlesIndexes = [];
    },
  },
  computed: {
    images() {
      const { curGestures } = this;
      return [...curGestures].sort(() => Math.random() - 0.5);
    },
    titles() {
      const { curGestures } = this;
      return [...curGestures].sort(() => Math.random() - 0.5);
    },
    checkComparisonArr() {
      const { comparisonArr } = this;
      let key = 0;
      comparisonArr.forEach((el) => {
        if (el.image && el.title) {
          key++;
        }
      });
      return key === 3 ? true : false;
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
